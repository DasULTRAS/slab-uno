import express from "express";
import http from "http";
import {Server} from "socket.io";
import cors from "cors";

import LobbyManagement from "./src/LobbyManagement.js"
import Deck from "./src/Deck.js";


const app = express();

app.use(cors());
app.set('port', 8080);

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: ["https://uno.dasultras.de", "http://localhost:3000"], methods: ["GET", "POST"],
    },
});

const lobbyManagement = new LobbyManagement(io);

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    socket.broadcast.emit('message', {message: `User Connected: ${socket.id}`});

    socket.on("disconnect", () => {
        console.log(`${socket.id} disconnected.`);
        const lobby = lobbyManagement.getLobbyBySocketID(socket.id);
        if (lobby != null) {
            // Remove player from lobby
            lobby.removePlayer(socket.id);
            io.to(lobby.lobbyID).emit("message", {message: `Player ${socket.id} disconnected.`});
            io.to(lobby.lobbyID).emit("player_change", {lobby: lobby});
            if (lobby.players.length === 0) {
                // Remove Lobby if is empty
                lobbyManagement.removeLobby(lobby.lobbyID);
            }
        }
    });

    socket.on("create_lobby", (data) => {
        try {
            lobbyManagement.createLobby(data, socket);
        } catch (e) {
            console.error(e);
        }
    });

    socket.on("join_lobby", (data) => {
        try {
            const lobby = lobbyManagement.joinLobby(data, socket);
        } catch (e) {
            console.error(e);
        }
        if (lobby != null) io.to(lobby.lobbyID).emit("player_change", {lobby: lobby});
    });

    socket.on("ready_to_play", () => {
        const player = lobbyManagement.getPlayerBySocketID(socket.id);
        if (player !== null) {
            player.readyToPlay = !player.readyToPlay;
            io.to(player.lobbyID).emit("message", {message: `Player status changed: ${player.username}`});
            io.to(player.lobbyID).emit("player_change", {lobby: lobbyManagement.getLobbyByID(player.lobbyID)});
        }
    });
    // Start and init the new Game
    socket.on("start_game", () => {
        const lobby = lobbyManagement.getLobbyBySocketID(socket.id);

        if (lobby != null) {
            // Test if every Player is ready
            let ready = true;
            lobby.players.forEach((player) => {
                if (!player.readyToPlay) ready = false;
            })

            if (ready) {
                // init Deck   // Math.trunc returns the number of an float
                lobby.deck = new Deck(true);
                lobby.dealCards();
                // Start the game
                lobby.renewPlayerDecksLength();
                // Choose first Player
                lobby.activePlayerIndex = Math.trunc(Math.random() * lobby.players.length);

                io.to(lobby.lobbyID).emit("start_game", {lobby: lobby});
                io.to(lobby.lobbyID).emit("message", {message: `Game in Lobby ${lobby.lobbyID} started.`});
            }
        }
    });
    // Frontend init
    socket.on("game_started", () => {
        const player = lobbyManagement.getPlayerBySocketID(socket.id);
        if (player !== null)
            // Send first Cards
            socket.emit("get_card", {player_deck: player.deck});
    });

    socket.on("place_card", (data) => {
        const player = lobbyManagement.getPlayerBySocketID(socket.id);
        const lobby = lobbyManagement.getLobbyBySocketID(socket.id);
        //Player or Lobby not found
        if ((player || lobby) === null) {
            console.log(`${socket.id} - Player not found.`)
            return;
        }
        // Player is not active Player
        if (lobby.players[lobby.activePlayerIndex].socketID !== socket.id){
            socket.emit("message", {message: "Wait for your turn."});
            return;
        }
        // Check if Move is valid and make the move
        try {
            if(lobby.playCard(player, data.card)){
                socket.emit("message", {message: "Move was valid."});
            } else {
                socket.emit("message", {message: "Move is not valid."});
            }
        } catch (error) {
            console.error(error);
        }
    });

    // Player wants one more card
    /**
     * WHY DOES PLAYER NEED ONE CARD
     */
    socket.on("get_card", () => {
        const player = lobbyManagement.getPlayerBySocketID(socket.id);
        const lobby = lobbyManagement.getLobbyBySocketID(socket.id);

        if (player !== null && lobby !== null) {
            /*
            GET NEW CARD
             */
            lobby.renewPlayerDecksLength();
            io.emit("message", {message: `${player.username} gets a new Card.`});
            socket.emit("get_card", {player_deck: player.deck});
            io.to(lobby.lobbyID).emit("renew_lobby", {lobby: lobby});
        }
    });

    socket.on("ping", (data) => {
        try {
            socket.emit("pong", data);
        } catch (e) {
            console.error(e);
        }
    });
});

server.listen(app.get('port'), () => {
    console.log(`Server is running on Port ${app.get('port')}.`);
});

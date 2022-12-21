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

    socket.on("reconnect", (attempt) => {
        // never triggered
        const player = lobbyManagement.getPlayerBySocketID(socket.id);
        if (player === undefined)
            io.broadcast.emit("message", {message: `${socket.id} hat die Verbindung wiederhergestellt.`});
    });

    socket.on("disconnect", () => {
        console.log(`${socket.id} disconnected.`);
        const lobby = lobbyManagement.getLobbyBySocketID(socket.id);
        if (lobby !== undefined) {
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
            if (lobby !== undefined) {
                io.to(lobby.lobbyID).emit("player_change", {lobby: lobby});
                socket.emit("gameSettings", lobby.gameSettings);
            }
        } catch (e) {
            console.error(e);
        }
    });

    socket.on("ready_to_play", () => {
        const player = lobbyManagement.getPlayerBySocketID(socket.id);
        if (player !== undefined) {
            player.readyToPlay = !player.readyToPlay;
            io.to(player.lobbyID).emit("message", {message: `Player status changed: ${player.username}`});
            io.to(player.lobbyID).emit("player_change", {lobby: lobbyManagement.getLobbyByID(player.lobbyID)});
        }
    });

    socket.on("gameSettings", (data) =>{
        const lobby = lobbyManagement.getLobbyBySocketID(socket.id);
        if (data !== undefined && lobby !== undefined){
            lobby.gameSettings = data.game_settings;
        }
        io.to(lobby.lobbyID).emit("gameSettings", {game_settings: lobby.gameSettings});
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
        if (player !== undefined)
            // Send first Cards
            socket.emit("get_card", {player_deck: player.deck});
    });

    socket.on("place_card", (data) => {
        const player = lobbyManagement.getPlayerBySocketID(socket.id);
        const lobby = lobbyManagement.getLobbyBySocketID(socket.id);
        //Player or Lobby not found
        if ((player === undefined) || (undefined === lobby)) {
            console.log(`${socket.id} - Player not found.`)
            return;
        }

        try {
            // Check if Move is valid and make the move and Send infos
            if (lobby.playCard(player, data.card, socket)) {
                socket.emit("message", {message: "Move was valid."});
            } else {
                socket.emit("message", {message: "Move is not valid."});
            }
            lobby.renewAllPlayers(io);
        } catch
            (error) {
            console.error(error);
        }
    });

    // Player wants one card
    socket.on("get_card", () => {
        const player = lobbyManagement.getPlayerBySocketID(socket.id);
        const lobby = lobbyManagement.getLobbyBySocketID(socket.id);

        if (player !== undefined && lobby !== undefined) {
            // Get new Card
            player.deck.placeCard(lobby.deck.drawCard());
            if (lobby.deck.length == 0) {
                lobby.deck.addCards(lobby.playedCards.getUnusedCards());
            }

            io.emit("message", {message: `${player.username} gets a new Card.`});
            lobby.renewAllPlayers(io);
        }
    });

    // Player sends a message
    socket.on("chat_message", (data) =>{
        const player = lobbyManagement.getPlayerBySocketID(socket.id);
        const lobby = lobbyManagement.getLobbyBySocketID(socket.id);

        if (player !== undefined && lobby !== undefined && data !== undefined && data.hasOwnProperty("chat_message")){
            lobby.addNewMessage(player.username, data.chat_message.message, data.chat_message.timestamp);
            io.to(lobby.lobbyID).emit("renew_lobby", {lobby: lobby});
        } else {
            console.error("Invalid Chat Message.");
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

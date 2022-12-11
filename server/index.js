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

    socket.on("disconnect", (data) => {
        console.log(`${socket.id} disconnected.`);
        socket.broadcast.emit('message', {message: `${socket.id} disconnected.`});
        const lobby = lobbyManagement.getLobbyBySocketID(socket.id);
        if (lobby != null) {
            // Remove player from lobby
            lobby.removePlayer(socket.id);
            if (lobby.players.length == 0)
                // Remove Lobby if is empty
                lobbyManagement.removeLobby(lobby.lobbyID);
        }
    });
});

io.on("connection", (socket) => {
    socket.on("create_lobby", (data) => {
        lobbyManagement.createLobby(data, socket);
    });

    socket.on("join_lobby", (data) => {
        const lobby = lobbyManagement.joinLobby(data, socket);
        if (lobby != null) io.emit("player_change", {message: `Player joined: ${data.username}`, lobby: lobby});
    });

    socket.on("ready_to_play", (data) => {
        const player = lobbyManagement.getPlayerBySocketID(socket.id);
        if (player !== null) {
            player.readyToPlay = !player.readyToPlay;
            socket.emit("message", {message: `Player status changed: ${player.username}`});
            io.emit("player_change", {
                lobby: lobbyManagement.getLobbyByID(player.lobbyID)
            });
        }
    });
    socket.on("start_game", (data) => {
        const lobby = lobbyManagement.getLobbyBySocketID(socket.id);
        if (lobby != null) {
            // Test if every Player is ready
            let ready = true;
            lobby.players.forEach((player) => {
                if (!player.readyToPlay) ready = false;
            })
            if (ready) {
                // Start the game
                io.emit("start_game", {message: `Game started.`, lobby: lobby});
                io.emit("message", {message: `Game in Lobby ${lobby.lobbyID} started.`});
                // init Deck
                lobby.deck = new Deck(parseInt(lobby.players.length / 4) + 1);
            }
        }
    });

    socket.on("ping", (data) => {
        socket.emit("pong", data);
    });
});

server.listen(app.get('port'), () => {
    console.log(`Server is running on Port ${app.get('port')}.`);
});

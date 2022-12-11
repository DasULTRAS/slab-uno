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
            io.to(lobby.lobbyID).emit("message", {message: `Player ${socket} disconnected.`});
            if (lobby.players.length === 0) {
                // Remove Lobby if is empty
                lobbyManagement.removeLobby(lobby.lobbyID);
                socket.broadcast.emit("message", {message: `Lobby ${lobby.lobbyID} removed.`});
            }
        }
    });
});

io.on("connection", (socket) => {
    socket.on("create_lobby", (data) => {
        lobbyManagement.createLobby(data, socket);
    });

    socket.on("join_lobby", (data) => {
        const lobby = lobbyManagement.joinLobby(data, socket);
        if (lobby != null) io.to(lobby.lobbyID).emit("player_change", {
            message: `Player joined: ${data.username}`,
            lobby: lobby
        });
    });

    socket.on("ready_to_play", () => {
        const player = lobbyManagement.getPlayerBySocketID(socket.id);
        if (player !== null) {
            player.readyToPlay = !player.readyToPlay;
            io.to(player.lobbyID).emit("message", {message: `Player status changed: ${player.username}`});
            io.to(player.lobbyID).emit("player_change", {
                lobby: lobbyManagement.getLobbyByID(player.lobbyID)
            });
        }
    });
    socket.on("start_game", () => {
        const lobby = lobbyManagement.getLobbyBySocketID(socket.id);
        if (lobby != null) {
            // Test if every Player is ready
            let ready = true;
            lobby.players.forEach((player) => {
                if (!player.readyToPlay) ready = false;
            })
            if (ready) {
                // Start the game
                io.to(lobby.lobbyID).emit("start_game", {message: `Game started.`, lobby: lobby});
                io.to(lobby.lobbyID).emit("message", {message: `Game in Lobby ${lobby.lobbyID} started.`});
                // init Deck   // Math.trunc returns the number of an float
                lobby.deck = new Deck(Math.trunc(lobby.players.length / 4) + 1);
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

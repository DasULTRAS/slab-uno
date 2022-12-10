import express from "express";
import http from "http";
import {Server} from "socket.io";
import cors from "cors";

import Player from "./src/Player.js"
import Lobby from "./src/Lobby.js"
import LobbyManagement from "./src/LobbyManagement.js"


const app = express();

app.use(cors());
app.set('port', 3003);

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        // origin: "https://uno.dasultras.de",
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

const lobbyManagement = new LobbyManagement(io);

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
});

io.on("connection", (socket) => {
    socket.on("create_lobby", (data) => {
        lobbyManagement.createLobby(data, socket);
    });

    socket.on("join_lobby", (data) => {
        const lobby = lobbyManagement.joinLobby(data, socket);
        io.emit("player_joined", {message: `Player joined: ${data.username}`, lobby: lobby});
    });
});

server.listen(app.get('port'), () => {
    console.log(`Server is running on Port ${app.get('port')}.`);
});

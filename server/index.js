import express from "express";
import http from "http";
import {Server} from "socket.io";
import cors from "cors";

import Player from "./src/Player.js"
import Lobby from "./src/Lobby.js"


const app = express();

app.use(cors());
app.set('port', 3003);

// @type object - {lobbyID: *, player: [socket.id, username]}
const lobbys = [];

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        // origin: "https://uno.dasultras.de",
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("create_lobby", (data) => {
        let i = -1;
        lobbys.forEach((currentValue, index) => {
            if (currentValue.lobbyID === data.lobbyID)
                i = index;
        });

        // not empty inputs
        if (data.lobbyID === "" || data.username === "")
            i = -2;

        if (i == -2){
            console.log(`wrong input: ${data.lobbyID}`);
            socket.emit("create_lobby", {message: "Wrong input.", status: 0, lobbyID: data.lobbyID, username: data.username});
        } else if (i == -1) {
            const lobby = new Lobby(data.lobbyID);
            lobby.addPlayer(new Player(data.username, socket.id));
            lobbys.push(lobby);

            console.log(`lobby created: ${data.lobbyID}`);
            socket.join(data.lobbyID);
            socket.emit("create_lobby", {message: "Lobby created and joined.", status: 1, lobbyID: data.lobbyID, username: data.username});
        } else {
            console.log(`lobby already exists: ${lobbys[i].lobbyID}`);
            socket.emit("create_lobby", {message: "Lobby already exists.", status: 0, lobbyID: data.lobbyID, username: data.username});
        }
    })

    socket.on("join_lobby", (data) => {
        let i = -1;
        lobbys.forEach((currentValue, index) => {
            if (currentValue.lobbyID === data.lobbyID)
                i = index;
        });

        // not empty inputs
        if (data.lobbyID === "" || data.username === "")
            i = -2;

        if (i == -1) {
            console.log(`lobby doesnt exists: ${data.lobbyID}`);
            socket.emit("join_lobby", {message: "Lobby doesnt exists.", status: 0, lobbyID: data.lobbyID, username: data.username});
        } else {
            lobbys[i].addPlayer(new Player(data.username, socket.id));
            socket.join(data.lobbyID);
            console.log(`lobby joined: ${lobbys[i].lobbyID}`);
            socket.emit("join_lobby", {message: "Lobby joined.", status: 1, lobbyID: data.lobbyID, username: data.username});
        }
    })
});

server.listen(app.get('port'), () => {
    console.log(`Server is running on Port ${app.get('port')}.`);
});

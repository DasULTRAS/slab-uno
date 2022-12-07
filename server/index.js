const express = require('express');
const app = express();
const http = require("http");
const {Server} = require("socket.io");
const cors = require("cors");
const {render} = require("express/lib/application");

app.use(cors());
app.set('port', 3003);

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
        if (i == -1) {
            lobbys.push({lobbyID: data.lobbyID, player: [socket.id]});
            console.log(`lobby created: ${data.lobbyID}`);
            socket.join(data.lobbyID);
            socket.emit("create_lobby", {message: "Lobby created and joined.", status: 1, lobbyID: data.lobbyID});
        } else {
            console.log(`lobby already exists: ${lobbys[i].lobbyID}`);
            socket.emit("create_lobby", {message: "Lobby already exists.", status: 0, lobbyID: data.lobbyID});
        }
    })
    socket.on("join_lobby", (data) => {
        let i = -1;
        lobbys.forEach((currentValue, index) => {
            if (currentValue.lobbyID === data.lobbyID)
                i = index;
        });
        if (i == -1) {
            console.log(`lobby doesnt exists: ${data.lobbyID}`);
            socket.emit("join_lobby", {message: "Lobby doesnt exists.", status: 0, lobbyID: data.lobbyID});
        } else {
            lobbys[i].player.push(socket.id);
            socket.join(data.lobbyID);
            console.log(`lobby joined: ${lobbys[i].lobbyID}`);
            socket.emit("join_lobby", {message: "Lobby joined.", status: 1, lobbyID: data.lobbyID});
        }
    })
});

server.listen(app.get('port'), () => {
    console.log(`Server is running on Port ${app.get('port')}.`);
});

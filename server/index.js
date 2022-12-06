const express = require('express');
const app = express();
const http = require("http");
const {Server} = require("socket.io");
const cors = require("cors");
const {render} = require("express/lib/application");

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

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("send_lobby_id", (data) => {
        console.log(`${socket.id}: ${data}`);

        socket.broadcast.emit("receive_lobby_id", data);
    })
});

server.listen(app.get('port'), () => {
    console.log(`Server is running on Port ${app.get('port')}.`);
});

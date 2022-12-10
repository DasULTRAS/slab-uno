import Lobby from "./Lobby.js";
import Player from "./Player.js";

export default class LobbyManagement{
    constructor(socket) {
        this.socket = socket;
        this.lobbys = [];
    }

    createLobby(data, socket){
        let i = -1;
        this.lobbys.forEach((currentValue, index) => {
            if (currentValue.lobbyID === data.lobbyID)
                i = index;
        });

        // not empty inputs
        if (data.lobbyID === "" || data.username === "")
            i = -2;

        if (i == -2) {
            console.log(`wrong input: ${data.lobbyID}`);
            socket.emit("create_lobby", {
                message: "Wrong input.",
                status: 0,
                lobbyID: data.lobbyID,
                username: data.username
            });
        } else if (i == -1) {
            const lobby = new Lobby(data.lobbyID);
            lobby.addPlayer(new Player(data.username, socket.id));
            this.lobbys.push(lobby);

            console.log(`lobby created: ${data.lobbyID}`);
            socket.join(data.lobbyID);
            socket.emit("create_lobby", {
                message: "Lobby created and joined.",
                status: 1,
                lobbyID: data.lobbyID,
                username: data.username
            });
        } else {
            console.log(`lobby already exists: ${this.lobbys[i].lobbyID}`);
            socket.emit("create_lobby", {
                message: "Lobby already exists.",
                status: 0,
                lobbyID: data.lobbyID,
                username: data.username
            });
        }
    }

    joinLobby(data, socket) {
        let i = -1;
        this.lobbys.forEach((currentValue, index) => {
            if (currentValue.lobbyID === data.lobbyID)
                i = index;
        });

        // not empty inputs
        if (data.lobbyID === "" || data.username === "")
            i = -2;

        if (i == -1) {
            console.log(`lobby doesnt exists: ${data.lobbyID}`);
            socket.emit("join_lobby", {
                message: "Lobby doesnt exists.",
                status: 0,
                lobbyID: data.lobbyID,
                username: data.username
            });
        } else {
            this.lobbys[i].addPlayer(new Player(data.username, socket.id));
            socket.join(data.lobbyID);
            console.log(`lobby joined: ${this.lobbys[i].lobbyID}`);
            socket.emit("join_lobby", {
                message: "Lobby joined.",
                status: 1,
                lobbyID: data.lobbyID,
                username: data.username
            });
        }
    }
}

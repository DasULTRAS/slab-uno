import Lobby from "./Lobby.js";
import Player from "./Player.js";

export default class LobbyManagement {
    constructor(socket) {
        this.socket = socket;
        this.lobbys = [];
    }

    /**
     * Searches the lobby-object with the same lobbyID
     * @param lobbyID
     * @returns {number} -1 if lobby not found else the index
     */
    getLobbyIndexByID(lobbyID) {
        let i = -1;
        this.lobbys.forEach((currentValue, index) => {
            if (currentValue.lobbyID === lobbyID)
                i = index;
        });
        return i;
    }

    getLobbyByID(lobbyID) {
        const i = this.getLobbyIndexByID(lobbyID);
        if (i === -1)
            return null;
        else
            return this.lobbys[i];
    }

    getLobbyBySocketID(socketID) {
        let temp = null;
        this.lobbys.forEach((lobby) => {
            lobby.players.forEach((player) => {
                if (player.socketID == socketID)
                    temp = lobby;
            });
        });

        return temp;
    }

    getPlayerBySocketID(socketID) {
        let temp = null;
        this.lobbys.forEach((lobby) => {
            lobby.players.forEach((player) => {
                if (player.socketID == socketID)
                    temp = player;
            });
        });

        return temp;
    }

    createLobby(data, socket) {
        // not empty inputs
        if (data.lobbyID === "" || data.username === "") {
            console.log(`wrong input: ${data.lobbyID}`);
            socket.emit("create_lobby", {
                message: "Wrong input.",
                status: 0,
                lobbyID: data.lobbyID,
                username: data.username
            });
        }

        let i = this.getLobbyIndexByID(data.lobbyID);

        if (i === -1) {
            this.lobbys.push(new Lobby(data.lobbyID));
            console.log(`lobby created: ${data.lobbyID}`);
            this.joinLobby(data, socket);
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
        // not empty inputs
        if (data.lobbyID === "" || data.username === "") {
            console.log(`wrong input: ${data.lobbyID}`);
            socket.emit("create_lobby", {
                message: "Wrong input.",
                status: 0,
                lobbyID: data.lobbyID,
                username: data.username
            });
        }

        let i = this.getLobbyIndexByID(data.lobbyID);

        if (i == -1) {
            console.log(`lobby doesnt exists: ${data.lobbyID}`);
            socket.emit("join_lobby", {
                message: "Lobby doesnt exists.",
                status: 0,
                lobbyID: data.lobbyID,
                username: data.username
            });
            return this.lobbys[i];
        } else {
            this.lobbys[i].addPlayer(new Player(data.username, socket.id, this.lobbys[i].lobbyID));
            socket.join(data.lobbyID);
            console.log(`lobby joined: ${this.lobbys[i].lobbyID}`);
            socket.emit("join_lobby", {
                message: "Lobby joined.",
                status: 1,
                username: data.username,
                lobby: this.lobbys[i]
            });
        }
        return null;
    }
}

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
        return this.lobbys.findIndex(lobby => lobby.lobbyID === lobbyID);
    }

    /**
     *
     * @param lobbyID
     * @returns {Lobby | null}
     */
    getLobbyByID(lobbyID) {
        const i = this.getLobbyIndexByID(lobbyID);
        if (i === -1) {
            return null;
        } else {
            return this.lobbys[i];
        }
    }

    /**
     * get the Lobby in which the Player with the SocketID is. If not found returns undefined.
     * @param socketID
     * @returns {Lobby | undefined}
     */
    getLobbyBySocketID(socketID) {
        return this.lobbys.find(lobby => lobby.players.some(player => player.socketID === socketID));
    }

    /**
     * Get Lobby of the Player with the Username
     * @param username {String}
     * @returns {Lobby | undefined}
     */
    getLobbyByUsername(username) {
        // Find the first lobby that contains a player with the given username
        return this.lobbys.find((lobby) => {
            // Check if the lobby has a player with the given username
            return lobby.players.some((player) => player.username === username);
        });
    }

    /**
     *
     * @param socketID
     * @returns {undefined | Player}
     */
    getPlayerBySocketID(socketID) {
        for (let lobby of this.lobbys) {
            let playerFind = lobby.players.find((player) => player.socketID == socketID);
            if (playerFind !== undefined) return playerFind;
        }
    }

    createLobby(data, socket) {
        // not empty inputs
        if (data.lobbyID === "" || data.username === "") {
            console.log(`wrong input: ${data.lobbyID}`);
            socket.emit("message", {message: "Wrong input."});
            return;
        }

        let i = this.getLobbyIndexByID(data.lobbyID);

        if (i === -1) {
            this.lobbys.push(new Lobby(data.lobbyID));
            console.log(`lobby created: ${data.lobbyID}`);
            socket.emit("message", {message: `lobby created: ${data.lobbyID}`})
            const lobby = this.joinLobby(data, socket);
            if (lobby === null) this.removeLobby(data.lobbyID);
        } else {
            console.log(`lobby already exists: ${this.lobbys[i].lobbyID}`);
            socket.emit("message", {message: `lobby already exists: ${this.lobbys[i].lobbyID}`});
        }
    }

    removeLobby(lobbyID) {
        console.log(`${lobbyID} closed.`);
        const i = this.getLobbyIndexByID(lobbyID)
        if (i === -1) return false;

        // move the element to the last index
        [this.lobbys[i], this.lobbys[this.lobbys.length - 1]] = [this.lobbys[this.lobbys.length - 1], this.lobbys[i]];
        // removes the last element
        this.lobbys.pop();
    }

    joinLobby(data, socket) {
        // not empty inputs
        if (data.lobbyID === "" || data.username === "") {
            console.log(`wrong input: ${data.lobbyID}`);
            return undefined;
        }

        let i = this.getLobbyIndexByID(data.lobbyID);

        if (i == -1) {
            console.log(`lobby doesnt exists: ${data.lobbyID}`);
            socket.emit("message", {message: "Lobby doesnt exists."});
        } else if (this.lobbys[i].deck !== null) {
            // Lobby is started
            socket.emit("message", {message: "Lobby is already started."});
        } else if (this.lobbys[i].players.length >= 8) {
            // Lobby is full max Players 8
            socket.emit("message", {message: "Lobby is full."});
        } else if (this.getLobbyByUsername(data.username) === undefined) {
            this.lobbys[i].addPlayer(new Player(data.username, socket.id, this.lobbys[i].lobbyID));
            socket.join(data.lobbyID);
            console.log(`lobby joined: ${this.lobbys[i].lobbyID}`);
            socket.emit("message", {message: "Lobby joined."});
            socket.emit("join_lobby", {
                status: 1, username: data.username, lobby: this.lobbys[i]
            });
            return this.lobbys[i];
        } else {
            socket.emit("message", {
                message: "Username is used."
            });
        }
        return undefined;
    }
}

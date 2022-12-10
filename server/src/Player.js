export default class Player {
    constructor(username, socketID, lobbyID) {
        this.username = username;
        this.socketID = socketID;
        this.readyToPlay = false;
        this.lobbyID = lobbyID;
    }
}

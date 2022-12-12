export default class Player {
    #playerDeck;

    constructor(username, socketID, lobbyID) {
        this.username = username;
        this.socketID = socketID;
        this.readyToPlay = false;
        this.lobbyID = lobbyID;
        this.playerDeckLength = 0;
        this.#playerDeck = null;
    }

    renewPlayerDeckLength() {
        if (this.#playerDeck == null)
            this.playerDeckLength = 0;
        else
            this.playerDeckLength = this.#playerDeck.length;
    }

    get playerDeck() {
        return this.#playerDeck;
    }

    set playerDeck(value) {
        this.#playerDeck = value;
    }
}

export default class Player {
    #deck;

    constructor(username, socketID, lobbyID) {
        this.username = username;
        this.socketID = socketID;
        this.readyToPlay = false;
        this.lobbyID = lobbyID;
        this.deckLength = 0;
        this.#deck = null;
    }

    renewDeckLength() {
        if (this.#deck == null)
            this.deckLength = 0;
        else
            this.deckLength = this.#deck.length;
    }

    get deck() {
        return this.#deck;
    }

    set deck(value) {
        this.#deck = value;
    }
}

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

    toString(){
        return `Player: ${this.username} in ${this.lobbyID} with SocketID ${this.socketID}`;
    }

    renewDeckLength() {
        if (this.#deck === null) {
            this.deckLength = 0;
        } else {
            this.deckLength = this.#deck.length;
        }
    }

    /**
     * Getter for deck
     * @returns {Deck}
     */
    get deck() {
        return this.#deck;
    }

    set deck(value) {
        this.#deck = value;
    }
}

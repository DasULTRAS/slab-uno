import Deck from "./Deck.js";

export default class Lobby {
    #deck;

    constructor(lobbyID) {
        this.lobbyID = lobbyID;
        this.players = [];
        this.#deck = null;
        this.playedCards = null;
    }

    dealCards() {
        if (this.playedCards !== null)
            return;

        // init decks
        this.playedCards = new Deck(false);
        this.players.forEach((player) => {
            // init
            player.deck = new Deck(false);
            // deal Cards
            for (let i = 0; i < 7; i++)
                player.deck.placeCard(this.#deck.drawCard());
        });
    }

    renewDeckLength() {
        this.players.forEach((player) => {
            player.renewDeckLength();
        });
    }

    addPlayer(player) {
        this.players.push(player);
    }

    /**
     * removes the Player out of the Array
     *
     * Error: Cards get lost
     *
     * @param socketID of the connection
     * @returns {boolean} true if it was removed
     */
    removePlayer(socketID) {
        let i = this.getPlayerIndexBySocketID(socketID);
        if (i === -1) return false;

        // move the element to the last index
        this.#swap(this.players, i, this.players.length - 1);
        // removes the last element
        this.players.pop();
    }

    /**
     * Searches the player-object with the same Username
     * @param username
     * @returns {number} -1 if username not found else the index
     */
    getPlayerIndexBySocketID(socketID) {
        let i = -1;
        this.players.forEach((player, index) => {
            if (player.socketID === socketID) i = index;
        });
        return i;
    }

    #swap(arr, i, j) {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }


    get deck() {
        return this.#deck;
    }

    set deck(value) {
        this.#deck = value;
    }
}
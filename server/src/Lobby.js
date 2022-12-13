import Deck from "./Deck.js";
import {Socket} from "socket.io";

export default class Lobby {
    #deck;
    #gameDirection;

    constructor(lobbyID) {
        this.lobbyID = lobbyID;
        this.players = [];
        // If 1 clockwise else if -1 counterclockwise
        this.#gameDirection = 1;
        // Index of the activePlayer
        this.activePlayerIndex = 0;
        this.#deck = null;
        this.playedCards = null;
    }

    dealCards() {
        if (this.playedCards !== null) return;

        // init decks
        this.playedCards = new Deck(false);
        this.players.forEach((player) => {
            // init
            player.deck = new Deck(false);
            // deal Cards
            for (let i = 0; i < 7; i++) player.deck.placeCard(this.#deck.drawCard());
        });

        // deal first card to Played Cards
        this.playedCards.placeCard(this.#deck.drawCard());
        while (Object.values(this.playedCards.Types).slice(10, 15).includes(this.playedCards.last.type)) this.playedCards.placeCard(this.#deck.drawCard());
    }

    /**
     * Put the player's card on the main deck if the move is allowed.
     * @param {Player} player who try to move the Card
     * @param card that will be placed
     * @param {Socket} socket
     * @returns {boolean} false if move is not allowed else true
     */
    playCard(player, card, socket) {
        // Find Card index
        let index = player.deck.getCardIndex(card);
        if (index == -1)
            // Card not found
            return false;


        /* Check if move is valid */
        if ((this.playedCards.last.color === this.playedCards.Colors.BLACK) || (card.color === this.playedCards.Colors.BLACK)) {
            /* WILD CARD RULES */
            if (card.type !== this.playedCards.Types.WILD && card.type !== this.playedCards.Types.WILD_DRAW_FOUR && card.color !== this.playedCards.last.declared_color) {
                // declared color is not equal played card
                console.log(this.playedCards.last);
                console.log(card);
                console.log("WRONG CARD: declared color is not equal played card");
                return false;
            }
        } else if (this.playedCards.last.color !== card.color && this.playedCards.last.type !== card.type) {
            // Colored Card have no matching attribute
            console.log(this.playedCards.last);
            console.log(card);
            console.log("WRONG CARD: Colored Card have no matching attribute");
            return false;
        }

        /* Check special Card effects */
        switch (card.type) {
            case this.playedCards.Types.SKIP:
                this.nextActivePlayerIndex();
                break;

            case this.playedCards.Types.REVERSE:
                this.changeGameDirection();
                break;

            case this.playedCards.Types.DRAW_TWO:
                for (let i = 0; i < 2; i++) this.players[this.activePlayerIndex].deck.placeCard(this.#deck.drawCard());
                break;

            case this.playedCards.Types.WILD_DRAW_FOUR:
                socket.emit("challenge_wild_draw_four_request");
                break;
        }

        // Move card from Player Cards to Played Cards
        this.playedCards.placeCard(player.deck.removeCardByIndex(index));
        return true;
    }

    renewPlayerDecksLength() {
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

    nextActivePlayerIndex() {
        this.activePlayerIndex = (this.activePlayerIndex + this.#gameDirection + this.players.length) % this.players.length;
        return this.activePlayerIndex;
    }

    get deck() {
        return this.#deck;
    }

    set deck(value) {
        this.#deck = value;
    }

    get gameDirection() {
        return this.#gameDirection;
    }

    changeGameDirection() {
        this.#gameDirection *= -1;
        return this.#gameDirection;
    }
}
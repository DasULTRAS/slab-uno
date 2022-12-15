import Deck from "./Deck.js";

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
            if (Object.hasOwn(card, 'declared_color'))
                player.deck.cards[index].declared_color = card.declared_color;
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

    /**
     * Renew the class Attribute playerDecksLength from every Player
     */
    renewPlayerDecksLength() {
        this.players.map((player) => {
            player.renewDeckLength();
        });
    }

    /**
     * Add one Player to the Lobby
     * @param player {}
     */
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
        [this.players[i], this.players[this.players.length - 1]] = [this.players[this.players.length - 1], this.players[i]];
        // removes the last element
        return this.players.pop();
    }

    /**
     * Searches the player-object with the same Username
     * @param socketID of the Player
     * @returns {number} The index of the first element in the array that passes the test. Otherwise, -1.
     */
    getPlayerIndexBySocketID(socketID) {
        return this.players.findIndex(player => player.socketID === socketID);
    }

    /**
     * Increases or decreases the aktivePlayerIndex dependent on the private class Attribute gameDirection
     * @returns {number}
     */
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

    /**
     * Changes the private Game Direction attribute to other site
     * @returns {number} 1 if clockwise game direction else -1 for counterclockwise
     */
    changeGameDirection() {
        this.#gameDirection *= -1;
        return this.#gameDirection;
    }
}
import Deck from "./Deck.js";

export default class Lobby {
    #deck;
    #gameDirection;

    constructor(lobbyID) {
        this.lobbyID = lobbyID;
        this.players = [];
        // List of the IDs of the Winner
        this.winners = [];
        // If 1 clockwise else if -1 counterclockwise
        this.#gameDirection = 1;
        // Index of the activePlayer
        this.activePlayerIndex = 0;
        this.gameFinished = false;
        // Index of the Player that needs to Press UNO to remove his index else he will get 2 Cards on next played Card
        this.needsToPressUnoIndex = -1;
        this.#deck = null;
        this.playedCards = null;
        this.messages = [];
        this.gameSettings = [];
        this.gameSettings.push(new Settings("wild_on_wild", "Wild on Wild", "Is it allow to place a black/wild Card on another black/wild Card?", true));
        this.gameSettings.push(new Settings("challenge_wild_draw_four", "Challenge Wild Draw Four Card (not implemented)", "If a Wild Draw Four card is laid, it can be challenged. This checks whether the card was the only option. If it was the only possibility, the challenger must draw 6 cards, otherwise the dealer of the Wild Draw Four must draw 4.", false));
        this.gameSettings.push(new Settings("play_alone", "Play alone", "You can start the Game alone.", false));
        this.gameSettings.push(new Settings("infinity_draw", "Infinity draw", "You can draw infinite cards when it is not your turn and you have to draw until it is your turn.", false));
    }

    dealCards() {
        if (this.playedCards !== null || this.gameFinished) return;

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
        // Player is not active Player
        if (this.players[this.activePlayerIndex].socketID !== socket.id) {
            socket.emit("message", {message: "Wait for your turn."});
            return false;
        }
        if (this.gameFinished) return false;

        // Find Card index
        let index = player.deck.getCardIndex(card);
        if (index === -1)
            // Card not found
            return false;

        // Save declared Color if is WildCard
        if (Object.hasOwn(card, 'declared_color')) player.deck.cards[index].declared_color = card.declared_color;

        if (!this.checkMove(player.deck.cards[index], this.playedCards.last)) return false;

        /* Check for UNO Last Card */
        if (this.needsToPressUnoIndex >= 0 && this.needsToPressUnoIndex < this.players.length)
            // if index is set Player gets 2 Cards for not pressing UNO
            for (let i = 0; i < 2; i++) this.players[this.needsToPressUnoIndex].deck.placeCard(this.#deck.drawCard());
        this.needsToPressUnoIndex = -1;

        /* Check special Card effects */
        switch (card.type) {
            case this.playedCards.Types.SKIP:
                this.nextPlayer();
                break;

            case this.playedCards.Types.REVERSE:
                // RULE: if two players left skip reverse skips the next player
                if (this.activePlayersCount === 2) this.nextPlayer();

                this.changeGameDirection();
                break;

            case this.playedCards.Types.DRAW_TWO:
                for (let i = 0; i < 2; i++) this.players[this.nextActivePlayerIndex].deck.placeCard(this.#deck.drawCard());
                break;

            case this.playedCards.Types.WILD_DRAW_FOUR:
                socket.emit("challenge_wild_draw_four_request");
                for (let i = 0; i < 4; i++) this.players[this.nextActivePlayerIndex].deck.placeCard(this.#deck.drawCard());
                // TODO: Implement the Challenging of WILD DRAW FOUR CARDS
                break;
        }

        // Move card from Player Cards to Played Cards
        this.playedCards.placeCard(player.deck.removeCardByIndex(index));

        if (player.deck.length === 1) {
            // check if it was the penalty card (than the Player needs to press UNO
            this.needsToPressUnoIndex = this.getPlayerIndexBySocketID(player.socketID);
        } else if (player.deck.length === 0) {
            // Check if it was last Card
            this.addWinner(player.username);
            socket.emit("message", {message: `${player.socketID} finished the Game.`});
        }
        this.nextPlayer();
        return true;
    }

    /**
     * Test if player can Play any Card
     * @param player{Player}
     * @returns {boolean} true if player can place any Card else false
     */
    canPlaceAnyCard(player) {
        return this.getPlaceableCardIndex(player) !== -1;
    }

    /**
     * get the index of the first playable Card
     * @param player {Player}
     * @returns {number} first index of an Playable Card else -1 if no Card is Playable
     */
    getPlaceableCardIndex(player) {
        return player.deck.cards.findIndex(card => this.checkMove(card, this.playedCards.last));
    }

    /**
     * Check if a Card Place from playedCard on cardOnTop is valid
     * @param playedCard {Card | WildCard}
     * @param cardOnTop {Card | WildCard}
     * @returns {boolean} true if is valid else false
     */
    checkMove(playedCard, cardOnTop) {
        if ((cardOnTop.color === this.playedCards.Colors.BLACK) || (playedCard.color === this.playedCards.Colors.BLACK)) {
            /* WILD CARD RULES */
            if (playedCard.type !== this.playedCards.Types.WILD && playedCard.type !== this.playedCards.Types.WILD_DRAW_FOUR && playedCard.color !== cardOnTop.declared_color) {
                // declared color is not equal played card
                console.log(cardOnTop);
                console.log(playedCard);
                console.log("WRONG CARD: declared color is not equal played card");
                return false;
            } else if (cardOnTop.color === playedCard.color) {
                // Wild on Wild
                if (!this.getSettingByTitle("wild_on_wild").enabled) {
                    console.log("WRONG CARD: Wild on Wild");
                    return false;
                }
            }
        } else if (cardOnTop.color !== playedCard.color && cardOnTop.type !== playedCard.type) {
            // Colored Card have no matching attribute
            console.log(cardOnTop);
            console.log(playedCard);
            console.log("WRONG CARD: Colored Card have no matching attribute");
            return false;
        }
        return true;
    }

    /**
     * Add a finished Player to the Winner by PlayerIndex
     * @param userIndex
     */
    addWinner(username) {
        if (this.winners.findIndex(winner => winner === username) === -1) {
            this.winners.push(username);
            if (this.winners.length >= this.players.length - 1) {
                this.gameFinished = true;
            }
        } else console.error("Winner " + username + " allready exists.");
    }

    /**
     * Adds a new Message to Messages of Array
     * @param username {String}
     * @param message {String}
     * @param timestamp {number}
     * @returns {*}
     */
    addNewMessage(username, message, timestamp = Date.now()) {
        if (message !== undefined && message !== null && message !== '') this.messages.push(new Message(username, message, timestamp));
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
     * @param player {Player}
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
    nextPlayer() {
        this.activePlayerIndex = this.nextActivePlayerIndex;
        return this.activePlayerIndex;
    }

    /**
     * Getter for the next Active Player index in Player Array
     * @returns {number} of the next Active Player in Array
     */
    get nextActivePlayerIndex() {
        let oldActivePlayerIndex = this.activePlayerIndex;

        do {
            oldActivePlayerIndex = (oldActivePlayerIndex + this.#gameDirection + this.players.length) % this.players.length
        } while (this.players[oldActivePlayerIndex].deck.length === 0 && this.activePlayerIndex !== oldActivePlayerIndex);

        return oldActivePlayerIndex;
    }

    get deck() {
        return this.#deck;
    }

    /**
     * Get the Count of the Players that have not finished the current Game
     * @returns {number} count of active Players in current game
     */
    get activePlayersCount() {
        let count = 0;
        this.players.map((player) => {
            if (player.deck.length > 0) count++;
        })
        return count;
    }

    set deck(value) {
        this.#deck = value;
    }

    /**
     * Changes the private Game Direction attribute to other site
     * @returns {number} 1 if clockwise game direction else -1 for counterclockwise
     */
    changeGameDirection() {
        this.#gameDirection *= -1;
        return this.#gameDirection;
    }

    renewAllPlayers(io) {
        this.renewPlayerDecksLength();

        this.players.map((player) => {
            io.to(player.socketID).emit("get_card", {player_deck: player.deck});
            io.to(player.socketID).emit("renew_lobby", {lobby: this});
        });
    }

    /**
     * Return the setting where title is equal
     * @param title {String}
     * @returns {Settings}
     */
    getSettingByTitle(title) {
        const index = this.gameSettings.findIndex(setting => setting.title === title);
        if (index === -1) {
            return undefined;
        } else {
            return this.gameSettings[index];
        }
    }
}

class Message {
    constructor(username, message, timestamp) {
        this.username = username;
        this.message = message;
        this.timestamp = timestamp;
    }
}

class Settings {
    constructor(title, name, description, enabled) {
        this.title = title;
        this.name = name;
        this.description = description;
        this.enabled = enabled;
    }
}
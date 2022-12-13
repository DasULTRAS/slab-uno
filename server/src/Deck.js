import Card from "./Card.js";

export default class Deck {
    Colors = Object.freeze({
        RED: "red", YELLOW: "yellow", GREEN: "green", BLUE: "blue", BLACK: "black"
    });
    Types = Object.freeze({
        ZERO: 0,
        ONE: 1,
        TWO: 2,
        THREE: 3,
        FOUR: 4,
        FIVE: 5,
        SIX: 6,
        SEVEN: 7,
        EIGHT: 8,
        NINE: 9,
        SKIP: "skip",
        REVERSE: "reverse",
        DRAW_TWO: "draw_two",
        WILD: "wild",
        WILD_DRAW_FOUR: "wild_draw_four"
    });

    #isMainDeck;

    constructor(isMainDeck) {
        this.#isMainDeck = isMainDeck;
        this.cards = [];

        if (isMainDeck) {
            this.#initDeck();
            this.#mixDeck();
        }
    }

    #initDeck() {
        // init normal and special cards
        for (let i = 0; i < 8; i++) for (let j = 0; j < 13; j++) {
            if (!(i >= 4 && j == 0)) this.cards.push(new Card(Object.values(this.Colors)[i % 4], Object.values(this.Types)[j]));
        }

        // init WILD Cards
        for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) {
            this.cards.push(new Card(Object.values(this.Colors)[4], Object.values(this.Types)[j + 13]))
        }
    }

    #mixDeck() {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < this.cards.length; j++) {
                this.#swap(j, Math.trunc(Math.random() * this.cards.length), this.cards);
            }
        }
    }

    removeCardByIndex(index) {
        if (this.cards.length <= 0 && this.cards.length <= index)
            return null;
        this.#swap(index, this.cards.length - 1, this.cards);
        return this.cards.pop();
    }

    #swap(i, j, arr) {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    getCardIndex(card) {
        let i = -1;
        this.cards.forEach((playerCard, index) => {
            if (playerCard.equals(card))
                i = index;
        });
        return i;
    }

    /**
     * Gives all unused cards for the live game
     * @returns {Card[]}
     */
    getUnusedCards() {
        // How many indexes are special cards and must stay for streaks
        let i = 1;
        while (i < this.cards.length && Object.values(this.Types).slice(10, 15).includes(this.cards[this.cards.length - 1 - i].type)) {
            i++;
        }
        // Store the removed array in temp constant
        const unusedCards = this.cards.slice(0, this.cards.length - i);
        // Remove the removed cards from the array
        this.cards = this.cards.splice(this.cards.length - i, i);
        // return the removed array
        return unusedCards;
    }

    /**
     * Adds a Array of Cards to the cards and shuffle the deck
     * @param unusedCards {Card[]}
     */
    addCards(unusedCards) {
        this.cards.push(unusedCards);
        this.#mixDeck();
    }

    drawCard() {
        if (this.cards.length === 0 && this.#isMainDeck) {
            this.#initDeck();
            this.#mixDeck();
            console.log("NEW Cards.");
        }
        return this.cards.pop();
    }

    placeCard(newCard) {
        this.cards.push(newCard);
    }

    get length() {
        return this.cards.length;
    }

    get last() {
        if (this.cards.length == 0)
            return null;
        return this.cards[this.cards.length - 1];
    }
}
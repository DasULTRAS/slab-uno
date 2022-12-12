import Card from "./Card.js";

export default class Deck {
    Colors = Object.freeze({
        RED: "red", YELLOW: "yellow", GREEN: "green", BLUE: "blue", BLACK: "black"
    });
    Type = Object.freeze({
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
            if (!(i >= 4 && j == 0)) this.cards.push(new Card(Object.values(this.Colors)[i % 4], Object.values(this.Type)[j]));
        }

        // init WILD Cards
        for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) {
            this.cards.push(new Card(Object.values(this.Colors)[4], Object.values(this.Type)[j + 13]))
        }
    }

    #mixDeck() {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < this.cards.length; j++) {
                this.#swap(j, Math.trunc(Math.random() * this.cards.length), this.cards);
            }
        }
    }

    #swap(i, j, arr) {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
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

    get last(){
        return this.cards.get(this.cards.length-1);
    }
}
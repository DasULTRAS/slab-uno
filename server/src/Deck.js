import Card from "./Card.js";

export default class Deck {
    #colors;
    #specialcard;

    constructor(numberOfDecks) {
        this.cards = [];
        this.#colors = ["red", "yellow", "green", "blue"];
        this.#specialcard = ["skip", "reverse", "draw_two", "wild", "wild_draw_four"];

        for (let i = 0; i < numberOfDecks; i++) this.#initDeck();

        this.#mixDeck();
    }

    #initDeck() {
        // init number cards
        for (let i = 0; i < 8; i++) for (let j = 0; j < 10; j++) {
            if (!(i < 4 && j == 0)) this.cards.push(new Card(this.#colors[i % 4], j));
        }

        // init special cards
        for (let i = 0; i < 8; i++) for (let j = 0; j < 4; j++) {
            if (i >= 4 && j == 3) j++;
            this.cards.push(new Card(this.#colors[i % 4], this.#specialcard[j]));
        }
    }

    #mixDeck() {
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < this.cards.length; j++) {
                this.#swap(j, parseInt(Math.random() * this.cards.length), this.cards);
            }
        }
    }

    #swap(i, j, arr) {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}
export default class Deck {
    #Colors = Object.freeze({
        RED: "red",
        YELLOW: "yellow",
        GREEN: "green",
        BLUE: "blue"
    });
    #SpecialCard = Object.freeze({
        SKIP: "skip",
        REVERSE: "reverse",
        DRAW_TWO: "draw_two",
        WILD: "wild",
        WILD_DRAW_FOUR: "wild_draw_four"
    });

    // Card in Composition to Deck
    #Card = class Card {
        constructor(color, type) {
            this.color = color;
            this.type = type;
        }
    }
    #mainDeck;

    constructor(mainDeck) {
        this.#mainDeck = mainDeck;
        this.cards = [];

        if (mainDeck) {
            this.#initDeck();
            this.#mixDeck();
        }
    }

    #initDeck() {
        // init number cards
        for (let i = 0; i < 8; i++) for (let j = 0; j < 10; j++) {
            if (!(i < 4 && j == 0)) this.cards.push(new this.#Card(Object.values(this.#Colors)[i % 4], j));
        }

        // init special cards
        for (let i = 0; i < 8; i++) for (let j = 0; j < 4; j++) {
            if (i >= 4 && j == 3) j++;
            this.cards.push(new this.#Card(Object.values(this.#Colors)[i % 4], Object.values(this.#SpecialCard)[j]));
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
        if (this.cards.length === 0 && this.#mainDeck) {
            this.#initDeck();
            this.#mixDeck();
            console.log("NEW Cards.");
        }
        return this.cards.pop();
    }
    placeCard(newCard){
        this.cards.push(newCard);
    }

    get length(){
        return this.cards.length;
    }
}
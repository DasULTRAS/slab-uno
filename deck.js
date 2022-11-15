class Deck {
    constructor(img) {
        this.cardArray = new Array(4 * 13);

        // color: red=0, yellow=1, green=2, blue=3
        let tmp = 0;
        for (let i = 0; i < 4; i++)
            for (let j = 0; j < 13; j++) {
                if (tmp >= this.cardArray.length)
                    console.error("Card Array out of bound.");
                this.cardArray[tmp] = new Card(img, j, i);
                tmp++;
            }
    }

    /**
     * Shuffle the deck with the "fisher-Yatee algorith"
     */
    shuffel() {
        //Fisher-Yates algorith
        for (let i = this.cardArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = this.cardArray[i];
            this.cardArray[i] = this.cardArray[j];
            this.cardArray[j] = temp;
        }
    }

    /**
     * Get a card and delete it from the deck.
     * @returns {Card} a card.
     */
    getFirstCard() {
        if (this.cardArray) {
            let card = this.cardArray[0];
            this.cardArray.splice(0, 1);
            return card;
        }
    }
}
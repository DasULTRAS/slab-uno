class Deck{
    constructor(img){
        this.cardArray = [
            //all red cards
            new Card(img, 0, 0),
            new Card(img, 1, 0),
            new Card(img, 2, 0),
            new Card(img, 3, 0),
            new Card(img, 4, 0),
            new Card(img, 5, 0),
            new Card(img, 6, 0),
            new Card(img, 7, 0),
            new Card(img, 8, 0),
            new Card(img, 9, 0),
            new Card(img, 10, 0),
            new Card(img, 11, 0),
            new Card(img, 12, 0),
            //all yellow cards
            new Card(img, 0, 1),
            new Card(img, 1, 1),
            new Card(img, 2, 1),
            new Card(img, 3, 1),
            new Card(img, 4, 1),
            new Card(img, 5, 1),
            new Card(img, 6, 1),
            new Card(img, 7, 1),
            new Card(img, 8, 1),
            new Card(img, 9, 1),
            new Card(img, 10, 1),
            new Card(img, 11, 1),
            new Card(img, 12, 1),
            //all green cards
            new Card(img, 0, 2),
            new Card(img, 1, 2),
            new Card(img, 2, 2),
            new Card(img, 3, 2),
            new Card(img, 4, 2),
            new Card(img, 5, 2),
            new Card(img, 6, 2),
            new Card(img, 7, 2),
            new Card(img, 8, 2),
            new Card(img, 9, 2),
            new Card(img, 10, 2),
            new Card(img, 11, 2),
            new Card(img, 12, 2),
            //all blue cards
            new Card(img, 0, 3),
            new Card(img, 1, 3),
            new Card(img, 2, 3),
            new Card(img, 3, 3),
            new Card(img, 4, 3),
            new Card(img, 5, 3),
            new Card(img, 6, 3),
            new Card(img, 7, 3),
            new Card(img, 8, 3),
            new Card(img, 9, 3),
            new Card(img, 10, 3),
            new Card(img, 11, 3),
            new Card(img, 12, 3),
        ];
    }

    /**
     * Shuffel the deck with the "fisher-Yatee algorith"
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
    getFirstCard(){
        if (this.cardArray) {
            let card = this.cardArray[0];
            this.cardArray.splice(0, 1);
            return card;
        }
    }
}
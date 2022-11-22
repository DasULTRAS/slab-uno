class Deck {
    cardArray;
    img;
    x;
    y;
    cardWidth;
    cardHeight;

    /**
     * A Deck is an array of cards which you can get a new card
     * @param {IMAGE} img Asset of cards
     */
    constructor(img) {
        this.cardArray = new Array(4 * 13);
        this.img = img;
        this.x = 0;
        this.y = 0;
        this.cardWidth = this.img.width / 14;
        this.cardHeight = this.img.height / 8;

        // color: red=0, yellow=1, green=2, blue=3
        let tmp = 0;
        for (let i = 0; i < 4; i++)
            for (let j = 0; j < 13; j++) {
                if (tmp >= this.cardArray.length)
                    console.error("Card Array out of bound.");
                this.cardArray[tmp] = new Card(img, j, i, this.cardWidth, this.cardHeight, '');
                tmp++;
            }
    }

    /**
     * Shuffle the deck with the "fisher-Yatee algorith"
     */
    shuffle() {
        //Fisher-Yates algorith
        for (let i = this.cardArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = this.cardArray[i];
            this.cardArray[i] = this.cardArray[j];
            this.cardArray[j] = temp;
        }
    }

    /**
     * Display the deck as a Card.
     * @param {number} x The x display coordinate
     * @param {number} y The y display coordinate
     */
    display(x, y) {
        this.x = x;
        this.y = y;
        for (let i = 0; i < this.cardArray.length; i++)
            this.cardArray[i].display(this.x + (this.cardWidth / 3 * i), this.y);
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

    /**
     * Execute if the mouse is over the deck.
     * Put the first card in your hand and deletes it in the deck.
     * @param {Hand} hand
     */
    onClick(hand) {
        if ((mouseX > this.x) && (mouseX < this.x + this.card.cardWidth) &&
            (mouseY > this.y) && (mouseY < this.y + this.card.cardHeight)) {
            hand.addCard(this.getFirstCard());
        }
    }
}

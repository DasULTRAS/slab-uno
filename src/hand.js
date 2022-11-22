class Hand {
    constructor() {
        this.cards = [];
        this.x = 0;
        this.width = 0;
    }

    /**
     * Displays you all cards in your hand
     * @param {Number} x The x coordinates
     * @param {Number} y The y coordinates
     */
    display(x, y) {
        this.x = x;
        this.y = y;
        this.cards.forEach((card, i) => card.display(x + 80 * i, y))
    }

    addCard(card) {
        this.cards.push(card);
        if (this.cards.length === 1) {
            this.width += card.cardWidth;
        } else {
            this.width += 80;
        }
    }

    hoverEffect() {
        if ((mouseX > this.x) && (mouseX < this.x + this.width) &&
            (mouseY > this.y)) {
            let cardIndex = Math.ceil((mouseX - this.x) / 80) - 1;
            if (cardIndex > this.cards.length - 1) {
                cardIndex = this.cards.length - 1;
            }
            let card = this.cards[cardIndex];
            card.display(card.x, card.y - 35);
        }
    }
}
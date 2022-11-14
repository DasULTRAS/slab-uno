class Hand {
    constructor() {
        this.cards = [];
    }

    /**
     * Displays you all cards in your hand
     * @param {Number} x The x coordinates
     * @param {Number} y The y coordinates
     */
    display(x, y){
        this.cards.forEach((card, i) => card.display(x + 80 * i, y))
    }
}
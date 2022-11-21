class Card {

    img;
    number;
    color;
    width;
    height;
    name;

    /**
     * Create a card with a asset.
     * @param {*} img The source image
     * @param {Number} number The card Number as int (0-9)  the three colored special cards are included
     * @param {Number} color The card color as int (0-3)
     * @param {Number} width
     * @param {Number} height
     */
    constructor(img, number, color, cardWidth, cardHeight, name) {
        this.img = img;
        this.number = number;
        this.color = color;
        this.width = cardWidth;
        this.height = cardHeight;
        this.name = name;
    }

    /**
     * Display a card
     * @param {Number} x The x coordinates
     * @param {Number} y The y coordinates
     */
    display(x, y) {
        //image(source, x, y, width, height, cutting-x, cutting-y, cutting-width, cutting-height)
        this.x = x;
        this.y = y;
        image(this.img, x, y,
<<<<<<< HEAD:src/card.js
            this.width, this.height,
            this.width * this.number, this.height * this.color,
            this.width, this.height);
=======
            this.cardWidth, this.cardHeight,
            this.cardWidth*this.number, this.cardHeight*this.color,
            this.cardWidth, this.cardHeight);
>>>>>>> 7ce4b5624338b28746043c347c3ae560cf25fb86:card.js
    }
}
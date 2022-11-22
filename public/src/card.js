class Card {
    img;
    number;
    color;
    width;
    height;
    name;
    /**
     * Create a card with a asset.
     * @param {IMAGE} img
     * @param {Number} number
     * @param {Number} color
     * @param {Number} cardWidth
     * @param {Number} cardHeight
     * @param {String} name
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
        image(this.img, x, y, this.width, this.height, this.width * this.number, this.height * this.color, this.width, this.height);
    }
}
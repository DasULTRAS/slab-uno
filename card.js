class Card {
    /**
     * Create a card with a asset.
     * @param {*} img The source image
     * @param {Number} number The card Number as int (0-9)  the three colored special cards are included
     * @param {Number} color The card color as int (0-3)
     * @param {Number} width
     * @param {Number} height
     */
    constructor(img, number, color, cardWidth, cardHeight){
        this.img = img;
        this.number = number;
        this.color = color;
        this.width = cardWidth;
        this.height = cardHeight;
    }

    /**
     * Display a card
     * @param {Number} x The x coordinates
     * @param {Number} y The y coordinates
     */
    display(x, y){
        //image(source, x, y, width, height, cutting-x, cutting-y, cutting-width, cutting-height)

        image(this.img, x, y,
            this.width, this.height,
            this.width*this.number, this.height*this.color,
            this.width, this.height);
    }
}
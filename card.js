class Card {
    /**
     * Create a card with a asset.
     * @param {*} img The source image
     * @param {Number} number The card Number as int (0-12) the three colored special cards are included
     * @param {Number} color The card color as int (0-3)
     * @param {Number} width
     * @param {Number} height
     */
    constructor(img, number, color){
        this.x = 0;
        this.y = 0;
        this.img = img;
        this.number = number;
        this.color = color;
        this.cardWidth = this.img.width/14;
        this.cardHeight = this.img.height/8;
    }

    /**
     * Display a card
     * @param {Number} x The x coordinates
     * @param {Number} y The y coordinates
     */
    display(x, y){
        //image(source, x, y, width, height, cutting-x, cutting-y, cutting-width, cutting-height)
        this.x = x;
        this.y = y;
        image(this.img, x, y,
            this.cardWidth, this.cardHeight,
            this.cardWidth*this.number, this.cardHeight*this.color,
            this.cardWidth, this.cardHeight);
    }
}
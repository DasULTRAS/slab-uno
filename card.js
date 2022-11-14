class Card {
    /**
     * Create a card with a asset.
     * @param {*} img The source image
     * @param {Number} cNum The card Number as int (0-12) the three colored special cards are included
     * @param {Number} color The card color as int (0-3)
     */
    constructor(img, cNum, color){
        this.img = img;
        this.cNum = cNum;
        this.color = color;
        this.sCardWidth = 241.5;
        this.sCardHeight = 361.5;
    }

    /**
     * Display a card
     * @param {Number} x The x coordinates
     * @param {Number} y The y coordinates
     */
    display(x, y){
        //image(source, x, y, width, height, cutting-x, cutting-y, cutting-width, cutting-height)
        
        image(this.img, x, y, 
            this.sCardWidth, this.sCardHeight, 
            this.sCardWidth*this.cNum, this.sCardHeight*this.color, 
            this.sCardWidth, this.sCardHeight);
    }
}
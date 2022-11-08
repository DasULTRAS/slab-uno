class Card {
    constructor(img){
        this.img = img;
    }

    display(x, y){
        image(this.img, x, y);
    }
}
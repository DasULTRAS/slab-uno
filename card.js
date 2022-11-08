class Card {
    constructor(img){
        this.img = img;
    }

    display(x, y, width, height, color){
        fill(color);
        rect(x, y, width, height, 30);
        image(this.img, x, y, width, height);
    }
}
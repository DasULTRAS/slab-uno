export default class Card {
    constructor(color, type) {
        this.color = color;
        this.type = type;
    }

    equals(card) {
        if (this.color === card.color && this.type === card.type)
            return true;
        return false;
    }
}
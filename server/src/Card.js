export default class Card {
    constructor(color, type) {
        this.color = color;
        this.type = type;
    }

    toString(){
        return `Card: ${this.color}, ${this.type}`;
    }

    equals(card) {
        return this.color === card.color && this.type === card.type;
    }
}

export class WildCard extends Card {
    constructor(color, type) {
        super(color, type);
        this.declared_color = null;
    }
}

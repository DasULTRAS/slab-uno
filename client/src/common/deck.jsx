import React from "react";
import "./deck.css";
import Card from "./card";

export default function Deck({cards, cardSize}) {
    const deckLength = cards.length;
    const deg = deckLength > 1 ? -deckLength * 15 : 0;
    let degs = deg / 2;

    function fanStyle(num) {
        if (num > 0) {
            degs -= deg / (deckLength - 1);
        }
        return {
            'zIndex' : num,
            transform: `translateX(${3.2 * num}em) 
            rotate(${degs}deg)` 
        }
    }

    return(
        <div className="deck">
        {cards.map((card, index) => {
            return (<Card 
                color={card.color} 
                cardType={card.cardType} 
                cardWidth={cardSize}
                enableHover={true}
                style={fanStyle(index)}/>)
            })}
        </div>
    );
}
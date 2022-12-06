import React from "react";
import Card from "./cards";
import "./deck.css"

export default function Deck({cards, cardSize}) {
    return(
        <div className="deck">
        {cards.map(card => {
            return (<Card 
                color={card.color} 
                cardType={card.cardType} 
                cardWidth={cardSize}
                enableHover={true}/>)
            })}
        </div>
    );
}
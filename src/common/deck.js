import React from "react";
import Card from "./cards";

export default function Deck({cards, cardSize}) {
    return(
        <div>
        {cards.map(card => {
            return (<Card color={card.color} cardType={card.cardType} cardWith={cardSize}/>)
            })}
        </div>
    );
}
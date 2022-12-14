import React from "react";
import { specialCard, getColorId, cardMap } from "./cards";

export default function Card({
    color = 'red',
    cardType = 'back', 
    cardWidth, 
    clickEvent = () => {}, 
    enableHover = false,
    style = {}
}) {
    const isSpecialCard = specialCard.includes(cardType);

    return(
        <img
            className="card"
            src={cardMap.get(cardType)[isSpecialCard ? 0 : getColorId(color)]}
            alt={isSpecialCard ? cardType : color + " " + cardType} 
            style={{width: cardWidth, ...style}}
            onClick={(event) => clickEvent(event, color, cardType)}/>
    );
}
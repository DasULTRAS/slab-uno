import React from "react";
import { specialCard, getColorId, cardMap } from "./cards";
import "./card.css";

export default function Card({
    color = 'red',
    cardType = 'back', 
    cardWidth, 
    clickEvent, 
    enableHover = false,
    style = {}
}) {
    const isHover = enableHover ? "cardHover" : "";
    const isSpecialCard = specialCard.includes(cardType);

    return(
        <div style={{width: cardWidth, ...style}} onClick={clickEvent}>
            <img 
                className={isHover}
                src={cardMap.get(cardType)[isSpecialCard ? 0 : getColorId(color)]}
                alt={isSpecialCard ? cardType : color + " " + cardType} 
                style={{width: "100%", height: "100%"}}/>
        </div>
    );
}
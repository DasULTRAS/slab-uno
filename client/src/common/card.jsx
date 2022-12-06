import React from "react";
import { specialCard, getColorId, cardMap } from "./cards";
import "./card.css";

export default function Card({
    color = 'red',
    cardType = 'back', 
    cardWidth, 
    clickEvent, 
    enableHover = false
}) {
    const isHover = enableHover ? "cardHover" : "";
    const isSpecialCard = specialCard.includes(cardType);

    return(
        <div className={isHover} style={{width: cardWidth}} onClick={clickEvent}>
            <img 
                src={cardMap.get(cardType)[isSpecialCard ? 0 : getColorId(color)]}
                alt={isSpecialCard ? cardType : color + " " + cardType} 
                style={{width: "100%", height: "100%"}}/>
        </div>
    );
}
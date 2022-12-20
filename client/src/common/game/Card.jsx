import React from "react";
import { specialCard, getColorId, cardMap } from "./cards";
import "./Card.css";

export default function Card({
    color = 'red',
    cardType = 'back', 
    cardWidth, 
    clickEvent = () => {}, 
    enableHover = false,
    style = {},
    disable = true,
    index
}) {
    let className = 'card';
    if(enableHover){
        className += ' card-hover';
        
    }
    const isSpecialCard = specialCard.includes(cardType);

    

    return(
        <img
            className={className}
            src={cardMap.get(cardType)[isSpecialCard ? 0 : getColorId(color)]}
            alt={isSpecialCard ? cardType : color + " " + cardType} 
            style={{width: cardWidth, ...style}}
            onClick={(event) => clickEvent(event, color, cardType, index)}/>
    );
}
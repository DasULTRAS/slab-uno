import React from "react";
import { specialCard, getColorId, cardMap } from "./cards";
import "./card.css";

export default function Card({
    color = 'red',
    cardType = 'back', 
    cardWidth, 
    clickEvent, 
    enableHover = false,
    style = {},
    disable = false
}) {
    const isHover = enableHover && !disable ? "cardHover" : "";
    const isSpecialCard = specialCard.includes(cardType);

    return(
        <div style={{width: cardWidth, ...style}} onClick={(event) => clickEvent(event, color, cardType)}>
            <img 
                className={isHover}
                src={cardMap.get(cardType)[isSpecialCard ? 0 : getColorId(color)]}
                alt={isSpecialCard ? cardType : color + " " + cardType} 
                style={disable ? {width: "100%", height: "100%", ...disableStyle} : {width: "100%", height: "100%"}}/>
        </div>
    );
}

const disableStyle = {
    filter: 'brightness(35%)'
};
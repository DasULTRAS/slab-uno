import React from "react";
import "./Deck.css";
import Card from "./Card";
import { degreesToRadians, getRotatedDimensions, radiansToDegrees } from "../utils/mathFunctions";

function calculateCoords (cardsLength, circleRadius, cardWidth, cardHeight, cardSpacing) {
    let anglePerCard = radiansToDegrees(Math.atan((cardWidth * cardSpacing) / circleRadius));
    let startAngle = 270 - 0.5 * anglePerCard * (cardsLength - 1);

    let x = 0;
    let y = 0;

    let coords = [];

    for(let i = 0; i < cardsLength; i++){
        let degress = startAngle + anglePerCard * i;

        let radians = degreesToRadians(degress);
        x = cardWidth / 2 + Math.cos(radians) * circleRadius; 
        y = cardHeight / 2 + Math.sin(radians) * circleRadius; 

        coords.push({ x: x, y: y, angle: degress + 90 });
    }

    let offsetX = -x + ((getRotatedDimensions(coords[0].angle, cardWidth, cardHeight)[0] - cardWidth) / 2);
    let offsetY = -y;

    coords.forEach(coord => {
        coord.x += offsetX;
        coord.x = Math.round(coord.x);

        coord.y += offsetY;
        coord.y = Math.round(coord.y);
    });

    return coords;
}

function coordsToStyleSheet(i, x, y, angle) {
    return {
        'zIndex' : i,
        transform: `rotate(${angle}deg)`,
        top: `${y}px`,
        left: `${x}px`
    };
}

export default function Deck({cards, cardSize, placeCard}) {
    if(cards.length === 0) {
        return;
    }

    let coords = calculateCoords(cards.length, 800, 160, 236, .2);

    return(
        <div className="deck">
        {cards.map((card, index) => {
            let coord = coords[index]
            return (<Card 
                color={card.color}
                key={index}
                index={index}
                cardType={card.type} 
                cardWidth={cardSize}
                enableHover={true}
                style={coordsToStyleSheet(index, coord.x, coord.y, coord.angle)}
                clickEvent={placeCard}/>)
            })}
        </div>
    );
}
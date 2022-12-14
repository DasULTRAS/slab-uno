import React from "react";
import "./deck.css";
import Card from "./card";
import { specialCard } from "./cards";
import { degreesToRadians, getRotatedDimensions, radiansToDegress } from "./mathFunctions";

function disableCard(card, playCard){
    if(card.color === playCard.color){
        return false;
    }
    if(card.type === playCard.type){
        return false;
    }
    if(specialCard.includes(card.type)){
        return false;
    }
    return true;
}

function calculateCoords (cardsLength, circleRadius, cardWidth, cardHeight, cardSpacing) {
    let anglePerCard = radiansToDegress(Math.atan((cardWidth * cardSpacing) / circleRadius));
    let startAngle = 270 - 0.5 * anglePerCard * (cardsLength - 1);

    let x = 0;
    let y = 0;

    let coords = [];

    for(let i = 0; i < cardsLength; i++){
        let degress = startAngle + anglePerCard * i;

        let radians = degreesToRadians(degress);
        x = Math.cos(radians) * circleRadius; 
        y = Math.sin(radians) * circleRadius; 

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

export default function Deck({socket, cards, cardSize, playCard}) {
    if(cards.length === 0) {
        return;
    }

    function placeCard(_, color, type) {
        console.log({card: {color: color, type: type}});
        socket.emit('place_card', {card: {color: color, type: type}});
        // socket.emit('place_card', {card: {color: color, type: type, declared_color:"COLOR"}});
    }

    let coords = calculateCoords(cards.length, 400, 160, 236, 0.2);

    return(
        <div className="deck">
        {cards.map((card, index) => {
            let coord = coords[index]
            return (<Card 
                color={card.color} 
                cardType={card.type} 
                cardWidth={cardSize}
                enableHover={true}
                style={coordsToStyleSheet(index, coord.x, coord.y, coord.angle)}
                clickEvent={placeCard}/>)
            })}
        </div>
    );
}
import React from "react";
import "./Deck.css";
import Card from "./Card";
import {degreesToRadians, getRotatedDimensions, radiansToDegrees} from "../utils/mathFunctions";
import { useRef } from "react";

//need a reworke
function calculateFanCoords(cardsLength, circleRadius, cardWidth, cardHeight, cardSpacing) {
    let anglePerCard = radiansToDegrees(Math.atan((cardWidth * cardSpacing) / circleRadius));
    let startAngle = 270 - 0.5 * anglePerCard * (cardsLength - 1);

    let x = 0;
    let y = 0;

    let coords = [];

    for (let i = 0; i < cardsLength; i++) {
        let degrees = startAngle + anglePerCard * i;

        let radians = degreesToRadians(degrees);
        x = Math.cos(radians) * circleRadius - cardWidth / 2;
        y = Math.sin(radians) * circleRadius - cardHeight / 2;

        coords.push({x: x, y: y, angle: degrees + 90});
    }

    let offsetX = 0;//-x + ((getRotatedDimensions(coords[0].angle, cardWidth, cardHeight)[0] - cardWidth) / 2);
    let offsetY = -y;

    coords.forEach(coordinates => {
        coordinates.x += offsetX;
        coordinates.x = Math.round(coordinates.x);

        coordinates.y += offsetY;
        coordinates.y = Math.round(coordinates.y);
    });

    return coords;
}

function calculateNormalCoords(cardsLength, cardWidth, cardHeight, startPoint, maxCardSpacing, minCardSpacing, deckDimension){
    let cardSpacing = maxCardSpacing;
    let width = (cardWidth * cardSpacing * (cardsLength - 1)) + cardWidth;

    if(width > deckDimension.width){
        cardSpacing = Math.max((-cardWidth + deckDimension.width) / (cardWidth * cardsLength - cardWidth), minCardSpacing);
        width = (cardWidth * cardSpacing * (cardsLength - 1)) + cardWidth;
    }

    let x = 0;
    let y = deckDimension.height > cardHeight ? startPoint.y - cardHeight / 2 : 0;

    let coords = [];

    for(let i = 0; i < cardsLength; i++){
        if(width >= deckDimension.width){
            x = cardWidth * cardSpacing * i;
        } else {
            x = cardWidth * cardSpacing * i + (startPoint.x - width / 2);
        }

        coords.push({x: x, y: y, angle: 0});
    }
    
    return coords;
}

function coordsToStyleSheet(i, x, y, angle) {
    return {
        //'zIndex': i, transform: `rotate(${angle}deg)`, top: `${y}px`, left: `${x}px`
        'zIndex': i, top: `${y}px`, left: `${x}px`
    };
}

export default function Deck({cards, cardSize, placeCard}) {
    if (cards.length === 0) {
        return;
    }
    let deck = useRef(null);
    const deckWidth = deck?.current?.offsetWidth;
    const deckHeight = deck?.current?.offsetHeight;
    const deckDimension = {height: deckHeight, width: deckWidth};
    const startingPoint = {x: deckWidth / 2, y: deckHeight / 2};
    const cardWidth = Math.min(Math.max(deckWidth * 0.13, 80), 160);
    const cardHeight = 754 / (504 / cardWidth);

    //need a reworke
    //let coords = calculateFanCoords(cards.length, 400, 160, 236, .3);
    const coords = calculateNormalCoords(cards.length, cardWidth, cardHeight, startingPoint, .5, .25, deckDimension);

    return (<div className="deck" ref={deck}>
        {cards.map((card, index) => {
            let coordinates = coords[index]
            return (<Card
                color={card.color}
                key={index}
                index={index}
                cardType={card.type}
                cardWidth={cardWidth}
                enableHover={true}
                style={coordsToStyleSheet(index, coordinates.x, coordinates.y, coordinates.angle)}
                clickEvent={placeCard}/>)
        })}
    </div>);
}
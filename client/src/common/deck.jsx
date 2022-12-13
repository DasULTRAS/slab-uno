import React from "react";
import "./deck.css";
import Card from "./card";
import { specialCard } from "./cards";

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

Math.degreesToRadians = function (degrees) {
    return degrees * (Math.PI / 180);
};

Math.radiansToDegrees = function (radians) {
    return radians * (180 / Math.PI);
};

Math.getRotatedDimensions = function (angle_in_degrees, width, height) {
    var angle = angle_in_degrees * Math.PI / 180,
        sin   = Math.sin(angle),
        cos   = Math.cos(angle);
    var x1 = cos * width,
        y1 = sin * width;
    var x2 = -sin * height,
        y2 = cos * height;
    var x3 = cos * width - sin * height,
        y3 = sin * width + cos * height;
    var minX = Math.min(0, x1, x2, x3),
        maxX = Math.max(0, x1, x2, x3),
        minY = Math.min(0, y1, y2, y3),
        maxY = Math.max(0, y1, y2, y3);

    return [ Math.floor((maxX - minX)), Math.floor((maxY - minY)) ];
};

Math.rotatePointInBox = function (x, y, angle, width, height) {
    angle = Math.degreesToRadians(angle);

    var centerX = width / 2.0;
    var centerY = height / 2.0;
    var dx = x - centerX;
    var dy = y - centerY;
    var dist = Math.sqrt(dx * dx + dy * dy);
    var a =  Math.atan2(dy, dx) + angle;
    var dx2 = Math.cos(a) * dist;
    var dy2 = Math.sin(a) * dist;

    return [ dx2 + centerX, dy2 + centerY ];
};

function fanStyle(num, numCards) {
    let anglePerCard = Math.atan(((160 * 1) / 400)) * (180/Math.PI);
    let startAngle = 0 - 0.5 * anglePerCard * (numCards - 1);
    let x = 160 / 2 + Math.cos(anglePerCard * (Math.PI/180)) * 400;
    let y = 160 / 2 + Math.sin(anglePerCard * (Math.PI/180)) * 400;
    let rotatedDimensions = Math.getRotatedDimensions(-65, 160, 239);
    let offsetX = 0;
    let offsetY = 0;

    offsetX = (x * -1);
    offsetX += ((rotatedDimensions[0] - 160) / 2);

    offsetY = (y * -1);
    return {
        'zIndex' : num,
        transform: `rotate(${Math.round(num*anglePerCard + startAngle)}deg)`,
        top: `${y + offsetY}px`,
        left: `${x + offsetX}px`
    };
}

export default function Deck({socket, cards, cardSize, playCard}) {

    function placeCard(_, color, type) {
        console.log({card: {color: color, type: type}});
        socket.emit('place_card', {card: {color: color, type: type}});
        // socket.emit('place_card', {card: {color: color, type: type, declared_color:"COLOR"}});
    }

    return(
        <div className="deck">
        {cards.map((card, index) => {
            return (<Card 
                color={card.color} 
                cardType={card.type} 
                cardWidth={cardSize}
                enableHover={true}
                style={fanStyle(index, cards.length)}
                clickEvent={placeCard}/>)
            })}
        </div>
    );
}
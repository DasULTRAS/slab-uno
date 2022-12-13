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

export default function Deck({socket, cards, cardSize, playCard}) {
    const deckLength = cards.length;
    const curl = Math.pow(deckLength, 1.30) * 10;
    const deg = deckLength > 1 ? -deckLength * 15 : 0;
    let degs = deg / 2;
    const initialDown = deckLength * 7;
    let down = initialDown / 2;
    const initialOver = curl;
    let over = initialOver / 2;

    /*console.log(
        `deckLength: ${deckLength},\n` +
        `curl: ${curl},\n` +
        `deg: ${deg},\n` +
        `degs: ${degs},\n` +
        `initialDown: ${initialDown},\n` +
        `down: ${down},\n` +
        `initialOver: ${initialOver},\n` +
        `over: ${over},\n`);*/

    function fanStyle(num) {
        let overHalf = num > (deckLength - 1) / 2;
        if (num > 0) {
            degs -= deg / (deckLength - 1);
            down -= initialDown / (deckLength - 1);
            over -= initialOver / (deckLength - 1);
        }
        return {
            'zIndex' : num,
            transform: `translateY(${(overHalf ? -down : down)}%) 
            translateX(${(-50 + over * -1)}%) 
            rotate(${degs}deg)`
        }
    }

    function placeCard(_, color, type) {
        console.log({card: {color: color, type: type}});
        socket.emit('place_card', {card: {color: color, type: type}});
    }

    return(
        <div className="deck">
        {cards.map((card, index) => {
            return (<Card 
                color={card.color} 
                cardType={card.type} 
                cardWidth={cardSize}
                enableHover={true}
                clickEvent={placeCard}/>)
            })}
        </div>
    );
}
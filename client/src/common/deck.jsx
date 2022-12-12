import React from "react";
import "./deck.css";
import Card from "./card";

export default function Deck({cards, cardSize}) {
    const deckLength = cards.length;
    const curl = Math.pow(deckLength, 1.30) * 10;
    const deg = deckLength > 1 ? -deckLength * 15 : 0;
    let degs = deg / 2;
    const initialDown = deckLength * 7;
    let down = initialDown / 2;
    const initialOver = curl;
    let over = initialOver / 2;

    console.log(
        `deckLength: ${deckLength},\n` +
        `curl: ${curl},\n` +
        `deg: ${deg},\n` +
        `degs: ${degs},\n` +
        `initialDown: ${initialDown},\n` +
        `down: ${down},\n` +
        `initialOver: ${initialOver},\n` +
        `over: ${over},\n`);

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

    return(
        <div className="deck">
        {cards.map((card, index) => {
            return (<Card 
                color={card.color} 
                cardType={card.type} 
                cardWidth={cardSize}
                enableHover={true}
                style={fanStyle(index)}/>)
            })}
        </div>
    );
}
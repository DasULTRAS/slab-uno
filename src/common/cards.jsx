import React from "react";
import redZero from "../assets/Cards/red-zero.png";
import redOne from "../assets/Cards/red-one.png";
import redTwo from "../assets/Cards/red-two.png";
import redThree from "../assets/Cards/red-three.png";
import redFour from "../assets/Cards/red-four.png";
import redFive from "../assets/Cards/red-five.png";
import redSix from "../assets/Cards/red-six.png";
import redSeven from "../assets/Cards/red-seven.png";
import redEight from "../assets/Cards/red-eight.png";
import redNine from "../assets/Cards/red-nine.png";
import redSkip from "../assets/Cards/red-skip.png";
import redReverse from "../assets/Cards/red-reverse.png";
import redDrawTwo from "../assets/Cards/red-draw-two.png";

import yellowZero from "../assets/Cards/yellow-zero.png";
import yellowOne from "../assets/Cards/yellow-one.png";
import yellowTwo from "../assets/Cards/yellow-two.png";
import yellowThree from "../assets/Cards/yellow-three.png";
import yellowFour from "../assets/Cards/yellow-four.png";
import yellowFive from "../assets/Cards/yellow-five.png";
import yellowSix from "../assets/Cards/yellow-six.png";
import yellowSeven from "../assets/Cards/yellow-seven.png";
import yellowEight from "../assets/Cards/yellow-eight.png";
import yellowNine from "../assets/Cards/yellow-nine.png";
import yellowSkip from "../assets/Cards/yellow-skip.png";
import yellowReverse from "../assets/Cards/yellow-reverse.png";
import yellowDrawTwo from "../assets/Cards/yellow-draw-two.png";

import blueZero from "../assets/Cards/blue-zero.png";
import blueOne from "../assets/Cards/blue-one.png";
import blueTwo from "../assets/Cards/blue-two.png";
import blueThree from "../assets/Cards/blue-three.png";
import blueFour from "../assets/Cards/blue-four.png";
import blueFive from "../assets/Cards/blue-five.png";
import blueSix from "../assets/Cards/blue-six.png";
import blueSeven from "../assets/Cards/blue-seven.png";
import blueEight from "../assets/Cards/blue-eight.png";
import blueNine from "../assets/Cards/blue-nine.png";
import blueSkip from "../assets/Cards/blue-skip.png";
import blueReverse from "../assets/Cards/blue-reverse.png";
import blueDrawTwo from "../assets/Cards/blue-draw-two.png";

import greenZero from "../assets/Cards/green-zero.png";
import greenOne from "../assets/Cards/green-one.png";
import greenTwo from "../assets/Cards/green-two.png";
import greenThree from "../assets/Cards/green-three.png";
import greenFour from "../assets/Cards/green-four.png";
import greenFive from "../assets/Cards/green-five.png";
import greenSix from "../assets/Cards/green-six.png";
import greenSeven from "../assets/Cards/green-seven.png";
import greenEight from "../assets/Cards/green-eight.png";
import greenNine from "../assets/Cards/green-nine.png";
import greenSkip from "../assets/Cards/green-skip.png";
import greenReverse from "../assets/Cards/green-reverse.png";
import greenDrawTwo from "../assets/Cards/green-draw-two.png";

import wild from "../assets/Cards/wild.png";
import wildDraw from "../assets/Cards/wild-draw.png";
import back from "../assets/Cards/back.png";
import "./cards.css";

const cardMap = new Map();
cardMap.set('zero', [redZero, yellowZero, blueZero, greenZero]);
cardMap.set('one', [redOne, yellowOne, blueOne, greenOne]);
cardMap.set('two', [redTwo, yellowTwo, blueTwo, greenTwo]);
cardMap.set('three', [redThree, yellowThree, blueThree, greenThree]);
cardMap.set('four', [redFour, yellowFour, blueFour, greenFour]);
cardMap.set('five', [redFive, yellowFive, blueFive, greenFive]);
cardMap.set('six', [redSix, yellowSix, blueSix, greenSix]);
cardMap.set('seven', [redSeven, yellowSeven, blueSeven, greenSeven]);
cardMap.set('eight', [redEight, yellowEight, blueEight, greenEight]);
cardMap.set('nine', [redNine, yellowNine, blueNine, greenNine]);
cardMap.set('skip', [redSkip, yellowSkip, blueSkip, greenSkip]);
cardMap.set('reverse', [redReverse, yellowReverse, blueReverse, greenReverse]);
cardMap.set('drawtwo', [redDrawTwo, yellowDrawTwo, blueDrawTwo, greenDrawTwo]);
cardMap.set('wild', [wild]);
cardMap.set('wildDraw', [wildDraw]);
cardMap.set('back', [back]);

const specialCard = ['wild', 'wildDraw', 'back'];

function getColorId(color){
    switch(color) {
        case 'red':
            return 0;
        case 'yellow':
            return 1;
        case 'blue':
            return 2;
        case 'green':
            return 3;
        default:
            return 0;
    }
}

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
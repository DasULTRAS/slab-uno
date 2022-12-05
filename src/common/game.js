import React from "react";
import Deck from "./deck";
import "./game.css";

const cardSize = "10em";
const playerCards = [{color:'red', cardType:'zero'}, {color:'yellow', cardType:'six'}];

function Game() {
    return (<>
        <Deck cards={playerCards} cardSize={cardSize}/>
        <div className="background"/>
    </>);
}

export default Game;
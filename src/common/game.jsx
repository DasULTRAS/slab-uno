import React from "react";
import Deck from "./deck";
import "./game.css";

const cardSize = "10em";
const playerCards = [{color:'red', cardType:'zero'}, {color:'yellow', cardType:'six'}];

function Game() {
    return (
    <div className="content">
        <div className="empty"></div>
        <div className="enemyPlayer"></div>
        <div className="menu"></div>
        <div className="enemyPlayer"></div>
        <div className="field"></div>
        <div className="enemyPlayer"></div>
        <div className="drawCard"></div>
        <div className="playerDeck">
            <Deck cards={playerCards} cardSize={cardSize}/>
        </div>
        <div className="unoButton"></div>
        <div className="background"/>
    </div>);
}

export default Game;
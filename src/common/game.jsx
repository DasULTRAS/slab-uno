import React from "react";
import { useState } from "react";
import Card from "./cards";
import Deck from "./deck";
import "./game.css";
import UnoButtonAsset from "../assets/UNO_Button.png";

const cardSize = "10em";

function Game({state}) {
    const [playerCards, setPlayerCards] = useState([{color: 'red', cardType: 'nine'}]);

    function addCard() {
        setPlayerCards(oldPlayerCards => [...oldPlayerCards, {color: 'red', cardType: 'nine'}]);
    };

    return (
    <div className="content">
        <div className="empty"></div>
        <div className="enemyPlayer"></div>
        <div className="menu"></div>
        <div className="enemyPlayer"></div>
        <div className="field"></div>
        <div className="enemyPlayer"></div>
        <div className="drawCard">
            <Card color={'red'} cardType={'back'} cardWidth={cardSize} clickEvent={addCard}/>
        </div>
        <div className="playerDeck">
            <Deck cards={playerCards} cardSize={cardSize}/>
        </div>
        <div className="unoButton">
            <img src={UnoButtonAsset}></img>
        </div>
        <div className="background"/>
    </div>);
}

export default Game;
import React from "react";
import { useState } from "react";
import Card from "./cards";
import Deck from "./deck";
import "./game.css";
import UnoButtonAsset from "../assets/UNO_Button.png";

const cardSize = "10em";

function Game() {
    const [playerCards, setPlayerCards] = useState([{color: 'red', cardType: 'nine'}]);
    const [playCard, setPlayCard] = useState({color: 'red', cardType: 'nine'})

    function addCard() {
        setPlayerCards(oldPlayerCards => [...oldPlayerCards, {color: 'red', cardType: 'nine'}]);
    };

    return (
    <div className="gameContent">
        <div className="enemyPlayers"></div>
        <div className="gameField">
            <Card color={playCard.color} cardType={playCard.cardType} cardWidth={cardSize} />
        </div>
        <div className="bar">
            <div className="drawCard">
                <Card 
                    color={'red'} 
                    cardType={'back'} 
                    cardWidth={cardSize} 
                    clickEvent={addCard}
                    enableHover={true}/>
            </div>
            <Deck cards={playerCards} cardSize={cardSize}/>
            <div className="unoButton">
                <img src={UnoButtonAsset} width="160px"></img>
            </div>
        </div>
        <div className="gameBackground"/>
    </div>);
}

export default Game;
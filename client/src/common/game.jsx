import React from "react";
import { useState } from "react";
import Card from "./card";
import Deck from "./deck";
import "./game.css";
import UnoButtonAsset from "../assets/UNO_Button.png";
import EnemyPlayer from "./enemyPlayer";

const cardSize = "10em";

function Game({socket}) {
    const [playerCards, setPlayerCards] = useState([]);
    const [playCard, setPlayCard] = useState({color: 'red', cardType: 'nine'});
    const [enemyPlayers, setEnemyPlayers] = useState([{cardCount: 5, name: "TestUser1"}, {cardCount: 5, name: "TestUser2"}]);

    function addCard(card) {
        setPlayerCards(oldPlayerCards => [...oldPlayerCards, card]);
    }

    function unoButtonClick() {
        console.log('uno');
    }

    //TODO: the server calls this function and adds the player
    function addEnemyPlayer(enemyPlayer) {
        setEnemyPlayers(oldArray => [...oldArray, enemyPlayer])
    }

    function getOneCardFromStack(){
        //TODO: Get a random card from the server
        // the server should have the lobby stack
    }

    return (
    <div className="gameContent">
        <div className="enemyPlayers">
            {enemyPlayers.map(player => {
                return(
                    <EnemyPlayer cardCount={player.cardCount} playerName={player.name} />
                )
            })}
        </div>
        <div className="gameField">
            <Card color={playCard.color} cardType={playCard.cardType} cardWidth={cardSize} />
        </div>
        <div className="bar">
            <div className="drawCard">
                <Card 
                    color={'red'} 
                    cardType={'back'} 
                    cardWidth={cardSize} 
                    clickEvent={getOneCardFromStack}
                    enableHover={true}/>
            </div>
            <Deck cards={playerCards} cardSize={cardSize}/>
            <div className="unoButton" onClick={unoButtonClick}>
                <img src={UnoButtonAsset} width="100%" alt="UnoButton"></img>
            </div>
        </div>
    </div>);
}

export default Game;
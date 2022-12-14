import React from "react";
import { useState } from "react";
import Card from "./card";
import Deck from "./deck";
import "./game.css";
import UnoButtonAsset from "../assets/UNO_Button.png";
import EnemyPlayer from "./enemyPlayer";
import { useEffect } from "react";
import Popup from "./colorPopup";

const cardSize = "10em";

function Game({socket, lobby}) {
    const [playerCards, setPlayerCards] = useState([]);
    const [playCard, setPlayCard] = useState({color: 'red', type: 'back'});
    const [enemyPlayers, setEnemyPlayers] = useState([]);
    const [isChooseColor, setIsChooseColor] = useState(false);

    useEffect(() => {
        // Run EVERY render
        socket.on('get_card', (data) => {
            setPlayerCards(data.player_deck.cards);
        });

    });

    useEffect(()=>{
        // Run ONE on render
        socket.emit('game_started');
    }, []);

    useEffect(() => {
        // run if lobby was rendered
        setEnemyPlayers(lobby.players);
        setPlayCard(lobby.playedCards.cards.at(-1));
    }, [lobby]);

    function unoButtonClick() {
        console.log('uno');
    }

    function getOneCardFromStack(){
        socket.emit('get_card');
    }

    function placeCard(_, color, type, cardPos) {
        if(color === 'black'){
            setIsChooseColor(true);
            setPlayCard({ color: color, type: type });
            setPlayerCards(cards => cards.filter((_, i) => i !== cardPos));
            return;
        }
        socket.emit('place_card', {card: {color: color, type: type}});
        
    }

    function chooseColor(color){
        socket.emit('place_card', {card: {color: {color}, type: playCard.type, declared_color: {color}}});
        setIsChooseColor(false);
    }

    return (
    <div className="gameContent">
        {isChooseColor ? <Popup click={chooseColor} /> : <></>}
        <div className="enemyPlayers">
            {enemyPlayers.map((player, index) => {
                return(
                    <EnemyPlayer key={index} cardCount={player.deckLength} playerName={player.username} />
                )
            })}
        </div>
        <div className="gameField">
            <Card color={playCard.color} cardType={playCard.type} cardWidth={cardSize} />
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
            <Deck cards={playerCards} cardSize={cardSize} playCard={playCard} placeCard={placeCard}/>
            <div className="unoButton" onClick={unoButtonClick}>
                <img src={UnoButtonAsset} width="100%" alt="UnoButton"></img>
            </div>
        </div>
    </div>);
}

export default Game;
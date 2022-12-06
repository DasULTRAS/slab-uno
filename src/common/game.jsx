import React from "react";
import Card from "./cards";
import Deck from "./deck";
import "./game.css";

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
        <div className="unoButton"></div>
        <div className="background"/>
    </div>);
}

export default Game;
import React from "react";
import "./game.css";
import Card, {CardType} from "./cards";

function Game() {
    return (<>
        <Card color={"#fff555"} cardType={'zero'}/>
        <div className="background"/>
    </>);
}

export default Game;
import React from "react";
import "./game.css";
import Card from "./cards";

const cardSize = "10em";

function Game() {
    return (<>
        <Card color={"blue"} cardType={'nine'} cardWith={cardSize} />
        <Card color={"red"} cardType={'seven'} cardWith={cardSize} />
        <Card color={"yellow"} cardType={'zero'} cardWith={cardSize} />
        <Card color={"red"} cardType={'wild'} cardWith={cardSize} />
        <div className="background"/>
    </>);
}

export default Game;
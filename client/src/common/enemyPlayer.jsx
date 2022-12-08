import React from "react";
import "./enemyPlayer.css";

export default function EnemyPlayer({cardCount, playerName}) {
    return(
        <div className="enemyPlayer">     
            <div className="cardCount">{cardCount}</div>
            <div className="playerName">{playerName}</div>
        </div>
    );
};
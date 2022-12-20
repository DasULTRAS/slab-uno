import React from "react";
import "./EnemyPlayer.css";

export default function EnemyPlayer({cardCount, playerName}) {
    return(
        <div className="enemyPlayer">     
            <div className="cardCount">{cardCount ? cardCount : -1}</div>
            <div className="playerName">{playerName}</div>
        </div>
    );
};
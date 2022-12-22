import React from "react";
import "./EnemyPlayer.css";

export default function EnemyPlayer({cardCount, playerName, isActive}) {
    let classes = "enemyPlayer";
    if (isActive) classes += " active";

    return (<>
        <div className={classes}>
            <div className="cardCount">{cardCount ? cardCount : -1}</div>
            <div className="playerName">{playerName}</div>
        </div>
    </>);
};

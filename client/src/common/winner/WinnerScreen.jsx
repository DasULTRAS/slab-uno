import React from "react";
import './WinnerScreen.css';

export default function WinnerScreen({winners, lobbyName}) {
    const winner = (name, index) => {
        return(
            <div className="winner" key={name + ' ' + index}>
                {(index + 1) + '. ' + name}
            </div>
        );
    }

    return(
        <div className="winnerScreen">
            <div className="lobbyName">{lobbyName}</div>
            <div className="title">WINNERS</div>
            {winners.map((name, index) => winner(name, index))}
        </div>
    );
}
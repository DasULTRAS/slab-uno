import React from "react";
import './WinnerScreen.css';

export default function WinnerScreen({lobby}) {
    const winner = (name, index) => {
        return (<div className="winner" key={name + ' ' + index}>
            {(index + 1) + '. ' + name}
        </div>);
    }

    function refreshPage(){
        window.location.reload();
    }

    return (<div className="winnerScreen">
        <div className="lobbyName">Lobby - {lobby.lobbyID}</div>
        <div className="title">WINNERS</div>
        {lobby.winners.map((name, index) => winner(name, index))}
        <button className="backButton" onClick={refreshPage}>Back to Lobby</button>
    </div>);
}

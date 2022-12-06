import React from "react";
import "./lobby.css";
import logo from "../assets/UNO_Button.png";


function Lobby() {
    return (
        <>
            <img className="logo" src={logo}/>
            <div className="content">
                <div className="lobbyID">
                    <label>Lobby ID: </label>
                    <input></input>
                </div>
                <div className="buttons">
                    <button className="createLobbyButton">create new Lobby</button>
                    <button className="joinLobbyButton">join Lobby</button>
                </div>
            </div>
        </>
    );
}

export default Lobby;
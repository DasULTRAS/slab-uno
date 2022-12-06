import React from "react";
import io from 'socket.io-client';
import "./lobby.css";
import logo from "../assets/UNO_Button.png";
import {useEffect} from 'react';

const socket = io.connect("http://localhost:3003");

function Lobby() {
    let lobbyID = "";

    const handleInput = event => {
        lobbyID = event.target.value;
    };

    const sendLobbyID = () => {
        socket.emit("send_lobby_id", {lobbyID: lobbyID});
    };
    useEffect(()=> {
        socket.on("receive_lobby_id", (data) => {
            alert(data.lobbyID);
        })
    })

    return (
        <>
            <img className="logo" src={logo}/>
            <div className="content">
                <div className="lobbyID">
                    <label>Lobby ID: </label>
                    <input placeholder="Lobby ID..." onChange={handleInput}></input>
                </div>
                <div className="buttons">
                    <button onClick={sendLobbyID}>create new Lobby</button>
                    <button>join Lobby</button>
                </div>
            </div>
        </>
    );
}

export default Lobby;
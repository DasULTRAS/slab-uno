import io from 'socket.io-client';
import "./lobby.css";
import logo from "../assets/UNO_Button.png";
import {useState, useEffect} from 'react';

// const socket = io.connect("https://uno-api.dasultras.de/");
const socket = io.connect("http://localhost:3003/");

function Lobby() {
    let lobby = null;
    const [lobbyID, setLobbyID] = useState("");
    const [messageReceived, setMessageReceived] = useState("");

    useEffect(() => {
        socket.on("create_lobby", (data) => {
            setMessageReceived(data.message);
            if (data.status)
                lobby = data.lobbyID;
        })
        socket.on("join_lobby", (data) => {
            setMessageReceived(data.message);
            if (data.status)
                lobby = data.lobbyID;
        })
    })

    return (
        <>
            <img className="logo" src={logo} alt="Logo"/>
            <div className="content">
                <div className="lobbyID">
                    <label>Lobby ID: </label>
                    <input placeholder="Lobby ID..." onChange={(event) => {
                        setLobbyID(event.target.value);
                    }}></input>
                </div>
                <div className="buttons">
                    <button onClick={() => {
                        socket.emit("create_lobby", {lobbyID: lobbyID});
                    }}>create new Lobby
                    </button>
                    <button onClick={() => {
                        socket.emit("join_lobby", {lobbyID: lobbyID});
                    }}>join Lobby
                    </button>
                </div>
                <div className="message_received">
                    {messageReceived}
                </div>
            </div>
        </>
    );
}

export default Lobby;

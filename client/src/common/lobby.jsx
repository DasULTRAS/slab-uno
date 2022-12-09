import "./lobby.css";
import {useState, useEffect} from 'react';
import {Button} from 'react-bootstrap'
import logo from "../assets/UNO_Button.png";

function Lobby(socket) {
    const [lobbyID, setLobbyID] = useState("");
    const [lobbyIDText, setLobbyIDText] = useState("");
    const [messageReceived, setMessageReceived] = useState("");

    useEffect(() => {
        socket.on("create_lobby", (data) => {
            setMessageReceived(data.message);
            if (data.status)
                setLobbyID(data.lobbyID);
        })
        socket.on("join_lobby", (data) => {
            setMessageReceived(data.message);
            if (data.status)
                setLobbyID(data.lobbyID);
        })
    })

    return (
        <>
            <img className="logo" src={logo} alt="Logo"/>
            <div className="content">
                {
                    lobbyID === "" ?
                    <div className="lobbyJoin">
                        <div className="lobbyID">
                            <label>Lobby ID: </label>
                            <input placeholder="Lobby ID..." onChange={(event) => {
                                setLobbyIDText(event.target.value);
                            }}></input>
                        </div>
                        <div className="buttons">
                            <Button onClick={() => {
                                socket.emit("create_lobby", {lobbyID: lobbyIDText});
                            }}>create new Lobby
                            </Button>
                            <Button onClick={() => {
                                socket.emit("join_lobby", {lobbyID: lobbyIDText});
                            }}>join Lobby
                            </Button>
                        </div>
                    </div> :
                        <div className="waitingRoom">
                            <label>{`Lobby - ${lobbyID}`}</label>
                        </div>
                }

                <div className="message_received">
                    {messageReceived}
                </div>
            </div>
        </>
    );
}

export default Lobby;

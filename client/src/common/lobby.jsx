import "./lobby.css";
import {useState, useEffect} from 'react';
import {Button, ListGroup, Form} from 'react-bootstrap'
import logo from "../assets/UNO_Button.png";

function Lobby({socket}) {
    const [isLobbyJoined, setLobbyJoined] = useState(false);
    const [lobbyID, setLobbyID] = useState("");
    const [username, setUsername] = useState("");
    const [lobby, setLobby] = useState(null);

    useEffect(() => {
        socket.on("create_lobby", (data) => {
            // input get static
            setLobby(data.lobby);
            setLobbyJoined(true);
            setLobbyID(data.lobbyID);
            setUsername(data.username)
        });
        socket.on("join_lobby", (data) => {
            // input get static
            setLobby(data.lobby);
            setLobbyJoined(true);
            setLobbyID(data.lobby.lobbyID);
            setUsername(data.username)

        });
        socket.on("player_change", (data) => {
            setLobby(data.lobby);
        });
    });

    const isLobbyReady = () => {
        let ready = true;
        lobby.players.forEach((player) => {
            if (player.readyToPlay === false) ready = false;
        });
        return ready;
    }

    return (<>
        <div className="content">
            <img className="logo" src={logo} alt="Logo"/>
            <div className="lobbyJoin">
                <Form>
                    <Form.Group className="form-items" controlId="formLobbyID">
                        <Form.Label>LobbyID</Form.Label>
                        <Form.Control type="text" placeholder="Enter LobbyID"
                                      disabled={isLobbyJoined} readOnly={isLobbyJoined}
                                      onChange={(event) => {
                                          setLobbyID(event.target.value)
                                      }}/>
                    </Form.Group>
                    <Form.Group className="form-items" controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" placeholder="Enter Username"
                                      disabled={isLobbyJoined} readOnly={isLobbyJoined}
                                      onChange={(event) => {
                                          setUsername(event.target.value)
                                      }}/>
                    </Form.Group>
                </Form>

                {!isLobbyJoined && <div className="buttons">
                    <Button onClick={() => {
                        socket.emit("create_lobby", {lobbyID: lobbyID, username: username});
                    }}>create new Lobby</Button>
                    <Button onClick={() => {
                        socket.emit("join_lobby", {lobbyID: lobbyID, username: username});
                    }}>join Lobby</Button>
                </div>}
            </div>

            {isLobbyJoined && lobby !== null && <div className="waitingRoom">
                <label>{`Lobby - ${lobbyID}`}</label>
                <div className="buttons">
                    <Button onClick={() => {
                        socket.emit("ready_to_play");
                    }}>Ready to Play</Button>
                    <Button onClick={() => {
                        socket.emit("start_game");
                    }} disabled={!isLobbyReady()}>Start Game</Button>
                </div>
                <ListGroup className="playerboard" as="ol" numbered>
                    {lobby.players.map((player) => <ListGroup.Item
                        as="li" key={player.username}>{`${player.username} - ${player.readyToPlay}`}</ListGroup.Item>)}
                </ListGroup>
            </div>}
        </div>
    </>);
}

export default Lobby;

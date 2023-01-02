import "./Lobby.css";
import {useState, useEffect} from 'react';
import {Button, ListGroup, Form} from 'react-bootstrap'
import logo from "../../assets/UNO_Button.png";
import GameSettings from "./GameSettings";

export default function Lobby({socket, lobby}) {
    // TEXT FIELDS
    const [lobbyID, setLobbyID] = useState("");
    const [username, setUsername] = useState("");
    // STATUS
    const [isLobbyJoined, setLobbyJoined] = useState(false);

    useEffect(() => {
        socket.on("join_lobby", (data) => {
            setLobbyJoined(true);
            setUsername(data.username)
            setLobbyID(data.lobby.lobbyID);

            console.log("LOBBY SECOND TIME");
            console.log(lobby);
            console.log("isLobbyJoined SECOND TIME");
            console.log(isLobbyJoined);
        });
    });

    useEffect(() => {
        console.log("LOBBY ONE TIME");
        console.log(lobby);
        console.log("isLobbyJoined ONE TIME");
        console.log(isLobbyJoined);
    }, []);

    /**
     *
     * @param title {String}
     */
    const findSettingByTitle = (title) => {
        return lobby.gameSettings[lobby.gameSettings.findIndex(setting => setting.title === title)];
    }

    const isLobbyReady = () => {
        let ready = true;
        // Check if Players are Ready
        lobby.players.forEach((player) => {
            if (player.readyToPlay === false) ready = false;
        });
        // Check if min. amount of Player are joined
        try {
            console.log("Lobby:");
            console.log(lobby);
            const setting = findSettingByTitle("play_alone");
            console.log("Setting:");
            console.log(setting);
            if (!setting.enabled)
                if (lobby.players.length < 2)
                    ready = false;
        } catch (e) {
            console.error(e);
        }
        console.log("Ready:");
        console.log(ready);
        return ready;
    }

    return (<>
        {isLobbyJoined && <GameSettings socket={socket} gameSettings={lobby.gameSettings}/>}

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
                    {lobby.players.map((player) => <ListGroup.Item as="li"
                                                                   key={player.username}>{`${player.username} - ${player.readyToPlay}`}</ListGroup.Item>)}
                </ListGroup>
            </div>}
        </div>
    </>);
}

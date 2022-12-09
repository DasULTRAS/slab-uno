import "./lobby.css";
import {useState, useEffect} from 'react';
import {Button, ListGroup, Form} from 'react-bootstrap'
import logo from "../assets/UNO_Button.png";

function Lobby(socket) {
    const [isLobbyJoined, setLobbyJoined] = useState(false);
    const [lobbyID, setLobbyID] = useState("");
    const [messageReceived, setMessageReceived] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        socket.on("create_lobby", (data) => {
            setMessageReceived(data.message);
            if (data.status) {
                // input get static
                setLobbyJoined(true);
                setLobbyID(data.lobbyID);
                setUsername(data.username)
            }
        })
        socket.on("join_lobby", (data) => {
            setMessageReceived(data.message);
            if (data.status) {
                // input get static
                setLobbyJoined(true);
                setLobbyID(data.lobbyID);
                setUsername(data.username)
            }
        })
    })

    return (
        <>
            <img className="logo" src={logo} alt="Logo"/>
            <div className="content">
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

                    {
                        !isLobbyJoined &&
                        <div className="buttons">
                            <Button onClick={() => {
                                socket.emit("create_lobby", {lobbyID: lobbyID, username: username});
                            }}>create new Lobby
                            </Button>
                            <Button onClick={() => {
                                socket.emit("join_lobby", {lobbyID: lobbyID, username: username});
                            }}>join Lobby
                            </Button>
                        </div>
                    }
                </div>

                {
                    isLobbyJoined &&
                    <div className="waitingRoom">
                        <label>{`Lobby - ${lobbyID}`}</label>
                        <ListGroup as="ol" numbered>
                            <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
                            <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
                            <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
                        </ListGroup>
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

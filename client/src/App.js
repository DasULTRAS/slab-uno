import './App.css';
import Game from "./common/game";
import Lobby from "./common/lobby";
import {useState, useEffect} from "react";
import io from "socket.io-client";

// const socket = io.connect("https://uno-api.dasultras.de/");
const socket = io.connect("http://localhost:3003/");

function App() {
    const [gameStarted, setGameStarted] = useState(false);
    const [lobby, setLobby] = useState(null);

    useEffect(() => {
        socket.on("start_game", (data) => {
            setGameStarted(true);
            setLobby(data.lobby);
        });
    });

    return (
        <div className="App">
            {gameStarted ? <Game socket={socket}/> : <Lobby socket={socket}/>}
            <div className="gameBackground"/>
        </div>
    );
}

export default App;

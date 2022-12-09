import './App.css';
import Game from "./common/game";
import Lobby from "./common/lobby";
import {useState} from "react";
import io from "socket.io-client";

// const socket = io.connect("https://uno-api.dasultras.de/");
const socket = io.connect("http://localhost:3003/");

function App() {
    const [gameStarted, setGameStarted] = useState(false);

    return (
        <div className="App">
            {!gameStarted ? Lobby(socket) : Game(socket)}
            <div className="gameBackground"/>
        </div>
    );
}

export default App;

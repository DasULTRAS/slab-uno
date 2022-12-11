import './App.css';
import Game from "./common/game";
import Lobby from "./common/lobby";
import {useState, useEffect} from "react";
import io from "socket.io-client";

// const socket = io.connect("https://uno-api.dasultras.de/");
const socket = io.connect("http://localhost:8080/");

function App() {
    const [gameStarted, setGameStarted] = useState(false);
    const [latency, setLatency] = useState(0);
    const [message, setMessage] = useState("");
    const [lobby, setLobby] = useState(null);

    useEffect(() => {
        socket.on("start_game", (data) => {
            setGameStarted(true);
            setLobby(data.lobby);

            console.log(socket);
        });

        socket.on("message", (data) => {
            console.log(data.message);
            setMessage(data.message);
        });

        socket.on("pong", (data) => {
            setLatency(Date.now() - data.timestamp);
        });
        const interval = setInterval(() => {
            socket.emit("ping", {timestamp: Date.now()});
        }, 1000);

        return () => clearInterval(interval);
    });

    return (
        <div className="App">
            <div className="debug">
                <li className="latency">{`${latency}ms`}</li>
                <li className="message">{message}</li>
            </div>

            {gameStarted ? <Game socket={socket}/> : <Lobby socket={socket}/>}
            <div className="gameBackground"/>
        </div>
    );
}

export default App;

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
    const [latency, setLatency] = useState(0);

    useEffect(() => {
        socket.on("start_game", (data) => {
            setGameStarted(true);
            setLobby(data.lobby);

            console.log(socket);
        });

        socket.on("pong", (data)=>{
            setLatency(Date.now() - data.timestamp);
        });
        const interval = setInterval(() => {
            socket.emit("ping", {timestamp: Date.now()});
        }, 1000);

        return () => clearInterval(interval);
    });

    return (
        <div className="App">
            <label className="latency">{`${latency}ms`}</label>
            {gameStarted ? <Game socket={socket}/> : <Lobby socket={socket}/>}
            <div className="gameBackground"/>
        </div>
    );
}

export default App;

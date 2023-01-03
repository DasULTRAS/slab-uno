import './App.css';
import Game from "./common/game/Game";
import Lobby from "./common/lobby/Lobby";
import {useState, useEffect} from "react";
import io from "socket.io-client";
import Chat from "./common/Chat";
import WinnerScreen from './common/winner/WinnerScreen';

// const socket = io.connect("https://uno-api.dasultras.de/");
const socket = io.connect("http://localhost:8080/");

export default function App() {
    const [gameStarted, setGameStarted] = useState(false);
    const [latency, setLatency] = useState(0);
    const [message, setMessage] = useState("");
    const [lobby, setLobby] = useState(null);

    // Event-Handler
    const handleLobbyUpdate = (data) => {
        setLobby(data.lobby);
    }

    useEffect(() => {
        socket.on("start_game", (data) => {
            setGameStarted(true);
            setLobby(data.lobby);
        });

        socket.on("message", (data) => {
            setMessage(data.message);
        });

        socket.on("player_change", handleLobbyUpdate);
        socket.on("create_lobby", handleLobbyUpdate);
        socket.on("join_lobby", handleLobbyUpdate);
        socket.on("renew_lobby", handleLobbyUpdate);

        socket.on("pong", (data) => {
            setLatency(Date.now() - data.timestamp);
        });
        const interval = setInterval(() => {
            socket.emit("ping", {timestamp: Date.now()});
        }, 1000);

        return () => clearInterval(interval);
    });

    const renderScreen = (screen) => {
        switch(screen){
            case 'winner':
                return <WinnerScreen winners={['DasUltras', 'BigM']} />;
            case 'game':
                return <Game socket={socket} lobby={lobby}/>;
            default:
                return <Lobby socket={socket} lobby={lobby}/>;
        }
    }

    return (<div className="App">
        <div className="debug">
            <li className="latency">{`${latency}ms`}</li>
            <li className="message">{message}</li>
        </div>

        {lobby !== null && <Chat socket={socket} messages={lobby.messages}/>}

        {renderScreen('winner')}
        <div className="gameBackground"/>
    </div>);
}

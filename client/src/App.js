import './App.css';
import Game from "./common/game";
import Lobby from "./common/lobby";
import {useState} from "react";

function App() {
    const [gameStarted, setGameStarted] = useState(false);

    return (
        <div className="App">
            {!gameStarted ? <Lobby/> : <Game/>}
            <div className="gameBackground"/>
        </div>
    );
}

export default App;

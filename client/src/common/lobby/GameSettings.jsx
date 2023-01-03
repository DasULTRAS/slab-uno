import './GameSettings.css';
import '../style/Buttons.css';
import {Button} from "react-bootstrap";
import {useEffect, useState} from "react";

export default function GameSettings({socket, gameSettings}) {
    const [showGameSettings, setShowGameSettings] = useState(false);

    return (<>
        {showGameSettings ? <>
            <div className="gameSettings">
                <h1>Game settings</h1>
                <ul>
                    {gameSettings.map((setting, index) => <li key={setting.title}>
                        <input type="checkbox" checked={setting.enabled}
                               onChange={() => {
                                   gameSettings[index].enabled = !setting.enabled;
                                   socket.emit("gameSettings", {game_settings: gameSettings});
                               }}/>
                        <h2>{setting.name}</h2>
                        <p>{setting.description}</p>
                    </li>)}
                </ul>
            </div>
            <div className="gameSettingsBackground" onClick={() => {
                setShowGameSettings(!showGameSettings);
            }}/>
        </> : (<Button className="openGameSettingsButtons translate" onClick={() => {
            setShowGameSettings(!showGameSettings);
        }}>Game Settings</Button>)}
    </>);
}

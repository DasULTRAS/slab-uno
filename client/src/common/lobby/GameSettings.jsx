import './GameSettings.css';
import {Button} from "react-bootstrap";
import {useEffect, useState} from "react";

export default function GameSettings({socket}) {
    const [showGameSettings, setShowGameSettings] = useState(false);
    const [gameSettings, setGameSettings] = useState(null);

    useEffect(() => {
        // Run ONCE on render
        socket.emit('gameSettings');
    }, []);

    useEffect(() => {
        // Get current GameSettings
        socket.on("gameSettings", (data) => {
            setGameSettings(data.game_settings);
        });
    });

    return (<>
        {showGameSettings ? <>
            <div className="gameSettings">
                <h1>Game settings</h1>
                <ul>
                    {gameSettings.map((setting) => <li key={setting.title}>
                        <input type="checkbox" checked={setting.enabled}
                               onChange={() => setting.enabled = !setting.enabled}/>
                        <h2>{setting.name}</h2>
                        <p>{setting.description}</p>
                    </li>)}
                </ul>
            </div>
            <div className="gameSettingsBackground" onClick={() => {
                setShowGameSettings(!showGameSettings);
            }}/>
        </> : (<Button className="openGameSettingsButtons" onClick={() => {
            setShowGameSettings(!showGameSettings);
        }}>Game Settings</Button>)}
    </>);
}
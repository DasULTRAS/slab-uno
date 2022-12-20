import './GameSettings.css';
import {Button} from "react-bootstrap";
import {useState} from "react";

export default function GameSettings({socket}) {
    const [showGameSettings, setShowGameSettings] = useState(false);

    return (<>
        {showGameSettings ? <>
            <div className="gameSettings"><h1>Game settings</h1></div>
            <div className="gameSettingsBackground" onClick={() => {
                setShowGameSettings(!showGameSettings);
            }}/>
        </> : (<Button className="openGameSettingsButtons" onClick={() => {
            setShowGameSettings(!showGameSettings);
        }}>Game Settings</Button>)}
    </>);
}
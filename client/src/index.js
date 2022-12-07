import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Lobby from "./common/lobby";
import Game from "./common/game";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Lobby/>
    </React.StrictMode>
);

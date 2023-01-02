import React from 'react';
import './ChatMessage.css'

export default function ChatMessage(props) {
    const {username, message, timestamp, index} = props;

    return (<div className="chatMessage" key={username + ' ' + index}>
        <p className="username">{username}</p>
        <p className="textField">{message}</p>
        <p className="timestamp">{new Date(timestamp).toTimeString().match(/\d{2}:\d{2}/)}</p>
    </div>);
}

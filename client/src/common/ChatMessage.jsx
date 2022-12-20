import React from 'react';

export default function ChatMessage(props) {
    const {username, message, timestamp} = props;

    return (<div className="chatMessage">
        <p className="username">{username}</p>
        <p className="textField">{message}</p>
        <p className="timestamp">{new Date(timestamp).toTimeString().match(/\d{2}:\d{2}/)}</p>
    </div>);
}

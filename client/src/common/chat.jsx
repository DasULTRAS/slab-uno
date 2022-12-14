import React, {useState} from 'react';
import chatMessage from './chatMessage';
import "./chat.css";

export default function Chat(socket) {
    const [chatVisible, setChatVisible] = useState(false);

    const messages = [{
        username: "DasULTRAS",
        message: "Hallo ich bin der Christian und schreibe eine Test Nachricht.",
        timestamp: Date.now()
    }];
    messages.push(messages[0]);
    messages.push(messages[0]);
    messages.push(messages[0]);
    messages.push(messages[0]);
    messages.push(messages[0]);


    return (
        <div className="chat">
            <button className="button-open"
                    onClick={() => setChatVisible(!chatVisible)}>{chatVisible ? "Schließen" : "Öffnen"}</button>
            {
                chatVisible && (
                    <div className="chat-window">
                        <h1>Chat</h1>
                        <div>
                            {messages.map(message => chatMessage(message))}
                        </div>
                        <div>
                            <textarea className="textArea" placeholder="Message..."></textarea>
                            <button>Send Message</button>
                        </div>
                        <div className="chat-background"/>
                    </div>
                )
            }

        </div>
    );
}

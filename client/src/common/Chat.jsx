import React, {useState} from 'react';
import chatMessage from './ChatMessage';
import "./Chat.css";

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
             {
                chatVisible && (
                    <div className="chat-window">
                        <h1>Chat</h1>
                        <div>
                            {messages.map(message => chatMessage(message))}
                        </div>
                        <div className='sendMesssageArea'>
                            <textarea className="textArea chat-textArea" placeholder="Message..."></textarea>
                            <button>Send Message</button>
                        </div>
                    </div>
                )
            }
            <button className="button-open"
                    onClick={() => setChatVisible(!chatVisible)}>{chatVisible ? "Schließen" : "Öffnen"}</button>

        </div>
    );
}

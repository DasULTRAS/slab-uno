import React, {useState, useRef} from 'react';
import chatMessage from './ChatMessage';
import "./Chat.css";
import { useEffect } from 'react';

export default function Chat({socket, messages}) {
    const [chatVisible, setChatVisible] = useState(false);
    const bottomRef = useRef(null);
    const sampleMessage = 
    {
        username: "DasULTRAS",
        message: "Hallo ich bin der Christian und schreibe eine Test Nachricht.",
        timestamp: Date.now()
    }
    const [messages, setMessages] = useState([
    sampleMessage,
    sampleMessage,
    sampleMessage,
    sampleMessage,
    sampleMessage,
    sampleMessage,
    sampleMessage,
    sampleMessage,
    sampleMessage,
    {
        username: "RussiaPlayer",
        message: "dfskfj",
        timestamp: Date.now()
    }]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth'});
    }, [messages]);

    return (
        <div className="chat">
             {
                chatVisible && (
                    <div className="chat-window">
                        <h1>Chat</h1>
                        <div className='messages'>
                            {messages.map((message, index) => chatMessage({...message, index}))}
                            <dev ref={bottomRef}/>
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
    </>);
}

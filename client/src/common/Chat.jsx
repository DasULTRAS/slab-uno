import React, {useState, useRef} from 'react';
import chatMessage from './ChatMessage';
import "./Chat.css";
import { useEffect } from 'react';

export default function Chat({socket, messages}) {
    const [chatVisible, setChatVisible] = useState(false);
    const [chatTextArea, setChatTextArea] = useState("");
    const bottomRef = useRef(null);

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
                        <textarea className="textArea chat-textArea" placeholder="Message..." value={chatTextArea}
                                      onChange={(event) => {
                                          setChatTextArea(event.target.value);
                                      }}/>
                            <button onClick={() => {
                                socket.emit("chat_message", {
                                    chat_message: {
                                        username: "DasULTRAS", message: chatTextArea, timestamp: Date.now()
                                    }
                                });
                                setChatTextArea("");
                            }}>Send Message</button>
                        </div>
                    </div>
                )
            }
            <button className="button-open"
                    onClick={() => setChatVisible(!chatVisible)}>{chatVisible ? "Schließen" : "Öffnen"}</button>
        </div>
    );
}

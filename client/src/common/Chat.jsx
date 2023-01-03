import React, {useState, useRef} from 'react';
import chatMessage from './ChatMessage';
import "./Chat.css";
import {useEffect} from 'react';
import {useCallback} from 'react';

export default function Chat({socket, messages}) {
    const [chatVisible, setChatVisible] = useState(false);
    const [chatTextArea, setChatTextArea] = useState("");
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [messages, chatVisible]);

    const sendMessage = () => {
        socket.emit("chat_message", {
            chat_message: {
                message: chatTextArea, timestamp: Date.now()
            }
        });
        setChatTextArea("");
    };

    return (<div className="chat">
        {chatVisible && (<div className="chat-window">
            <h1>Chat</h1>
            <div className='messages'>
                {messages.map((message, index) => chatMessage({...message, index}))}
                <dev ref={bottomRef}/>
            </div>
            <div className='sendMessageArea'>
                            <textarea className="textArea chat-textArea" placeholder="Message..." value={chatTextArea}
                                      onChange={(event) => {
                                          if (event.target.value.includes('\n') || event.target.value.includes('\r')) {
                                              sendMessage();
                                          } else setChatTextArea(event.target.value);
                                      }}/>
                <button onClick={sendMessage}>➥</button>
            </div>
        </div>)}
        <button className="button-open"
                onClick={() => {
                    setChatVisible(!chatVisible);
                }}><span>{chatVisible ? "Schließen" : "Öffnen"}</span></button>
    </div>);
}

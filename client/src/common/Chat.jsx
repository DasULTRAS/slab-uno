import React, {useState} from 'react';
import chatMessage from './ChatMessage';
import "./Chat.css";

export default function Chat({socket, messages}) {
    const [chatVisible, setChatVisible] = useState(false);
    const [chatTextArea, setChatTextArea] = useState("");

    var chatClasses = "chat";
    if (chatVisible)
        chatClasses += " visible";
    else
        chatClasses += " invisible";

    return (<>
        <div className="chat">
            {chatVisible && (<div className="chat-window">
                <h1>Chat</h1>
                <div>
                    {messages.map(message => chatMessage(message))}
                </div>
                <div className='sendMessageArea'>
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
                    }}>Send Message
                    </button>
                </div>
            </div>)}
            <button className="button-open"
                    onClick={() => setChatVisible(!chatVisible)}>{chatVisible ? "Schließen" : "Öffnen"}</button>
        </div>
    </>);
}

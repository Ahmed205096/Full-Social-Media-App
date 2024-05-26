import "../Style/ChatRoom.css";
import Bubbles from "./Bubbles";
import runChat, { messages_array } from "../AI/ChatAPI";
import { useEffect, useState } from "react";

export default function ChatRoom() {
  const [message, setMessage] = useState("");
  const [value, setValue] = useState("");
  const [bubbles, setBubbles] = useState([]);

  const bubbleValue = messages_array.map((message, index) => {
    return index % 2 === 0 ? (
      <Bubbles key={index} message={message} className="right" />
    ) : (
      <Bubbles key={index} message={message} className="left" />
    );
    // eslint-disable-next-line no-unreachable
    messages_array.splice(0, 1);
  });

  useEffect(() => {
    setBubbles(bubbleValue);
  }, [bubbleValue]);

  return (
    <div className="outer-chatroom-container">
      <div className="inner-chatroom-container">
        <div className="chat-body">
          <div className="bubble-bg"></div>
          <div className="messages-container">{bubbles}</div>
        </div>
        <div className="chat-inputs">
          <input
            className="message-input"
            onChange={(e) => {
              setValue(e.target.value);
              setMessage(e.target.value);
            }}
            value={value}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (message !== "") {
                  runChat(message);
                  setMessage("");
                  setValue("");
                }
              }
            }}
            type="text"
            placeholder="Enter your message here "
          />
          <button
            onClick={() => {
              if (message !== "") {
                runChat(message);
                setMessage("");
                setValue("");
              }
            }}
            className="chat-btn"
          >
            📧
          </button>
        </div>
      </div>
    </div>
  );
}

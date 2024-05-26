import React from "react";
import "../Style/ChatMessages.css";

const ChatMessage = ({ message, sender, time }) => {
  const date = new Date(time);
  const formattedDate = `${date.getHours()}:${date.getMinutes()}`;
  const options = { weekday: "long" };

  const day_name = date.toLocaleString("en-US", options);

  return (
    <div
      className={`other-message-outer-container-${
        sender === "other" ? "other-message" : ""
      }`}
    >
      <div
        className={`chatbubble chat-message ${
          sender === "other" ? "other-message" : ""
        }`}
      >
        <p>{message}</p>
        <span
          className={`bubble-time-${sender === "other" ? "other-message" : ""}`}
        >
          <p>
            {formattedDate}  {day_name}
          </p>
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;

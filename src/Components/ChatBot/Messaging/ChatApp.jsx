import React, { useEffect, useState, useRef } from "react";
import ChatMessage from "./ChatMessage";
import {
  getMessageBetween,
  get_users_in_the_list,
  sendMessage,
} from "../../APIs/MessagingAPIS/messagesAPI";
import io from "socket.io-client";
import { Link } from "react-router-dom";
import {
  check_message_status,
  update_message_status,
} from "../../APIs/CheckMessageStatus/CheckMessageStatus";

const ChatApp = () => {
  const currentUserID = localStorage.getItem("user_id");

  const [usersList, setUsersList] = useState([]);
  const [apiMessages, setApiMessages] = useState([]);
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [userImg, setUserImg] = useState("/Assets/logo.png");
  const [showMessagesList, setShowMessagesList] = useState("hidden");
  const [message, setMessage] = useState("");
  const [hideSlider, setHideSlider] = useState("block");
  const [messageStatus, setMessageStatus] = useState([]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    async function getUsersList() {
      const list = await get_users_in_the_list(currentUserID);
      setUsersList(list);
    }
    getUsersList();
  }, [currentUserID]);

  useEffect(() => {
    const socket = io(window.location.origin);

    socket.on("newMessage", async (data) => {
      if (data.senderId === userId || data.senderId === currentUserID) {
        const messages = await getMessageBetween(currentUserID, userId);
        setApiMessages(messages);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [currentUserID, userId]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const messages = await getMessageBetween(currentUserID, userId);
        setApiMessages(messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }, 2000);

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, [currentUserID, userId]);

  useEffect(() => {
    // Scroll to the bottom of the messages container whenever apiMessages changes
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [apiMessages]);

  useEffect(() => {
    async function check() {
      const res = await check_message_status(currentUserID);
      setMessageStatus(res);
    }
    check();
  }, [currentUserID, userId]);

  const handleClickOnTheChat = async (id, name, img) => {
    setName(name);
    setUserImg(img);
    setUserId(id);
    setShowMessagesList("visible");
    const messages = await getMessageBetween(currentUserID, id);
    setApiMessages(messages);
  };

  const sideBar = usersList.map((user) => (
    <li
      onClick={async () => {
        handleClickOnTheChat(user.id, user.name, user.img);
        await update_message_status(currentUserID, user.id);
      }}
      key={user.id}
    >
      <img src={user.img} alt="User" className="user-image-small" />
      <span className="chap-app-status">
        {user.name}
        <span
          className={`${
            messageStatus.includes(`${user.id}`) ? "non-sent" : "sent"
          }`}
        />
      </span>
    </li>
  ));

  const sendMessageFromTo = async () => {
    if (message.trim() !== "") {
      await sendMessage(currentUserID, userId, "you", name, message);
      const messages = await getMessageBetween(currentUserID, userId);
      setApiMessages(messages);
    }
  };

  const handleInput = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    await sendMessageFromTo();
    const messages = await getMessageBetween(currentUserID, userId);
    setApiMessages(messages);
    setMessage("");
  };

  const displayMessages = () => {
    if (Array.isArray(apiMessages)) {
      return apiMessages.map((msg) => (
        <ChatMessage
          key={msg.id}
          message={msg.message}
          sender={msg.senderId === currentUserID ? "user" : "other"}
          time={msg.timestamp}
        />
      ));
    }
  };

  return (
    <div className="chat-app-outer">
      <div className="chat-app">
        <div style={{ display: hideSlider }} className="chat-sidebar">
          <span className="chat-app-slider-title">
            <span style={{ textDecoration: "underline" }} className="chats">
              Chats
            </span>
          </span>
          <ul>
            <Link to={"/chat-with-echo"}>
              <li style={{ color: "black" }}>
                <img
                  src="Assets/bot_img.jpg"
                  alt="User"
                  className="user-image-small"
                />
                Echo Chatbot
              </li>
            </Link>
            {/* {sideBarr} */}
            {sideBar}
          </ul>
        </div>
        <span
          onClick={() => {
            if (hideSlider === "block") setHideSlider("none");
            else setHideSlider("block");
          }}
          className="hide-button"
        >
          {hideSlider === "none" ? "SideBar▶️" : "◀️SideBar"}
        </span>
        <div className="chat">
          <div style={{ visibility: showMessagesList }} className="chat-header">
            <img src={userImg} alt="User" className="user-image" />
            <p className="user-name-who-talk-with">{name}</p>
          </div>

          <div
            style={{ visibility: showMessagesList }}
            className="chat-messages"
          >
            {displayMessages()}
            <span ref={messagesEndRef} />
          </div>
          <div style={{ visibility: showMessagesList }} className="chat-input">
            <input
              onChange={handleInput}
              value={message}
              type="text"
              placeholder="Type your message..."
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;

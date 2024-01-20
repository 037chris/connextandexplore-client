import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { useUserIDContext } from "../../UserIDContext";
import { getChat, getUser, sendChatMessage } from "../../backend/boardapi";
import { MessageResource } from "../../Resources";
import { Grid } from "@mui/material";

const serverUrl = "https://localhost:443";
const socket = io(serverUrl);

interface ChatProps {
  chatId: string | undefined;
}

const Chat: React.FC<ChatProps> = ({ chatId }) => {
  const { userID } = useUserIDContext();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<MessageResource[]>([]);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const currentUser = await getUser(userID!);
        setFirstName(currentUser.name.first);
        setLastName(currentUser.name.last);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (userID) fetchUserProfile();

    socket.emit("join_room", { roomId: chatId });

    socket.on("receive_message", ({ user, message, time }) => {
      setMessages([
        ...messages,
        { user: user, username: user, message: message, time: time },
      ]);
    });

    return () => {};
  }, [userID, socket, messages, chatId]);

  useEffect(() => {
    const fetchChat = async () => {
      const chat = await getChat(chatId!);
      setMessages(chat.messages);
    };

    if (chatId) fetchChat();

    return () => {};
  }, [userID, chatId]);

  const sendMessage = async () => {
    if (socket && messageInput.trim() !== "") {
      const chat = await sendChatMessage(chatId!, messageInput);
      const chatTime = chat.messages[chat.messages.length - 1].time;
      socket.emit("send_message", {
        user: firstName + " " + lastName,
        message: messageInput,
        roomId: chatId,
        time: chatTime,
      });
      const newMessage = {
        user: userID!,
        username: firstName + " " + lastName,
        message: messageInput,
        time: chatTime,
      };
      setMessages([...messages, newMessage]);
      setMessageInput("");
    }
  };

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollIntoView();
    }
  }, [messages]);

  return (
    <div className="chat-window">
      <div className="inner-chat">
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.user === userID && (
              <>
                <div className="chat-bubble-user">
                  <small>
                    <p>{msg.username}</p>
                  </small>
                  <p>{msg.message}</p>
                </div>
                <small>
                  <p className="chat-info">{msg.time}</p>
                </small>
              </>
            )}
            {msg.user !== userID && (
              <>
                <div className="chat-bubble-respond">
                  <small>
                    <p>{msg.username}</p>
                  </small>
                  <p>{msg.message}</p>
                </div>
                <small>
                <p className="chat-info">{msg.time}</p>
                </small>
              </>
            )}
          </div>
        ))}
        <div ref={messageContainerRef}></div>
      </div>
      <div className="chat-bar">
        <input
          placeholder="Nachricht..."
          value={messageInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMessageInput(e.target.value)
          }
          onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button className="sending" onClick={sendMessage} >Senden</button>
      </div>
    </div>
  );
};

export default Chat;

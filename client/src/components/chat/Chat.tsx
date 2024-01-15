import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { useUserIDContext } from "../../UserIDContext";
import { getChat, getUser, sendChatMessage } from "../../backend/boardapi";
import { MessageResource } from "../../Resources";

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "88vh",
        overflowAnchor: "auto",
      }}
    >
      <div style={{ flex: "1", overflowY: "auto", padding: "20px" }}>
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.user === userID && (
              <>
                <div
                  style={{
                    width: "fit-content",
                    minWidth: "3vw",
                    maxWidth: "32vw",
                    marginLeft: "auto",
                    marginRight: "0",
                    marginBottom: "10px",
                    padding: "10px 10px 1px 10px",
                    borderRadius: "20px 20px 0 20px",
                    backgroundColor: "#3b82f6",
                    color: "white",
                    wordWrap: "break-word",
                  }}
                >
                  <small>
                    <p>{msg.username}</p>
                  </small>
                  <p>{msg.message}</p>
                </div>
                <small>
                  <p style={{ fontFamily: "monospace", width: "fit-content", marginLeft: "auto", marginRight: "0" }}>
                    {msg.time}
                  </p>
                </small>
              </>
            )}
            {msg.user !== userID && (
              <>
                <div
                  style={{
                    width: "fit-content",
                    minWidth: "3vw",
                    maxWidth: "32vw",
                    marginLeft: "0",
                    marginRight: "auto",
                    marginBottom: "10px",
                    padding: "10px 10px 1px 10px",
                    borderRadius: "20px 20px 20px 0",
                    backgroundColor: "#eeeeee",
                    color: "black",
                    wordWrap: "break-word",
                  }}
                >
                  <small>
                    <p>{msg.username}</p>
                  </small>
                  <p>{msg.message}</p>
                </div>
                <small>
                  <p style={{ fontFamily: "monospace", width: "fit-content", marginLeft: "0", marginRight: "auto" }}>
                    {msg.time}
                  </p>
                </small>
              </>
            )}
          </div>
        ))}
        <div ref={messageContainerRef}></div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
          borderTop: "1px solid #cccccc",
        }}
      >
        <input
          style={{
            flex: "1",
            padding: "10px",
            marginRight: "10px",
            border: "none",
            borderRadius: "5px",
            outline: "none",
          }}
          placeholder="Nachricht..."
          value={messageInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMessageInput(e.target.value)
          }
          onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button
          style={{
            padding: "10px 15px",
            borderRadius: "5px",
            backgroundColor: "#3b82f6",
            color: "white",
          }}
          onClick={sendMessage}
        >
          Senden
        </button>
      </div>
    </div>
  );
};

export default Chat;

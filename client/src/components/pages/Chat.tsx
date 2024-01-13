import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useUserIDContext } from "../../UserIDContext";
import { getUser } from "../../backend/boardapi";
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
  
    useEffect(() => {
      const fetchUserProfile = async () => {
        try {
          const currentUser = await getUser(userID!);
          setFirstName(currentUser.name.first);
          setLastName(currentUser.name.last);
  
          const storedHistory = localStorage.getItem("chatHistory");
          const chatHistory = storedHistory ? JSON.parse(storedHistory) : [];
          setMessages(chatHistory);
  
          console.log("User profile:", currentUser.name);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      };
  
      if (userID) {
        fetchUserProfile();
      }

      socket.emit("join_room", { roomId: chatId });
  
      socket.on("receive_message", ({ user, message }) => {
        setMessages([...messages, { user: user, message: message }]);
  
        localStorage.setItem("chatHistory", JSON.stringify([...messages, { user: user, message: message }]));
      });

      return () => {
        const currentChatId = chatId!;
        const previousChatId = localStorage.getItem("currentChatId");
        if (currentChatId !== previousChatId) {
          localStorage.clear();
          localStorage.setItem("currentChatId", currentChatId);
        }
      };
  
    }, [userID, socket, messages, chatId]);
  
    const sendMessage = async () => {
      if (socket && messageInput.trim() !== "") {
        socket.emit("send_message", {
          user: firstName + " " + lastName,
          message: messageInput,
          roomId: chatId,
        });
  
        const newMessage = { user: firstName + " " + lastName, message: messageInput };
        setMessages([...messages, newMessage]);
        localStorage.setItem("chatHistory", JSON.stringify([...messages, newMessage]));
        setMessageInput("");
      }
    };


  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.user}: {msg.message}
          </div>
        ))}
      </div>
      <div>
        <input
          placeholder="Nachricht..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>Senden</button>
      </div>
    </div>
  );
};

export default Chat;

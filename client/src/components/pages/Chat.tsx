import React, { useState, useEffect } from "react";
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
  
      socket.on("receive_message", ({ user, message }) => {
        setMessages([...messages, { user: user, username: user, message: message }]);
      });

      return () => {
      };
  
    }, [userID, socket, messages, chatId]);

    useEffect(() => {
      const fetchChat = async () => {
        const chat = await getChat(chatId!);
        setMessages(chat.messages);
      }

      if(chatId) fetchChat();

      return () => {}
    }, [])
  
    const sendMessage = async () => {
      if (socket && messageInput.trim() !== "") {
        socket.emit("send_message", {
          user: firstName + " " + lastName,
          message: messageInput,
          roomId: chatId,
        });
  
        const newMessage = { user: firstName + " " + lastName, username: firstName + " " + lastName, message: messageInput };
        setMessages([...messages, newMessage]);
        setMessageInput("");
        await sendChatMessage(chatId!, messageInput);
      }
    };


  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.username}: {msg.message}
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

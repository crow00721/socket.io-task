import React, { useEffect, useState } from "react";
import { createSocket } from "../socket";
import API from "../Api";

export default function Chat() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [toUserId, setToUserId] = useState("");

  useEffect(() => {
    const s = createSocket();
    setSocket(s);

    s.on("receive_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => s.disconnect();
  }, []);

  const sendMessage = () => {
    socket.emit("send_message", {
      toUserId,
      content: text,
    });

    setText("");
  };

  const loadMessages = async () => {
    const res = await API.get(`/chat/messages?user2=${toUserId}`);
    setMessages(res.data);
  };

  return (
    <div>
      <h2>Chat</h2>

      <input
        placeholder="Receiver ID"
        onChange={(e) => setToUserId(e.target.value)}
      />
      <button onClick={loadMessages}>Load Messages</button>

      <div>
        {messages.map((m, i) => (
          <p key={i}>{m.content}</p>
        ))}
      </div>

      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
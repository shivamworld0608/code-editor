import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import io from 'socket.io-client';

interface Message {
  username: string;
  message: string;
  timestamp: Date;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const { user } = useAuth();
  const socketRef = useRef<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    socketRef.current = io('http://localhost:3000', {
      auth: { token }
    });

    socketRef.current.emit('joinRoom', 'mainRoom');

    socketRef.current.on('chatMessage', (message: Message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() && user) {
      socketRef.current.emit('chatMessage', { roomId: 'mainRoom', message: newMessage });
      setNewMessage('');
    }
  };

  return (
    <div className="w-64 bg-gray-100 p-4 flex flex-col">
      <h2 className="text-lg font-semibold mb-2">Chat</h2>
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2 p-2 bg-white rounded">
            <span className="font-bold">{msg.username}: </span>
            {msg.message}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 border rounded-l"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white p-2 rounded-r"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default Chat;
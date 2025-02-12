import React, { useState } from 'react';
import { Search, Send } from 'lucide-react';

const Message = {
  id: "",
  senderId: "",
  receiverId: "",
  content: "",
  timestamp: "",
  read: true,
}

const Chat = {
  id: "",
  user: {
    id: "",
    name: "",
    avatar: "",
    lastSeen: "",
  },
  lastMessage: Message,
  unreadCount: 2,
}

const mockChats = [
  {
    id: '1',
    user: {
      id: 'u1',
      name: 'John Doe',
      avatar: 'https://source.unsplash.com/100x100/?portrait-man-1',
      lastSeen: '2024-03-15T10:30:00'
    },
    lastMessage: {
      id: 'm1',
      senderId: 'u1',
      receiverId: 'p1',
      content: 'Hi, I would like to book a cleaning service for next week.',
      timestamp: '2024-03-15T10:30:00',
      read: false
    },
    unreadCount: 2
  },
  {
    id: '2',
    user: {
      id: 'u2',
      name: 'Sarah Smith',
      avatar: 'https://source.unsplash.com/100x100/?portrait-woman-1',
      lastSeen: '2024-03-15T09:45:00'
    },
    lastMessage: {
      id: 'm2',
      senderId: 'p1',
      receiverId: 'u2',
      content: 'Yes, I can help you with that. What time works best for you?',
      timestamp: '2024-03-15T09:45:00',
      read: true
    },
    unreadCount: 0
  }
];

const mockMessages = [
  {
    id: 'm1',
    senderId: 'u1',
    receiverId: 'p1',
    content: 'Hi, I would like to book a cleaning service for next week.',
    timestamp: '2024-03-15T10:30:00',
    read: true
  },
  {
    id: 'm2',
    senderId: 'p1',
    receiverId: 'u1',
    content: 'Hello! I would be happy to help you with that. What day and time would work best for you?',
    timestamp: '2024-03-15T10:31:00',
    read: true
  },
  {
    id: 'm3',
    senderId: 'u1',
    receiverId: 'p1',
    content: 'I was thinking next Tuesday around 10 AM. Would that work?',
    timestamp: '2024-03-15T10:32:00',
    read: true
  }
];

export function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(Chat || null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // In a real app, this would send the message through a WebSocket
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
      <div className="flex h-full">
        {/* Chat List */}
        <div className="w-1/3 border-r">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="overflow-y-auto" style={{ height: 'calc(100% - 73px)' }}>
            {mockChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${selectedChat?.id === chat.id ? 'bg-blue-50' : ''
                  }`}
              >
                <div className="flex gap-3">
                  <img
                    src={chat.user.avatar}
                    alt={chat.user.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold truncate">{chat.user.name}</h3>
                      <span className="text-sm text-gray-500">
                        {new Date(chat.lastMessage.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {chat.lastMessage.content}
                    </p>
                    {chat.unreadCount > 0 && (
                      <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-600 rounded-full">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        {selectedChat ? (
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center gap-3">
              <img
                src={selectedChat.user.avatar}
                alt={selectedChat.user.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-semibold">{selectedChat.user.name}</h3>
                <p className="text-sm text-gray-600">
                  Last seen {new Date(selectedChat.user.lastSeen).toLocaleTimeString()}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {mockMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === 'p1' ? 'justify-end' : 'justify-start'
                    }`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg px-4 py-2 ${message.senderId === 'p1'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100'
                      }`}
                  >
                    <p>{message.content}</p>
                    <p className={`text-xs mt-1 ${message.senderId === 'p1' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
  );
}
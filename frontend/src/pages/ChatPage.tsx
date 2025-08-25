import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PaperAirplaneIcon,
  PhotoIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';
import { formatDistanceToNow } from 'date-fns';

interface Message {
  id: string;
  content: string;
  timestamp: Date;
  senderId: string;
  type: 'text' | 'image';
  imageUrl?: string;
}

interface ChatUser {
  id: string;
  username: string;
  profilePic: string;
  lastSeen: Date;
  isOnline: boolean;
}

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  // Example data - replace with actual data from API
  const chats: ChatUser[] = [
    {
      id: '1',
      username: 'priya_styles',
      profilePic: '/images/avatars/user1.jpg',
      lastSeen: new Date(),
      isOnline: true,
    },
    {
      id: '2',
      username: 'fashion_forward',
      profilePic: '/images/avatars/user2.jpg',
      lastSeen: new Date(Date.now() - 1000 * 60 * 5),
      isOnline: false,
    },
    // Add more chat users...
  ];

  const messages: Message[] = [
    {
      id: '1',
      content: 'Hi, is this item still available?',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      senderId: '2',
      type: 'text',
    },
    {
      id: '2',
      content: 'Yes, it is! Are you interested?',
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
      senderId: '1',
      type: 'text',
    },
    {
      id: '3',
      content: '/images/products/detail1.jpg',
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
      senderId: '1',
      type: 'image',
      imageUrl: '/images/products/detail1.jpg',
    },
    // Add more messages...
  ];

  const handleSend = () => {
    if (!message.trim()) return;
    // TODO: Implement send message logic
    setMessage('');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Chat list */}
      <div className="w-full max-w-xs border-r border-gray-200 bg-white lg:max-w-sm">
        <div className="p-4">
          <h1 className="font-display text-xl font-bold text-gray-900">Messages</h1>
        </div>

        <div className="divide-y divide-gray-200">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`w-full p-4 text-left transition-colors hover:bg-gray-50 ${
                selectedChat === chat.id ? 'bg-primary-50' : ''
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={chat.profilePic}
                    alt={chat.username}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  {chat.isOnline && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 ring-2 ring-white" />
                  )}
                </div>
                <div className="flex-1 truncate">
                  <div className="flex items-center justify-between">
                    <h2 className="font-medium text-gray-900">{chat.username}</h2>
                    <p className="text-xs text-gray-500">
                      {formatDistanceToNow(chat.lastSeen, { addSuffix: true })}
                    </p>
                  </div>
                  <p className="truncate text-sm text-gray-500">
                    Click to view conversation
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat window */}
      <div className="flex flex-1 flex-col">
        {selectedChat ? (
          <>
            {/* Chat header */}
            <div className="flex items-center justify-between border-b border-gray-200 bg-white p-4">
              <div className="flex items-center space-x-4">
                <img
                  src={chats.find((c) => c.id === selectedChat)?.profilePic}
                  alt="User"
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <h2 className="font-medium text-gray-900">
                    {chats.find((c) => c.id === selectedChat)?.username}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {chats.find((c) => c.id === selectedChat)?.isOnline
                      ? 'Online'
                      : 'Offline'}
                  </p>
                </div>
              </div>
              <button className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                <EllipsisVerticalIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.senderId === '1' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`max-w-lg rounded-2xl px-4 py-2 ${
                        msg.senderId === '1'
                          ? 'bg-primary-600 text-white'
                          : 'bg-white text-gray-900'
                      }`}
                    >
                      {msg.type === 'text' ? (
                        <p>{msg.content}</p>
                      ) : (
                        <img
                          src={msg.imageUrl}
                          alt="Shared"
                          className="rounded-lg"
                        />
                      )}
                      <p
                        className={`mt-1 text-xs ${
                          msg.senderId === '1'
                            ? 'text-primary-200'
                            : 'text-gray-500'
                        }`}
                      >
                        {formatDistanceToNow(msg.timestamp, { addSuffix: true })}
                      </p>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message input */}
            <div className="border-t border-gray-200 bg-white p-4">
              <div className="flex items-center space-x-4">
                <button className="text-gray-400 hover:text-gray-500">
                  <PhotoIcon className="h-6 w-6" />
                </button>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 rounded-full border-gray-300 bg-gray-100 px-4 py-2 focus:border-primary-500 focus:ring-primary-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  className="rounded-full bg-primary-600 p-2 text-white hover:bg-primary-700"
                >
                  <PaperAirplaneIcon className="h-6 w-6" />
                </motion.button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center bg-gray-50">
            <div className="text-center">
              <h3 className="font-display text-lg font-medium text-gray-900">
                Select a conversation
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Choose a chat from the left to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;

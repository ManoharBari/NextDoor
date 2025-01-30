import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Provider } from '../../types';

interface ChatDialogProps {
  isOpen: boolean;
  onClose: () => void;
  provider: Provider;
}

export function ChatDialog({ isOpen, onClose, provider }: ChatDialogProps) {
  const [message, setMessage] = useState('');
  const { isAuthenticated } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the message through a WebSocket
    console.log('Message sent:', { provider, message });
    setMessage('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md h-[600px] flex flex-col relative">
        <div className="p-4 border-b">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <img
              src={provider.avatar}
              alt={provider.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-semibold">{provider.name}</h3>
              <p className="text-sm text-gray-600">{provider.profession}</p>
            </div>
          </div>
        </div>

        {!isAuthenticated ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-600 mb-4">Please sign in to chat</p>
              <button
                onClick={onClose}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Sign In
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {/* Chat messages would go here */}
                <p className="text-center text-gray-500 text-sm">
                  Start chatting with {provider.name}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
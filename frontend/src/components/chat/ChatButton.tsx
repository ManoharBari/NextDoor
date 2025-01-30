import React from 'react';
import { MessageCircle } from 'lucide-react';

interface ChatButtonProps {
  providerId: string;
  onChat: (providerId: string) => void;
}

export function ChatButton({ providerId, onChat }: ChatButtonProps) {
  return (
    <button
      onClick={() => onChat(providerId)}
      className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
      aria-label="Chat with provider"
    >
      <MessageCircle className="w-5 h-5" />
    </button>
  );
}
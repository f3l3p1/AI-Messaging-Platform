"use client";

import React, { useEffect, useState, useRef } from 'react';
import { format, isToday, isYesterday, isThisWeek } from 'date-fns';

interface Message {
  id: string;
  sender: string;
  content: string;
  message_date: string;
}

const cleanDate = (dateString: string): Date => {
  const fixedDateString = dateString.replace(/:(\d{4,})/, ''); // Fix malformed dates
  return new Date(fixedDateString);
};

const MessageViewer = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [selectedMessageIndex, setSelectedMessageIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/messages');
        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }
        const data = await response.json();
        const formattedMessages = data.map((msg: any) => ({
          id: msg.id.toString(),
          sender: msg.bot_sender === 1 ? 'AI' : 'User',
          content: msg.message_text,
          message_date: msg.message_date,
        }));
        setMessages(formattedMessages);
        setFilteredMessages(formattedMessages);
      } catch (error) {
        console.error('Unable to load messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredMessages(
      messages.filter((message) => message.content.toLowerCase().includes(query))
    );
  };

  // Keyboard navigation handler
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        setSelectedMessageIndex((prev) =>
          prev === null ? 0 : Math.min(prev + 1, filteredMessages.length - 1)
        );
      } else if (event.key === 'ArrowUp') {
        setSelectedMessageIndex((prev) => (prev === null ? 0 : Math.max(prev - 1, 0)));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredMessages]);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content).then(() => {
      alert('Message copied to clipboard!');
    });
  };

  const isSelected = (index: number) => index === selectedMessageIndex;

  return (
    <div className="message-viewer">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search messages..."
        className="search-input"
        aria-label="Search messages"
      />

      {filteredMessages.map((message, index) => (
        <div
          key={message.id}
          className={`message ${message.sender === 'AI' ? 'ai-message' : 'user-message'} ${
            isSelected(index) ? 'selected-message' : ''
          }`}
          role="region"
          aria-label={`Message from ${message.sender}`}
        >
          <p>{message.content}</p>
          <span className="timestamp">
            {cleanDate(message.message_date).toLocaleString()}
          </span>
          <button onClick={() => copyToClipboard(message.content)} className="copy-button">
            Copy
          </button>
        </div>
      ))}

      <div ref={bottomRef}></div>

      <button onClick={scrollToBottom} className="scroll-button">
        Jump to Bottom
      </button>
    </div>
  );
};

export default MessageViewer;

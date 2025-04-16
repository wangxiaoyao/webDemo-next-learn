'use client';

import { useChat } from '@ai-sdk/react';
import React, { useRef, useEffect, useState } from 'react';

export default function ChatbotDemo() {
  const [error, setError] = useState<string | null>(null);

  const { messages, input, handleInputChange, handleSubmit, status } = useChat({
    api: '/api/chat',
    // body: {
    //   // Tell the hook we're not using streaming
    //   stream: false,
    // },
    // data: [],
    onResponse: (response) => {
      console.log('Response from API:', response);
      if (!response.ok) {
        response
          .json()
          .then((data) => {
            setError(data.error || 'Error communicating with the AI service');
          })
          .catch(() => {
            setError('Failed to parse error response');
          });
      } else {
        setError(null);
      }
    },
    onFinish: (message) => {
      console.log('Finished message:', message);
    },
    onError: (err) => {
      console.error('Chat error:', err);
      setError(err.message || 'An error occurred during the conversation');
    },
  });

  // Debug: Log messages whenever they change
  useEffect(() => {
    console.log('Current messages:', messages, status);
  }, [messages, status]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="mx-auto max-w-3xl p-4">
      <h1 className="mb-4 text-2xl font-bold">Aliyun Bailian Chatbot Demo</h1>

      {error && (
        <div className="mb-4 rounded-lg bg-red-100 p-3 text-red-700">
          <p>Error: {error}</p>
        </div>
      )}

      <div className="mb-4 overflow-hidden rounded-lg border">
        <div className="h-[500px] overflow-y-auto p-4">
          {messages.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              <p>Start a conversation with the chatbot!</p>
              <p className="mt-2">
                Try asking something like: What can you help me with?
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 ${
                  message.role === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <div
                  className={`inline-block rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t p-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              className="flex-1 rounded border px-3 py-2"
              placeholder="Type your message..."
              value={input}
              onChange={handleInputChange}
              disabled={status !== 'ready'}
            />
            <button
              type="submit"
              disabled={status !== 'ready' || input.trim() === ''}
              className="rounded bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
            >
              {status !== 'ready' ? 'Thinking...' : 'Send'}
            </button>
          </form>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500">
        <p>Powered by Aliyun Bailian API</p>
      </div>
    </div>
  );
}

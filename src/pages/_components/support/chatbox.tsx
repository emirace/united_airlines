// src/components/ChatBox.tsx
import React, { useState } from "react";

interface ChatBoxProps {
  onClose: () => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ onClose }) => {
  const [showFAQ, setShowFAQ] = useState(true);

  const handleStartConversation = () => {
    setShowFAQ(false);
  };

  return (
    <div className="fixed bottom-20 right-4 bg-white border border-gray-300 rounded-lg shadow-lg w-80 h-96">
      <div className="flex justify-between items-center p-2 border-b border-gray-300">
        <h2 className="text-lg font-semibold">
          {showFAQ ? "FAQ" : "Support Chat"}
        </h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ✖
        </button>
      </div>
      <div className="p-4 overflow-y-auto">
        {showFAQ ? (
          <div>
            <h3 className="font-semibold mb-2">Frequently Asked Questions</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>How can I reset my password?</li>
              <li>Where can I find my order history?</li>
              <li>How do I contact support?</li>
              {/* Add more FAQs as needed */}
            </ul>
            <button
              onClick={handleStartConversation}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Start a conversation
            </button>
          </div>
        ) : (
          <div>
            {/* Chat content goes here */}
            <p>Welcome to support chat!</p>
          </div>
        )}
      </div>
      {!showFAQ && (
        <div className="p-2 border-t border-gray-300">
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="Type your message..."
          />
        </div>
      )}
    </div>
  );
};

export default ChatBox;

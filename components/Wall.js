import { useState, useEffect } from 'react';

export default function Wall({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [author, setAuthor] = useState('');

  // Define fetchMessages as a standalone function
  const fetchMessages = async () => {
    const res = await fetch('/api/getMessages');
    const data = await res.json();
    setMessages(data.messages);
  };

  // Fetch messages initially and after each message is added
  useEffect(() => {
    fetchMessages();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/postMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, author }),
    });
    if (res.ok) {
      setMessage('');
      setAuthor('');
      // Refresh messages
      await fetchMessages();
    }
  };

  const handleClose = () => {
    setMessage('');
    setAuthor('');
    if (typeof onClose === 'function') {
      onClose(); // Call the onClose function only if it's a function
    }
  };
  

  return (
    <div className="relative bg-white shadow-lg rounded-lg p-4">
      <button onClick={handleClose} className="absolute top-0 right-0 p-2 m-2 text-lg bg-transparent hover:bg-gray-200 rounded-full">
        &times; {/* This is a simple "×" character used as a close icon */}
      </button>
    
  
      <div className="mt-8 space-y-4">
        {messages.map(({ _id, message, author }) => (
          <div key={_id} className="flex items-start space-x-3">
            <div className="avatar">
              <div className="w-10 rounded-full">
                {/* Placeholder for user avatar; you might want to replace it with the author's avatar if available */}
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="User avatar" />
              </div>
            </div>
            <div className="chat-bubble">
              <div className="font-bold">{author}</div>
              <p>{message}</p>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
       
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message..."
          className="textarea textarea-bordered"
        ></textarea>
        <button type="submit" className="btn btn-primary">
          Post Message
        </button>
      </form>
    </div>
  );
  
  
}

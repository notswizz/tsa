import { useState, useEffect } from 'react';

export default function Wall() {
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

  // Function to simulate closing (e.g., hiding the component or clearing fields)
  const handleClose = () => {
    // Your logic here. For demonstration, I'll just clear the message and author
    setMessage('');
    setAuthor('');
  };

  return (
    <div className="relative bg-white shadow-lg rounded-lg p-4">
      <button onClick={handleClose} className="absolute top-0 right-0 p-2 m-2 text-lg bg-transparent hover:bg-gray-200 rounded-full">
        &times; {/* This is a simple "×" character used as a close icon */}
      </button>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Your name"
          className="input input-bordered"
        />
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

      <div className="mt-8">
        {messages.map(({ _id, message, author }) => (
          <div key={_id} className="p-4 border-b">
            <p className="font-bold">{author}</p>
            <p>{message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

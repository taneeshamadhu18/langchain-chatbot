import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage = { text: input, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsTyping(true);

    try {
      const response = await axios.post('http://localhost:5000/query', { query: input });
      const botMessage = { text: response.data.response, sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Error connecting to the bot.', sender: 'bot' },
      ]);
    }

    setIsTyping(false);
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div style={{
      background: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    }}>
      <div style={{
        maxWidth: '400px',
        background: '#fff',
        borderRadius: '20px',
        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
        padding: '20px',
        width: '100%',
      }}>
        <h1 style={{ textAlign: 'center', color: '#FF6F91' }}>Chatbot 💬</h1>

        <div style={{
          background: '#fefefe',
          border: '1px solid #ddd',
          borderRadius: '15px',
          padding: '15px',
          height: '400px',
          overflowY: 'auto',
        }}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                marginBottom: '8px',
                animation: 'fadeIn 0.5s',
              }}
            >
              <div
                style={{
                  background: msg.sender === 'user' ? '#FF6F91' : '#F3F3F3',
                  color: msg.sender === 'user' ? '#fff' : '#000',
                  padding: '12px 18px',
                  borderRadius: '25px',
                  maxWidth: '70%',
                  wordWrap: 'break-word',
                  position: 'relative',
                  transition: 'transform 0.3s ease',
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '8px' }}>
              <div style={{
                background: '#F3F3F3',
                color: '#000',
                padding: '12px 18px',
                borderRadius: '25px',
                maxWidth: '70%',
                wordWrap: 'break-word',
                fontStyle: 'italic',
              }}>
                Typing...
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div style={{ display: 'flex', marginTop: '10px' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            style={{
              flex: 1,
              padding: '12px',
              border: '1px solid #ccc',
              borderRadius: '20px',
              outline: 'none',
              backgroundColor: '#ffe4e1',
            }}
          />
          <button
            onClick={handleSend}
            style={{
              padding: '10px 20px',
              marginLeft: '5px',
              backgroundColor: '#FF6F91',
              color: '#fff',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer',
              transition: 'background 0.3s, transform 0.2s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#FF3D6A')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#FF6F91')}
            onMouseDown={(e) => (e.target.style.transform = 'scale(0.95)')}
            onMouseUp={(e) => (e.target.style.transform = 'scale(1)')}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

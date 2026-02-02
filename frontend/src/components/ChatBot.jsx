import React, { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const botIntro = 'Hi! I am your site assistant. You can ask me to navigate, search, or get help.';

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: botIntro }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);
  const navigate = useNavigate();
  const { setToken, setCartItems } = useContext(ShopContext);

  const handleUserInput = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(msgs => [...msgs, { from: 'user', text: userMsg }]);
    setInput('');
    setTimeout(() => handleBotResponse(userMsg), 400);
  };

  const handleBotResponse = (msg) => {
    let lower = msg.toLowerCase();
    if (lower.includes('login')) {
      setMessages(msgs => [...msgs, { from: 'bot', text: 'Navigating to Login page. Please enter your credentials.' }]);
      navigate('/login');
    } else if (lower.includes('logout')) {
      setToken('');
      setCartItems && setCartItems({});
      localStorage.removeItem('token');
      setMessages(msgs => [...msgs, { from: 'bot', text: 'You have been logged out.' }]);
      navigate('/login');
    } else if (lower.includes('home')) {
      setMessages(msgs => [...msgs, { from: 'bot', text: 'Navigating to Home page.' }]);
      navigate('/');
    } else if (lower.includes('shop') || lower.includes('products')) {
      setMessages(msgs => [...msgs, { from: 'bot', text: 'Opening Shop/Collection.' }]);
      navigate('/collection');
    } else if (lower.includes('cart')) {
      setMessages(msgs => [...msgs, { from: 'bot', text: 'Opening your Cart.' }]);
      navigate('/cart');
    } else if (lower.includes('orders')) {
      setMessages(msgs => [...msgs, { from: 'bot', text: 'Showing your Orders.' }]);
      navigate('/orders');
    } else if (lower.includes('about')) {
      setMessages(msgs => [...msgs, { from: 'bot', text: 'Navigating to About page.' }]);
      navigate('/about');
    } else if (lower.includes('contact')) {
      setMessages(msgs => [...msgs, { from: 'bot', text: 'Opening Contact page.' }]);
      navigate('/contact');
    } else {
      setMessages(msgs => [...msgs, { from: 'bot', text: "Sorry, I didn't understand. Try commands like: 'Go to cart', 'Show products', 'Open orders', 'Contact', 'Login', 'Logout', etc." }]);
    }
  };

  // Scroll to bottom on new message
  React.useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 1000, background: '#22c55e', color: 'white', borderRadius: '50%', width: 56, height: 56, border: 'none', boxShadow: '0 2px 8px #0002', fontSize: 28 }}
        aria-label="Open chatbot"
      >💬</button>
      {open && (
        <div style={{ position: 'fixed', bottom: 100, right: 32, width: 320, maxWidth: '90vw', background: 'white', borderRadius: 16, boxShadow: '0 4px 24px #0003', zIndex: 1001, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ background: '#22c55e', color: 'white', padding: 12, fontWeight: 600 }}>Site Assistant</div>
          <div style={{ flex: 1, padding: 12, height: 300, overflowY: 'auto', background: '#f8fafc' }}>
            {messages.map((m, i) => (
              <div key={i} style={{ textAlign: m.from === 'bot' ? 'left' : 'right', margin: '8px 0' }}>
                <span style={{ background: m.from === 'bot' ? '#e5e7eb' : '#bbf7d0', color: '#222', padding: '8px 12px', borderRadius: 12, display: 'inline-block', maxWidth: '80%' }}>{m.text}</span>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <form onSubmit={handleUserInput} style={{ display: 'flex', borderTop: '1px solid #eee' }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your message..."
              style={{ flex: 1, border: 'none', padding: 10, fontSize: 15, outline: 'none', background: 'white' }}
            />
            <button type="submit" style={{ background: '#22c55e', color: 'white', border: 'none', padding: '0 16px', fontWeight: 600, fontSize: 15, borderRadius: 0 }}>Send</button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;

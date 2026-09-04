import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, Compass } from 'lucide-react';

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I am SmartTour AI, your intelligent travel assistant. Ask me anything about trip planning, budget optimization, hidden gems, or weather updates!'
    }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (open) scrollToBottom();
  }, [messages, open]);

  const handleSend = async (userMsg) => {
    const textToSend = userMsg || input;
    if (!textToSend.trim() || loading) return;

    // Add user message
    const newMsgs = [...messages, { sender: 'user', text: textToSend }];
    setMessages(newMsgs);
    if (!userMsg) setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/ai/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend })
      });
      const data = await res.json();
      if (data.success) {
        setMessages([...newMsgs, { sender: 'bot', text: data.reply }]);
      } else {
        setMessages([...newMsgs, { sender: 'bot', text: "Sorry, I'm having trouble processing that right now." }]);
      }
    } catch (err) {
      setMessages([...newMsgs, { sender: 'bot', text: "Network error. Please make sure backend is connected." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 1100 }}>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #10b981 0%, #0d9488 100%)',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.5)',
            transition: 'transform 0.2s'
          }}
          className="btn-primary"
        >
          <Bot size={28} />
        </button>
      )}

      {open && (
        <div className="glass-panel" style={{
          width: '360px',
          height: '500px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 12px 40px rgba(0,0,0,0.6)'
        }}>
          {/* Chat Header */}
          <div style={{
            padding: '16px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(16, 185, 129, 0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={20} color="#10b981" />
              <div>
                <h4 style={{ fontSize: '0.95rem', color: '#f8fafc' }}>SmartTour AI Assistant</h4>
                <span style={{ fontSize: '0.7rem', color: '#34d399' }}>● Online & Context Aware</span>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Body */}
          <div style={{
            flex: 1,
            padding: '16px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  fontSize: '0.85rem',
                  lineHeight: '1.4',
                  background: m.sender === 'user' ? 'linear-gradient(135deg, #10b981 0%, #0d9488 100%)' : 'rgba(255,255,255,0.08)',
                  color: '#f8fafc'
                }}
              >
                {m.text}
              </div>
            ))}
            {loading && (
              <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontStyle: 'italic' }}>
                SmartTour AI is thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick chips */}
          <div style={{ padding: '8px 12px', display: 'flex', gap: '6px', overflowX: 'auto', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <button
              onClick={() => handleSend("Where can I travel for ₹5,000?")}
              style={chipStyle}
            >
              ₹5,000 Trip
            </button>
            <button
              onClick={() => handleSend("Suggest a senior friendly trip")}
              style={chipStyle}
            >
              Senior Friendly
            </button>
            <button
              onClick={() => handleSend("Best photography spots")}
              style={chipStyle}
            >
              Photo Spots
            </button>
          </div>

          {/* Input Footer */}
          <div style={{
            padding: '12px',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            gap: '8px'
          }}>
            <input
              type="text"
              placeholder="Ask AI trip advice..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                padding: '8px 12px',
                color: '#fff',
                fontSize: '0.85rem'
              }}
            />
            <button
              onClick={() => handleSend()}
              style={{
                background: '#10b981',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                padding: '8px 12px',
                cursor: 'pointer'
              }}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const chipStyle = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#cbd5e1',
  borderRadius: '12px',
  padding: '4px 8px',
  fontSize: '0.7rem',
  whiteSpace: 'nowrap',
  cursor: 'pointer'
};

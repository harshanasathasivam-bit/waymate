import React, { useState, useRef, useEffect } from 'react';
import {
  X, Send, Mic, Volume2, ChevronDown, Sparkles
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import {
  CHAT_LANGUAGES,
  getInitialGreeting,
  generateHumanResponse
} from '../services/chatbotDialogueService';
import {
  speakText,
  stopSpeaking,
  createSpeechRecognizer
} from '../services/translationVoiceService';

export default function AIChatbot({
  currentDestination = { name: 'Chennai' },
  budget = 5000,
  savedCount = 0
}) {
  const { currentLang: globalLang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // ONLY 'chat' | 'speak'
  const [chatLang, setChatLang] = useState(globalLang);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const destName = currentDestination?.name || 'Chennai';

  // Sync with global language whenever globalLang changes
  useEffect(() => {
    setChatLang(globalLang);
  }, [globalLang]);

  // Chat messages
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: getInitialGreeting(globalLang, destName),
      time: 'Just now'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Voice / Speak state
  const [isListening, setIsListening] = useState(false);
  const [spokenTranscript, setSpokenTranscript] = useState('');
  const [speechRecognizer, setSpeechRecognizer] = useState(null);

  const messagesEndRef = useRef(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (isOpen && activeTab === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, activeTab]);

  // Handle Chatbot local language change
  const handleChatLangChange = (newCode) => {
    setChatLang(newCode);
    setLangDropdownOpen(false);
    const greeting = getInitialGreeting(newCode, destName);
    setMessages(prev => [
      ...prev,
      { sender: 'bot', text: greeting, time: 'Just now' }
    ]);
  };

  // Configure Speech Recognizer for selected chat language
  useEffect(() => {
    const recognizer = createSpeechRecognizer({
      onResult: (text, isFinal) => {
        if (activeTab === 'speak') {
          setSpokenTranscript(text);
          if (isFinal) {
            handleProcessSpokenMessage(text);
          }
        } else {
          setInputMessage(text);
        }
      },
      onError: () => {
        setIsListening(false);
      },
      onEnd: () => {
        setIsListening(false);
      }
    });

    if (recognizer) {
      const currentLangObj = CHAT_LANGUAGES.find(l => l.code === chatLang);
      recognizer.lang = currentLangObj?.locale || 'en-IN';
    }

    setSpeechRecognizer(recognizer);

    return () => {
      stopSpeaking();
    };
  }, [chatLang, activeTab]);

  // Toggle Voice Recording
  const handleToggleVoice = () => {
    if (!speechRecognizer) {
      alert(t('chat.micNotSupported', "Voice input isn't supported in this browser. You can continue using Chat."));
      return;
    }

    if (isListening) {
      speechRecognizer.stop();
      setIsListening(false);
    } else {
      try {
        const currentLangObj = CHAT_LANGUAGES.find(l => l.code === chatLang);
        speechRecognizer.lang = currentLangObj?.locale || 'en-IN';
        speechRecognizer.start();
        setIsListening(true);
      } catch (e) {
        setIsListening(false);
      }
    }
  };

  // Core AI Query Dispatcher (Backend AI -> Seamless Grounded Fallback)
  const queryAIBackend = async (userText) => {
    try {
      const payload = {
        message: userText,
        context: {
          destination: currentDestination,
          budget: budget || 5000,
          language: chatLang,
          crowdInfo: currentDestination?.crowdLevel || 'Moderate',
          nearbyContext: (currentDestination?.attractions || []).slice(0, 3)
        },
        conversationHistory: messages.slice(-6)
      };

      const response = await fetch('/api/ai/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        if (data.reply) {
          return data.reply;
        }
      }
    } catch (err) {
      console.warn('[WayMate Chatbot] Backend query failed, using offline fallback dialogue engine:', err);
    }

    // Graceful offline fallback
    return generateHumanResponse({
      userMessage: userText,
      currentLanguage: chatLang,
      currentDestination,
      tripContext: { budget }
    });
  };

  // Send message in Chat mode
  const handleSendMessage = async (textToSend = inputMessage) => {
    const cleanText = (textToSend || '').trim();
    if (!cleanText || isTyping) return;

    const newMessages = [
      ...messages,
      { sender: 'user', text: cleanText, time: 'Just now' }
    ];
    setMessages(newMessages);
    setInputMessage('');
    setIsTyping(true);

    const botReply = await queryAIBackend(cleanText);

    setMessages(prev => [
      ...prev,
      { sender: 'bot', text: botReply, time: 'Just now' }
    ]);
    setIsTyping(false);
  };

  // Process spoken message in Speak mode
  const handleProcessSpokenMessage = async (spokenText) => {
    if (!spokenText.trim()) return;

    setMessages(prev => [
      ...prev,
      { sender: 'user', text: spokenText, time: 'Just now' }
    ]);
    setIsTyping(true);

    const botReply = await queryAIBackend(spokenText);

    setMessages(prev => [
      ...prev,
      { sender: 'bot', text: botReply, time: 'Just now' }
    ]);
    setIsTyping(false);

    // Speak the response back to the user in their selected language
    speakText(botReply, chatLang);
  };

  const currentLangObj = CHAT_LANGUAGES.find(l => l.code === chatLang) || CHAT_LANGUAGES[0];

  // Quick suggestions based on selected chat language
  const getQuickChips = (lang) => {
    switch (lang) {
      case 'ta':
        return ["அருகிலுள்ள இடங்கள்", "என் நாளைத் திட்டமிடு", "என்னிடம் ₹500 மட்டுமே உள்ளது", "சூரிய அஸ்தமன இடம்"];
      case 'hi':
        return ["आस-पास की जगहें", "मेरा दिन प्लान करें", "मेरे पास सिर्फ ₹500 बचे हैं", "सूर्यास्त का स्थान"];
      case 'te':
        return ["నా దగ్గర ప్రదేశాలు", "నా రోజును ప్లాన్ చేయండి", "నా దగ్గర ₹500 మాత్రమే ఉంది", "సూర్యాస్తమయ ప్రదేశం"];
      case 'kn':
        return ["ಹತ್ತಿರದ ಸ್ಥಳಗಳು", "ನನ್ನ ದಿನವನ್ನು ಯೋಜಿಸಿ", "ನನ್ನ ಬಳಿ ₹500 ಮಾತ್ರ ಇದೆ", "ಸೂರ್ಯಾಸ್ತದ ಸ್ಥಳ"];
      case 'ml':
        return ["അടുത്തുള്ള സ്ഥലങ്ങൾ", "എന്റെ ദിവസം പ്ലാൻ ചെയ്യൂ", "എനിക്ക് ₹500 മാത്രമേ ഉള്ളൂ", "സൂര്യാസ്തമയ സ്ഥലം"];
      case 'en':
      default:
        return ["Places near me", "Plan my day", "I only have ₹500 left", "Best sunset spot"];
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 2000 }}>
      
      {/* 1. Small Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            background: 'var(--text-primary)',
            color: '#ffffff',
            border: 'none',
            borderRadius: 'var(--radius-full)',
            padding: '12px 20px',
            fontSize: '0.88rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: 'var(--shadow-floating)',
            transition: 'all 0.2s ease'
          }}
          aria-label="Open WayMate Guide"
        >
          <Sparkles size={16} color="var(--brand-terracotta)" />
          <span>{t('chat.headerTitle', 'WayMate Guide')}</span>
        </button>
      )}

      {/* 2. Compact Modern Chatbot Panel (360-400px wide) */}
      {isOpen && (
        <div style={{
          width: '380px',
          height: '540px',
          maxWidth: 'calc(100vw - 32px)',
          background: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-light)',
          boxShadow: 'var(--shadow-floating)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          
          {/* Header with Title, Language Switcher, Subtitle, and Close Button */}
          <div style={{
            background: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border-light)',
            padding: '14px 18px',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={16} color="var(--brand-terracotta)" />
                  <span>{t('chat.headerTitle', 'WayMate Guide')}</span>
                </div>

                {/* Language Selector beside title */}
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                    style={{
                      background: '#ffffff',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-full)',
                      padding: '3px 8px',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px'
                    }}
                    aria-label="Select Chat Language"
                  >
                    <span>{currentLangObj.native}</span>
                    <ChevronDown size={11} />
                  </button>

                  {langDropdownOpen && (
                    <div style={{
                      position: 'absolute',
                      top: '28px',
                      left: 0,
                      width: '130px',
                      background: '#ffffff',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-sm)',
                      boxShadow: 'var(--shadow-floating)',
                      zIndex: 2100,
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '4px'
                    }}>
                      {CHAT_LANGUAGES.map(lang => (
                        <button
                          key={lang.code}
                          onClick={() => handleChatLangChange(lang.code)}
                          style={{
                            background: lang.code === chatLang ? 'var(--bg-surface)' : 'transparent',
                            border: 'none',
                            padding: '6px 10px',
                            fontSize: '0.78rem',
                            fontWeight: lang.code === chatLang ? 800 : 500,
                            color: lang.code === chatLang ? 'var(--brand-terracotta)' : 'var(--text-primary)',
                            cursor: 'pointer',
                            textAlign: 'left',
                            borderRadius: '4px'
                          }}
                        >
                          {lang.native} ({lang.name})
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  stopSpeaking();
                  setIsOpen(false);
                }}
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--border-light)',
                  borderRadius: '50%',
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--text-muted)'
                }}
                aria-label="Close"
              >
                <X size={15} />
              </button>
            </div>

            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              {t('chat.headerSubtitle', 'Your Travel Companion')}
            </div>
          </div>

          {/* EXACTLY TWO TABS: CHAT | SPEAK (No Translate Tab) */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid var(--border-light)',
            background: '#ffffff'
          }}>
            <button
              onClick={() => {
                setActiveTab('chat');
                stopSpeaking();
              }}
              style={{
                flex: 1,
                background: activeTab === 'chat' ? 'var(--bg-surface)' : 'transparent',
                border: 'none',
                borderBottom: activeTab === 'chat' ? '2px solid var(--brand-terracotta)' : '2px solid transparent',
                padding: '10px 0',
                fontSize: '0.82rem',
                fontWeight: 700,
                color: activeTab === 'chat' ? 'var(--brand-terracotta)' : 'var(--text-secondary)',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              {t('chat.tabChat', 'Chat')}
            </button>

            <button
              onClick={() => {
                setActiveTab('speak');
                stopSpeaking();
              }}
              style={{
                flex: 1,
                background: activeTab === 'speak' ? 'var(--bg-surface)' : 'transparent',
                border: 'none',
                borderBottom: activeTab === 'speak' ? '2px solid var(--brand-terracotta)' : '2px solid transparent',
                padding: '10px 0',
                fontSize: '0.82rem',
                fontWeight: 700,
                color: activeTab === 'speak' ? 'var(--brand-terracotta)' : 'var(--text-secondary)',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              {t('chat.tabSpeak', 'Speak')}
            </button>
          </div>

          {/* ================================================================= */}
          {/* MODE 1: CHAT MODE                                                 */}
          {/* ================================================================= */}
          {activeTab === 'chat' && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              
              {/* Conversation Stream */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    style={{
                      alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                      maxWidth: '85%'
                    }}
                  >
                    <div style={{
                      background: msg.sender === 'user' ? 'var(--brand-terracotta)' : 'var(--bg-surface)',
                      color: msg.sender === 'user' ? '#ffffff' : 'var(--text-primary)',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.86rem',
                      lineHeight: 1.5,
                      border: msg.sender === 'user' ? 'none' : '1px solid var(--border-light)'
                    }}>
                      <p style={{ whiteSpace: 'pre-line' }}>{msg.text}</p>
                    </div>

                    {/* Small Listen Button for Bot Responses */}
                    {msg.sender === 'bot' && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px', paddingLeft: '2px' }}>
                        <button
                          onClick={() => speakText(msg.text, chatLang)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-muted)',
                            fontSize: '0.72rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '3px'
                          }}
                          aria-label="Listen to response"
                        >
                          <Volume2 size={13} /> {t('chat.listen', 'Listen')}
                        </button>
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div style={{ alignSelf: 'flex-start', background: 'var(--bg-surface)', padding: '8px 14px', borderRadius: 'var(--radius-md)', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                    ...
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Suggestions (3-4 Clean Pills) */}
              <div style={{ padding: '6px 12px', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '6px', overflowX: 'auto' }}>
                {getQuickChips(chatLang).map((chip, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(chip)}
                    style={{
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-full)',
                      padding: '4px 10px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Bottom Input Bar: [ Type a message... ] [ 🎤 ] [ Send ] */}
              <div style={{
                padding: '10px 14px',
                borderTop: '1px solid var(--border-light)',
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
                background: '#ffffff'
              }}>
                <input
                  type="text"
                  placeholder={t('chat.inputPlaceholder', 'Type a message...')}
                  value={inputMessage}
                  onChange={e => setInputMessage(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                  style={{
                    flex: 1,
                    padding: '9px 14px',
                    borderRadius: 'var(--radius-full)',
                    border: '1.5px solid var(--border-light)',
                    fontSize: '0.85rem',
                    outline: 'none',
                    background: 'var(--bg-surface)',
                    fontFamily: 'var(--font-main)'
                  }}
                  aria-label="Message input"
                />

                <button
                  onClick={handleToggleVoice}
                  style={{
                    background: isListening ? '#ef4444' : 'var(--bg-surface)',
                    color: isListening ? '#ffffff' : 'var(--text-secondary)',
                    border: '1px solid var(--border-light)',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  title={isListening ? t('chat.listening', 'Listening...') : t('chat.tapToSpeak', 'Tap to speak')}
                  aria-label="Microphone input"
                >
                  <Mic size={16} />
                </button>

                <button
                  onClick={() => handleSendMessage()}
                  style={{
                    background: 'var(--brand-terracotta)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: 'var(--radius-full)',
                    padding: '8px 16px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  aria-label="Send message"
                >
                  {t('chat.send', 'Send')}
                </button>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* MODE 2: SPEAK MODE (Clean Voice Interface)                        */}
          {/* ================================================================= */}
          {activeTab === 'speak' && (
            <div style={{ flex: 1, padding: '24px 18px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', justifyContent: 'space-between' }}>
              
              <div style={{ width: '100%' }}>
                <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--brand-terracotta)', textTransform: 'uppercase' }}>
                  {currentLangObj.native} Voice
                </span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
                  {t('chat.headerTitle', 'WayMate Guide')}
                </h3>
              </div>

              {/* Center Microphone Button */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <button
                  onClick={handleToggleVoice}
                  style={{
                    width: '78px',
                    height: '78px',
                    borderRadius: '50%',
                    background: isListening ? '#ef4444' : 'var(--brand-terracotta)',
                    color: '#ffffff',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: isListening ? '0 0 24px rgba(239, 68, 68, 0.5)' : '0 8px 24px rgba(194, 65, 12, 0.35)',
                    transition: 'all 0.2s ease'
                  }}
                  aria-label="Tap to speak"
                >
                  <Mic size={34} />
                </button>

                <span style={{ fontSize: '0.84rem', fontWeight: 700, color: isListening ? '#ef4444' : 'var(--text-muted)' }}>
                  {isListening ? t('chat.listening', 'Listening...') : t('chat.tapToSpeak', 'Tap to speak')}
                </span>
              </div>

              {/* Display Spoken Input and Assistant Reply */}
              <div style={{ width: '100%', minHeight: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '10px' }}>
                {spokenTranscript ? (
                  <div style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-md)',
                    padding: '14px',
                    textAlign: 'left'
                  }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      {t('chat.youSaid', 'You said')}:
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', margin: '2px 0 8px 0' }}>
                      "{spokenTranscript}"
                    </div>

                    {messages[messages.length - 1]?.sender === 'bot' && (
                      <div>
                        <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--brand-terracotta)', textTransform: 'uppercase' }}>
                          {t('chat.assistant', 'Assistant')}:
                        </div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)', margin: '2px 0 8px 0' }}>
                          {messages[messages.length - 1].text}
                        </div>

                        <button
                          onClick={() => speakText(messages[messages.length - 1].text, chatLang)}
                          style={{
                            background: 'var(--brand-terracotta)',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: 'var(--radius-full)',
                            padding: '6px 14px',
                            fontSize: '0.76rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Volume2 size={13} /> {t('chat.listen', 'Listen')}
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {t('chat.tapToSpeak', 'Tap to speak')} ({currentLangObj.name})
                  </div>
                )}
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}

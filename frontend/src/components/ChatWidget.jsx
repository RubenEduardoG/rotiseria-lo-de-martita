import React, { useState } from 'react';

// === AVATAR DE MARTITA BOT EN SVG ===
const MartitaBotAvatar = () => (
  <svg
    viewBox="0 0 100 100"
    style={{ width: '40px', height: '40px', display: 'block' }}
  >
    <defs>
      <linearGradient id="avatarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#e0ac52', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#c08c42', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="48" fill="url(#avatarGradient)" />
    <path d="M50 8 C 55 8, 60 12, 60 18 C 60 18, 60 18, 60 18 C 60 18, 62 16, 65 16 C 70 16, 75 20, 75 25 C 75 30, 70 35, 65 35 L 35 35 C 30 35, 25 30, 25 25 C 25 20, 30 16, 35 16 C 38 16, 40 18, 40 18 C 40 18, 40 18, 40 18 C 40 12, 45 8, 50 8 Z" fill="#fff" />
    <rect x="35" y="35" width="30" height="40" rx="3" ry="3" fill="#fafafa" stroke="#e0ac52" strokeWidth="2" />
    <circle cx="43" cy="50" r="3" fill="#e0ac52" />
    <circle cx="57" cy="50" r="3" fill="#e0ac52" />
    <path d="M45 60 Q 50 65, 55 60" fill="none" stroke="#e0ac52" strokeWidth="2" strokeLinecap="round" />
    <circle cx="50" cy="50" r="45" fill="none" stroke="#fafafa" strokeWidth="3" strokeDasharray="10 6" />
  </svg>
);

// === EL COMPONENTE DEL CHAT ===
export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: '¡Hola! Soy Martita Bot 🤖 ¿En qué te puedo ayudar hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const getBotResponse = (query) => {
    const text = query.toLowerCase();
    if (text.includes('hola') || text.includes('buenas')) {
      return '¡Hola! Bienvenido a Lo de Martita 🍕 ¿Buscás el menú del día o información sobre pedidos?';
    }
    if (text.includes('menu') || text.includes('menú') || text.includes('pizza') || text.includes('comida')) {
      return 'Tenemos variedad de Pizzas, Empanadas, Milanesas, Hamburguesas y Pastas. Podés ver el catálogo completo en la pantalla principal 📜.';
    }
    if (text.includes('horario') || text.includes('abren') || text.includes('hora')) {
      return 'Atendemos de Lunes a Sábados de 19:30 a 23:30 hs. Los domingos permanecemos cerrados 🕒.';
    }
    if (text.includes('envio') || text.includes('envío') || text.includes('delivery')) {
      return '¡Sí! Realizamos envíos a domicilio en Villa Ballester y zonas cercanas 🛵.';
    }
    if (text.includes('tacc') || text.includes('celiaco') || text.includes('celíaco')) {
      return 'No contamos con cocina exclusiva sin TACC, por lo que puede haber contaminación cruzada ⚠️.';
    }
    return '¡Gracias por tu mensaje! Podés armar tu pedido directamente en la web y mandárnoslo por WhatsApp en un clic 📲.';
  };

  const handleSend = () => {
    if (!input.trim() || loading) return;
    const userMessage = input.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      const botReply = getBotResponse(userMessage);
      setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
      setLoading(false);
    }, 1000);
  };

  // --- ESTILOS COMPARTIDOS ---
  const containerStyle = { position: 'fixed', bottom: 20, right: 20, zIndex: 1000, fontFamily: 'sans-serif' };
  const floatButtonStyle = { padding: '10px', borderRadius: '50%', backgroundColor: '#e0ac52', cursor: 'pointer', border: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.3)', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' };
  const chatWindowStyle = { width: 340, height: 460, backgroundColor: '#1e1e1e', borderRadius: 12, display: 'flex', flexDirection: 'column', color: '#fff', border: '1px solid #333', boxShadow: '0 6px 18px rgba(0,0,0,0.5)', overflow: 'hidden' };
  const headerStyle = { padding: '12px 16px', background: '#2a2a2a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333' };
  const messageAreaStyle = { flex: 1, padding: 16, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 };
  const inputAreaStyle = { padding: 12, display: 'flex', gap: 8, background: '#2a2a2a' };
  const inputStyle = { flex: 1, padding: '10px 14px', borderRadius: 6, border: '1px solid #444', backgroundColor: '#1e1e1e', color: '#fff', outline: 'none', fontSize: 14 };
  const sendButtonStyle = { padding: '10px 16px', background: '#e0ac52', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 'bold', color: '#000', fontSize: 14 };

  return (
    <div style={containerStyle}>
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} style={floatButtonStyle} title="Consultar con IA">
          <MartitaBotAvatar />
        </button>
      ) : (
        <div style={chatWindowStyle}>
          <div style={headerStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <MartitaBotAvatar />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 'bold', color: '#e0ac52' }}>Martita Bot IA</span>
                <span style={{ fontSize: 12, color: '#aaa' }}>Asistente Virtual</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 18, fontWeight: 'bold' }}>✕</button>
          </div>
          
          <div style={messageAreaStyle}>
            {messages.map((m, i) => (
              <div key={i} style={{ textAlign: m.sender === 'user' ? 'right' : 'left' }}>
                <span style={{ background: m.sender === 'user' ? '#e0ac52' : '#333', color: m.sender === 'user' ? '#000' : '#fff', padding: '10px 14px', borderRadius: 10, display: 'inline-block', maxWidth: '85%', fontSize: 14, lineHeight: 1.4 }}>
                  {m.text}
                </span>
              </div>
            ))}
            {loading && (
              <div style={{ textAlign: 'left' }}>
                <span style={{ background: '#333', color: '#aaa', padding: '10px 14px', borderRadius: 10, fontSize: 13, fontStyle: 'italic' }}>Martita está escribiendo...</span>
              </div>
            )}
          </div>

          <div style={inputAreaStyle}>
            <input 
              type="text"
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Escribí tu duda..." 
              style={inputStyle}
            />
            <button onClick={handleSend} disabled={loading} style={sendButtonStyle}>
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default ChatWidget;
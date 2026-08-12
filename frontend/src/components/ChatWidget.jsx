import React, { useEffect, useRef, useState } from 'react';

// ======================================================
// 🤖 AVATAR DE MARTITA BOT
// ======================================================
const MartitaBotAvatar = ({ size = 42 }) => (
  <div
    style={{
      width: size,
      height: size,
      minWidth: size,
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #e0ac52, #c08c42)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 12px rgba(224, 172, 82, 0.35)',
      animation: 'martitaGlow 2.5s infinite',
    }}
  >
    <svg
      viewBox="0 0 100 100"
      style={{
        width: '85%',
        height: '85%',
        display: 'block',
      }}
    >
      <path
        d="M50 8 C55 8 60 12 60 18 C60 18 60 18 60 18
        C60 18 62 16 65 16 C70 16 75 20 75 25
        C75 30 70 35 65 35 L35 35
        C30 35 25 30 25 25 C25 20 30 16 35 16
        C38 16 40 18 40 18 C40 18 40 18 40 18
        C40 12 45 8 50 8Z"
        fill="#fff"
      />
      <rect
        x="35"
        y="35"
        width="30"
        height="40"
        rx="4"
        fill="#fafafa"
        stroke="#e0ac52"
        strokeWidth="2"
      />
      <circle cx="43" cy="50" r="3" fill="#e0ac52" />
      <circle cx="57" cy="50" r="3" fill="#e0ac52" />
      <path
        d="M45 60 Q50 65 55 60"
        fill="none"
        stroke="#e0ac52"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="#fafafa"
        strokeWidth="3"
        strokeDasharray="10 6"
      />
    </svg>
  </div>
);

// ======================================================
// 💬 COMPONENTE PRINCIPAL
// ======================================================
const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: '¡Hola! Soy Martita Bot 🤖',
      time: new Date(),
    },
    {
      sender: 'bot',
      text: '¿En qué te puedo ayudar hoy? 😊',
      time: new Date(),
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages, loading]);

  // ======================================================
  // 🤖 RESPUESTAS DEL BOT (LÓGICA CORREGIDA)
  // ======================================================
  const getBotResponse = (query) => {
    const text = query.toLowerCase().trim();

    // 1. Acciones exactas de botones
    if (text.includes('ver pizzas') || text === '🍕 pizzas') {
      return {
        text: '🍕 Nuestras pizzas: Muzzarella, Napolitana, Fugazzeta y Calabresa. ¡Podés agregarlas al carrito desde la sección principal de la web!',
        quickReplies: ['🛒 Hacer pedido', '🥟 Empanadas', '🛵 Delivery'],
      };
    }

    if (text.includes('ver empanadas') || text === '🥟 empanadas') {
      return {
        text: '🥟 Sabores de empanadas: Carne cortada a cuchillo, Jamón y Queso, Pollo y Humita. Podés sumarlas a tu pedido desde el menú.',
        quickReplies: ['🛒 Hacer pedido', '🍕 Pizzas', '🛵 Delivery'],
      };
    }

    if (text.includes('ver hamburguesas') || text === '🍔 hamburguesas') {
      return {
        text: '🍔 Hamburguesas: Clásica con queso, Completa y Doble Bacon con papas fritas incluidas.',
        quickReplies: ['🛒 Hacer pedido', '🍕 Ver menú'],
      };
    }

    if (text.includes('ver pastas') || text === '🍝 pastas') {
      return {
        text: '🍝 Pastas caseras: Ravioles de verdura/pollo, Sorrentinos de jamón y queso, y Fideos caseros con tuco o bolognesa.',
        quickReplies: ['🛒 Hacer pedido', '🍕 Ver menú'],
      };
    }

    if (text.includes('ver menú') || text.includes('ver menu')) {
      return {
        text: '📋 En nuestro menú podés encontrar: Pizzas, Empanadas, Hamburguesas y Pastas. Hacé clic en la categoría que quieras explorar:',
        quickReplies: ['🍕 Ver pizzas', '🥟 Ver empanadas', '🍔 Ver hamburguesas', '🍝 Ver pastas'],
      };
    }

    if (text.includes('hacer pedido') || text.includes('comprar')) {
      return {
        text: '🛒 ¡Es muy fácil! Seleccioná los productos en la web, tocá el ícono del carrito abajo a la derecha y envianos el detalle directamente a nuestro WhatsApp.',
        quickReplies: ['🍕 Ver menú', '🕐 Horarios', '🛵 Delivery'],
      };
    }

    // 2. Coincidencias por palabra clave
    if (text.includes('hola') || text.includes('buenas') || text.includes('buen dia') || text.includes('buenas tardes')) {
      return {
        text: '¡Hola! 👋 Bienvenido a Lo de Martita 🍕 ¿Qué estás buscando hoy?',
        quickReplies: ['🍕 Ver menú', '🕐 Horarios', '🛵 Delivery'],
      };
    }

    if (text.includes('pizza') || text.includes('pizzas')) {
      return {
        text: '🍕 ¡Tenemos varias opciones de pizzas artesanales! ¿Querés conocer las variedades o hacer un pedido?',
        quickReplies: ['🍕 Ver pizzas', '🛒 Hacer pedido'],
      };
    }

    if (text.includes('empanada') || text.includes('empanadas')) {
      return {
        text: '🥟 Las mejores empanadas al horno. ¿Te muestro los sabores disponibles?',
        quickReplies: ['🥟 Ver empanadas', '🛒 Hacer pedido'],
      };
    }

    if (text.includes('hamburguesa') || text.includes('hamburguesas') || text.includes('burger')) {
      return {
        text: '🍔 Hamburguesas completas con papas. ¿Querés ver los combos?',
        quickReplies: ['🍔 Ver hamburguesas', '🛒 Hacer pedido'],
      };
    }

    if (text.includes('pasta') || text.includes('pastas') || text.includes('fideo') || text.includes('fideos')) {
      return {
        text: '🍝 Pastas caseras del día. ¿Te gustaría ver las opciones?',
        quickReplies: ['🍝 Ver pastas', '🛒 Hacer pedido'],
      };
    }

if (text.includes('horario') || text.includes('horarios') || text.includes('abren') || text.includes('hora') || text.includes('atienden')) {
  return {
    text: '🕐 Atendemos de Martes a Domingo de 11:30 a 14:00 hs y de 20:00 a 23:00 hs. Los lunes permanecemos cerrados.',
    quickReplies: ['🛵 Delivery', '🍕 Ver menú'],
  };
}

    if (text.includes('envio') || text.includes('envío') || text.includes('delivery') || text.includes('domicilio')) {
      return {
        text: '🛵 ¡Sí! Realizamos envíos a domicilio en Villa Ballester y zonas cercanas.',
        quickReplies: ['📍 Zonas de envío', '🍕 Ver menú', '🛒 Hacer pedido'],
      };
    }

    if (text.includes('zona') || text.includes('zonas') || text.includes('ballester')) {
      return {
        text: '📍 Envíos principales en Villa Ballester y alrededores. Si estás con dudas sobre la cobertura, consúltanos por WhatsApp.',
        quickReplies: ['🛒 Hacer pedido', '🛵 Delivery'],
      };
    }

    if (text.includes('tacc') || text.includes('celiaco') || text.includes('celíaco')) {
      return {
        text: '⚠️ No contamos con cocina exclusiva libre de TACC, por lo que puede existir contaminación cruzada.',
        quickReplies: ['🍕 Ver menú', '🛒 Hacer pedido'],
      };
    }

    if (text.includes('precio') || text.includes('precios') || text.includes('cuanto') || text.includes('cuánto')) {
      return {
        text: '💰 Podés ver todos los precios actualizados navegando por las categorías de nuestra web.',
        quickReplies: ['🍕 Ver menú', '🛒 Hacer pedido'],
      };
    }

    return {
      text: '¡Gracias por escribirnos! 😊 Podés consultar nuestro menú, horarios, delivery o armar tu pedido directamente desde la web.',
      quickReplies: ['🍕 Ver menú', '🕐 Horarios', '🛵 Delivery', '🛒 Hacer pedido'],
    };
  };

  // ======================================================
  // 📤 ENVIAR MENSAJE
  // ======================================================
  const handleSend = (customMessage = null) => {
    const messageToSend = customMessage !== null ? customMessage : input.trim();

    if (!messageToSend || loading) return;

    const now = new Date();

    setMessages((prev) => [
      ...prev,
      {
        sender: 'user',
        text: messageToSend,
        time: now,
      },
    ]);

    setInput('');
    setLoading(true);

    setTimeout(() => {
      const response = getBotResponse(messageToSend);

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: response.text,
          quickReplies: response.quickReplies,
          time: new Date(),
        },
      ]);

      setLoading(false);
    }, 800);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('es-AR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const styles = {
    container: {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 9999,
      fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    },
    floatingButton: {
      width: '64px',
      height: '64px',
      borderRadius: '50%',
      border: 'none',
      background: 'linear-gradient(135deg, #e0ac52, #c08c42)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0',
      boxShadow: '0 8px 25px rgba(0,0,0,0.45), 0 0 20px rgba(224,172,82,0.25)',
      transition: 'all 0.25s ease',
      animation: 'martitaFloat 3s ease-in-out infinite',
    },
    chatWindow: {
      width: '370px',
      height: '550px',
      maxWidth: 'calc(100vw - 30px)',
      maxHeight: 'calc(100vh - 40px)',
      background: '#171717',
      borderRadius: '18px',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      color: '#fff',
      border: '1px solid #353535',
      boxShadow: '0 20px 60px rgba(0,0,0,0.65)',
      animation: 'chatOpen 0.25s ease-out',
    },
    header: {
      padding: '14px 16px',
      background: 'linear-gradient(135deg, #292929, #202020)',
      borderBottom: '1px solid #383838',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    title: {
      fontSize: '15px',
      fontWeight: '700',
      color: '#e0ac52',
      marginBottom: '2px',
    },
    subtitle: {
      fontSize: '11px',
      color: '#9b9b9b',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
    },
    onlineDot: {
      width: '7px',
      height: '7px',
      background: '#4ade80',
      borderRadius: '50%',
      display: 'inline-block',
      boxShadow: '0 0 6px rgba(74,222,128,0.7)',
    },
    closeButton: {
      background: 'transparent',
      border: 'none',
      color: '#aaa',
      fontSize: '21px',
      cursor: 'pointer',
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      transition: 'all 0.2s ease',
    },
    messageArea: {
      flex: 1,
      padding: '16px',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      scrollbarWidth: 'thin',
    },
    messageRowBot: {
      display: 'flex',
      justifyContent: 'flex-start',
    },
    messageRowUser: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    botBubble: {
      background: '#303030',
      color: '#f4f4f4',
      padding: '10px 13px',
      borderRadius: '6px 14px 14px 14px',
      maxWidth: '82%',
      fontSize: '13px',
      lineHeight: '1.45',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    },
    userBubble: {
      background: 'linear-gradient(135deg, #e0ac52, #d19a3e)',
      color: '#111',
      padding: '10px 13px',
      borderRadius: '14px 6px 14px 14px',
      maxWidth: '82%',
      fontSize: '13px',
      lineHeight: '1.45',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    },
    time: {
      fontSize: '9px',
      color: '#777',
      marginTop: '4px',
      paddingLeft: '3px',
      paddingRight: '3px',
    },
    quickReplies: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px',
      marginTop: '8px',
      maxWidth: '90%',
    },
    quickButton: {
      background: 'transparent',
      border: '1px solid #b7893e',
      color: '#e0ac52',
      borderRadius: '20px',
      padding: '7px 10px',
      fontSize: '11px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
    typingBubble: {
      background: '#303030',
      color: '#999',
      padding: '10px 14px',
      borderRadius: '6px 14px 14px 14px',
      fontSize: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    },
    inputArea: {
      padding: '11px',
      background: '#242424',
      borderTop: '1px solid #363636',
      display: 'flex',
      gap: '8px',
    },
    input: {
      flex: 1,
      minWidth: 0,
      padding: '11px 13px',
      borderRadius: '9px',
      border: '1px solid #444',
      background: '#171717',
      color: '#fff',
      outline: 'none',
      fontSize: '13px',
    },
    sendButton: {
      padding: '0 15px',
      background: 'linear-gradient(135deg, #e0ac52, #c08c42)',
      border: 'none',
      borderRadius: '9px',
      cursor: 'pointer',
      fontWeight: '700',
      color: '#111',
      fontSize: '12px',
      transition: 'all 0.2s ease',
    },
  };

  return (
    <>
      <style>
        {`
          @keyframes martitaFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          @keyframes martitaGlow {
            0%, 100% { box-shadow: 0 4px 12px rgba(224,172,82,0.25); }
            50% { box-shadow: 0 4px 20px rgba(224,172,82,0.55); }
          }
          @keyframes chatOpen {
            from { opacity: 0; transform: translateY(15px) scale(0.97); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          @keyframes typing {
            0%, 100% { opacity: 0.3; transform: translateY(0); }
            50% { opacity: 1; transform: translateY(-3px); }
          }
          .martita-quick-button:hover {
            background: rgba(224,172,82,0.12) !important;
            transform: translateY(-1px);
          }
          .martita-close:hover {
            background: rgba(255,255,255,0.08) !important;
            color: #fff !important;
          }
          .martita-send:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(224,172,82,0.3);
          }
          .martita-send:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
          }
          @media (max-width: 500px) {
            .martita-chat-window {
              width: calc(100vw - 20px) !important;
              height: calc(100vh - 90px) !important;
              max-height: none !important;
              border-radius: 16px !important;
            }
            .martita-container {
              right: 10px !important;
              bottom: 10px !important;
            }
            .martita-floating {
              width: 58px !important;
              height: 58px !important;
            }
          }
        `}
      </style>

      <div className="martita-container" style={styles.container}>
        {!isOpen && (
          <button
            className="martita-floating"
            onClick={() => setIsOpen(true)}
            style={styles.floatingButton}
            title="Consultar con Martita Bot"
            aria-label="Abrir Martita Bot"
          >
            <MartitaBotAvatar size={48} />
          </button>
        )}

        {isOpen && (
          <div className="martita-chat-window" style={styles.chatWindow}>
            <div style={styles.header}>
              <div style={styles.headerInfo}>
                <MartitaBotAvatar size={42} />
                <div>
                  <div style={styles.title}>Martita Bot IA 🤖</div>
                  <div style={styles.subtitle}>
                    <span style={styles.onlineDot}></span>
                    Asistente virtual · En línea
                  </div>
                </div>
              </div>

              <button
                className="martita-close"
                onClick={() => setIsOpen(false)}
                style={styles.closeButton}
                aria-label="Cerrar chat"
              >
                ✕
              </button>
            </div>

            <div style={styles.messageArea}>
              {messages.map((message, index) => (
                <div key={index}>
                  <div
                    style={
                      message.sender === 'user'
                        ? styles.messageRowUser
                        : styles.messageRowBot
                    }
                  >
                    <div
                      style={
                        message.sender === 'user'
                          ? styles.userBubble
                          : styles.botBubble
                      }
                    >
                      {message.text}
                    </div>
                  </div>

                  <div
                    style={{
                      ...styles.time,
                      textAlign: message.sender === 'user' ? 'right' : 'left',
                    }}
                  >
                    {formatTime(message.time)}
                    {message.sender === 'user' && ' ✓✓'}
                  </div>

                  {message.sender === 'bot' && message.quickReplies && (
                    <div style={styles.quickReplies}>
                      {message.quickReplies.map((reply, replyIndex) => (
                        <button
                          key={replyIndex}
                          className="martita-quick-button"
                          style={styles.quickButton}
                          onClick={() => handleSend(reply)}
                          disabled={loading}
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div style={styles.messageRowBot}>
                  <div style={styles.typingBubble}>
                    <span style={{ animation: 'typing 1s infinite' }}>●</span>
                    <span style={{ animation: 'typing 1s infinite 0.2s' }}>●</span>
                    <span style={{ animation: 'typing 1s infinite 0.4s' }}>●</span>
                    <span style={{ marginLeft: '3px' }}>
                      Martita está escribiendo
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div style={styles.inputArea}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSend();
                  }
                }}
                placeholder="Escribí tu duda..."
                style={styles.input}
                disabled={loading}
              />

              <button
                className="martita-send"
                onClick={() => handleSend()}
                disabled={loading || !input.trim()}
                style={styles.sendButton}
              >
                ➤
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatWidget;
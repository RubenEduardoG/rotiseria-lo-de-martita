import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import logoImage from '../assets/favicon.png';

const Header = () => {
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const totalItems = Array.isArray(cart)
    ? cart.reduce((sum, item) => sum + (item.cantidad || 1), 0)
    : 0;

  const categories = [
    { label: 'Pizzas', to: '/pizzas' },
    { label: 'Hamburguesas', to: '/hamburguesas' },
    { label: 'Empanadas', to: '/empanadas' },
    { label: 'Guarniciones', to: '/guarniciones' },
    { label: 'Milanesas', to: '/milanesas' },
    { label: 'Pastas', to: '/pastas' },
  ];

  return (
    <>
      <style>{`
        @media (max-width: 767px) {
          .header-shell {
            position: relative;
            flex-wrap: wrap;
          }

          .header-nav {
            display: none !important;
            width: 100%;
            order: 3;
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
            padding: 14px 10px 10px;
            background: #141414;
            border-top: 1px solid #222;
            margin-top: 10px;
          }

          .header-nav.is-open {
            display: flex !important;
          }

          .header-toggle {
            display: inline-flex !important;
            width: 42px;
            height: 42px;
            border: 1px solid rgba(255,255,255,0.12);
            border-radius: 10px;
            background: transparent;
            color: #fff;
            font-size: 1.8rem;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }

          .header-brand {
            flex: 1 1 auto;
          }
        }
      `}</style>

      <header
        className="header-shell"
        style={{
          background: '#141414',
          padding: '15px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '18px',
          borderBottom: '1px solid #222',
          boxSizing: 'border-box',
          width: '100%',
          position: 'relative',
        }}
      >
        <Link
          to="/"
          className="header-brand"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            color: '#fff',
            fontSize: '1.25rem',
            fontWeight: '700',
            minWidth: 'max-content',
          }}
        >
          <img
            src={logoImage}
            alt="Logo Lo de Martita"
            style={{
              width: '34px',
              height: '34px',
              objectFit: 'cover',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          />
          <span>Lo de Martita</span>
        </Link>

        <nav
          className={`header-nav ${menuOpen ? 'is-open' : ''}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '18px',
            flex: '1 1 auto',
            minWidth: 0,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            padding: '0 10px',
          }}
          aria-label="Navegación de categorías"
        >
          {categories.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              style={{
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 600,
                opacity: 1,
                transition: 'opacity 0.2s ease',
              }}
            >
              {label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="header-toggle"
          style={{
            display: 'none',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.12)',
            color: '#fff',
            fontSize: '1.7rem',
            lineHeight: 1,
            borderRadius: '10px',
            cursor: 'pointer',
            padding: '0',
          }}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            minWidth: 'max-content',
            position: 'relative',
          }}
        >
          <Link
            to="/checkout"
            style={{
              fontSize: '1.8rem',
              textDecoration: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              position: 'relative',
            }}
            aria-label="Ver mi carrito"
          >
            🛒
            <span
              style={{
                position: 'absolute',
                top: '-5px',
                right: '-10px',
                background: '#ff7300',
                color: '#000',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                minWidth: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2px',
                border: '2px solid #141414',
              }}
            >
              {totalItems}
            </span>
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
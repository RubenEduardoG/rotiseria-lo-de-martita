import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import logoImage from '../assets/favicon.png';

const Header = () => {
  // Traemos el carrito y la función para contar unidades desde el Context
  const { cart } = useCart();
  const location = useLocation();

  // Calculamos el total de unidades sumando las cantidades de cada producto en el carrito
  const totalItems = Array.isArray(cart) 
    ? cart.reduce((sum, item) => sum + (item.cantidad || 1), 0) 
    : 0;

  return (
    <header style={{ background: '#141414', padding: '15px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', borderBottom: '1px solid #222' }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: '#fff', fontSize: '1.25rem', fontWeight: '700', minWidth: 'max-content' }}>
        <img
          src={logoImage}
          alt="Logo Lo de Martita"
          style={{ width: '34px', height: '34px', objectFit: 'cover', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.12)' }}
        />
        <span>Lo de Martita</span>
      </Link>

      {location.pathname === '/' && (
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', width: 'min(100%, 360px)' }}>
            <input
              type="text"
              placeholder="Buscar..."
              style={{ flex: 1, background: '#1e1e1e', border: '1px solid #333', color: '#fff', padding: '8px 12px', borderRadius: '6px' }}
            />
            <button style={{ background: '#ff7300', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', color: '#000', fontWeight: 'bold' }}>
              🔍
            </button>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', position: 'relative', marginLeft: 'auto' }}>
        <Link
          to="/checkout"
          style={{
            fontSize: '1.8rem',
            textDecoration: 'none',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            position: 'relative'
          }}
          aria-label="Ver mi carrito"
        >
          🛒
          <span style={{
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
            border: '2px solid #141414'
          }}>
            {totalItems}
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
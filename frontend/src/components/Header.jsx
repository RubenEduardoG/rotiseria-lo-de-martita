import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

const Header = () => {
  // Traemos el carrito y la función para contar unidades desde el Context
  const { cart } = useCart();
  const location = useLocation();

  // Calculamos el total de unidades sumando las cantidades de cada producto en el carrito
  const totalItems = Array.isArray(cart) 
    ? cart.reduce((sum, item) => sum + (item.cantidad || 1), 0) 
    : 0;

  return (
    <header style={{ background: '#141414', padding: '15px 30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #222' }}>
      
      {/* 🏠 Logo / Nombre del local que vuelve al Home */}
      <Link to="/" style={{ textDecoration: 'none', color: '#fff', fontSize: '1.6rem', fontWeight: 'bold' }}>
        Lo de Martita
      </Link>

      {/* 🔍 Buscador (Solo se muestra si estás en el Home) */}
      {location.pathname === '/' && (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="Buscar..." 
            style={{ background: '#1e1e1e', border: '1px solid #333', color: '#fff', padding: '8px 12px', borderRadius: '6px', width: '200px' }}
          />
          <button style={{ background: '#ff7300', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', color: '#000', fontWeight: 'bold' }}>
            🔍
          </button>
        </div>
      )}

      {/* 🛒 Changuito con redirección real a /cart */}
      <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
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
          {/* Burbuja naranja que se acomoda arriba a la derecha */}
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
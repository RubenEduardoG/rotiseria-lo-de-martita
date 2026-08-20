import React, { useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import CategoryBanner from '../components/CategoryBanner.jsx';
import { useCart } from '../context/CartContext.jsx';
import productsData from '../data/products.json';

const Empanadas = () => {
  const { agregarAlCarrito } = useCart();
  const [products] = useState(() => productsData.filter((p) => ((p.categoria || '').toString().toLowerCase() === 'empanadas')));
  const loading = false;
  const [error, setError] = useState(null);

  const handleAdd = (product, cantidad) => {
    for (let i = 0; i < cantidad; i++) agregarAlCarrito(product);
  };

  return (
    <div className="category-page container">
      <CategoryBanner />
      <h1 style={{ color: '#fff' }}>Empanadas</h1>
      {loading ? (
        <p className="muted">Cargando...</p>
      ) : error ? (
        <p className="muted">{error}</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {products.map((p) => (
            <ProductCard key={p._id || p.id || p.nombre} product={p} onAdd={handleAdd} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Empanadas;

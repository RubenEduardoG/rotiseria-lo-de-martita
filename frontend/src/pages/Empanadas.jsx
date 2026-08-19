import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import CategoryBanner from '../components/CategoryBanner.jsx';
import { useCart } from '../context/CartContext.jsx';
import { apiUrl } from '../utils/api.js';

const Empanadas = () => {
  const { agregarAlCarrito } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(apiUrl('/api/products'));
        if (!res.ok) throw new Error('Error cargando productos');
        const data = await res.json();
        setProducts(data.filter((p) => ((p.categoria || '').toString().toLowerCase() === 'empanadas')));
      } catch (err) {
        setError(err.message || 'Error');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

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

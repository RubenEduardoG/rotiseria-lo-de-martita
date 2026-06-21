import React, { useMemo, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { categories } from '../data/categories.js';
import ProductCard from '../components/ProductCard.jsx';
import { useCart } from '../context/CartContext.jsx';
import { apiUrl } from '../utils/api.js';
import bannerImage from '../assets/banner-martita.png';

const CATEGORY_ICONS = {
  pizzas: '🍕',
  pastas: '🍝',
  milanesas: '🥩',
  supremas: '🍗',
  burgers: '🍔',
  empanadas: '🥟',
  guarniciones: '🍟'
};

const Home = () => {
  const { agregarAlCarrito } = useCart();
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para control del negocio e Info Modal
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const currentDay = new Date().getDay(); // 0 = Domingo, 1 = Lunes, etc.

  const q = params.get('q') || '';
  const categoryFilter = params.get('category') || '';

  const normalizedCategoryFilter = (() => {
    const raw = (categoryFilter || '').trim().toLowerCase();
    const aliases = {
      burger: 'burgers',
      burgers: 'burgers',
      guarnicion: 'guarniciones',
      guarniciones: 'guarniciones',
      suprema: 'supremas',
      supremas: 'supremas',
    };
    return aliases[raw] || raw;
  })();

  // 🎯 Lógica completamente corregida según los horarios de image_11928b.png
  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const day = now.getDay();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const time = hours + minutes / 60; // Formato decimal (ej: 13:30 = 13.5)

      let open = false;

      switch(day) {
        case 0: // Domingo: Solo Noche 20:00 a 23:00
          if (time >= 20.0 && time <= 23.0) open = true;
          break;
        case 1: // Lunes: Cerrado
          open = false;
          break;
        case 2: // Martes: 11:30 a 14:00 y 20:00 a 23:00
        case 3: // Miércoles: 11:30 a 14:00 y 20:00 a 23:00
        case 4: // Jueves: 11:30 a 14:00 y 20:00 a 23:00
        case 5: // Viernes: 11:30 a 14:00 y 20:00 a 23:00
        case 6: // Sábado: 11:30 a 14:00 y 20:00 a 23:00
          if ((time >= 11.5 && time <= 14.0) || (time >= 20.0 && time <= 23.0)) {
            open = true;
          }
          break;
        default:
          open = false;
      }

      setIsOpen(open);
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000); // Chequea cada minuto
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(apiUrl('/api/products'));
        if (!response.ok) throw new Error('Error al cargar productos');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message || 'Hubo un problema cargando el menú');
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const term = q.trim().toLowerCase();
    return products.filter((p) => {
      if (p.categoria?.toLowerCase() === 'pastas' && p.nombre?.toLowerCase() === 'salsas') {
        return false;
      }
      const matchCategory = normalizedCategoryFilter ? p.categoria?.toLowerCase().trim() === normalizedCategoryFilter : true;
      const matchQuery = term
        ? (p.nombre && p.nombre.toLowerCase().includes(term)) || (p.descripcion && p.descripcion.toLowerCase().includes(term))
        : true;
      return matchCategory && matchQuery;
    });
  }, [products, q, normalizedCategoryFilter]);

  const groupedProducts = useMemo(() => {
    if (normalizedCategoryFilter) return null;

    const groups = {};
    filteredProducts.forEach((product) => {
      const catName = product.categoria ? product.categoria.trim() : 'Otros';
      if (!groups[catName]) {
        groups[catName] = [];
      }
      groups[catName].push(product);
    });
    return groups;
  }, [filteredProducts, normalizedCategoryFilter]);

  const handleAdd = (product, cantidad) => {
    for (let i = 0; i < cantidad; i++) {
      agregarAlCarrito(product);
    }
  };

  const changeCategory = (catId) => {
    const qs = new URLSearchParams(search);
    if (catId) qs.set('category', catId);
    else qs.delete('category');
    navigate({ pathname: '/', search: qs.toString() });
  };

  return (
    <div className="home-page-container">
      
      {/* HERO BANNER */}
      <div className="home-hero">
        <img src={bannerImage} alt="Rotisería Lo de Martita" className="hero-banner-img" />
      </div>

      {/* SECCIÓN INFORMACIÓN Y ESTADO */}
      <div className="container" style={{ paddingBottom: '0px', marginTop: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid #222', paddingBottom: '20px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <h1 style={{ margin: 0, fontSize: '1.75rem', color: '#fff', fontWeight: '700' }}>
              Lo de Martita
            </h1>
            <span className="status-badge">
              <span className={`status-dot ${isOpen ? 'status-dot--open' : 'status-dot--closed'}`}></span>
              {isOpen ? 'Abierto' : 'Cerrado'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="social-links">
              <a href="https://wa.me/549XXXXXXXXXX" target="_blank" rel="noopener noreferrer" className="social-btn social-btn--whatsapp" aria-label="WhatsApp">
                <svg className="social-icon" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.4.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.846c1.66.986 3.288 1.448 4.405 1.451 5.405.002 9.801-4.394 9.804-9.8.001-2.618-1.01-5.08-2.859-6.932C16.1 2.022 13.642 1 11.008 1c-5.399 0-9.793 4.393-9.797 9.8-.001 2.132.559 4.212 1.623 6.013L1.871 21.13l4.776-1.976z"/>
                </svg>
              </a>
              <a href="https://instagram.com/lodemartita" target="_blank" rel="noopener noreferrer" className="social-btn social-btn--instagram" aria-label="Instagram">
                <svg className="social-icon" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
            </div>
            <button className="info-trigger-btn" onClick={() => setShowModal(true)}>
              ℹ️ Información
            </button>
          </div>

        </div>
      </div>

      <div className="home-content container">
        {/* FILTROS LATERALEZ */}
        <aside className="filters chalkboard-card">
          <div className="categories-list">
            <button className={!categoryFilter ? 'active' : ''} onClick={() => changeCategory('')}>
              🏠 Todas
            </button>
            {(categories || []).map((c) => {
              const categoryKey = c && c.id ? c.id.toLowerCase() : '';
              const icon = CATEGORY_ICONS[categoryKey] || '🍽️';
              return (
                <button 
                  key={c?.id || Math.random()} 
                  className={normalizedCategoryFilter === c?.id ? 'active' : ''} 
                  onClick={() => changeCategory(c?.id || '')}
                >
                  {icon} {c?.name || 'Categoría'}
                </button>
              );
            })}
          </div>
        </aside>

        {/* CATÁLOGO DE PRODUCTOS */}
        <section className="product-grid" style={{ display: 'block' }}>
          {loading ? (
            <p className="muted">Cargando menú...</p>
          ) : error ? (
            <p className="muted">{error}</p>
          ) : filteredProducts.length === 0 ? (
            <p className="muted">No se encontraron productos.</p>
          ) : normalizedCategoryFilter ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              {filteredProducts.map((p) => (
                <ProductCard key={p._id || p.id} product={p} onAdd={handleAdd} />
              ))}
            </div>
          ) : (
            Object.keys(groupedProducts).map((categoryName, idx) => {
              const categoryKey = categoryName.toLowerCase();
              const icon = CATEGORY_ICONS[categoryKey] || '🍽️';
              return (
                <div key={categoryName} style={{ marginBottom: '40px' }}>
                  <h2 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'capitalize', fontWeight: '600' }}>
                    {icon} {categoryName}
                  </h2>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                    {groupedProducts[categoryName].map((p) => (
                      <ProductCard key={p._id || p.id} product={p} onAdd={handleAdd} />
                    ))}
                  </div>

                  {idx < Object.keys(groupedProducts).length - 1 && (
                    <hr style={{ border: 'none', borderTop: '1px solid #222', margin: '32px 0' }} />
                  )}
                </div>
              );
            })
          )}
        </section>
      </div>

      {/* MODAL DE INFORMACIÓN ACTUALIZADO */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            
            <h2 style={{ fontSize: '1.5rem', marginBottom: '4px', fontWeight: '700' }}>Lo de Martita</h2>
            <span className="status-badge" style={{ margin: '8px 0 24px 0' }}>
              <span className={`status-dot ${isOpen ? 'status-dot--open' : 'status-dot--closed'}`}></span>
              {isOpen ? 'Abierto' : 'Cerrado'}
            </span>

            <h3 style={{ fontSize: '1.1rem', margin: '16px 0 10px 0', color: 'var(--accent)', fontWeight: '600' }}>Tipos de servicio</h3>
            <div className="service-type-row">
              <span>🛵 A domicilio</span>
              <span style={{ color: '#25D366', fontWeight: 'bold' }}>✓</span>
            </div>
            <div className="service-type-row">
              <span>🛍️ Para llevar</span>
              <span style={{ color: '#25D366', fontWeight: 'bold' }}>✓</span>
            </div>

            <h3 style={{ fontSize: '1.1rem', margin: '24px 0 10px 0', color: 'var(--accent)', fontWeight: '600' }}>Horarios de atención</h3>
            <div className="schedule-list">
              <div className={`schedule-row ${currentDay === 1 ? 'active-day' : ''}`}>
                <span>Lunes</span>
                <span style={{ color: '#ff3b30', fontWeight: '700' }}>Cerrado</span>
              </div>
              <div className={`schedule-row ${currentDay === 2 ? 'active-day' : ''}`}>
                <span>Martes</span>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
                  <span>11:30 - 14:00</span>
                  <span>20:00 - 23:00</span>
                </div>
              </div>
              <div className={`schedule-row ${currentDay === 3 ? 'active-day' : ''}`}>
                <span>Miércoles</span>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
                  <span>11:30 - 14:00</span>
                  <span>20:00 - 23:00</span>
                </div>
              </div>
              <div className={`schedule-row ${currentDay === 4 ? 'active-day' : ''}`}>
                <span>Jueves</span>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
                  <span>11:30 - 14:00</span>
                  <span>20:00 - 23:00</span>
                </div>
              </div>
              <div className={`schedule-row ${currentDay === 5 ? 'active-day' : ''}`}>
                <span>Viernes</span>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
                  <span>11:30 - 14:00</span>
                  <span>20:00 - 23:00</span>
                </div>
              </div>
              <div className={`schedule-row ${currentDay === 6 ? 'active-day' : ''}`}>
                <span>Sábado</span>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
                  <span>11:30 - 14:00</span>
                  <span>20:00 - 23:00</span>
                </div>
              </div>
              <div className={`schedule-row ${currentDay === 0 ? 'active-day' : ''}`}>
                <span>Domingo</span>
                <span>20:00 - 23:00</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;
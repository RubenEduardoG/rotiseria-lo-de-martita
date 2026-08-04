import React, { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import { formatPrice } from '../utils/formatPrice.js';
import pizzasfondo from '../assets/pizzasfondo.png';
import pastasfondo from '../assets/pastasfondo.png';
import burgersfondo from '../assets/burgersfondo.png';
import milanesasfondo from '../assets/milanesasfondo.png';
import empanadasfondo from '../assets/empandasfondo.png';
import guarnicionesfondo from '../assets/guarnicionesfondo.png';

const EMPANADA_FLAVORS = ['Carne', 'Carne Cortada', 'Carne Cortada Frita', 'Carne Picante', 'Pollo', 'Jamón y Queso', 'Roquefort', 'Queso y Cebolla', 'Humita', 'Verdura', 'Capresse'];

// Mapeo de categoría → imagen
const getCategoryImage = (categoria) => {
  const categoryMap = {
    pizzas: pizzasfondo,
    pastas: pastasfondo,
    burgers: burgersfondo,
    milanesas: milanesasfondo,
    supremas: milanesasfondo,
    empanadas: empanadasfondo,
    guarniciones: guarnicionesfondo,
  };
  return categoryMap[categoria?.toLowerCase()] || pizzasfondo;
};
const PASTA_SALSA_OPTIONS = [
  { nombre: 'Estofado', precio: 11000 },
  { nombre: 'Bolognesa', precio: 11000 },
  { nombre: 'Crema Verdeo y Bacon', precio: 13500 },
  { nombre: '4 Quesos', precio: 13500 },
  { nombre: 'Salsa Blanca', precio: 9900 },
  { nombre: 'Fileto', precio: 9300 }
];

const createInitialFlavorCounts = () =>
  EMPANADA_FLAVORS.reduce((acc, flavor) => ({ ...acc, [flavor]: 0 }), {});

const ProductCard = ({ product, onAdd }) => {
  const [qty, setQty] = useState(1);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedSalsaIndex, setSelectedSalsaIndex] = useState(0);
  const [flavorCounts, setFlavorCounts] = useState(createInitialFlavorCounts);
  const [isPulseActive, setIsPulseActive] = useState(false);

  const variantOptions = Array.isArray(product.variantes) && product.variantes.length > 0 ? product.variantes : [];
  const selectedVariant = variantOptions[selectedVariantIndex] || null;
  const isEmpanada = product.categoria === 'empanadas';
  const isBurger = product.categoria === 'burgers';
  const hasSalsaSelection = product.categoria === 'pastas' && product.nombre?.toLowerCase() !== 'salsas';

  const totalFlavorCount = useMemo(
    () => Object.values(flavorCounts).reduce((sum, value) => sum + value, 0),
    [flavorCounts]
  );

  const effectiveQty = isEmpanada ? totalFlavorCount : qty;

  const handleFlavorChange = (flavor, delta) => {
    if (!isEmpanada) return;
    setFlavorCounts((current) => {
      const nextValue = Math.max(0, current[flavor] + delta);
      return { ...current, [flavor]: nextValue };
    });
  };

  const displayPrice = useMemo(() => {
    const basePrice = selectedVariant?.precio ?? product.precio ?? product.precioBase ?? 0;
    const salsaExtra = hasSalsaSelection ? PASTA_SALSA_OPTIONS[selectedSalsaIndex].precio : 0;
    return basePrice + salsaExtra;
  }, [product.precio, product.precioBase, selectedVariant, hasSalsaSelection, selectedSalsaIndex]);

  const displayPriceText = formatPrice(displayPrice);
  const selectedSalsa = hasSalsaSelection ? PASTA_SALSA_OPTIONS[selectedSalsaIndex] : null;

  const productId = product._id || product.id || product.nombre;
  const variantKey = selectedVariant ? `${selectedVariant.nombre}` : null;
  const sauceKey = selectedSalsa ? selectedSalsa.nombre : null;
  const flavorSummary = isEmpanada
    ? EMPANADA_FLAVORS.filter((flavor) => flavorCounts[flavor] > 0)
        .map((flavor) => `${flavorCounts[flavor]} ${flavor}`)
        .join(', ')
    : undefined;

const handleAdd = () => {
    if (isEmpanada && totalFlavorCount === 0) {
      alert('Selecciona los sabores de empanadas antes de agregar.');
      return;
    }

    const cantidad = isEmpanada ? totalFlavorCount : Math.max(1, Number(qty) || 1);
    
    const itemToAdd = {
      ...product,
      precio: displayPrice,
      // 🌟 AGREGAMOS LAS PROPIEDADES DIRECTAMENTE EN EL OBJETO PARA QUE EL CARRITO LAS LEA
      cantidad: cantidad, 
      qty: cantidad,
      quantity: cantidad,
      variant: selectedVariant ? selectedVariant.nombre : undefined,
      salsa: selectedSalsa ? selectedSalsa.nombre : undefined,
      empanadaFlavors: isEmpanada ? flavorCounts : undefined,
      empanadaFlavorSummary: isEmpanada ? flavorSummary : undefined,
      lineId: `${productId}${variantKey ? `-${variantKey}` : ''}${sauceKey ? `-${sauceKey}` : ''}${flavorSummary ? `-${flavorSummary}` : ''}`,
      id: `${productId}${variantKey ? `-${variantKey}` : ''}${sauceKey ? `-${sauceKey}` : ''}${flavorSummary ? `-${flavorSummary}` : ''}`,
    };

    onAdd(itemToAdd, cantidad);
    toast.success(`¡${product.nombre} agregado al carrito! 🛒`);
    setIsPulseActive(true);
    window.setTimeout(() => setIsPulseActive(false), 180);

    setQty(1);
    setSelectedSalsaIndex(0);
    setFlavorCounts(createInitialFlavorCounts());
  };

  const PlusIcon = () => (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true" style={{ width: '18px', height: '18px' }}>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"></path>
    </svg>
  );

  return (
    <article className="product-card chalkboard-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: '#1e1e1e', border: '1px solid #333', borderRadius: '16px', overflow: 'hidden' }}>
      {/* IMAGEN DINÁMICA POR CATEGORÍA */}
      <img 
        src={getCategoryImage(product.categoria)} 
        alt={product.categoria} 
        className="product-image"
        style={{ 
          width: '100%', 
          height: '160px', 
          objectFit: 'cover',
          borderTopLeftRadius: '15px',
          borderTopRightRadius: '15px'
        }} 
      />
      
      <div className="product-body" style={{ padding: '0 20px' }}>
        <h3 className="product-title" style={{ color: '#fff', fontSize: '1.4rem', marginBottom: '4px' }}>{product.nombre}</h3>
        {product.descripcion && (
          <p className="product-desc" style={{ 
            color: '#888888', 
            fontSize: '0.75rem', 
            marginTop: '4px',
            lineHeight: '1.3',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {product.descripcion}
          </p>
        )}
      </div>

      {isBurger && <div className="burger-badge" style={{ background: '#ff730022', color: '#ff7300', padding: '6px 12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '600', width: 'fit-content', marginLeft: '20px' }}>🍟 Papas fritas incluidas</div>}

      {variantOptions.length > 0 && (
        <div className="variant-buttons" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', paddingLeft: '20px', paddingRight: '20px' }}>
          {variantOptions.map((variant, index) => (
            <button
              key={variant.nombre}
              type="button"
              className={`btn ${selectedVariantIndex === index ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setSelectedVariantIndex(index)}
              style={{ padding: '8px 10px', fontSize: '0.84rem' }}
            >
              {variant.nombre}
            </button>
          ))}
        </div>
      )}

      {hasSalsaSelection && (
        <div className="salsa-selection" style={{ paddingLeft: '20px', paddingRight: '20px' }}>
          <div className="selection-label" style={{ color: '#ff7300', fontWeight: '600', marginBottom: '6px' }}>Salsa</div>
          <div className="salsa-options" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {PASTA_SALSA_OPTIONS.map((salsa, index) => (
              <button
                key={salsa.nombre}
                type="button"
                className={`salsa-option ${selectedSalsaIndex === index ? 'active' : ''}`}
                onClick={() => setSelectedSalsaIndex(index)}
              >
                {salsa.nombre}
              </button>
            ))}
          </div>
        </div>
      )}

      {isEmpanada && (
        <div className="empanada-selection" style={{ background: '#141414', padding: '12px 20px', borderRadius: '12px', border: '1px solid #2a2a2a', margin: '0 20px' }}>
          <div className="selection-label" style={{ color: '#ff7300', fontWeight: '600', marginBottom: '10px', fontSize: '0.95rem' }}>Sabores de empanadas</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '240px', overflowY: 'auto', paddingRight: '4px' }}>
            {EMPANADA_FLAVORS.map((flavor) => (
              <div key={flavor} className="flavor-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #222' }}>
                <span className="flavor-label" style={{ color: '#e0e0e0', fontSize: '0.9rem' }}>{flavor}</span>
                <div className="flavor-controls" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button 
                    type="button" 
                    className="qty-btn" 
                    onClick={() => handleFlavorChange(flavor, -1)} 
                    aria-label={`Restar ${flavor}`}
                    style={{ background: '#2a2a2a', border: 'none', color: '#fff', borderRadius: '4px', width: '24px', height: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    −
                  </button>
                  <span className="flavor-counter" style={{ color: '#ff7300', fontWeight: 'bold', minWidth: '16px', textAlign: 'center' }}>{flavorCounts[flavor]}</span>
                  <button 
                    type="button" 
                    className="qty-btn" 
                    onClick={() => handleFlavorChange(flavor, 1)} 
                    aria-label={`Sumar ${flavor}`}
                    style={{ background: '#2a2a2a', border: 'none', color: '#fff', borderRadius: '4px', width: '24px', height: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: 'auto', paddingTop: '10px', paddingLeft: '20px', paddingRight: '20px' }}>
        <span className="price" style={{ marginRight: 'auto', color: '#ff7300', fontSize: '1.4rem', fontWeight: '700' }}>{displayPriceText}</span>
        {!isEmpanada ? (
          <div className="qty-selector" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 146, 9, 0.08)', borderRadius: '10px', padding: '6px 8px', border: '1px solid rgba(255, 146, 9, 0.16)' }}>
            <button
              type="button"
              className="qty-btn"
              onClick={() => setQty(Math.max(1, Number(qty) - 1))}
              aria-label="Disminuir cantidad"
              style={{ background: 'transparent', border: 'none', color: '#ff7300', cursor: 'pointer', padding: '4px 8px', fontSize: '1.2rem', fontWeight: '700' }}
            >
              −
            </button>
            <span className="qty-display" style={{ minWidth: '24px', textAlign: 'center', color: '#fff', fontWeight: '600' }}>{qty}</span>
            <button
              type="button"
              className="qty-btn"
              onClick={() => setQty(Number(qty) + 1)}
              aria-label="Aumentar cantidad"
              style={{ background: 'transparent', border: 'none', color: '#ff7300', cursor: 'pointer', padding: '4px 8px', fontSize: '1.2rem', fontWeight: '700' }}
            >
              +
            </button>
          </div>
        ) : (
          <div className="empanada-total" style={{ padding: '6px 12px', borderRadius: '8px', background: 'rgba(255,115,0,0.1)', color: '#ff7300', fontWeight: '600', fontSize: '0.9rem' }}>
            Seleccionadas: {totalFlavorCount}
          </div>
        )}
      </div>

      <button
        className={`btn-add${isPulseActive ? ' btn-add--pulse' : ''}`}
        onClick={handleAdd}
        aria-label={`Agregar ${product.nombre}`}
        disabled={isEmpanada && totalFlavorCount === 0}
        style={{ 
          width: 'calc(100% - 40px)', 
          marginLeft: '20px',
          marginRight: '20px',
          justifyContent: 'center', 
          background: isEmpanada && totalFlavorCount === 0 ? '#444' : '#ff7300', 
          color: isEmpanada && totalFlavorCount === 0 ? '#888' : '#000',
          border: 'none',
          padding: '12px',
          borderRadius: '10px',
          fontWeight: '700',
          fontSize: '1rem',
          cursor: isEmpanada && totalFlavorCount === 0 ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginTop: '6px'
        }}
      >
        <PlusIcon />
        <span className="btn-add-label">Agregar {effectiveQty}</span>
      </button>
    </article>
  );
};

export default ProductCard;
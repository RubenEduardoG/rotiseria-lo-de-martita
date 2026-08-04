import React, { useState, useMemo, useEffect } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { formatPrice, validateNombre, validateDireccion } from '../utils/formatPrice.js';

const DELIVERY_FEE = 0; // Gratis

const Checkout = () => {
  const {
    carrito,
    modificarCantidad,
    removerProducto,
    guardarNuevaDireccion,
    direccionGuardada,
    vaciarCarrito,
  } = useCart();

  const [nombre, setNombre] = useState('');
  const [metodoEntrega, setMetodoEntrega] = useState('delivery');
  const [metodoPago, setMetodoPago] = useState('transferencia');
  const [direccion, setDireccion] = useState(direccionGuardada || '');
  const [aclaraciones, setAclaraciones] = useState('');
  const [pagaCon, setPagaCon] = useState('');
  const [codigoCupon, setCodigoCupon] = useState('');
  const [orderNumber, setOrderNumber] = useState(1);

  // Cargar y setear el número de pedido incremental desde localStorage
  useEffect(() => {
    const savedNumber = localStorage.getItem('martita_order_counter');
    if (savedNumber) {
      setOrderNumber(parseInt(savedNumber, 10));
    } else {
      localStorage.setItem('martita_order_counter', '1');
    }
  }, []);

  const subtotal = useMemo(() => carrito.reduce((s, it) => s + (it.precio || 0) * (it.cantidad || 0), 0), [carrito]);
  const delivery = metodoEntrega === 'delivery' && carrito.length > 0 ? DELIVERY_FEE : 0;
  const descuento = 0; 
  const total = Math.max(subtotal + delivery - descuento, 0);

  // Cálculo del vuelto en tiempo real
  const vuelto = useMemo(() => {
    if (metodoPago !== 'efectivo' || !pagaCon) return 0;
    const monto = parseFloat(pagaCon);
    return monto > total ? monto - total : 0;
  }, [pagaCon, total, metodoPago]);

  const handleWhatsApp = () => {
    if (!validateNombre(nombre)) {
      alert('Ingrese un nombre válido (mínimo 3 caracteres).');
      return;
    }

    if (!validateDireccion(direccion, metodoEntrega)) {
      alert('Ingrese una dirección válida para delivery.');
      return;
    }

    if (metodoPago === 'efectivo' && pagaCon && parseFloat(pagaCon) < total) {
      alert('El monto con el que vas a pagar no puede ser menor al total del pedido.');
      return;
    }

    // Formatear el string para el formato #0001
    const formattedOrderNum = String(orderNumber).padStart(4, '0');

    const itemsList = carrito
      .map((item) => {
        let itemLine = `• ${item.nombre}`;
        if (item.variant) itemLine += ` (${item.variant})`;
        if (item.salsa) itemLine += ` [Salsa: ${item.salsa}]`;
        if (item.empanadaFlavorSummary) itemLine += `\n   └─ _${item.empanadaFlavorSummary}_`;
        return `${itemLine}\n   *${item.cantidad}x* ${formatPrice(item.precio)}  ->  *${formatPrice(item.precio * item.cantidad)}*`;
      })
      .join('\n\n');

    // Construcción del Ticket Estilo Físico
    const ticketText = [
      `=========================`,
      ` 🧾 *TICKET DE PEDIDO #${formattedOrderNum}*`,
      `       *Lo de Martita*`,
      `=========================`,
      `*Cliente:* ${nombre}`,
      `*Entrega:* ${metodoEntrega === 'delivery' ? `🛵 Delivery` : `🛍️ Retiro en Local`}`,
      metodoEntrega === 'delivery' ? `*Dirección:* ${direccion}` : ``,
      `*Pago:* ${metodoPago === 'efectivo' ? '💵 Efectivo' : '💳 Transferencia'}`,
      metodoPago === 'efectivo' && pagaCon ? `*Paga con:* ${formatPrice(parseFloat(pagaCon))} (Vuelto: ${formatPrice(vuelto)})` : ``,
      aclaraciones.trim() ? `*Notas:* _"${aclaraciones.trim()}"_` : ``,
      `-------------------------`,
      `🛒 *DETALLE DEL MENÚ:*`,
      itemsList,
      `-------------------------`,
      `*Subtotal:* ${formatPrice(subtotal)}`,
      `*Envío:* ${delivery > 0 ? formatPrice(delivery) : 'Gratis'}`,
      descuento > 0 ? `*Descuento:* -${formatPrice(descuento)}` : ``,
      `=========================`,
      `💰 *TOTAL A PAGAR: ${formatPrice(total)}*`,
      `=========================`,
      `¡Muchas gracias por elegirnos! 😊`
    ]
      .filter((line) => line !== '')
      .join('\n');

    // Incrementar el contador para el próximo pedido (soporta hasta el infinito)
    const nextNumber = orderNumber + 1;
    localStorage.setItem('martita_order_counter', String(nextNumber));
    setOrderNumber(nextNumber);

    const encodedText = encodeURIComponent(ticketText);
    const whatsappUrl = `https://wa.me/541153286242?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
    vaciarCarrito();
  };

  const PlusIcon = () => (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"></path>
    </svg>
  );

  const MinusIcon = () => (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"></path>
    </svg>
  );

  const TrashIcon = () => (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 6h18M8 6v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"></path>
      <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"></path>
    </svg>
  );

  return (
    <div className="checkout container" style={{ color: '#fff', paddingBottom: '40px' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '24px', fontWeight: '700' }}>Finalizar Pedido</h2>

      <div className="checkout-grid">
        {/* RESUMEN DEL CARRITO */}
        <section className="cart-section chalkboard-card" style={{ background: '#141414', borderRadius: '12px', padding: '24px', border: '1px solid #222' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '20px', borderBottom: '1px solid #222', paddingBottom: '10px' }}>Resumen del carrito</h3>
          {carrito.length === 0 ? (
            <p className="muted">Tu carrito está vacío.</p>
          ) : (
            <ul className="cart-items" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {carrito.map((item) => (
                <li key={item.id} className="cart-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #1a1a1a' }}>
                  <div className="item-main">
                    <div className="item-title" style={{ fontWeight: '600', fontSize: '1.05rem' }}>{item.nombre}</div>
                    {item.variant && <small className="muted" style={{ display: 'block', color: '#888' }}>{item.variant}</small>}
                    {item.salsa && <small className="muted" style={{ display: 'block', color: '#888' }}>Salsa: {item.salsa}</small>}
                    {item.empanadaFlavorSummary && <small className="muted" style={{ fontStyle: 'italic', display: 'block', color: '#aaa', marginTop: '4px' }}>{item.empanadaFlavorSummary}</small>}
                    <div className="item-meta" style={{ marginTop: '6px', color: 'var(--accent)', fontWeight: '500' }}>{formatPrice(item.precio)} x {item.cantidad}</div>
                  </div>
                  <div className="item-actions" style={{ display: 'flex', gap: '8px' }}>
                    <button className="qty-btn" onClick={() => modificarCantidad(item.id, -1)} aria-label="Disminuir" style={{ background: '#222', border: 'none', color: '#fff', width: '32px', height: '32px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <MinusIcon />
                    </button>
                    <button className="qty-btn" onClick={() => modificarCantidad(item.id, 1)} aria-label="Aumentar" style={{ background: '#222', border: 'none', color: '#fff', width: '32px', height: '32px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <PlusIcon />
                    </button>
                    <button className="delete-btn" onClick={() => removerProducto(item.id)} aria-label="Eliminar" style={{ background: 'rgba(255, 59, 48, 0.1)', border: 'none', color: '#ff3b30', width: '32px', height: '32px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <TrashIcon />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* COMPONENTE DATOS DE ENTREGA ESTILIZADO */}
        <aside className="summary-section chalkboard-card" style={{ background: '#141414', borderRadius: '12px', padding: '24px', border: '1px solid #222', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #222', paddingBottom: '10px' }}>
            <h3 style={{ fontSize: '1.3rem', margin: 0 }}>Datos de entrega</h3>
            <span style={{ fontSize: '0.9rem', color: '#888', background: '#222', padding: '4px 8px', borderRadius: '6px', fontFamily: 'monospace' }}>
              Pedido #{String(orderNumber).padStart(4, '0')}
            </span>
          </div>

          {/* Campo Nombre */}
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label htmlFor="nombre" style={{ fontSize: '0.9rem', color: '#aaa', fontWeight: '500' }}>Nombre completo</label>
            <input id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej. Juan Pérez" style={{ background: '#1f1f1f', border: '1px solid #333', borderRadius: '8px', padding: '12px', color: '#fff', fontSize: '1rem', outline: 'none' }} />
          </div>

          {/* Método de Entrega */}
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label htmlFor="metodo-entrega" style={{ fontSize: '0.9rem', color: '#aaa', fontWeight: '500' }}>Método de entrega</label>
            <select id="metodo-entrega" value={metodoEntrega} onChange={(e) => setMetodoEntrega(e.target.value)} style={{ background: '#1f1f1f', border: '1px solid #333', borderRadius: '8px', padding: '12px', color: '#fff', fontSize: '1rem', outline: 'none', cursor: 'pointer' }}>
              <option value="delivery">🛵 Delivery a domicilio</option>
              <option value="takeaway">🛍️ Retiro en el local (Take Away)</option>
            </select>
          </div>

          {/* Dirección Condicional */}
          {metodoEntrega === 'delivery' && (
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px', background: '#1a1a1a', padding: '14px', borderRadius: '8px', border: '1px solid #262626' }}>
              <label htmlFor="direccion" style={{ fontSize: '0.9rem', color: '#aaa', fontWeight: '500' }}>Dirección de envío</label>
              <input id="direccion" value={direccion} onChange={(e) => setDireccion(e.target.value)} placeholder="Calle, número, departamento o barrio" style={{ background: '#111', border: '1px solid #333', borderRadius: '6px', padding: '10px', color: '#fff', fontSize: '0.95rem', outline: 'none' }} />
              <button onClick={() => { guardarNuevaDireccion(direccion); alert('¡Dirección guardada con éxito!'); }} className="btn-secondary" style={{ marginTop: '8px', width: '100%', background: '#222', border: '1px solid #444', color: '#fff', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '500' }}>
                💾 Guardar dirección por defecto
              </button>
            </div>
          )}

          {/* Método de Pago */}
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label htmlFor="metodo-pago" style={{ fontSize: '0.9rem', color: '#aaa', fontWeight: '500' }}>Método de pago</label>
            <select id="metodo-pago" value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)} style={{ background: '#1f1f1f', border: '1px solid #333', borderRadius: '8px', padding: '12px', color: '#fff', fontSize: '1rem', outline: 'none', cursor: 'pointer' }}>
              <option value="transferencia">💳 Transferencia bancaria / Alias</option>
              <option value="efectivo">💵 Efectivo (Paga al recibir)</option>
            </select>
          </div>

          {/* Dinámico: Paga Con (solo efectivo) */}
          {metodoPago === 'efectivo' && (
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px', background: 'rgba(241, 196, 15, 0.05)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(241, 196, 15, 0.2)' }}>
              <label htmlFor="paga-con" style={{ fontSize: '0.9rem', color: '#aaa', fontWeight: '500' }}>¿Con cuánto vas a pagar? (Opcional para vuelto)</label>
              <input id="paga-con" type="number" value={pagaCon} onChange={(e) => setPagaCon(e.target.value)} placeholder="Ej. 10000" style={{ background: '#111', border: '1px solid #333', borderRadius: '6px', padding: '10px', color: '#fff', fontSize: '0.95rem', outline: 'none' }} />
              {vuelto > 0 && (
                <div style={{ fontSize: '0.85rem', color: '#f1c40f', marginTop: '6px', fontWeight: '500' }}>
                  💰 Vuelto estimado: <strong>{formatPrice(vuelto)}</strong>
                </div>
              )}
            </div>
          )}

          {/* Aclaraciones / Notas adicionales */}
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label htmlFor="aclaraciones" style={{ fontSize: '0.9rem', color: '#aaa', fontWeight: '500' }}>Aclaraciones sobre el pedido</label>
            <textarea id="aclaraciones" value={aclaraciones} onChange={(e) => setAclaraciones(e.target.value)} placeholder="Sin cebolla, aderezos aparte, tocar timbre fuerte, etc." rows="2" style={{ background: '#1f1f1f', border: '1px solid #333', borderRadius: '8px', padding: '12px', color: '#fff', fontSize: '0.95rem', outline: 'none', resize: 'none', fontFamily: 'inherit' }} />
          </div>

          {/* Código de Cupón */}
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label htmlFor="codigo-cupon" style={{ fontSize: '0.9rem', color: '#aaa', fontWeight: '500' }}>Código de cupón</label>
            <input id="codigo-cupon" value={codigoCupon} onChange={(e) => setCodigoCupon(e.target.value)} placeholder="Ingresá tu código promocional" style={{ background: '#1f1f1f', border: '1px solid #333', borderRadius: '8px', padding: '12px', color: '#fff', fontSize: '0.95rem', outline: 'none' }} />
          </div>

          {/* DESGLOSE FINAL */}
          <div className="cost-breakdown" style={{ marginTop: '10px', borderTop: '1px solid #222', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className="row" style={{ display: 'flex', justifyContent: 'space-between', color: '#aaa' }}><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div className="row" style={{ display: 'flex', justifyContent: 'space-between', color: '#aaa' }}><span>Envío</span><span>{delivery > 0 ? formatPrice(delivery) : 'Gratis'}</span></div>
            <div className="row total" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', fontWeight: '700', color: '#fff', borderTop: '1px dashed #333', paddingTop: '12px', marginTop: '4px' }}>
              <span>Total</span><span style={{ color: 'var(--accent)' }}>{formatPrice(total)}</span>
            </div>
          </div>

          {/* BOTONES ACCIÓN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
            <button className="btn-whatsapp" onClick={handleWhatsApp} disabled={carrito.length === 0} style={{ width: '100%', background: '#25D366', color: '#fff', border: 'none', padding: '14px', borderRadius: '8px', fontSize: '1.05rem', fontWeight: '600', cursor: 'pointer', transition: 'opacity 0.2s' }}>
              💬 Enviar pedido por WhatsApp
            </button>
            <button className="btn-clear-cart" onClick={vaciarCarrito} style={{ width: '100%', background: 'transparent', color: '#888', border: '1px solid #222', padding: '10px', borderRadius: '8px', fontSize: '0.9rem', cursor: 'pointer' }}>
              Vaciar carrito
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Checkout;
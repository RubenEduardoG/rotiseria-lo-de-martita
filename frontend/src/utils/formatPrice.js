export const formatPrice = (price) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0
  }).format(price);
};

export const createWhatsAppMessage = (
  cart,
  totalLista,
  nombre,
  metodoEntrega,
  direccion,
  metodoPago
) => {
  const customerName = nombre ? nombre.trim() : 'Cliente';

  const itemLines = cart.map((item) => {
    const itemName = item.nombre || item.name || item.title || 'Producto';
    const quantity = item.cantidad ?? item.quantity ?? 1;
    const price = item.precio ?? item.price ?? 0;
    const formattedPrice = formatPrice(price);

    return `- ${quantity} x ${itemName} (${formattedPrice})`;
  });

  const deliveryLabel = metodoEntrega === 'delivery' ? 'Delivery' : 'Para llevar';
  const paymentLabel = metodoPago === 'efectivo' ? 'Efectivo' : 'Transferencia';

  const lines = [
    'Hola Martita! 👋',
    `Soy ${customerName} y quisiera hacer un pedido:`,
    '',
    '🛒 Pedido:',
    ...itemLines,
    '',
    `💵 Total: ${formatPrice(totalLista)}`,
    `🚚 Entrega: ${deliveryLabel}`,
  ];

  if (metodoEntrega === 'delivery' && direccion) {
    lines.push(`📍 Dirección: ${direccion}`);
  }

  lines.push(`💳 Pago: ${paymentLabel}`);

  if (metodoPago === 'efectivo') {
    lines.push('⚠️ Nota: aplicar 10% de descuento en efectivo.');
  }

  const message = lines.join('\n');
  return `https://api.whatsapp.com/send?phone=5491153286242&text=${encodeURIComponent(message)}`;
};

export const validateNombre = (nombre) => {
  return typeof nombre === 'string' && nombre.trim().length >= 3;
};

export const validateDireccion = (direccion, metodoEntrega) => {
  if (metodoEntrega === 'takeaway') {
    return true;
  }

  return typeof direccion === 'string' && direccion.trim().length > 5;
};
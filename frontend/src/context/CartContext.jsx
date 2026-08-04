import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext();
const ADDRESS_STORAGE_KEY = 'martita_direccion';
const CART_STORAGE_KEY = 'martita_carrito';

const readStoredCart = () => {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (!savedCart) return [];

    const parsedCart = JSON.parse(savedCart);
    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch {
    return [];
  }
};

const buildProductLineId = (producto = {}) => {
  const baseId = producto.lineId || producto.id || producto._id || producto.nombre;

  if (!baseId) {
    return `producto-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  const variantSuffix = producto.variant ? `-${producto.variant}` : '';
  const salsaSuffix = producto.salsa ? `-${producto.salsa}` : '';
  const flavorSuffix = producto.empanadaFlavorSummary ? `-${producto.empanadaFlavorSummary}` : '';

  return `${baseId}${variantSuffix}${salsaSuffix}${flavorSuffix}`;
};

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => readStoredCart());
  const [direccionGuardada, setDireccionGuardada] = useState('');

  useEffect(() => {
    try {
      const savedAddress = localStorage.getItem(ADDRESS_STORAGE_KEY);
      if (savedAddress) {
        setDireccionGuardada(savedAddress);
      }
    } catch {
      // Ignoramos errores de storage para no romper la experiencia
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(carrito));
    } catch {
      // Ignoramos errores de storage para no romper la experiencia
    }
  }, [carrito]);

  const agregarAlCarrito = useCallback((producto, cantidad = 1) => {
    const lineId = buildProductLineId(producto);
    const quantityToAdd = Number(cantidad) > 0 ? Number(cantidad) : 1;

    setCarrito((carritoActual) => {
      const existe = carritoActual.find((item) => item.id === lineId);

      if (existe) {
        return carritoActual.map((item) =>
          item.id === lineId ? { ...item, cantidad: item.cantidad + quantityToAdd } : item
        );
      }

      return [...carritoActual, { ...producto, id: lineId, cantidad: quantityToAdd }];
    });
  }, []);

  const modificarCantidad = useCallback((id, cambio) => {
    setCarrito((carritoActual) =>
      carritoActual
        .map((item) => {
          if (item.id === id) {
            return { ...item, cantidad: Math.max(item.cantidad + cambio, 0) };
          }
          return item;
        })
        .filter((item) => item.cantidad > 0)
    );
  }, []);

  const removerProducto = useCallback((id) => {
    setCarrito((carritoActual) => carritoActual.filter((item) => item.id !== id));
  }, []);

  const vaciarCarrito = useCallback(() => setCarrito([]), []);

  const guardarNuevaDireccion = useCallback((nuevaDireccion) => {
    setDireccionGuardada(nuevaDireccion);

    try {
      if (nuevaDireccion) {
        localStorage.setItem(ADDRESS_STORAGE_KEY, nuevaDireccion);
        return;
      }

      localStorage.removeItem(ADDRESS_STORAGE_KEY);
    } catch {
      // Ignoramos errores de storage para no romper la experiencia
    }
  }, []);

  const totalLista = useMemo(
    () => carrito.reduce((acc, item) => acc + (Number(item.precio) || 0) * (Number(item.cantidad) || 0), 0),
    [carrito]
  );

  const amountTotal = useMemo(
    () => carrito.reduce((acc, item) => acc + (Number(item.cantidad) || 0), 0),
    [carrito]
  );

  const value = useMemo(
    () => ({
      carrito,
      cart: carrito,
      direccionGuardada,
      agregarAlCarrito,
      onAdd: agregarAlCarrito,
      modificarCantidad,
      removerProducto,
      vaciarCarrito,
      guardarNuevaDireccion,
      totalLista,
      amountTotal,
      cartCount: amountTotal,
      totalItems: amountTotal,
    }),
    [agregarAlCarrito, amountTotal, carrito, direccionGuardada, guardarNuevaDireccion, modificarCantidad, removerProducto, totalLista, vaciarCarrito]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);

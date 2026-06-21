import React, { createContext, useState, useEffect, useMemo, useContext } from 'react';

const CartContext = createContext();
const STORAGE_KEY = 'martita_direccion';

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [direccionGuardada, setDireccionGuardada] = useState('');

  useEffect(() => {
    const savedAddress = localStorage.getItem(STORAGE_KEY);
    if (savedAddress) {
      setDireccionGuardada(savedAddress);
    }
  }, []);

  const agregarAlCarrito = (producto) => {
    const lineId = producto.id || producto.lineId || `${producto._id || producto.nombre}`;

    setCarrito((carritoActual) => {
      const existe = carritoActual.find((item) => item.id === lineId);

      if (existe) {
        return carritoActual.map((item) =>
          item.id === lineId ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }

      return [...carritoActual, { ...producto, id: lineId, cantidad: 1 }];
    });
  };

  const modificarCantidad = (id, cambio) => {
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
  };

  const removerProducto = (id) => {
    setCarrito((carritoActual) => carritoActual.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => setCarrito([]);

  const guardarNuevaDireccion = (nuevaDireccion) => {
    setDireccionGuardada(nuevaDireccion);
    localStorage.setItem(STORAGE_KEY, nuevaDireccion);
  };

  const totalLista = useMemo(
    () => carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0),
    [carrito]
  );

  const amountTotal = useMemo(
    () => carrito.reduce((acc, item) => acc + item.cantidad, 0),
    [carrito]
  );

 return (
    <CartContext.Provider
      value={{
        // 🌟 Exportamos el estado original y el alias para el Header
        carrito,
        cart: carrito, 
        
        direccionGuardada,
        
        // 🌟 Exportamos la función original y el alias para las tarjetas
        agregarAlCarrito,
        onAdd: agregarAlCarrito, 
        
        modificarCantidad,
        removerProducto,
        vaciarCarrito,
        guardarNuevaDireccion,
        totalLista,
        
        // 🌟 Exportamos los contadores totales bajo todos los nombres posibles
        amountTotal,
        cartCount: amountTotal,
        totalItems: amountTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

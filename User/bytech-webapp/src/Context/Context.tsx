import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  unidades: number;
  image: string;
  tipo: string;
}

interface CarritoContextType {
  carrito: Producto[];
  addToCarrito: (producto: Producto) => void;
}

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

export const CarritoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [carrito, setCarrito] = useState<Producto[]>([]);

  const addToCarrito = (producto: Producto) => {
    setCarrito([...carrito, producto]);
  };

  return (
    <CarritoContext.Provider value={{ carrito, addToCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe ser usado dentro de un CarritoProvider');
  }
  return context;
};

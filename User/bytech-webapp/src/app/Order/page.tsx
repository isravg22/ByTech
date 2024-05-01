'use client'
import Footer from "@/Component/Footer/Footer";
import NavBar from "@/Component/NavBar/Navbar";
import Image from "next/image";
import { useContext } from 'react';
import { CartContext } from '@/CartContext';

const Carrito = () => {
  const { carrito } = useContext(CartContext);

  return (
    <div>
      <NavBar />
      <h1 style={{ textAlign: 'center', marginTop: '5rem', fontSize: '25px', fontWeight: 'bold' }}>Carrito de compras</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', padding: '2rem' }}>
        {carrito.map((producto, index) => (
          <div key={index} style={{ width: '300px', height: '470px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '150px', height: '150px', position: 'relative' }}>
              <Image src={producto.image} alt='Imagen de un producto' layout="fill" objectFit="contain" />
            </div>
            <div style={{ width: '100%', height: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem', textAlign: 'center', width: '100%' }}>{producto.nombre}</p>
              <p style={{ fontSize: '1rem', marginBottom: '0.5rem', textAlign: 'center', width: '100%' }}>{producto.descripcion}</p>
              <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem', textAlign: 'center', width: '100%' }}>{producto.precio} €</p>
              <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem', textAlign: 'center', width: '100%' }}>Cantidad: {producto.cantidad}</p>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Carrito;

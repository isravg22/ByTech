'use client'
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NavBar from '@/Component/NavBar/Navbar';
import Footer from '@/Component/Footer/Footer';
import Producto from '@/Interface/Product';

export default function HomePage() {
  const [allProduct, setAllProduct] = useState<Producto[]>([]);
  const [selectedQuantities, setSelectedQuantities] = useState<{ [id: string]: number }>({});


  const handleQuantityChange = (id: string, tipo: string, quantity: number) => {
    const key = `${tipo}-${id}`;
    setSelectedQuantities(prev => ({ ...prev, [key]: quantity }));
  };

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const responseOrdenador = await fetch(`http://localhost:8000/ordenador`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
      });
      const responseSmartphone = await fetch(`http://localhost:8000/smartphone`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
      });
      const responseGaming = await fetch(`http://localhost:8000/gaming`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
      });
      const responseComponents = await fetch(`http://localhost:8000/components`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
      });

      const ordenador = await responseOrdenador.json();
      const smartphone = await responseSmartphone.json();
      const gaming = await responseGaming.json();
      const components = await responseComponents.json();

      const productos = [
        ...ordenador.map((producto: Producto) => ({ ...producto, tipo: 'ordenador' })),
        ...smartphone.map((producto: Producto) => ({ ...producto, tipo: 'smartphone' })),
        ...gaming.map((producto: Producto) => ({ ...producto, tipo: 'gaming' })),
        ...components.map((producto: Producto) => ({ ...producto, tipo: 'components' }))
      ];

      setAllProduct(productos);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div>
      <NavBar />
      <h1 style={{ textAlign: 'center', marginTop: '5rem', fontSize: '25px', fontWeight: 'bold' }}>Nuestros productos</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', padding: '2rem' }}>
        {allProduct.map((producto, index) => (
          <div key={index} style={{ width: '300px', height: '470px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Link href={`/${producto.tipo}/${producto.id}`} style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center', width: '100%' }}>
              <div style={{ width: '150px', height: '150px', position: 'relative' }}>
                <Image src={producto.image} alt='Imagen de un producto' layout="fill" objectFit="contain" />
              </div>
            </Link>
            <div style={{ width: '100%', height: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem', textAlign: 'center', width: '100%' }}>{producto.nombre}</p>
              <p style={{ fontSize: '1rem', marginBottom: '0.5rem', textAlign: 'center', width: '100%' }}>{producto.descripcion}</p>
              <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem', textAlign: 'center', width: '100%' }}>{producto.precio} €</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <p style={{ marginBottom: '0.5rem' }}>Cantidad: </p>
              <select
                value={selectedQuantities[`${producto.tipo}-${producto.id}`] || 1}
                onChange={(e) => handleQuantityChange(producto.id + '', producto.tipo, parseInt(e.target.value))}
                style={{ marginBottom: '1rem', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
              >
                <option value={"1"} style={{ textAlign: 'center' }}>1</option>
                <option value={"2"} style={{ textAlign: 'center' }}>2</option>
                <option value={"3"} style={{ textAlign: 'center' }}>3</option>
                <option value={"4"} style={{ textAlign: 'center' }}>4</option>
                <option value={"5"} style={{ textAlign: 'center' }}>5</option>
              </select>
              <button
                onClick={() => {
                }}
                style={{ padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%' }}
              >
                Añadir al carrito
              </button>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  )
}

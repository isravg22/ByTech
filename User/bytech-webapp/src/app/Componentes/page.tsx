'use client'
import Footer from '@/Component/Footer/Footer';
import NavBar from '@/Component/NavBar/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  unidades: number;
  image: string;
  tipo: string;
}

export default function Componentes() {
  const [allProduct, setAllProduct] = useState<Producto[]>([]);

  const getProducts = async () => {
    try {
      const responseOrdenador = await fetch(`http://localhost:8000/components`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
      })

      const ordenador = await responseOrdenador.json();

      const productos = [
        ...ordenador.map((producto: Producto) => ({ ...producto, tipo: 'ordenador' }))
      ];

      setAllProduct(productos);

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div>
      <NavBar />
      <h1 style={{ textAlign: 'center', marginTop: '5rem', fontSize: '25px', fontWeight: 'bold' }}>Nuestros componentes</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', padding: '2rem' }}>
        {allProduct.map((producto, index) => (
          <div key={index} style={{ width: '300px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Link href={`/${producto.tipo}/${producto.id}`} style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center', width: '100%' }}>
              <div style={{ width: '150px', height: '150px', position: 'relative' }}>
                <Image src={producto.image} alt='Imagen de un producto' layout="fill" objectFit="contain" />
              </div>
            </Link>
            <div style={{ width: '100%' }}>
              <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem', textAlign: 'center', width: '100%' }}>{producto.nombre}</p>
              <p style={{ fontSize: '1rem', marginBottom: '0.5rem', textAlign: 'center', width: '100%' }}>{producto.descripcion}</p>
              <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem', textAlign: 'center', width: '100%' }}>{producto.precio} €</p>
            </div>
            <button style={{ marginTop: 'auto', padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%' }}>Añadir al carrito</button>
          </div>
        ))} 
      </div>
      <Footer />
    </div>
  )
}

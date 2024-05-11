'use client'
import Footer from '@/Component/Footer/Footer';
import NavBar from '@/Component/NavBar/Navbar';
import { Producto } from '@/Interface/Product';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Gaming() {
  const [gamings, setGaming] = useState<Producto[]>([]);

  const handleDetailClick = (id: number) => {
    localStorage.setItem('idProducto', String(id));
  };

  const getProducts = async () => {
    try {
      const responseGaming = await fetch(`http://localhost:8000/product/type/Gaming`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
      })

      if(responseGaming.ok){
        const gamingData = await responseGaming.json();
        console.log('respuesta',gamingData);
        setGaming(gamingData);
      }

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getProducts();
  }, [])

  return (
    <div>
      <NavBar />
      <h1 style={{ textAlign: 'center', marginTop: '5rem', fontSize: '25px', fontWeight: 'bold' }}>NUESTROS PRODUCTOS DE GAMING</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', padding: '2rem' }}>
        {gamings.map((gaming, index) => (
          <div key={index} style={{ width: '300px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ marginBottom: '20px', width: '100%', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
              <img src={gaming.image} alt={gaming.name} style={{ objectFit: 'cover', width: '80%', height: '100%' }} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <h2 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', fontWeight: 'bold' }}>{gaming.name.toUpperCase()}</h2>              
              <p style={{ margin: '0 0 10px 0', fontSize: '1rem', minHeight: '30px' }}>
                Descripción: {gaming.description && gaming.description.length > 50
                  ? `${gaming.description.substring(0, 50).replace(/\s+(\S+)?$/, '')}...`
                  : gaming.description}
              </p>
              <p style={{ margin: '0 0 10px 0', fontSize: '1rem' }}>Precio: {gaming.price}€</p>
              <div onClick={() => handleDetailClick(gaming.id)}>
                <Link href={`/Home/details/`}>
                  <span style={{ marginRight: '10px', fontSize: '1rem', color: '#0070f3', textDecoration: 'none' }}>Ver detalles</span>
                </Link>
              </div>
            </div>
          </div>
        ))} 
      </div>
      <Footer />
    </div>
  )
}
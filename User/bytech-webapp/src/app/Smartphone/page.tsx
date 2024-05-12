'use client'
import Footer from '@/Component/Footer/Footer';
import NavBar from '@/Component/NavBar/Navbar';
import { Producto } from '@/Interface/Product';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Smartphone() {
  const [smartphones, setSmartphones] = useState<Producto[]>([]);

  const handleDetailClick = (id: number) => {
    localStorage.setItem('idProducto', String(id));
  };

  const getProducts = async () => {
    try {
      const responseSmartphone = await fetch(`http://localhost:8000/product/type/Smartphones`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
      })

      if(responseSmartphone.ok){
        const smartphoneData = await responseSmartphone.json();
        console.log('respuesta',smartphoneData);
        setSmartphones(smartphoneData);
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
      <h1 style={{ textAlign: 'center', marginTop: '5rem', fontSize: '25px', fontWeight: 'bold' }}>NUESTROS SMARTPHONES</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', padding: '2rem' }}>
        {smartphones.map((smarphone, index) => (
          <div key={index} style={{ width: '300px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ marginBottom: '20px', width: '100%', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
              <img src={smarphone.image} alt={smarphone.name} style={{ objectFit: 'cover', width: '80%', height: '100%' }} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <h2 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', fontWeight: 'bold' }}>{smarphone.name.toUpperCase()}</h2>              
              <p style={{ margin: '0 0 10px 0', fontSize: '1rem', minHeight: '30px' }}>
                Descripción: {smarphone.description && smarphone.description.length > 50
                  ? `${smarphone.description.substring(0, 50).replace(/\s+(\S+)?$/, '')}...`
                  : smarphone.description}
              </p>
              <p style={{ margin: '0 0 10px 0', fontSize: '1rem' }}>Precio: {smarphone.price}€</p>
              <div onClick={() => handleDetailClick(smarphone.id)}>
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
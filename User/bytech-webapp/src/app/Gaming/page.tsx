'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import NavBar from '@/Component/NavBar/Navbar';
import Footer from '@/Component/Footer/Footer';
import { Producto } from '@/Interface/Product';

export default function Gaming(){
  const [gamings, setGaming] = useState<Producto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleDetailClick = (id: number) => {
    localStorage.setItem('idProducto', String(id));
  };

  const getProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/product/type/Gaming', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (response.ok) {
        const productData = await response.json();
        setGaming(productData);
      } else {
        setError('Error al cargar los productos');
      }
    } catch (error) {
      setError('Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [gamings]);

  return (
    <div>
      <NavBar />
      <h1 style={{ marginBottom: '20px', textAlign: 'center', marginTop: '5%', fontSize: '30px', fontWeight: 'bold' }}>NUESTROS PRODUCTOS DE GAMING</h1>
      {loading && <p>Cargando productos...</p>}
      {error && <p>{error}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', }}>
        {gamings.map((gaming) => (
          <div key={gaming.id} style={{ flex: '0 1 23%', padding: '20px', marginBottom: '40px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff', textAlign: 'center', marginLeft: '1%', marginRight: '1%' }}>
            <div style={{ marginBottom: '20px', width: '100%', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
              <img src={gaming.image} alt={gaming.name} style={{ width: '40%', height: '100%' }} />
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
  );
};

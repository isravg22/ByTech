'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NavBar from '@/Component/NavBar/Navbar';
import Footer from '@/Component/Footer/Footer';
import { Producto } from '@/Interface/Product';


const HomePage = () => {
  const [products, setProducts] = useState<Producto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleDetailClick = (id: number) => {
    localStorage.setItem('idProducto', String(id));
  };

  const getProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/product', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (response.ok) {
        const productData = await response.json();
        setProducts(productData);
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
  }, []);

  return (
    <div >
      <NavBar />
      <h1 style={{ marginBottom: '20px', textAlign: 'center',marginTop:'3.5%', fontSize:'30px',fontWeight:'bold' }}>PRODUCTOS DISPONIBLES</h1>
      {loading && <p>Cargando productos...</p>}
      {error && <p>{error}</p>}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px',}}>
        {products.map((product) => (
          <div key={product.id} style={{ padding: '20px', marginBottom: '40px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff', textAlign: 'center', width: '300px' }}>
            <div style={{ marginBottom: '20px', width: '100%', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
              <Image src={product.image} alt={product.name} width={300} height={300} style={{ objectFit: 'cover', width: '80%', height: '100%' }} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <h2 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', fontWeight: 'bold' }}>{product.name.toUpperCase()}</h2>              
              <p style={{ margin: '0 0 10px 0', fontSize: '1rem', minHeight: '30px' }}>
                Descripción: {product.description && product.description.length > 50
                  ? `${product.description.substring(0, 50).replace(/\s+(\S+)?$/, '')}...`
                  : product.description}
              </p>
              <p style={{ margin: '0 0 10px 0', fontSize: '1rem' }}>Precio: {product.price}€</p>
              <div onClick={() => handleDetailClick(product.id)}>
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
export default HomePage;


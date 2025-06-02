'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import NavBar from '@/Component/NavBar/Navbar';
import Footer from '@/Component/Footer/Footer';
import { Producto } from '@/Interface/Product';
import Image from 'next/image';

export default function Gaming() {
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
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 mt-8 text-gray-800 tracking-wide">
          NUESTROS PRODUCTOS DE GAMING
        </h1>
        {loading && <p className="text-center text-gray-500">Cargando productos...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {gamings.map((gaming) => (
            <div
              key={gaming.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center p-5"
            >
              <div className="relative w-full h-48 flex items-center justify-center overflow-hidden rounded-lg mb-4 bg-gray-100">
                <Image
                  src={gaming.image}
                  alt={gaming.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'contain' }}
                  priority
                  className="object-contain h-full"
                />
              </div>
              <div className="w-full text-left">
                <h2 className="text-lg font-bold mb-2 text-gray-800">{gaming.name.toUpperCase()}</h2>
                <p className="text-gray-600 text-sm mb-2 min-h-[40px]">
                  Descripción: {gaming.description && gaming.description.length > 50
                    ? `${gaming.description.substring(0, 50).replace(/\s+(\S+)?$/, '')}...`
                    : gaming.description}
                </p>
                <p className="text-blue-600 font-semibold text-base mb-4">Precio: {gaming.price}€</p>
                <button
                  onClick={() => handleDetailClick(gaming.id)}
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition font-medium"
                >
                  <Link href={`/Gaming/details/`}>
                    Ver detalles
                  </Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

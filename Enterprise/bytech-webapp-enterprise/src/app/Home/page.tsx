'use client'
import Footer from '@/Component/Footer/Footer';
import NavBar from '@/Component/NavBar/Navbar';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import ChartComponent from '@/Component/chart/ChartComponent';

// Importa el componente ChartComponent de forma dinámica
const ChartComponentDynamic = dynamic(
  () => import('@/Component/chart/ChartComponent'),
  { ssr: false }
);

export default function HomePage() {
  const [productData, setProductData] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const idEnterprise=localStorage.getItem('idEnterprise');

  // Función para obtener los datos de la API
  const fetchData = async () => {
    try {
      const productResponse = await fetch(`http://localhost:8000/product/unidadesTotales/${54}/${idEnterprise}`);
      const productDatas = await productResponse.json();
      setProductData(productDatas);
      console.log(productData)

      // Realiza la llamada a la API para obtener los datos de ventas
      const salesResponse = await fetch('URL_PARA_OBTENER_VENTAS');
      const salesData = await salesResponse.json();

      setProductData(productData);
      setSalesData(salesData);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [productData]);

  return (
    <div>
      <NavBar />
      <h1 style={{marginTop:'5%'}}>Bienvenido</h1>
      {/* Renderiza el componente ChartComponent con los datos de productos y ventas */}
      <ChartComponentDynamic productData={productData} salesData={salesData}/>
      <Footer/>
    </div>
  );
}

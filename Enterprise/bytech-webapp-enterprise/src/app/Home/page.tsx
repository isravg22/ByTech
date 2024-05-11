'use client'
import { useEffect, useState } from 'react';
import NavBar from '@/Component/NavBar/Navbar';
import Footer from '@/Component/Footer/Footer';
import * as echarts from 'echarts';

export default function HomePage() {
  const [productData, setProductData] = useState([]);
  const idEnterprise = localStorage.getItem('idEnterprise');
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/product/unidadesTotales/${idEnterprise}`);
      const data = await response.json();
      setProductData(data);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const chart = echarts.init(document.getElementById('chart'));
    const options = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Cantidad de Productos']
      },
      xAxis: {
        type: 'category',
        data: months
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Cantidad de Productos',
          data: productData,
          type: 'bar'
        }
      ]
    };

    chart.setOption(options);

    return () => {
      chart.dispose();
    };

  }, [productData]);

  return (
    <div>
      <NavBar />
      <h1 style={{ marginTop: '5%' }}>Bienvenido</h1>
      <div id="chart" style={{ width: '100%', height: '400px' }} />
      <Footer />
    </div>
  );
}

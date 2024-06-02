'use client'
import React, { useEffect, useState } from 'react';
import NavBar from '@/Component/NavBar/Navbar';
import Footer from '@/Component/Footer/Footer';
import * as echarts from 'echarts';

export default function HomePage(){
  const [productData, setProductData] = useState([]);
  const idEnterprise = localStorage.getItem('idEnterprise');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/product/unidadesTotales/${idEnterprise}`);
        const data = await response.json();
        setProductData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (idEnterprise) {
      fetchData();
    }
  }, [idEnterprise]);

  useEffect(() => {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const renderChart = () => {
      if (productData.length === months.length) {
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
            },
          ]
        };

        chart.setOption(options);

        return () => {
          chart.dispose();
        };
      }
    };

    renderChart();

  }, [productData]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavBar />
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
        <h1 style={{ marginTop: '60px', marginBottom: '20px', fontSize: '2rem', fontWeight: 'bold' }}>Bienvenido</h1>
        <div id="chart" style={{ width: '100%', maxWidth: '1600px', height:'500px'}} />
      </div>
      <Footer />
    </div>
  );
}


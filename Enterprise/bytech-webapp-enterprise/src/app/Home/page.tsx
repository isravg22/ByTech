'use client'
import React, { useEffect, useState } from 'react';
import NavBar from '@/Component/NavBar/Navbar';
import Footer from '@/Component/Footer/Footer';
import * as echarts from 'echarts';

export default function HomePage() {
  const [productData, setProductData] = useState<number[]>([]);
  const [soldData, setSoldData] = useState<number[]>([]);
  const [moneyData, setMoneyData] = useState<number[]>([]);
  const [userName, setUserName] = useState('');
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalRestantes, setTotalRestantes] = useState(0);
  const [totalDinero, setTotalDinero] = useState(0);
  const idEnterprise = typeof window !== 'undefined' ? localStorage.getItem('idEnterprise') : null;

  const months = React.useMemo(() => [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ], []);


  useEffect(() => {
    setUserName(localStorage.getItem('userName') || '');
  }, []);

  const fetchData = React.useCallback(async () => {
    function normalizeMonthlyData(rawData: { mes: number, cantidad: number }[] | number[]) {
      if (Array.isArray(rawData) && typeof rawData[0] === 'object') {
        const result = Array(12).fill(0);
        (rawData as { mes: number, cantidad: number }[]).forEach(item => {
          if (item.mes >= 1 && item.mes <= 12) {
            result[item.mes - 1] = item.cantidad;
          }
        });
        return result;
      }
      return rawData as number[];
    }

    try {
      // Unidades registradas por mes
      const response = await fetch(`http://localhost:8000/product/unidadesTotales/${idEnterprise}`);
      const data = await response.json();
      console.log('unidadesTotales', data); // <-- Añade esto
      const normalized = normalizeMonthlyData(data);
      setProductData(normalized);
      setTotalProducts(normalized.reduce((a, b) => a + b, 0));

      // Unidades vendidas por mes
      const responseSold = await fetch(`http://localhost:8000/product/unidadesVendidasTotales/${idEnterprise}`);
      const dataSold = await responseSold.json();
      console.log('unidadesVendidasTotales', dataSold); // <-- Añade esto
      const normalizedSold = normalizeMonthlyData(dataSold);
      setSoldData(normalizedSold);

      // Dinero conseguido por mes
      const responseMoney = await fetch(`http://localhost:8000/product/dineroPorMes/${idEnterprise}`);
      const dataMoney = await responseMoney.json();
      console.log('dineroPorMes', dataMoney); // <-- Añade esto
      const normalizedMoney = normalizeMonthlyData(dataMoney);
      setMoneyData(normalizedMoney);

      // Total de unidades restantes
      const responseRestantes = await fetch(`http://localhost:8000/product/totalRestantes/${idEnterprise}`);
      const restantes = await responseRestantes.json();
      setTotalRestantes(restantes.total ?? restantes); // soporta {total: n} o n

      // Total de dinero conseguido
      const responseDinero = await fetch(`http://localhost:8000/product/totalDinero/${idEnterprise}`);
      const dinero = await responseDinero.json();
      setTotalDinero(dinero.total ?? dinero); // soporta {total: n} o n
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [idEnterprise]);

  useEffect(() => {
    if (
      productData.length === months.length &&
      soldData.length === months.length &&
      moneyData.length === months.length
    ) {
      const chartDom = document.getElementById('chart');
      if (!chartDom) return;
      const chart = echarts.init(chartDom);
      const options = {
        title: {
          text: 'Unidades registradas, vendidas y dinero conseguido por mes (año actual)',
          left: 'center',
          top: 10,
          textStyle: {
            fontSize: 18,
            fontWeight: 600,
            color: '#1a237e'
          }
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params: any) {
            let res = params[0].axisValue + '<br/>';
            params.forEach((item: any) => {
              if (item.seriesName === 'Dinero conseguido') {
                const value = item.data != null ? item.data : 0;
                res += `${item.marker} ${item.seriesName}: <b>${value.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</b><br/>`;
              } else {
                res += `${item.marker} ${item.seriesName}: <b>${item.data != null ? item.data : 0}</b><br/>`;
              }
            });
            return res;
          }
        },
        legend: {
          data: ['Registradas', 'Vendidas', 'Dinero conseguido'],
          top: 40
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '6%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: months,
          axisLabel: { rotate: 30 }
        },
        yAxis: [
          { type: 'value', name: 'Unidades' },
          { type: 'value', name: 'Dinero', position: 'right', axisLabel: { formatter: '{value} €' } }
        ],
        series: [
          {
            name: 'Registradas',
            data: productData,
            type: 'bar',
            itemStyle: {
              color: '#1976d2',
              borderRadius: [4, 4, 0, 0]
            },
            barWidth: '40%'
          },
          {
            name: 'Vendidas',
            data: soldData,
            type: 'bar',
            itemStyle: {
              color: '#43a047',
              borderRadius: [4, 4, 0, 0]
            },
            barWidth: '40%'
          },
          {
            name: 'Dinero conseguido',
            data: moneyData,
            type: 'line',
            yAxisIndex: 1,
            itemStyle: {
              color: '#ff9800'
            },
            lineStyle: {
              width: 3
            },
            symbol: 'circle',
            symbolSize: 10
          }
        ]
      };

      chart.setOption(options);
      const handleResize = () => chart.resize();
      window.addEventListener('resize', handleResize);

      return () => {
        chart.dispose();
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [productData, soldData, moneyData, months, moneyData.length, productData.length, soldData.length]);

  const handleBuy = async () => {
    // Lógica para crear la venta...
    await fetch(`http://localhost:8000/sale/create/${userName}`, { method: 'POST' });
    // Refresca los datos de la gráfica
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      background: 'linear-gradient(120deg, #f5faff 0%, #e3f0ff 100%)'
    }}>
      <NavBar />
      <div style={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '32px 12px 24px 12px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: 1100,
          margin: '40px 0 0 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start'
        }}>
          <h1 style={{
            fontSize: '2.1rem',
            fontWeight: 700,
            color: '#1a237e',
            marginBottom: 8,
            letterSpacing: '1px'
          }}>
            Bienvenido{userName ? `, ${userName}` : ''} 👋
          </h1>
          <p style={{
            fontSize: '1.08rem',
            color: '#3949ab',
            marginBottom: 24,
            fontWeight: 400
          }}>
            Resumen de unidades de productos registrados y vendidos por mes en tu empresa (año actual).
          </p>
        </div>
        {/* Cuadraditos resumen */}
        <div style={{
          display: 'flex',
          gap: 24,
          marginBottom: 18,
          width: '100%',
          maxWidth: 1100,
          justifyContent: 'flex-start'
        }}>
          <div style={{
            background: 'linear-gradient(90deg, #1976d2 60%, #64b5f6 100%)',
            color: 'white',
            borderRadius: 12,
            padding: '18px 28px',
            minWidth: 180,
            boxShadow: '0 2px 8px #90caf9',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
          }}>
            <span style={{ fontSize: 15, fontWeight: 500, opacity: 0.9 }}>Total registrados</span>
            <span style={{ fontSize: 28, fontWeight: 700, marginTop: 2 }}>{totalProducts}</span>
          </div>
          <div style={{
            background: 'linear-gradient(90deg, #43a047 60%, #81c784 100%)',
            color: 'white',
            borderRadius: 12,
            padding: '18px 28px',
            minWidth: 180,
            boxShadow: '0 2px 8px #a5d6a7',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
          }}>
            <span style={{ fontSize: 15, fontWeight: 500, opacity: 0.9 }}>Unidades restantes</span>
            <span style={{ fontSize: 28, fontWeight: 700, marginTop: 2 }}>{totalRestantes}</span>
          </div>
          <div style={{
            background: 'linear-gradient(90deg, #ff9800 60%, #ffe082 100%)',
            color: '#1a237e',
            borderRadius: 12,
            padding: '18px 28px',
            minWidth: 180,
            boxShadow: '0 2px 8px #ffe082',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
          }}>
            <span style={{ fontSize: 15, fontWeight: 500, opacity: 0.9 }}>Dinero conseguido</span>
            <span style={{ fontSize: 28, fontWeight: 700, marginTop: 2 }}>
              {totalDinero.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
            </span>
          </div>
        </div>
        {/* Gráfica */}
        <div style={{
          width: '100%',
          maxWidth: 1100,
          background: 'rgba(255,255,255,0.97)',
          borderRadius: 18,
          boxShadow: '0 4px 24px rgba(44, 62, 80, 0.10), 0 1.5px 8px #90caf9',
          padding: '36px 24px 24px 24px',
          margin: '0 auto 32px auto',
          minHeight: 500,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div id="chart" style={{ width: '100%', height: '420px', minHeight: 350 }} />
        </div>
      </div>
      <Footer />
    </div>
  );
}


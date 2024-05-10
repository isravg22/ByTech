import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const ChartComponent = ({ productData, salesData }:any) => {
  useEffect(() => {
    const chart = echarts.init(document.getElementById('chart'));
    
    const options = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Cantidad de Productos', 'Ventas']
      },
      xAxis: {
        type: 'category',
        data: productData.map((item:any) => item.month)
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        name: 'Cantidad de Productos',
        data: productData.map((item:any) => item.quantity),
        type: 'bar'
      },{
        name: 'Ventas',
        data: salesData.map((item:any) => item.sales),
        type: 'bar'
      }]
    };
    
    chart.setOption(options);

    return () => {
      chart.dispose();
    };
  }, [productData, salesData]);

  return <div id="chart" style={{ width: '100%', height: '400px' }} />;
};

export default ChartComponent;

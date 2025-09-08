import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { SaleDetail } from '@/interfaces/SaleDetail';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Sales() {
  const [userName, setUserName] = useState<string | undefined>();
  const [saleDetails, setSaleDetails] = useState<SaleDetail[]>([]);

  const getUserName = async () => {
    try {
      const idUser = await AsyncStorage.getItem('idUser');
      if (idUser) {
        const response = await fetch(`http://192.168.0.27:8001/user/${idUser}`);
        if (response.ok) {
          const data = await response.json();
          setUserName(data.userName);
        }
      }
    } catch (error) {
      console.error('Error getting user data:', error);
    }
  }

  const getSales = async () => {
      try {
          const response = await fetch(`http://192.168.0.27:8001/sale/client/${userName}`);
          if (response.ok) {
              const data = await response.json();
              setSaleDetails(data);
          } else {
              throw new Error('Error fetching sale data');
          }
      } catch (error) {
          console.error('Error fetching sale data:', error);
      }
  }

  useEffect(() => {
    getUserName();
  }, []);

  useEffect(() => {
    if (userName) {
      getSales();
    }
  }, [userName,saleDetails]);

  return (
    <View style={{ marginLeft: 20, marginTop: 60 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
        Detalles de la compra:
      </Text>
      {saleDetails && saleDetails.length > 0 ? (
        saleDetails.map((detail) => (
          <View key={detail.id} style={{ marginBottom: 40, borderRadius: 5, padding: 20, backgroundColor: '#f0f0f0' }}>
            <Text style={{ fontSize: 16 }}>
              <Text style={{ fontWeight: 'bold' }}>ID del pedido:</Text> {detail.id}
            </Text>
            <Text style={{ fontSize: 16 }}>
              <Text style={{ fontWeight: 'bold' }}>Precio:</Text> {detail.total} €
            </Text>
            <Text style={{ fontSize: 16 }}>
              <Text style={{ fontWeight: 'bold' }}>Fecha:</Text> {new Date(detail.date).toLocaleDateString('es-ES')}
            </Text>
          </View>
        ))
      ) : (
        <Text style={{ fontSize: 16 }}>
          No hay detalles de compra disponibles
        </Text>
      )}
    </View>
  );
}

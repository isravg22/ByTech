import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Producto } from '@/interfaces/Product';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavBar from '@/components/NavBar/NavBar';

export default function Ordenador({ navigation }: any) {
    const [ordenadores, setOrdenadores] = useState<Producto[]>([]);

    const handleDetailClick = (id: number) => {
        AsyncStorage.setItem('idProducto', String(id));
        navigation.navigate('Detail')
    };

    const getProducts = async () => {
        try {
            const response = await fetch('http://192.168.0.247:8001/product/type/Ordenador', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                const productData = await response.json();
                setOrdenadores(productData);
            }
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getProducts();
    }, [ordenadores]);

    return (
        <View style={{ flex: 1, backgroundColor: '#00C8E6' }}>
            <NavBar />

            <ScrollView style={{ paddingHorizontal: 20 }}>
                <Text style={{ marginBottom: 20, textAlign: 'center', fontSize: 30, fontWeight: 'bold' }}>NUESTROS ORDENADORES</Text>
                {ordenadores.map((ordenador) => (
                    <TouchableOpacity key={ordenador.id} style={{ backgroundColor: '#ffffff', marginBottom: 20, borderWidth: 1, borderColor: '#ccc', borderRadius: 8 }}>
                        <View style={{ height: 200, overflow: 'hidden' }}>
                            <Image source={{ uri: ordenador.image }} style={{ width: '50%', height: '100%', alignSelf: 'center', justifyContent: 'center' }} />
                        </View>
                        <View style={{ padding: 10 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>{ordenador.name.toUpperCase()}</Text>
                            <Text style={{ fontSize: 16, marginBottom: 10 }} numberOfLines={2}>{ordenador.description}</Text>
                            <Text style={{ fontSize: 16, marginBottom: 10 }}>Precio: {ordenador.price}€</Text>
                            <View  >
                                <TouchableOpacity onPress={() => handleDetailClick(ordenador.id)}>
                                    <Text style={{ color: '#0070f3', fontSize: 16, textDecorationLine: 'none' }}>Ver detalles</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

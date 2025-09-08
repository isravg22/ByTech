import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
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
            const response = await fetch('http://192.168.0.27:8001/product/type/Ordenador', {
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
    }, []);

    return (
        <View style={styles.container}>
            <NavBar />
            <ScrollView style={styles.scroll}>
                <Text style={styles.title}>NUESTROS ORDENADORES</Text>
                {ordenadores.map((ordenador) => (
                    <TouchableOpacity
                        key={ordenador.id}
                        style={styles.card}
                        activeOpacity={0.85}
                        onPress={() => handleDetailClick(ordenador.id)}
                    >
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: ordenador.image }} style={styles.image} />
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.name}>{ordenador.name.toUpperCase()}</Text>
                            <Text style={styles.description} numberOfLines={2}>
                                {ordenador.description}
                            </Text>
                            <Text style={styles.price}>Precio: {ordenador.price}€</Text>
                            <View style={styles.buttonContainer}>
                                <Text style={styles.buttonText}>Ver detalles</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e3f0ff', // Fondo suave como en la web
    },
    scroll: {
        paddingHorizontal: 20,
    },
    title: {
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1a237e',
        marginTop: 20,
        letterSpacing: 1,
    },
    card: {
        backgroundColor: '#fff',
        marginBottom: 24,
        borderRadius: 16,
        shadowColor: '#90caf9',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.18,
        shadowRadius: 8,
        elevation: 6,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    imageContainer: {
        width: 110,
        height: 110,
        backgroundColor: '#f4f8ff',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 18,
    },
    image: {
        width: 90,
        height: 90,
        resizeMode: 'contain',
    },
    info: {
        flex: 1,
        justifyContent: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a237e',
        marginBottom: 6,
        letterSpacing: 0.5,
    },
    description: {
        fontSize: 15,
        color: '#3949ab',
        marginBottom: 8,
        minHeight: 36,
    },
    price: {
        fontSize: 16,
        color: '#1976d2',
        fontWeight: '600',
        marginBottom: 8,
    },
    buttonContainer: {
        backgroundColor: '#1976d2',
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 18,
        alignSelf: 'flex-start',
        marginTop: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
});

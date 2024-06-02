import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import NavBar from '@/components/NavBar/NavBar';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Producto } from '@/interfaces/Product';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Detail() {
    const [amountToAdd, setAmount] = useState<number>(1)
    const [id, setId] = useState<string | null>(null);
    const [infoProduct, setInfoProduct] = useState<Producto>();

    useEffect(() => {
        AsyncStorage.getItem('idProducto')
            .then((id) => {
                if (id) {
                    setId(id);
                    getProductById(id);
                }
            })
            .catch((error) => console.log(error));
    }, []);

    const getProductById = async (id: string) => {
        const response = await fetch(`http://192.168.0.27:8001/product/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (response.ok) {
            const data = await response.json();
            setInfoProduct(data)
        }
    }

    const add = () => {
        setAmount(amountToAdd + 1)
    }
    const subtract = () => {
        if (amountToAdd > 1) {
            setAmount(amountToAdd - 1)
        }
    }

    const addToCart = async ({ amountToAdd, productToAdd }: any) => {
        const userId = await AsyncStorage.getItem('idUser');
        const responseUser = await fetch(`http://192.168.0.27:8001/user/${userId}`)
        let user;
        if (responseUser.ok) {
            const userData = await responseUser.json();
            user = userData;
        }

        let cartObject = {
            client: user,
            product: productToAdd,
            amount: amountToAdd
        }
        const responseProduct = await fetch(`http://192.168.0.27:8001/shoppingList/addProductToList`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cartObject)
        })
        if (responseProduct.ok) {
            console.log(responseProduct.json())
        }
    }

    const addProduct = (productToAdd: any) => {
        addToCart({ amountToAdd, productToAdd })
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <NavBar />
            <View style={{ marginTop: '5%', padding: 20 }}>
                <Image source={{ uri: infoProduct?.image }} alt='product' style={{ width: '100%', aspectRatio: 1 }} />
                <View style={{ paddingLeft: 20 }}>
                    <Text style={{ fontSize: 30, fontWeight: '600', fontFamily: 'Roboto', marginTop: 20 }}>{infoProduct?.name?.toUpperCase()}</Text>
                    <Text style={{ fontSize: 20, fontWeight: '400', fontFamily: 'Roboto' }}>{infoProduct?.description}</Text>
                    <Text style={{ fontSize: 30, fontWeight: '600', fontFamily: 'Roboto', marginTop: 10 }}>{infoProduct?.price?.toFixed(2)} €</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                        <TouchableOpacity onPress={subtract} disabled={amountToAdd === 1}>
                            <Icon name='minus' size={24} color="blue" />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 20, marginHorizontal: 10 }}>{amountToAdd}</Text>
                        <TouchableOpacity onPress={add}>
                            <Icon name='plus' size={24} color="blue" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => addProduct(infoProduct)} style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5, marginLeft: 10 }}>
                            <Text style={{ color: 'white' }}>Añadir al carrito</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

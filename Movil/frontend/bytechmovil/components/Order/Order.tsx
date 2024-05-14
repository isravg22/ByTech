import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, TextInput, ScrollView } from 'react-native';
import NavBar from '@/components/NavBar/NavBar';
import { CartItem } from '@/interfaces/CartItem';
import Sales from '@/components/Sales/Sale';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Carrito (){
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [userName, setUserName] = useState<string | undefined>();

  const getCart = async () => {
    try {
      const idUser = await AsyncStorage.getItem('idUser');
      if (!idUser) return;
      const responseUser = await fetch(`http://192.168.0.247:8001/user/${idUser}`);
      if (!responseUser.ok) {
        throw new Error('Error fetching user data');
      }
      const userData = await responseUser.json();
      const userName = userData.userName;
      setUserName(userName);

      const response = await fetch(`http://192.168.0.247:8001/shoppingList/user/${userName}`);
      if (!response.ok) {
        throw new Error('Error fetching shopping cart data');
      }
      const data = await response.json();
      setCartItems(data);

      const total = data.reduce((acc: any, item: any) => acc + item.product.price * item.amount, 0);
      setTotalPrice(total);
    } catch (error) {
      console.error('Error getting shopping cart data:', error);
    }
  };

  const removeFromCart = (id: number) => {
    fetch(`http://192.168.0.247:8001/shoppingList/clean/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setCartItems(cartItems.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error('Error removing item from cart:', error);
      });
  };

  const updateAmount = (id: number, newAmount: number) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, amount: newAmount };
      }
      return item;
    });

    setCartItems(updatedCartItems);

    fetch(`http://192.168.0.247:8001/shoppingList/updateProductQuantity/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: newAmount }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error updating item quantity: ${response.statusText}`);
        }
      })
      .catch((error) => {
        console.error('Error updating item quantity:', error);
        setCartItems(cartItems.map((item) => {
          if (item.id === id) {
            return { ...item, amount: item.amount };
          }
          return item;
        }));
      });
  };

  const createSale = async () => {
    try {
      const response = await fetch(`http://192.168.0.247:8001/sale/create/${userName}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
      });
      if (!response.ok) {
        throw new Error('Error creating sale');
      }
    } catch (error) {
      console.error('Error creating sale:', error);
    }
  };
  useEffect(() => {
    getCart();
  });

  return (
    <View style={{ flex: 1 }}>
      <NavBar />
      <ScrollView>
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 24, textAlign: 'center', marginTop: 0 }}>
            Carrito de compras
          </Text>
          <View>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <View key={item.id} style={{ marginBottom: 20 }}>
                  <Image
                    source={{ uri: item.product.image }}
                    style={{ width: 100, height: 100, marginRight: 20, borderRadius: 5 }}
                  />
                  <View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                      {item.product.name}
                    </Text>
                    <Text style={{ fontSize: 16 }}>
                      Precio: {item.product.price} €
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                      <Text style={{ marginRight: 10 }}>
                        Cantidad:
                      </Text>
                      <Button title="-" onPress={() => updateAmount(item.id, item.amount - 1)} disabled={item.amount === 1} />
                      <TextInput
                        keyboardType="numeric"
                        value={item.amount.toString()}
                        onChangeText={(value) => {
                          const newAmount = parseInt(value);
                          if (!isNaN(newAmount) && newAmount >= 1) {
                            updateAmount(item.id, newAmount);
                          }
                        }}
                        style={{ width: 80, marginRight: '2%', marginLeft: '2%', textAlign: 'center' }}
                      />
                      <Button title="+" onPress={() => updateAmount(item.id, item.amount + 1)} />
                    </View>
                    <Button title="Eliminar" color="red" onPress={() => removeFromCart(item.id)} />
                  </View>
                </View>
              ))
            ) : (
              <Text>Tu carrito está vacío</Text>
            )}
            {
              totalPrice !== 0 ? (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                    Total: {totalPrice} €
                  </Text>
                  <Button title="Pagar" onPress={createSale} />
                </View>
              ) : null
            }
          </View>
        </View>
        <View style={{ padding: 20 }}>
          <View style={{ width: '100%', height: 1, backgroundColor: 'rgba(0,0,0,0.1)', marginVertical: 60 }} />
          <Sales/>
        </View>
      </ScrollView>
    </View>
  );
};

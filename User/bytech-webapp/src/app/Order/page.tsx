'use client'
/* import Footer from "@/Component/Footer/Footer";
import NavBar from "@/Component/NavBar/Navbar";
import Image from "next/image";
import { useEffect, useState } from 'react';

interface Product {
  category: string;
  description: string;
  id: number;
  image: string;
  name: string;
  price: number;
}
interface Client {
  activated: number;
  email: string
  enterprise: number
  firstName: string
  id: number
  lastName: string
  password: string
  rol: string
  userName: string
}

interface ShoppingCart {
  id: number;
  product: Product;
  client: Client;
  amount: number;
}


const Carrito = () => {
  const [carrito, setCarrito] = useState<ShoppingCart[]>([]);
  const [userName, setUserName] = useState<string>();

  const getUserName = async () => {
    const idUser = localStorage.getItem('idUser');

    const response = await fetch(`http://localhost:8000/user/${idUser}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })

    if (response.ok) {
      const userData = await response.json();
      setUserName(userData.userName);
    }
  }
  console.log('userName: ', userName)
  const getProductos = async () => {
    try {
      const response = await fetch(`http://localhost:8000/shoppingList/user/${userName}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        const responseCarrito = await response.json();
        console.log('carrito', responseCarrito);
        setCarrito(responseCarrito);
      }
    } catch (error) {
      console.error('Error al cargar el carrito:', error);
    }
  };

  console.log(carrito)

  useEffect(() => {
    if (userName) {
      getProductos();
    }
    getUserName();
  }, [userName]);
  

  return (
    <div>
      <NavBar />
      <h1 style={{ textAlign: 'center', marginTop: '5rem', fontSize: '25px', fontWeight: 'bold' }}>Carrito de compras</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', padding: '2rem' }}>

        {carrito.map((item, index) => (
          <div key={index} style={{ width: '300px', height: '470px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '150px', height: '150px', position: 'relative' }}>
              <Image src={item.product.image} alt='Imagen de un producto' layout="fill" objectFit="contain" />
            </div>
            <div style={{ width: '100%', height: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem', textAlign: 'center', width: '100%' }}>{item.product.name}</p>
              <p style={{ fontSize: '1rem', marginBottom: '0.5rem', textAlign: 'center', width: '100%' }}>{item.product.description}</p>
              <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem', textAlign: 'center', width: '100%' }}>{item.product.price} €</p>
              <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem', textAlign: 'center', width: '100%' }}>Cantidad: {item.amount}</p>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Carrito;
 */

import { useState, useEffect } from 'react';

// Definir el tipo de dato para los productos en el carrito
type CartItem = {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
  };
  amount: number;
};

const Cartito = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]); // Asegurarse de que el estado sea un array de elementos del carrito

  useEffect(() => {
    fetch('http://localhost:8080/shoppingList')
      .then((response) => response.json())
      .then((data: CartItem[]) => { // Asegurarse de que los datos se conviertan a un array de elementos del carrito
        setCartItems(data);
      });
  }, []);

  const removeFromCart = (id: number) => {
    fetch(`http://localhost:8080/shoppingList/clean/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setCartItems(cartItems.filter((item) => item.id !== id));
    });
  };

  return (
    <div>
      <h1>Carrito de Compras</h1>
      <div>
        {cartItems.map((item) => (
          <div key={item.id}>
            <h2>{item.product.name}</h2>
            <p>Precio: ${item.product.price}</p>
            <p>Cantidad: {item.amount}</p>
            <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cartito;

'use client'
import { useState, useEffect } from 'react';
import NavBar from '@/Component/NavBar/Navbar';
import Footer from '@/Component/Footer/Footer';
import { Typography, Button, Divider, TextField } from '@mui/material';
import Image from 'next/image';
import { CartItem } from '@/Interface/CartItem';
import Sales from '@/Component/Sales/Sale';

const Cartito = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const idUser = typeof window !== 'undefined' ? localStorage.getItem('idUser') : null;
  const [userName, setUserName] = useState<string | undefined>();

  const getCart = async () => {
    try {
      const responseUser = await fetch(`http://localhost:8000/user/${idUser}`);
      if (!responseUser.ok) {
        throw new Error('Error fetching user data');
      }
      const userData = await responseUser.json();
      const userName = userData.userName;
      setUserName(userName);

      const response = await fetch(`http://localhost:8000/shoppingList/user/${userName}`);
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
    fetch(`http://localhost:8000/shoppingList/clean/${id}`, {
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

    fetch(`http://localhost:8000/shoppingList/updateProductQuantity/${id}`, {
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
      const response = await fetch(`http://localhost:8000/sale/create/${userName}`, {
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
  }, [cartItems]);

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <NavBar />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', display: 'flex', gap: '32px' }}>
        <div style={{
          flex: 1,
          background: 'rgba(255,255,255,0.97)',
          borderRadius: '18px',
          boxShadow: '0 4px 24px rgba(44,62,80,0.10)',
          padding: '2em 2em',
          marginTop: '60px'
        }}>
          <Typography variant="h4" align="center" gutterBottom style={{ marginBottom: '32px', color: '#1a237e', fontWeight: 700 }}>
            Carrito de compras
          </Typography>
          <div>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.id} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                  <Image src={item.product.image} alt={item.product.name} style={{ width: '100px', marginRight: '20px', borderRadius: '5px' }} width={100} height={100} />
                  <div>
                    <Typography variant="h6" gutterBottom>
                      {item.product.name}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Precio: {item.product.price} €
                    </Typography>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                      <Typography variant="body1" gutterBottom style={{ marginRight: '10px' }}>
                        Cantidad:
                      </Typography>
                      <Button variant="contained" color="primary" onClick={() => updateAmount(item.id, item.amount - 1)} disabled={item.amount === 1}>
                        -
                      </Button>
                      <TextField
                        type="number"
                        variant="outlined"
                        value={item.amount}
                        onChange={(e) => {
                          const newAmount = parseInt(e.target.value);
                          if (!isNaN(newAmount) && newAmount >= 1) {
                            updateAmount(item.id, newAmount);
                          }
                        }}
                        style={{ width: '80px', marginRight: '2%', marginLeft: '2%' }}
                        inputProps={{ style: { textAlign: 'center' } }}
                      />
                      <Button variant="contained" color="primary" onClick={() => updateAmount(item.id, item.amount + 1)}>
                        +
                      </Button>
                    </div>
                    <Button variant="contained" color="error" onClick={() => removeFromCart(item.id)}>
                      Eliminar
                    </Button>
                    <Divider style={{ margin: '20px 0' }} />
                  </div>
                </div>
              ))
            ) : (
              <Typography variant="body1" gutterBottom>
                Tu carrito está vacío
              </Typography>
            )}
            {
              totalPrice != 0 ? (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                  <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                    Total: {totalPrice} €
                  </Typography>
                  <Button variant='contained' color='primary' onClick={createSale} style={{ marginRight: '20px' }}>
                    Pagar
                  </Button>
                </div>
              ) : ''
            }
          </div>
        </div>
        <Divider orientation="vertical" flexItem style={{ marginTop: '60px', marginBottom: '50px' }} />
        <div style={{ marginTop: '60px', width: '100%', maxWidth: 420 }}>
          <Sales />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cartito;

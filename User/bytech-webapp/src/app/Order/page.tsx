'use client'
import { useState, useEffect } from 'react';
import NavBar from '@/Component/NavBar/Navbar';
import Footer from '@/Component/Footer/Footer';
import { Typography, Button, Divider, TextField } from '@mui/material';

type CartItem = {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
  amount: number;
};

const Cartito = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const idUser = localStorage.getItem('idUser');

  const getCart = async () => {
    try {
      const responseUser = await fetch(`http://localhost:8000/user/${idUser}`);
      if (!responseUser.ok) {
        throw new Error('Error fetching user data');
      }
      const userData = await responseUser.json();
      const userName = userData.userName;

      const response = await fetch(`http://localhost:8000/shoppingList/user/${userName}`);
      if (!response.ok) {
        throw new Error('Error fetching shopping cart data');
      }
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error('Error getting shopping cart data:', error);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

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
        // Revertir el cambio en el estado local
        setCartItems(cartItems.map((item) => {
          if (item.id === id) {
            return { ...item, amount: item.amount };
          }
          return item;
        }));
      });
  };
  
  
  

  return (
    <div>
      <NavBar />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <Typography variant="h3" align="center" gutterBottom style={{ marginTop: '7%' }}>
          Carrito de compras
        </Typography>
        <div>
          {cartItems.map((item) => (
            <div key={item.id} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
              <img src={item.product.image} alt={item.product.name} style={{ width: '100px', marginRight: '20px' }} />
              <div>
                <Typography variant="h5" gutterBottom>
                  {item.product.name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Precio: ${item.product.price}
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <Typography variant="body1" gutterBottom style={{ marginRight: '10px' }}>
                    Cantidad:
                  </Typography>
                  <Button variant="outlined" onClick={() => updateAmount(item.id, item.amount - 1)} disabled={item.amount === 1}>
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
                    style={{ width: '60px', margin: '0 10px', justifyContent:'center' }}
                  />
                  <Button variant="outlined" onClick={() => updateAmount(item.id, item.amount + 1)}>
                    +
                  </Button>
                </div>
                <Button variant="contained" color="error" onClick={() => removeFromCart(item.id)}>
                  Eliminar
                </Button>
                <Divider style={{ margin: '20px 0' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cartito;
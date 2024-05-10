'use client'
import { Button, Grid, IconButton,Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import NavBar from '@/Component/NavBar/Navbar';
import Footer from '@/Component/Footer/Footer';
import Image from 'next/image';
type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
};

export default function Detail() {
  const [amountToAdd, setAmount] = useState<number>(1)
  const id = localStorage.getItem('idProducto');
  const [infoProduct, setInfoProduct] = useState<Product>();

  const getProductById = async () => {
    const response = await fetch(`http://localhost:8000/product/${id}`, {
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
    setAmount(amountToAdd - 1)
  }

  const addToCart = async ({ amountToAdd, productToAdd }: any) => {
    const userId = localStorage.getItem('idUser');
    const responseUser = await fetch(`http://localhost:8000/user/${userId}`)
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
    const responseProduct = await fetch(`http://localhost:8000/shoppingList/addProductToList`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cartObject)
    })
    if (responseProduct.ok) {
    }
  }

  const addProduct = (productToAdd: any) => {
    addToCart({ amountToAdd, productToAdd })
  }
  useEffect(() => {
    getProductById();
  })

  return (
    <div>
      <NavBar />
      <Grid container style={{ marginTop: '5%', backgroundColor: 'white', width: '100%', height: '100%' }}>
        <Grid item xs={12} md={6}>
          <div style={{ textAlign: 'center' }}>
            <Image src={infoProduct?.image || ''} alt='product' style={{ width: '80%', height: 'auto' }} height={800} width={800} />
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack direction="column" alignItems="flex-start" spacing={1} style={{ padding: '20px' }}>
            <Typography sx={{ fontSize: 40, fontWeight: 600 }} component="h2">
              {infoProduct?.name}
            </Typography>
            <Typography sx={{ fontSize: 20, fontWeight: 400 }} component="h2">
              {infoProduct?.description}
            </Typography>
            <Typography sx={{ fontSize: 30, fontWeight: 600 }} component="h2">
              {infoProduct?.price.toFixed(2)} €
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
              <IconButton color="primary" aria-label="subtract" onClick={subtract} disabled={amountToAdd === 1}>
                <RemoveIcon />
              </IconButton>
              <span style={{ fontSize: 20, margin: '0 10px' }}>{amountToAdd}</span>
              <IconButton color="primary" aria-label="add" onClick={add}>
                <AddIcon />
              </IconButton>
              <Button variant="contained" onClick={() => addProduct(infoProduct)}>
                Añadir al carrito
              </Button>
            </div>
          </Stack>
        </Grid>
      </Grid>
      <Footer />
    </div>

  )
}


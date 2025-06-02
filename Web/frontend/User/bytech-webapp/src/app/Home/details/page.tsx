'use client'
import { Button, IconButton, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import NavBar from '@/Component/NavBar/Navbar';
import Footer from '@/Component/Footer/Footer';
import Image from 'next/image';
import { Producto } from '@/Interface/Product';

export default function Detail() {
  const [amountToAdd, setAmount] = useState<number>(1)
  const [id, setId] = useState<string | null>(null);
  const [infoProduct, setInfoProduct] = useState<Producto>();

  useEffect(() => {
    const storedId = localStorage.getItem('idProducto');
    setId(storedId);
  }, []);

  useEffect(() => {
    if (id) {
      getProductById(id);
    }
  }, [id]);

  const getProductById = async (productId: string) => {
    const response = await fetch(`http://localhost:8000/product/${productId}`, {
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

  const add = () => setAmount(amountToAdd + 1);
  const subtract = () => setAmount(amountToAdd - 1);

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
    await fetch(`http://localhost:8000/shoppingList/addProductToList`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cartObject)
    })
  }

  const addProduct = (productToAdd: any) => {
    addToCart({ amountToAdd, productToAdd })
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      <main className="flex-1 flex flex-col items-center justify-center py-10 px-4">
        <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center justify-center">
            {infoProduct?.image && (
              <Image
                src={infoProduct.image}
                alt={infoProduct.name || 'product'}
                width={400}
                height={400}
                priority
                className="object-contain rounded-lg bg-gray-100 w-full h-80"
              />
            )}
          </div>
          <div className="flex flex-col justify-center">
            <Typography variant="h3" className="!text-2xl md:!text-4xl !font-bold !mb-4 !text-gray-800">
              {infoProduct?.name?.toUpperCase()}
            </Typography>
            <Typography variant="body1" className="!text-base md:!text-lg !mb-4 !text-gray-600">
              {infoProduct?.description}
            </Typography>
            <Typography variant="h4" className="!text-xl md:!text-2xl !font-semibold !mb-6 !text-blue-600">
              {infoProduct?.price?.toFixed(2)} €
            </Typography>
            <div className="flex items-center gap-4 mt-2">
              <IconButton color="primary" aria-label="subtract" onClick={subtract} disabled={amountToAdd === 1}>
                <RemoveIcon />
              </IconButton>
              <span className="text-lg font-medium">{amountToAdd}</span>
              <IconButton color="primary" aria-label="add" onClick={add}>
                <AddIcon />
              </IconButton>
              <Button
                variant="contained"
                color="primary"
                className="!ml-4 !px-6 !py-2 !rounded-lg !font-semibold"
                onClick={() => addProduct(infoProduct)}
              >
                Añadir al carrito
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}


'use client'
import Footer from "@/Component/Footer/Footer";
import NavBar from "@/Component/NavBar/Navbar";
import Producto from "@/Interface/Product";
import Image from "next/image";
import { useEffect, useState } from "react";


export default function Carrito() {
  const [carrito, setCarrito] = useState<Producto[]>([]);
  useEffect(() => {
    const carritoLS = localStorage.getItem("carrito");
    if (carritoLS) {
      setCarrito(JSON.parse(carritoLS));
    }
  }, []);
  return (
    <div>
      <NavBar/>
      <div className="container mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-5" style={{display:'flex', justifyContent:'center',marginTop:'5%'}}>Carrito de compras</h1>
        {carrito.length === 0 ? (
          <p className="text-gray-700">Tu carrito está vacío</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {carrito.map(producto => (
              <div key={producto.id} className="bg-white shadow-md p-5 rounded-md">
                <div className="flex justify-center mb-4">
                  <Image src={producto.image} alt='' width={150} height={150} />
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold mb-2">{producto.nombre}</p>
                  <p className="text-gray-600 mb-2">Cantidad: {producto.cantidad}</p>
                  <p className="text-gray-600 mb-2">Precio unitario: {producto.precio} €</p>
                  <p className="text-gray-600 mb-2">Subtotal: {producto.precio * producto.cantidad} €</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
}
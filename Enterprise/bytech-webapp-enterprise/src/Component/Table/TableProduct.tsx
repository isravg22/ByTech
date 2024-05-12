'use client'
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
    category: string;
    image: string;
    unidades: number;
}
export default function TableProduct() {
    const [productos, setProductos] = useState<Product[]>([]);
    const idEnterprise = localStorage.getItem('idEnterprise');

    const getProducts = async () => {
        const response = await fetch(`http://localhost:8000/product/fabricante/${idEnterprise}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        });

        if (response.ok) {
            const data = await response.json();
            setProductos(data);
        }
    }

    const deleteProduct = async (id: number) => {
        console.log("Deleting product with id:", id);
        try {
            const response = await fetch(`http://localhost:8000/product/${id}`, {
                method: 'DELETE'
            });
            console.log("Delete product API response:", response);
            if (response.ok) {
                const updatedProductos = productos.filter(producto => producto.id !== id);
                console.log("Updated products after deletion:", updatedProductos);
                setProductos(updatedProductos);
            } else {
                console.error('Error al eliminar el producto');
            }
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    };

    useEffect(() => {
        getProducts();
    }, [productos]);


    return (
        <div style={{ overflowX: 'auto', width: "100%", height: '72vh' }}>
            <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                height: '72vh',
                fontSize: '16px',
            }}>
                <thead>
                    <tr>
                        <th style={{ backgroundColor: '#f2f2f2', padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Imagen</th>
                        <th style={{ backgroundColor: '#f2f2f2', padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Nombre</th>
                        <th style={{ backgroundColor: '#f2f2f2', padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Descripción</th>
                        <th style={{ backgroundColor: '#f2f2f2', padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Categoria</th>
                        <th style={{ backgroundColor: '#f2f2f2', padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Precio</th>
                        <th style={{ backgroundColor: '#f2f2f2', padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Unidades</th>
                        <th style={{ backgroundColor: '#f2f2f2', padding: '12px', textAlign: 'left', fontWeight: 'bold' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto, index) => (
                        <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>

                            <td style={{ padding: '12px', textAlign: 'left' }}>
                                <img src={producto.image} alt="Producto" style={{ width: '100px' }} />
                            </td>
                            <td style={{ padding: '12px', textAlign: 'left' }}>{producto.name.toUpperCase()}</td>
                            <td style={{ padding: '12px', textAlign: 'left' }}>{producto.description}</td>
                            <td style={{ padding: '12px', textAlign: 'left' }}>{producto.category}</td>
                            <td style={{ padding: '12px', textAlign: 'left' }}>{producto.price} €</td>
                            <td style={{ padding: '12px', textAlign: 'left' }}>{producto.unidades}</td>
                            <td><button onClick={() => deleteProduct(producto.id)}><FaTrash /></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

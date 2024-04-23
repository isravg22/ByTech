'use client'
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

interface Producto {
    id: number;
    nombre: string;
    precio: number;
    unidades: number;
    image: string;
    tipo: string;
}

export default function TableProduct() {
    const [productos, setProductos] = useState<Producto[]>([]);
    const idEnterprise = localStorage.getItem('idEnterprise');

    const getProducts = async () => {
        try {
            const responseOrdenador = await fetch(`http://localhost:8000/ordenador/fabricante/${idEnterprise}`, {
                method: 'GET',
                headers: { "Content-Type": "application/json" }
            });
            const responseSmartphone = await fetch(`http://localhost:8000/smartphone/fabricante/${idEnterprise}`, {
                method: 'GET',
                headers: { "Content-Type": "application/json" }
            });
            const responseComponents = await fetch(`http://localhost:8000/components/fabricante/${idEnterprise}`, {
                method: 'GET',
                headers: { "Content-Type": "application/json" }
            });
            const responseGaming = await fetch(`http://localhost:8000/gaming/fabricante/${idEnterprise}`, {
                method: 'GET',
                headers: { "Content-Type": "application/json" }
            });

            const ordenadores = await responseOrdenador.json();
            const smartphones = await responseSmartphone.json();
            const components = await responseComponents.json();
            const gaming = await responseGaming.json();

            const allProducts = [
                ...ordenadores.map((producto: Producto) => ({ ...producto, tipo: 'ordenador' })),
                ...smartphones.map((producto: Producto) => ({ ...producto, tipo: 'smartphone' })),
                ...components.map((producto: Producto) => ({ ...producto, tipo: 'component' })),
                ...gaming.map((producto: Producto) => ({ ...producto, tipo: 'gaming' }))
            ];
            setProductos(allProducts);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const deleteProduct = async (id: any, tipo: string) => {
        console.log("Deleting product with id:", id);
        try {
            const response = await fetch(`http://localhost:8000/${tipo}/${id}`, {
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
        console.log("Component mounted");
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
                            <td style={{ padding: '12px', textAlign: 'left' }}>{producto.nombre}</td>
                            <td style={{ padding: '12px', textAlign: 'left' }}>{producto.precio}</td>
                            <td style={{ padding: '12px', textAlign: 'left' }}>{producto.unidades}</td>
                            <td><button onClick={() => deleteProduct(producto.id, producto.tipo)}><FaTrash /></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

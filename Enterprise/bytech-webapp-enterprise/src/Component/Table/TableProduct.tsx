'use client'
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Modal from "@mui/material/Modal";
import ProductModal from "../Modal/ProductModal";

type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
    category: string;
    image: string;
    unidades: number;
};

interface TableProductProps {
    refreshKey: number;
}

const thStyle: React.CSSProperties = {
    backgroundColor: '#f2f2f2',
    padding: '12px',
    textAlign: 'left',
    fontWeight: 700,
    color: '#1976d2',
    fontSize: '1rem',
    borderBottom: '2px solid #e3f0ff'
};

const tdStyle: React.CSSProperties = {
    padding: '12px',
    textAlign: 'left',
    fontSize: '1rem',
    color: '#1a237e'
};

const deleteBtnStyle: React.CSSProperties = {
    background: 'linear-gradient(90deg, #e53935 60%, #ffb3b3 100%)',
    color: 'white',
    border: 'none',
    borderRadius: 6,
    padding: '6px 10px',
    cursor: 'pointer',
    fontSize: 16,
    boxShadow: '0 1px 4px #ffcdd2',
    transition: 'background 0.2s'
};

export default function TableProduct({ refreshKey }: TableProductProps) {
    const [productos, setProductos] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const idEnterprise = typeof window !== 'undefined' ? localStorage.getItem('idEnterprise') : null;

    const getProducts = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8000/product/fabricante/${idEnterprise}`, {
                method: 'GET',
                headers: { "Content-Type": "application/json" }
            });
            if (response.ok) {
                const data = await response.json();
                setProductos(data);
            } else {
                toast.error('Error al obtener los productos');
            }
        } catch (error) {
            toast.error('Error de conexión al obtener los productos');
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:8000/product/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setProductos(prev => prev.filter(producto => producto.id !== id));
                toast.success('Producto eliminado correctamente');
            } else {
                toast.error('No se pudo eliminar el producto');
            }
        } catch (error) {
            toast.error('Error al eliminar el producto');
        }
    };

    const handleProductAdded = () => {
        setIsModalOpen(false);
        getProducts();
    };

    useEffect(() => {
        getProducts();
    }, [refreshKey]);

    return (
        <div
            style={{
                overflowX: 'auto',
                width: "100%",
                minHeight: '300px',
                background: 'rgba(255,255,255,0.97)',
                borderRadius: 12,
                boxShadow: '0 2px 8px #90caf9',
                marginTop: 12,
                marginBottom: 12,
                padding: '12px 0',
                maxHeight: 420,
                scrollbarWidth: 'thin', 
                scrollbarColor: '#90caf9 #e3f0ff',
            }}
            className="custom-scroll"
        >
            <ToastContainer position="bottom-right" autoClose={4000} />
            <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '16px',
                background: 'transparent'
            }}>
                <thead>
                    <tr>
                        <th style={thStyle}>Imagen</th>
                        <th style={thStyle}>Nombre</th>
                        <th style={thStyle}>Descripción</th>
                        <th style={thStyle}>Categoría</th>
                        <th style={thStyle}>Precio</th>
                        <th style={thStyle}>Unidades</th>
                        <th style={thStyle}></th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={7} style={{ textAlign: 'center', padding: '24px', color: '#1976d2', fontWeight: 600 }}>
                                Cargando productos...
                            </td>
                        </tr>
                    ) : productos.length === 0 ? (
                        <tr>
                            <td colSpan={7} style={{ textAlign: 'center', padding: '24px', color: '#1976d2', fontWeight: 600 }}>
                                No hay productos registrados.
                            </td>
                        </tr>
                    ) : (
                        productos.map((producto, index) => (
                            <tr key={producto.id} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
                                <td style={tdStyle}>
                                    <Image src={producto.image} alt="Producto" width={80} height={80} style={{ borderRadius: 8, objectFit: 'cover' }} />
                                </td>
                                <td style={tdStyle}>{producto.name.toUpperCase()}</td>
                                <td style={tdStyle}>{producto.description}</td>
                                <td style={tdStyle}>{producto.category}</td>
                                <td style={tdStyle}>{producto.price} €</td>
                                <td style={tdStyle}>{producto.unidades}</td>
                                <td style={tdStyle}>
                                    <button
                                        onClick={() => deleteProduct(producto.id)}
                                        style={deleteBtnStyle}
                                        title="Eliminar producto"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            
            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <ProductModal closeModal={handleProductAdded} />
            </Modal>
            <style jsx global>{`
                .custom-scroll {
                    scrollbar-width: thin;
                    scrollbar-color: #90caf9 #e3f0ff;
                }
                .custom-scroll::-webkit-scrollbar {
                    height: 10px;
                    width: 10px;
                    background: #e3f0ff;
                    border-radius: 8px;
                }
                .custom-scroll::-webkit-scrollbar-thumb {
                    background: #90caf9;
                    border-radius: 8px;
                }
                .custom-scroll::-webkit-scrollbar-thumb:hover {
                    background: #1976d2;
                }
            `}</style>
        </div>
    );
}



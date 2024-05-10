'use client'
import { useState, useEffect, useCallback } from 'react';
import { Typography, Button, Divider, TextField } from '@mui/material';
import { SaleDetail } from '@/Interface/Sale';
export default function Sales() {
    const idUser = localStorage.getItem('idUser');
    const [userName, setUserName] = useState<string | undefined>();
    const [saleDetails, setSaleDetails] = useState<SaleDetail[]>([]);

    const getUserName = async () => {
        const response = await fetch(`http://localhost:8000/user/${idUser}`);

        if (response.ok) {
            const data = await response.json();

            setUserName(data.userName);
        }
    }

    const getSales = async () => {
        try {
            const response = await fetch(`http://localhost:8000/sale/client/${userName}`);
            if (response.ok) {
                const data = await response.json();
                setSaleDetails(data);
            } else {
                throw new Error('Error fetching sale data');
            }
        } catch (error) {
            console.error('Error fetching sale data:', error);
        }
    }

    useEffect(() => {
        getUserName();
        getSales();
    }, [saleDetails])

    return (
        <div style={{ marginLeft: '20px', marginTop: '60px', }}>
            <Typography variant="h5" gutterBottom>
                Detalles de la compra:
            </Typography>
            {saleDetails && saleDetails.length > 0 ? (
                saleDetails.map((detail) => (
                    <div key={detail.id} style={{ marginBottom: '40px', borderRadius: '5px', boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.1)', padding: '20px',backgroundColor: '#f0f0f0' }}>
                        <Typography variant="body1" gutterBottom>
                            <strong>ID del pedido:</strong> {detail.id}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Precio:</strong> {detail.total} €
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Fecha:</strong> {new Date(detail.date).toLocaleDateString('es-ES')}
                        </Typography>
                    </div>
                ))
            ) : (
                <Typography variant="body1" gutterBottom>
                    No hay detalles de compra disponibles
                </Typography>
            )}
        </div>

    )
}
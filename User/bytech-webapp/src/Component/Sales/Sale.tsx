'use client'
import { useState, useEffect } from 'react';
import { Typography, CircularProgress, Button } from '@mui/material';
import { SaleDetail } from '@/Interface/Sale';

export default function Sales() {
    const idUser = typeof window !== 'undefined' ? localStorage.getItem('idUser') : null;
    const [userName, setUserName] = useState<string | undefined>();
    const [saleDetails, setSaleDetails] = useState<SaleDetail[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAll, setShowAll] = useState(false);

    const VISIBLE_COUNT = 3;

    useEffect(() => {
        const fetchUserAndSales = async () => {
            try {
                const userRes = await fetch(`http://localhost:8000/user/${idUser}`);
                if (!userRes.ok) throw new Error('Error al obtener usuario');
                const userData = await userRes.json();
                setUserName(userData.userName);

                const salesRes = await fetch(`http://localhost:8000/sale/client/${userData.userName}`);
                if (!salesRes.ok) throw new Error('Error al obtener ventas');
                const salesData = await salesRes.json();
                setSaleDetails(salesData);
            } catch (error) {
                setSaleDetails([]);
            } finally {
                setLoading(false);
            }
        };
        if (idUser) fetchUserAndSales();
    }, [idUser,showAll]);

    const visibleDetails = showAll ? saleDetails : saleDetails.slice(0, VISIBLE_COUNT);

    return (
        <div style={{
            width: '100%',
            maxWidth: 420,
            margin: '0 auto',
            padding: '2em 1em',
            background: 'rgba(255,255,255,0.95)',
            borderRadius: '18px',
            boxShadow: '0 4px 24px rgba(44,62,80,0.10)',
            minHeight: 200,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Typography variant="h5" gutterBottom style={{ color: '#1a237e', fontWeight: 700, textAlign: 'center', marginBottom: 24 }}>
                Detalles de la compra
            </Typography>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
                    <CircularProgress color="primary" />
                </div>
            ) : saleDetails && saleDetails.length > 0 ? (
                <>
                    {visibleDetails.map((detail) => (
                        <div
                            key={detail.id}
                            style={{
                                marginBottom: '24px',
                                borderRadius: '14px',
                                boxShadow: '0 2px 12px rgba(44, 62, 80, 0.08)',
                                padding: '1.2em 1em',
                                background: 'rgba(245,245,250,0.95)',
                                border: '1px solid #e3eafc',
                                width: '100%'
                            }}
                        >
                            <Typography variant="subtitle1" gutterBottom style={{ color: '#3949ab', fontWeight: 600 }}>
                                <span style={{ color: '#1976d2' }}>ID del pedido:</span> {detail.id}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Precio:</strong> {detail.total} €
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                <strong>Fecha:</strong> {new Date(detail.date).toLocaleDateString('es-ES')}
                            </Typography>
                        </div>
                    ))}
                    {saleDetails.length > VISIBLE_COUNT && !showAll && (
                        <Button
                            variant="outlined"
                            onClick={() => setShowAll(true)}
                            style={{ marginTop: 8, fontWeight: 600, color: '#1976d2', borderColor: '#1976d2' }}
                        >
                            Ver más
                        </Button>
                    )}
                </>
            ) : (
                <Typography variant="body1" gutterBottom style={{ textAlign: 'center', color: '#3949ab' }}>
                    No hay detalles de compra disponibles
                </Typography>
            )}
        </div>
    );
}
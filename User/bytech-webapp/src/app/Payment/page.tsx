'use client'
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import NavBar from '@/Component/NavBar/Navbar';
import Footer from '@/Component/Footer/Footer';
import { CircularProgress, Typography, Button, Box, Paper, InputLabel } from '@mui/material';
import { FaLock } from 'react-icons/fa';

const stripePromise = loadStripe('pk_test_51RU8ptRuIogdvrj4DRagVa7aBFiFUlCeklF1SRZN0rEGVcKaDbaOFDdDLmbAnytDAb35g3z1MI9FKeFivGaY4WCp00P9hoHCgW');

function CheckoutForm({ amount, userEmail }: { amount: number, userEmail: string }) {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // 1. Crear PaymentIntent en backend
            const res = await fetch(`http://localhost:8000/payment/create-payment-intent`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount, userEmail }),
            });
            if (!res.ok) throw new Error('Error al crear el pago');
            const { clientSecret, paymentId } = await res.json();

            // 2. Confirmar pago con Stripe
            if (!stripe || !elements) {
                setError('Stripe.js no se ha cargado correctamente.');
                setLoading(false);
                return;
            }

            const cardNumberElement = elements.getElement(CardNumberElement);
            if (!cardNumberElement) {
                setError('No se pudo obtener el elemento de la tarjeta.');
                setLoading(false);
                return;
            }

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardNumberElement,
                },
            });

            if (result.error) {
                setError(result.error.message || 'Error al procesar el pago');
            } else if (result.paymentIntent.status === 'succeeded') {
                // 3. Confirmar en backend
                await fetch('http://localhost:8000/payment/confirm', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ paymentId }),
                });
                // 4. Crear la venta
                await fetch(`http://localhost:8000/sale/create/${userEmail}`, {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                });
                setSuccess(true);
                setTimeout(() => {
                    router.push('/Order');
                }, 1800);
            }
        } catch (err: any) {
            setError(err.message || 'Error inesperado');
        }
        setLoading(false);
    };

    const elementStyle = {
        base: {
            fontSize: '16px',
            color: '#1a237e',
            '::placeholder': { color: '#90caf9' }
        },
        invalid: { color: '#e53935' }
    };

    return (
        <Paper elevation={3} sx={{
            maxWidth: 420,
            margin: '0 auto',
            padding: '2em 1.5em',
            borderRadius: '18px',
            boxShadow: '0 4px 24px rgba(44,62,80,0.10)',
            background: 'rgba(255,255,255,0.97)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Box display="flex" alignItems="center" mb={2}>
                <FaLock style={{ color: '#1976d2', marginRight: 8 }} size={22} />
                <Typography variant="h5" fontWeight={700} color="#1a237e">
                    Pago seguro
                </Typography>
            </Box>
            <Typography variant="body1" color="textSecondary" mb={2} align="center">
                Introduce los datos de tu tarjeta para completar la compra.
            </Typography>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <Box mb={2}>
                    <InputLabel sx={{ mb: 0.5, color: '#1976d2', fontWeight: 600 }}>Número de tarjeta</InputLabel>
                    <Box sx={{
                        border: '1.5px solid #90caf9',
                        borderRadius: '8px',
                        padding: '10px 12px',
                        background: '#f5faff'
                    }}>
                        <CardNumberElement options={{ style: elementStyle }} />
                    </Box>
                </Box>
                <Box mb={2} display="flex" gap={2}>
                    <Box flex={1}>
                        <InputLabel sx={{ mb: 0.5, color: '#1976d2', fontWeight: 600 }}>Caducidad</InputLabel>
                        <Box sx={{
                            border: '1.5px solid #90caf9',
                            borderRadius: '8px',
                            padding: '10px 12px',
                            background: '#f5faff'
                        }}>
                            <CardExpiryElement options={{ style: elementStyle }} />
                        </Box>
                    </Box>
                    <Box flex={1}>
                        <InputLabel sx={{ mb: 0.5, color: '#1976d2', fontWeight: 600 }}>CVC</InputLabel>
                        <Box sx={{
                            border: '1.5px solid #90caf9',
                            borderRadius: '8px',
                            padding: '10px 12px',
                            background: '#f5faff'
                        }}>
                            <CardCvcElement options={{ style: elementStyle }} />
                        </Box>
                    </Box>
                </Box>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={!stripe || loading || success}
                    sx={{ fontWeight: 600, py: 1.2, fontSize: 18, borderRadius: 2 }}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : `Pagar ${(amount / 100).toFixed(2)} €`}
                </Button>
                {error && (
                    <Typography color="error" mt={2} align="center" fontWeight={500}>
                        {error}
                    </Typography>
                )}
                {success && (
                    <Typography color="success.main" mt={2} align="center" fontWeight={600}>
                        ¡Pago realizado con éxito!
                    </Typography>
                )}
            </form>
        </Paper>
    );
}

export default function Pago() {
    const searchParams = useSearchParams();
    const amount = Number(searchParams.get('amount') || 0);
    const userEmail = searchParams.get('userEmail') || '';

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <NavBar />
            <main className="flex-1 flex flex-col items-center justify-center py-12 px-2">
                <Typography variant="h4" fontWeight={700} color="#1a237e" mb={3} align="center">
                    Finalizar pago
                </Typography>
                {(!amount || !userEmail) ? (
                    <Typography color="error" fontWeight={600} align="center">
                        Parámetros de pago inválidos.
                    </Typography>
                ) : (
                    <Elements stripe={stripePromise}>
                        <CheckoutForm amount={amount} userEmail={userEmail} />
                    </Elements>
                )}
            </main>
            <Footer />
        </div>
    );
}
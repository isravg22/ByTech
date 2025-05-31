'use client'
import Footer from '@/Component/Footer/Footer';
import NavBar from '@/Component/NavBar/Navbar';
import { useEffect, useState } from 'react';
import { FaCreditCard, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useSearchParams } from 'next/navigation';

type Payment = {
  id: string;
  userEmail: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
};
type PaymentWithDate = Payment & { formattedDate: string };

export default function PaymentsList() {
  const [payments, setPayments] = useState<PaymentWithDate[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  
  let enterpriseId = searchParams.get('enterpriseId');
  if (typeof window !== 'undefined' && !enterpriseId) {
    enterpriseId = localStorage.getItem('idEnterprise');
  }

  useEffect(() => {
    if (!enterpriseId) return;
    fetch(`http://localhost:8000/payment/all`)
      .then(res => res.json())
      .then(data => {
        const formatted = data.map((p: Payment) => ({
          ...p,
          formattedDate: new Date(p.createdAt).toLocaleString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          })
        }));
        setPayments(formatted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [enterpriseId]);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(120deg, #f5faff 0%, #e3f0ff 100%)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <NavBar />
      <div style={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '32px 12px 24px 12px'
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.97)',
          borderRadius: 18,
          boxShadow: '0 4px 24px rgba(44, 62, 80, 0.10), 0 1.5px 8px #90caf9',
          padding: '36px 24px 24px 24px',
          margin: '40px 0 0 0',
          width: '100%',
          maxWidth: 1100,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 24
          }}>
            <FaCreditCard size={32} style={{ color: '#1976d2', marginRight: 12 }} />
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 700,
              color: '#1a237e',
              letterSpacing: '1px',
              margin: 0
            }}>
              Pagos recibidos
            </h1>
          </div>
          <p style={{
            fontSize: '1.08rem',
            color: '#3949ab',
            marginBottom: 24,
            fontWeight: 400,
            textAlign: 'center'
          }}>
            Consulta el historial de pagos realizados por los clientes en tu empresa.
          </p>
          <div style={{
            width: '100%',
            overflowX: 'auto',
            background: 'rgba(255,255,255,0.98)',
            borderRadius: 12,
            boxShadow: '0 2px 8px #90caf9',
            padding: '12px 0'
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: 16
            }}>
              <thead>
                <tr style={{
                  background: 'linear-gradient(90deg, #1976d2 60%, #64b5f6 100%)',
                  color: 'white'
                }}>
                  <th style={{ padding: '12px 8px', fontWeight: 600, textAlign: 'center' }}>Usuario</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600, textAlign: 'center' }}>Monto</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600, textAlign: 'center' }}>Moneda</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600, textAlign: 'center' }}>Estado</th>
                  <th style={{ padding: '12px 8px', fontWeight: 600, textAlign: 'center' }}>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: 32 }}>
                      Cargando pagos...
                    </td>
                  </tr>
                ) : payments.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: 32, color: '#3949ab' }}>
                      No hay pagos registrados.
                    </td>
                  </tr>
                ) : (
                  payments.map(p => (
                    <tr key={p.id} style={{
                      background: p.status === 'succeeded' ? 'rgba(76, 175, 80, 0.08)' : 'rgba(244, 67, 54, 0.06)'
                    }}>
                      <td style={{ padding: '10px 8px', fontWeight: 500, textAlign: 'center' }}>{p.userEmail}</td>
                      <td style={{ padding: '10px 8px', textAlign: 'center' }}>
                        {(p.amount / 100).toLocaleString('es-ES', { style: 'currency', currency: p.currency.toUpperCase() })}
                      </td>
                      <td style={{ padding: '10px 8px', textTransform: 'uppercase', textAlign: 'center' }}>{p.currency}</td>
                      <td
                        style={{
                          padding: '10px 8px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          justifyContent: 'center',
                          width: '100%'
                        }}
                      >
                        {p.status === 'succeeded' ? (
                          <>
                            <FaCheckCircle style={{ color: '#43a047' }} />
                            <span style={{ color: '#43a047', fontWeight: 600 }}>Completado</span>
                          </>
                        ) : (
                          <>
                            <FaTimesCircle style={{ color: '#e53935' }} />
                            <span style={{ color: '#e53935', fontWeight: 600 }}>Pendiente</span>
                          </>
                        )}
                      </td>
                      <td style={{ padding: '10px 8px', textAlign: 'center' }}>
                        {p.formattedDate}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
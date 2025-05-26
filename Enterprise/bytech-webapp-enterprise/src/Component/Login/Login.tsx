'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import imgLogo from '@/app/img/logo.png';
import Image from 'next/image';

export default function Login() {
  const [userName, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    if (!userName.trim() || !password.trim()) {
      toast.warn('Por favor, completa todos los campos.');
      return false;
    }
    return true;
  };

  const goHome = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userName, password })
      });

      if (response.ok) {
        const data = await response.json();
        if (['admin', 'superadmin', 'boss', 'worker'].includes(data.rol)) {
          localStorage.setItem('idUser', data.id);
          localStorage.setItem('idEnterprise', data.enterprise);
          toast.success('Inicio de sesión exitoso');
          router.push('/Home');
        } else {
          toast.error('No tiene los permisos necesarios');
        }
      } else {
        toast.error('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      toast.error('Error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      width: '100vw',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(120deg, #e3f0ff 0%, #b3c6f7 100%)'
    }}>
      {/* Patrón de líneas sutiles */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none'
        }}
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="lines" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M0 40L40 0" stroke="#bbdefb" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="1440" height="900" fill="url(#lines)" fillOpacity="0.13"/>
      </svg>
      {/* Contenedor glassmorphism */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        padding: '2.5em 2em',
        borderRadius: '20px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 8px 32px rgba(44, 62, 80, 0.12), 0 1.5px 8px #90caf9'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1em' }}>
          <Image src={imgLogo} alt="Logo ByTech" width={96} height={96} priority />
        </div>
        <h2 style={{
          marginBottom: '1em',
          fontSize: '2rem',
          fontWeight: 700,
          textAlign: 'center',
          color: '#1a237e',
          letterSpacing: '1px'
        }}>
          Iniciar Sesión
        </h2>
        <form
          onSubmit={e => { e.preventDefault(); goHome(); }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.2em' }}
          autoComplete="off"
        >
          <div>
            <label htmlFor="username" style={{ fontWeight: 600, fontSize: '1rem', color: '#3949ab' }}>
              Nombre de usuario
            </label>
            <input
              id="username"
              type="text"
              placeholder="Ejemplo123"
              value={userName}
              onChange={e => setName(e.target.value)}
              style={{
                width: '100%',
                padding: '0.7em',
                borderRadius: '6px',
                border: '1px solid #bfc0c0',
                fontSize: '1rem',
                marginTop: '0.3em',
                background: '#f4f8ff'
              }}
              autoFocus
              disabled={loading}
              autoComplete="username"
            />
          </div>
          <div>
            <label htmlFor="password" style={{ fontWeight: 600, fontSize: '1rem', color: '#3949ab' }}>
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="***********"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '0.7em',
                borderRadius: '6px',
                border: '1px solid #bfc0c0',
                fontSize: '1rem',
                marginTop: '0.3em',
                background: '#f4f8ff'
              }}
              disabled={loading}
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            style={{
              background: loading
                ? 'linear-gradient(90deg, #90caf9 0%, #64b5f6 100%)'
                : 'linear-gradient(90deg, #1976d2 0%, #1565c0 100%)',
              padding: '0.8em 0',
              borderRadius: '6px',
              border: 'none',
              color: 'white',
              fontWeight: 700,
              fontSize: '1.1rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
              boxShadow: '0 2px 8px #90caf9'
            }}
            disabled={loading}
          >
            {loading ? 'Ingresando...' : 'Iniciar Sesión'}
          </button>
        </form>
        <p style={{ marginTop: '1.5em', textAlign: 'center', fontSize: '1rem', color: '#3949ab' }}>
          ¿No tienes cuenta?
          <Link href="/Register" style={{ color: '#1976d2', fontWeight: 600, marginLeft: 4 }}>
            Regístrate aquí
          </Link>
        </p>
      </div>
      <ToastContainer position="bottom-right" autoClose={4000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}

'use client'
import imgLogo from '@/app/img/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [userName, setName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const getCredentials = async () => {
    try {
      const response = await fetch('http://localhost:8000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userName, password })
      });

      if (response.ok) {
        console.log('Inicio de sesión correcto');
        router.push('/Home');
      } else {
        console.log('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ backgroundColor: 'white', padding: '2em', borderRadius: '20px', width: '30%' }}>
        <Image src={imgLogo} alt="Logo" width="256" height="256" style={{ display: 'flex', justifyContent: 'center', margin: ' 0 auto' }} priority />
        <p style={{ marginBottom: '1em', fontSize: '32px', fontWeight: 'bold', textAlign: 'center' }}>Bienvenido a ByTech</p>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
          <label style={{ fontWeight: 'bold', fontSize: '20px' }}>Nombre de usuario:</label>
          <input type="text" placeholder="Ejemplo123" style={{ padding: ' 0.5em', borderRadius: '5px', fontSize: '18px' }} onChange={(event) => setName(event.target.value)} />
          <label style={{ fontWeight: 'bold', fontSize: '20px' }}>Contraseña:</label>
          <input type="password" placeholder="***********" style={{ padding: '0.5em', borderRadius: '5px', fontSize: '18px' }} onChange={(event) => setPassword(event.target.value)} />
          <p>
            Si no tienes cuenta, pulsa
            <strong><Link href="/Register"> aquí</Link></strong>
          </p>
          <button style={{ backgroundColor: '#00a2ff', padding: '0.5em 0', borderRadius: '5px', border: 'none', color: 'white', fontWeight: 'bold' }} onClick={() => getCredentials()}>
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  )
}

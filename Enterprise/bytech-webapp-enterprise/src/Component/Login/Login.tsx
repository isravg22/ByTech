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
  const router = useRouter();
  

  const goHome = async () => {
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
        if(data.rol==="admin"||data.rol==="superadmin"||data.rol==="boss"||data.rol==="worker"){
          console.log('Inicio de sesión correcto');        
          localStorage.setItem('idUser', data.id);
          localStorage.setItem("idEnterprise", data.enterprise);
          router.push('/Home');
        }else{
          toast.error('No tiene los permisos necesarios');
        }        
       
      } else {
        toast.error('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      toast.error('Error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.');
    }
  }

  return (
    <div style={{display:'flex',marginTop:'2%',justifyContent:'center', height: '80hv'}}>
      <div style={{ backgroundColor: 'white', padding: '2em', borderRadius: '20px', width: '30%' }}>
        <Image src={imgLogo} alt="Logo" width="256" height="256" style={{ display: 'flex', justifyContent: 'center', margin: ' 0 auto' }} priority />
        <p style={{ marginBottom: '1em', fontSize: '32px', fontWeight: 'bold', textAlign: 'center' }}>Bienvenido a ByTech</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
          <label style={{ fontWeight: 'bold', fontSize: '20px' }}>Nombre de usuario:</label>
          <input type="text" placeholder="Ejemplo123" style={{ padding: ' 0.5em', borderRadius: '5px', fontSize: '18px',border: '1px solid black' }} onChange={(event) => setName(event.target.value)} />
          <label style={{ fontWeight: 'bold', fontSize: '20px'}}>Contraseña:</label>
          <input type="password" placeholder="***********" style={{ padding: '0.5em', borderRadius: '5px', fontSize: '18px',border: '1px solid black' }} onChange={(event) => setPassword(event.target.value)} />
          <p>
            Si no tienes cuenta, pulsa
            <strong><Link href="/Register"> aquí</Link></strong>
          </p>
          <button style={{ backgroundColor: '#00a2ff', padding: '0.5em 0', borderRadius: '5px', border: 'none', color: 'white', fontWeight: 'bold' }} onClick={goHome}>
            Iniciar Sesión
          </button>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </div>
  )
}

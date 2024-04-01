'use client'
import imgLogo from '@/app/img/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Registro() {
    const router = useRouter();

    const [firstName, setName] = useState('')
    const [lastName1, setLastName1] = useState('')
    const [lastName2, setLastName2] = useState('')
    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [password1, setPassword1] = useState('')
    const lastName = lastName1 + ' ' + lastName2;
    const rol='user';
    const activated=0;

    const insertUser = async () => {
        if (!firstName || !lastName1 || !email || !userName || !password || !password1) {
            console.log('Por favor completa todos los campos.');
            return;
        }
    
        if (password !== password1) {
            console.log('Las contraseñas no coinciden.');
            return;
        }
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            console.log('El correo electrónico no tiene un formato válido.');
            return;
        }
    
        if (password.length < 8) {
            console.log('La contraseña debe tener al menos 8 caracteres.');
            return;
        }
    
        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        if (!usernameRegex.test(userName)) {
            console.log('El nombre de usuario solo puede contener letras, números y guiones bajos.');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:8000/user/insertUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ firstName, lastName, email, userName, password, rol, activated })
            });
            if (response.ok) {
                console.log('Usuario creado correctamente');
                router.push('/');
            } else {
                console.log('El usuario no se ha podido crear.');
            }
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
        }
    }
    

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ backgroundColor: 'white', padding: '2em', borderRadius: '10px', width: '30%' }}>
                <Image src={imgLogo} alt="Logo" width="128" height="128" style={{ display: 'flex', justifyContent: 'center', margin: '0 auto' }} />
                <p style={{ marginBottom: '0.5em', fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>Crear cuenta</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
                    <label style={{ fontWeight: 'bold', fontSize: '16px' }}>Nombre:</label>
                    <input type="text" placeholder="Ejemplo" style={{ padding: '0.3em', borderRadius: '3px', fontSize: '14px' }} onChange={(event) => setName(event.target.value)} />
                    <label style={{ fontWeight: 'bold', fontSize: '16px' }}>Primer apellido:</label>
                    <input type="text" placeholder="Ejemplo" style={{ padding: '0.3em', borderRadius: '3px', fontSize: '14px' }} onChange={(event) => setLastName1(event.target.value)} />
                    <label style={{ fontWeight: 'bold', fontSize: '16px' }}>Segundo apellido:</label>
                    <input type="text" placeholder="Ejemplo" style={{ padding: '0.3em', borderRadius: '3px', fontSize: '14px' }} onChange={(event) => setLastName2(event.target.value)} />
                    <label style={{ fontWeight: 'bold', fontSize: '16px' }}>Correo:</label>
                    <input type="text" placeholder="Ejemplo123" style={{ padding: '0.3em', borderRadius: '3px', fontSize: '14px' }} onChange={(event) => setEmail(event.target.value)} />
                    <label style={{ fontWeight: 'bold', fontSize: '16px' }}>Nombre de usuario:</label>
                    <input type="text" placeholder="Ejemplo123" style={{ padding: '0.3em', borderRadius: '3px', fontSize: '14px' }} onChange={(event) => setUserName(event.target.value)} />
                    <label style={{ fontWeight: 'bold', fontSize: '16px' }}>Contraseña:</label>
                    <input type="password" placeholder="***********" style={{ padding: '0.3em', borderRadius: '3px', fontSize: '14px' }} onChange={(event) => setPassword(event.target.value)} />
                    <label style={{ fontWeight: 'bold', fontSize: '16px' }}>Repetir contraseña:</label>
                    <input type="password" placeholder="***********" style={{ padding: '0.3em', borderRadius: '3px', fontSize: '14px' }} onChange={(event) => setPassword1(event.target.value)} />
                    <p style={{ fontSize: '14px', textAlign: 'center' }}>
                        Si ya tienes cuenta, pulsa <strong><Link href="/">aquí</Link></strong>.
                    </p>
                    <button style={{ backgroundColor: '#00a2ff', padding: '0.3em 0', borderRadius: '3px', border: 'none', color: 'white', fontWeight: 'bold', fontSize: '16px' }} onClick={()=>insertUser()}>
                        Crear cuenta
                    </button>
                </div>
            </div>
        </div>

    )
}
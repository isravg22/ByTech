'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import imgLogo from '@/app/img/logo.png';
import Image from 'next/image';
import { validateHeaderValue } from 'http';

export default function Registro() {
    const router = useRouter();

    const [inputUser, setInputUser] = useState<{
        firstName: string;
        lastName1: string;
        lastName2: string;
        email: string;
        userName: string;
        password: string;
        password2: string;
    }>({
        firstName: '',
        lastName1: '',
        lastName2: '',
        email: '',
        userName: '',
        password: '',
        password2: '',
    });

    const handleChangeUser = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;
        setInputUser(prevInputs => ({ ...prevInputs, [name]: value }));
    };


    const insertUser = async () => {
        const { firstName, lastName1, lastName2, email, userName, password, password2 } = inputUser;
        if (!firstName || !lastName1 || !email || !userName || !password || !lastName2) {
            toast.error('Por favor completa todos los campos.');
            return;
        }
        if (password !== password2) {
            toast.error('Las contraseñas no coinciden.');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error('El correo electrónico no tiene un formato válido.');
            return;
        }
        if (password.length < 8) {
            toast.error('La contraseña debe tener al menos 8 caracteres.');
            return;
        }
        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        if (!usernameRegex.test(userName)) {
            toast.error('El nombre de usuario solo puede contener letras, números y guiones bajos.');
            return;
        }
        try {
            console.log('nombre',firstName)
            console.log('nombre',lastName1)
            console.log('nombre',lastName2)
            console.log('nombre',email)
            console.log('nombre',userName)
            console.log('nombre',password)
            console.log('nombre',password2)

            const lastName = `${lastName1} ${lastName2}`;
            const response = await fetch('http://localhost:8000/user/insertUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ firstName, lastName, email, userName, password, rol: 'user', activated: 0, enterprise:0})
            });
            if (response.ok) {
                toast.success('Usuario creado correctamente');
                router.push('/');
            } else {
                toast.error('El usuario no se ha podido crear.');
            }
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
            toast.error('Error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.');
        }
    }


    return (
        <div style={{ display: 'flex', justifyContent: 'center', height: 'auto' }}>
            <div style={{ backgroundColor: 'white', padding: '1em', borderRadius: '10px',marginTop:'0.5%', display: 'flex', flexDirection: 'column',width:'30%' }}>
                <Image src={imgLogo} alt="Logo" width="128" height="128" style={{ display: 'flex', justifyContent: 'center',margin:'0 auto' }} />
                <p style={{ marginBottom: '0.5em', fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>Crear cuenta</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
                    {['Nombre', 'Primer apellido', 'Segundo apellido', 'Correo', 'Nombre de usuario', 'Contraseña', 'Repetir contraseña'].map((label, index) => (
                        <div key={index}>
                            <label style={{ fontWeight: 'bold', fontSize: '13px' }}>{label}</label>
                            <input type={index>=5 ?'password':'text'} placeholder='Ejemplo'
                                style={ {padding:'0.3em', borderRadius:'3px',fontSize:'13px', border:'1px solid black', width:'100%'}} 
                                name={Object.keys(inputUser)[index] as keyof typeof inputUser}
                                value={inputUser[Object.keys(inputUser)[index] as keyof typeof inputUser]}
                                onChange={handleChangeUser}/>

                        </div>
                    ))}
                    
                    <p style={{ fontSize: '14px', textAlign: 'center' }}>
                        Si ya tienes cuenta, pulsa <strong><Link href="/">aquí</Link></strong>.
                    </p>
                    <button style={{ backgroundColor: '#00a2ff', padding: '0.3em 0', borderRadius: '3px', border: 'none', color: 'white', fontWeight: 'bold', fontSize: '16px' }} onClick={insertUser}>
                        Crear cuenta
                    </button>
                </div>
            </div>
            <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
        </div>
    )
}

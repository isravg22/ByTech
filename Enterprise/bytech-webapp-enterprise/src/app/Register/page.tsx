'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import imgLogo from '@/app/img/logo.png';
import Image from 'next/image';

export default function Registro() {
    const router = useRouter();
    const [inputs, setInputs] = useState<{
        nombre: string;
        nif: string;
        descripcion: string;
        firstName: string;
        lastName1: string;
        lastName2: string;
        email: string;
        userName: string;
        password: string;
        password1: string;
    }>({
        nombre: '',
        nif: '',
        descripcion: '',
        firstName: '',
        lastName1: '',
        lastName2: '',
        email: '',
        userName: '',
        password: '',
        password1: ''
    });


    const handleChange = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;
        setInputs(prevInputs => ({ ...prevInputs, [name]: value }));
    };

    const insertEnterprise = async () => {
        const { firstName, lastName1, lastName2, email, userName, password, password1, nif, nombre, descripcion } = inputs;

        if (!firstName || !lastName1 || !lastName2 || !email || !userName || !password || !password1 || !nif || !nombre || !descripcion) {
            toast.error('Por favor completa todos los campos.');
            return;
        }

        if (password !== password1) {
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
            const lastName = `${lastName1} ${lastName2}`;

            const responseUser = await fetch('http://localhost:8000/user/insertUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName, lastName, email, userName, password, rol: 'enterprise', activated: 0
                })
            });

            if (!responseUser.ok) {
                throw new Error('Error al guardar el usuario');
            }

            const userData = await responseUser.json();
            const bossId = userData.id;

            const responseEnterprise = await fetch('http://localhost:8000/enterprise/insertEnterprise', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre, nif, descripcion, userData })
            });

            if (responseEnterprise.ok) {
                toast.success('Empresa creada correctamente');
                router.push('/');
            } else {
                const errorData = await responseEnterprise.json();
                if (errorData.message) {
                    toast.error(errorData.message);
                } else {
                    toast.error('La Empresa no se ha podido crear.');
                }
            }
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
            toast.error('Error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
            <div style={{ backgroundColor: 'white', padding: '2em', borderRadius: '10px', width: '30%', marginTop: '5%', display: 'flex', flexDirection: 'column' }}>
                <Image src={imgLogo} alt="Logo" width="128" height="128" style={{ display: 'flex', justifyContent: 'center', margin: '0 auto' }} />
                <p style={{ marginBottom: '0.5em', fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>Crear cuenta de empresa</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
                    {['Nombre de la Empresa', 'NIF', 'Descripción', 'Nombre', 'Primer apellido', 'Segundo apellido', 'Correo', 'Nombre de usuario', 'Contraseña', 'Repetir contraseña'].map((label, index) => (
                        <div key={index} >
                            <p style={{ fontWeight: 'bold', fontSize: '16px' }}>{label}</p>
                            <input
                                type={index >= 8 ? "password" : "text"}
                                placeholder={`Ejemplo${index === 7 ? "123" : ""}`}
                                style={{ padding: '0.3em', borderRadius: '3px', fontSize:'15px' , border: '1px solid black',width:'100%' }}
                                name={Object.keys(inputs)[index] as keyof typeof inputs}
                                value={inputs[Object.keys(inputs)[index] as keyof typeof inputs]}
                                onChange={handleChange}
                            />
                        </div>
                    ))}
                    <p style={{ fontSize: '14px', textAlign: 'center' }}>
                        Si ya tienes cuenta, pulsa <strong><Link href="/">aquí</Link></strong>.
                    </p>
                    <button style={{ backgroundColor: '#00a2ff', padding: '0.3em 0', borderRadius: '3px', border: 'none', color: 'white', fontWeight: 'bold', fontSize: '16px' }} onClick={insertEnterprise}>
                        Crear Empresa
                    </button>
                </div>
            </div>
            <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
        </div>

    );
}

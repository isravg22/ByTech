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

    const [inputsEnterprise, setInputsEnterprise] = useState<{
        nombre: string;
        nif: string;
        descripcion: string;
    }>({
        nombre: '',
        nif: '',
        descripcion: '',
    });

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

    const [loading, setLoading] = useState(false);

    const handleChangeUser = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setInputUser(prevInputs => ({ ...prevInputs, [name]: value }));
    };

    const handleChangeEnterprise = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setInputsEnterprise(prevInputs => ({ ...prevInputs, [name]: value }));
    };

    const insertEnterprise = async () => {
        const { firstName, lastName1, lastName2, email, userName, password, password2 } = inputUser;
        if (!firstName || !lastName1 || !lastName2 || !email || !userName || !password || !password2) {
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

        const { nif, nombre, descripcion } = inputsEnterprise;
        if (!nif || !nombre || !descripcion) {
            toast.error('Por favor completa todos los campos de empresa.');
            return;
        }

        setLoading(true);
        try {
            // Verificar si el nombre de la empresa está disponible
            const responseEnterpriseCheck = await fetch(`http://localhost:8000/enterprise/checkName/${nombre}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!responseEnterpriseCheck.ok) {
                const errorData = await responseEnterpriseCheck.text();
                if (errorData === "Enterprise already exists") {
                    toast.error('El nombre de la empresa ya existe, pruebe con otro');
                } else {
                    toast.error('Error al verificar el nombre de la empresa');
                }
                setLoading(false);
                return;
            }

            const lastName = `${lastName1} ${lastName2}`;
            const responseUser = await fetch('http://localhost:8000/user/insertUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    userName,
                    password,
                    rol: 'boss',
                    activated: 1
                })
            });

            if (responseUser.ok) {
                const userData = await responseUser.json();
                const bossId = userData.id;

                const responseEnterprise = await fetch('http://localhost:8000/enterprise/insertEnterprise', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nombre,
                        nif,
                        descripcion,
                        boss: bossId
                    })
                });

                if (responseEnterprise.ok) {
                    const enterpriseData = await responseEnterprise.json();
                    const enterprise_id = enterpriseData.id;

                    const updateUser = await fetch(`http://localhost:8000/user/${bossId}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ ...userData, enterprise: enterprise_id })
                    });

                    if (updateUser.ok) {
                        toast.success('Empresa creada correctamente');
                        router.push('/');
                    }
                } else {
                    const errorData = await responseEnterprise.text();
                    if (errorData === "Enterprise already exists") {
                        toast.error('El nombre de la empresa ya existe, pruebe con otro');
                    } else {
                        toast.error('La empresa no se pudo crear');
                    }
                }
            } else {
                const errorMessage = await responseUser.text();
                if (errorMessage === "Username already exists") {
                    toast.error('El nombre de usuario ya existe, pruebe con otro');
                } else if (errorMessage === "Email already exists") {
                    toast.error('El correo electrónico ya existe, pruebe con otro');
                } else {
                    toast.error('El usuario no se ha podido crear.');
                }
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
                        <path d="M0 40L40 0" stroke="#bbdefb" strokeWidth="1" />
                    </pattern>
                </defs>
                <rect width="1440" height="900" fill="url(#lines)" fillOpacity="0.13" />
            </svg>
            {/* Contenedor glassmorphism */}
            <div style={{
                position: 'relative',
                zIndex: 1,
                background: 'rgba(255,255,255,0.93)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                padding: '1.5em 1.2em',
                borderRadius: '16px',
                width: '100%',
                maxWidth: '650px',
                boxShadow: '0 4px 16px rgba(44, 62, 80, 0.10), 0 1.5px 8px #90caf9'
            }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1em' }}>
                    <Image src={imgLogo} alt="Logo ByTech" width={70} height={70} priority />
                </div>
                <h2 style={{
                    marginBottom: '1em',
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    textAlign: 'center',
                    color: '#1a237e',
                    letterSpacing: '1px'
                }}>
                    Crear cuenta de empresa
                </h2>
                <form
                    onSubmit={e => { e.preventDefault(); insertEnterprise(); }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '0.8em 1.2em',
                        alignItems: 'end'
                    }}
                    autoComplete="off"
                >
                    {/* Columna izquierda: Empresa */}
                    <div>
                        <label htmlFor="nombre" style={{ fontWeight: 600, fontSize: '0.97rem', color: '#3949ab' }}>Nombre de la empresa</label>
                        <input
                            id="nombre"
                            name="nombre"
                            type="text"
                            placeholder="Ejemplo S.A."
                            value={inputsEnterprise.nombre}
                            onChange={handleChangeEnterprise}
                            style={{
                                width: '100%',
                                padding: '0.5em',
                                borderRadius: '5px',
                                border: '1px solid #bfc0c0',
                                fontSize: '0.97rem',
                                marginTop: '0.2em',
                                background: '#f4f8ff'
                            }}
                            autoComplete="organization"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label htmlFor="nif" style={{ fontWeight: 600, fontSize: '0.97rem', color: '#3949ab' }}>NIF</label>
                        <input
                            id="nif"
                            name="nif"
                            type="text"
                            placeholder="B12345678"
                            value={inputsEnterprise.nif}
                            onChange={handleChangeEnterprise}
                            style={{
                                width: '100%',
                                padding: '0.5em',
                                borderRadius: '5px',
                                border: '1px solid #bfc0c0',
                                fontSize: '0.97rem',
                                marginTop: '0.2em',
                                background: '#f4f8ff'
                            }}
                            autoComplete="off"
                            disabled={loading}
                        />
                    </div>
                    <div style={{ gridColumn: '1 / span 2' }}>
                        <label htmlFor="descripcion" style={{ fontWeight: 600, fontSize: '0.97rem', color: '#3949ab' }}>Descripción</label>
                        <textarea
                            id="descripcion"
                            name="descripcion"
                            placeholder="Describe brevemente la empresa"
                            value={inputsEnterprise.descripcion}
                            onChange={handleChangeEnterprise}
                            style={{
                                width: '100%',
                                padding: '0.5em',
                                borderRadius: '5px',
                                border: '1px solid #bfc0c0',
                                fontSize: '0.97rem',
                                marginTop: '0.2em',
                                background: '#f4f8ff',
                                minHeight: '40px',
                                resize: 'vertical'
                            }}
                            disabled={loading}
                        />
                    </div>
                    {/* Columna izquierda: Usuario */}
                    <div>
                        <label htmlFor="firstName" style={{ fontWeight: 600, fontSize: '0.97rem', color: '#3949ab' }}>Nombre</label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            placeholder="Ejemplo"
                            value={inputUser.firstName}
                            onChange={handleChangeUser}
                            style={{
                                width: '100%',
                                padding: '0.5em',
                                borderRadius: '5px',
                                border: '1px solid #bfc0c0',
                                fontSize: '0.97rem',
                                marginTop: '0.2em',
                                background: '#f4f8ff'
                            }}
                            autoComplete="given-name"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label htmlFor="userName" style={{ fontWeight: 600, fontSize: '0.97rem', color: '#3949ab' }}>Nombre de usuario</label>
                        <input
                            id="userName"
                            name="userName"
                            type="text"
                            placeholder="Usuario123"
                            value={inputUser.userName}
                            onChange={handleChangeUser}
                            style={{
                                width: '100%',
                                padding: '0.5em',
                                borderRadius: '5px',
                                border: '1px solid #bfc0c0',
                                fontSize: '0.97rem',
                                marginTop: '0.2em',
                                background: '#f4f8ff'
                            }}
                            autoComplete="username"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName1" style={{ fontWeight: 600, fontSize: '0.97rem', color: '#3949ab' }}>Primer apellido</label>
                        <input
                            id="lastName1"
                            name="lastName1"
                            type="text"
                            placeholder="Ejemplo"
                            value={inputUser.lastName1}
                            onChange={handleChangeUser}
                            style={{
                                width: '100%',
                                padding: '0.5em',
                                borderRadius: '5px',
                                border: '1px solid #bfc0c0',
                                fontSize: '0.97rem',
                                marginTop: '0.2em',
                                background: '#f4f8ff'
                            }}
                            autoComplete="family-name"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" style={{ fontWeight: 600, fontSize: '0.97rem', color: '#3949ab' }}>Contraseña</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="***********"
                            value={inputUser.password}
                            onChange={handleChangeUser}
                            style={{
                                width: '100%',
                                padding: '0.5em',
                                borderRadius: '5px',
                                border: '1px solid #bfc0c0',
                                fontSize: '0.97rem',
                                marginTop: '0.2em',
                                background: '#f4f8ff'
                            }}
                            autoComplete="new-password"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName2" style={{ fontWeight: 600, fontSize: '0.97rem', color: '#3949ab' }}>Segundo apellido</label>
                        <input
                            id="lastName2"
                            name="lastName2"
                            type="text"
                            placeholder="Ejemplo"
                            value={inputUser.lastName2}
                            onChange={handleChangeUser}
                            style={{
                                width: '100%',
                                padding: '0.5em',
                                borderRadius: '5px',
                                border: '1px solid #bfc0c0',
                                fontSize: '0.97rem',
                                marginTop: '0.2em',
                                background: '#f4f8ff'
                            }}
                            autoComplete="additional-name"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label htmlFor="password2" style={{ fontWeight: 600, fontSize: '0.97rem', color: '#3949ab' }}>Repetir contraseña</label>
                        <input
                            id="password2"
                            name="password2"
                            type="password"
                            placeholder="***********"
                            value={inputUser.password2}
                            onChange={handleChangeUser}
                            style={{
                                width: '100%',
                                padding: '0.5em',
                                borderRadius: '5px',
                                border: '1px solid #bfc0c0',
                                fontSize: '0.97rem',
                                marginTop: '0.2em',
                                background: '#f4f8ff'
                            }}
                            autoComplete="new-password"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" style={{ fontWeight: 600, fontSize: '0.97rem', color: '#3949ab' }}>Correo electrónico</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="correo@ejemplo.com"
                            value={inputUser.email}
                            onChange={handleChangeUser}
                            style={{
                                width: '100%',
                                padding: '0.5em',
                                borderRadius: '5px',
                                border: '1px solid #bfc0c0',
                                fontSize: '0.97rem',
                                marginTop: '0.2em',
                                background: '#f4f8ff'
                            }}
                            autoComplete="email"
                            disabled={loading}
                        />
                    </div>
                    <div style={{ gridColumn: '1 / span 2', marginTop: '0.5em', display: 'flex', justifyContent: 'center' }}>
                        <button
                            type="submit"
                            style={{
                                background: loading
                                    ? 'linear-gradient(90deg, #90caf9 0%, #64b5f6 100%)'
                                    : 'linear-gradient(90deg, #1976d2 0%, #1565c0 100%)',
                                padding: '0.7em 0',
                                borderRadius: '6px',
                                border: 'none',
                                color: 'white',
                                fontWeight: 700,
                                fontSize: '1rem',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                transition: 'background 0.2s',
                                boxShadow: '0 2px 8px #90caf9',
                                width: '60%',
                                minWidth: '140px'
                            }}
                            disabled={loading}
                        >
                            {loading ? 'Creando empresa...' : 'Crear empresa'}
                        </button>
                    </div>
                </form>
                <p style={{ marginTop: '1.2em', textAlign: 'center', fontSize: '0.97rem', color: '#3949ab' }}>
                    ¿Ya tienes cuenta?
                    <Link href="/" style={{ color: '#1976d2', fontWeight: 600, marginLeft: 4 }}>
                        Inicia sesión aquí
                    </Link>
                </p>
            </div>
            <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
}

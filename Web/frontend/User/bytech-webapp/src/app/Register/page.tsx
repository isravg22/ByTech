'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import imgLogo from '@/app/img/logo.png';
import Image from 'next/image';

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

    const [loading, setLoading] = useState(false);

    const handleChangeUser = (event: React.ChangeEvent<HTMLInputElement>) => {
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

        setLoading(true);
        try {
            const lastName = `${lastName1} ${lastName2}`;
            const response = await fetch('http://localhost:8000/user/insertUser', {
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
                    rol: 'user',
                    activated: 0,
                    enterprise: 0
                })
            });

            if (response.ok) {
                toast.success('Usuario creado correctamente');
                router.push('/');
            } else {
                const errorMessage = await response.text();
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
                background: 'rgba(255,255,255,0.90)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                padding: '2.5em 2.5em',
                borderRadius: '24px',
                width: '100%',
                maxWidth: '900px',
                boxShadow: '0 8px 32px rgba(44, 62, 80, 0.12), 0 1.5px 8px #90caf9'
            }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5em' }}>
                    <Image src={imgLogo} alt="Logo ByTech" width={96} height={96} priority />
                </div>
                <h2 style={{
                    marginBottom: '1.5em',
                    fontSize: '2.2rem',
                    fontWeight: 700,
                    textAlign: 'center',
                    color: '#1a237e',
                    letterSpacing: '1px'
                }}>
                    Crear cuenta
                </h2>
                <form
                    onSubmit={e => { e.preventDefault(); insertUser(); }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '1.3em 2.5em',
                        alignItems: 'end'
                    }}
                    autoComplete="off"
                >
                    {/* Columna izquierda */}
                    <div>
                        <label htmlFor="firstName" style={{ fontWeight: 600, fontSize: '1rem', color: '#3949ab' }}>Nombre</label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            placeholder="Ejemplo"
                            value={inputUser.firstName}
                            onChange={handleChangeUser}
                            style={{
                                width: '100%',
                                padding: '0.7em',
                                borderRadius: '6px',
                                border: '1px solid #bfc0c0',
                                fontSize: '1rem',
                                marginTop: '0.3em',
                                background: '#f4f8ff'
                            }}
                            autoComplete="given-name"
                            disabled={loading}
                        />
                    </div>
                    {/* Columna derecha */}
                    <div>
                        <label htmlFor="userName" style={{ fontWeight: 600, fontSize: '1rem', color: '#3949ab' }}>Nombre de usuario</label>
                        <input
                            id="userName"
                            name="userName"
                            type="text"
                            placeholder="Usuario123"
                            value={inputUser.userName}
                            onChange={handleChangeUser}
                            style={{
                                width: '100%',
                                padding: '0.7em',
                                borderRadius: '6px',
                                border: '1px solid #bfc0c0',
                                fontSize: '1rem',
                                marginTop: '0.3em',
                                background: '#f4f8ff'
                            }}
                            autoComplete="username"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName1" style={{ fontWeight: 600, fontSize: '1rem', color: '#3949ab' }}>Primer apellido</label>
                        <input
                            id="lastName1"
                            name="lastName1"
                            type="text"
                            placeholder="Ejemplo"
                            value={inputUser.lastName1}
                            onChange={handleChangeUser}
                            style={{
                                width: '100%',
                                padding: '0.7em',
                                borderRadius: '6px',
                                border: '1px solid #bfc0c0',
                                fontSize: '1rem',
                                marginTop: '0.3em',
                                background: '#f4f8ff'
                            }}
                            autoComplete="family-name"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" style={{ fontWeight: 600, fontSize: '1rem', color: '#3949ab' }}>Contraseña</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="***********"
                            value={inputUser.password}
                            onChange={handleChangeUser}
                            style={{
                                width: '100%',
                                padding: '0.7em',
                                borderRadius: '6px',
                                border: '1px solid #bfc0c0',
                                fontSize: '1rem',
                                marginTop: '0.3em',
                                background: '#f4f8ff'
                            }}
                            autoComplete="new-password"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName2" style={{ fontWeight: 600, fontSize: '1rem', color: '#3949ab' }}>Segundo apellido</label>
                        <input
                            id="lastName2"
                            name="lastName2"
                            type="text"
                            placeholder="Ejemplo"
                            value={inputUser.lastName2}
                            onChange={handleChangeUser}
                            style={{
                                width: '100%',
                                padding: '0.7em',
                                borderRadius: '6px',
                                border: '1px solid #bfc0c0',
                                fontSize: '1rem',
                                marginTop: '0.3em',
                                background: '#f4f8ff'
                            }}
                            autoComplete="additional-name"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label htmlFor="password2" style={{ fontWeight: 600, fontSize: '1rem', color: '#3949ab' }}>Repetir contraseña</label>
                        <input
                            id="password2"
                            name="password2"
                            type="password"
                            placeholder="***********"
                            value={inputUser.password2}
                            onChange={handleChangeUser}
                            style={{
                                width: '100%',
                                padding: '0.7em',
                                borderRadius: '6px',
                                border: '1px solid #bfc0c0',
                                fontSize: '1rem',
                                marginTop: '0.3em',
                                background: '#f4f8ff'
                            }}
                            autoComplete="new-password"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" style={{ fontWeight: 600, fontSize: '1rem', color: '#3949ab' }}>Correo electrónico</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="correo@ejemplo.com"
                            value={inputUser.email}
                            onChange={handleChangeUser}
                            style={{
                                width: '100%',
                                padding: '0.7em',
                                borderRadius: '6px',
                                border: '1px solid #bfc0c0',
                                fontSize: '1rem',
                                marginTop: '0.3em',
                                background: '#f4f8ff'
                            }}
                            autoComplete="email"
                            disabled={loading}
                        />
                    </div>
                    <div style={{ gridColumn: '1 / span 2', marginTop: '0.7em', display: 'flex', justifyContent: 'center' }}>
                        <button
                            type="submit"
                            style={{
                                background: loading
                                    ? 'linear-gradient(90deg, #90caf9 0%, #64b5f6 100%)'
                                    : 'linear-gradient(90deg, #1976d2 0%, #1565c0 100%)',
                                padding: '0.9em 0',
                                borderRadius: '8px',
                                border: 'none',
                                color: 'white',
                                fontWeight: 700,
                                fontSize: '1.15rem',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                transition: 'background 0.2s',
                                boxShadow: '0 2px 8px #90caf9',
                                width: '60%',
                                minWidth: '180px'
                            }}
                            disabled={loading}
                        >
                            {loading ? 'Creando cuenta...' : 'Crear cuenta'}
                        </button>
                    </div>
                </form>
                <p style={{ marginTop: '2em', textAlign: 'center', fontSize: '1rem', color: '#3949ab' }}>
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

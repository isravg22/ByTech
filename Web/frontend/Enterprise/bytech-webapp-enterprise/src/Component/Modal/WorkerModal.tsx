'use client'
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import imgLogo from '@/app/img/logo.png';
import Image from 'next/image';

interface WorkerModalProps {
    closeModal: () => void;
}

const WorkerModal: React.FC<WorkerModalProps> = ({ closeModal }) => {
    const [inputUser, setInputUser] = useState({
        firstName: '',
        lastName1: '',
        lastName2: '',
        email: '',
        userName: '',
        password: '',
        password2: '',
    });

    const handleChangeUser = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setInputUser(prev => ({ ...prev, [name]: value }));
    };

    const insertWorker = async () => {
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
        try {
            const idEnterprise = localStorage.getItem('idEnterprise');
            const responseUser = await fetch(`http://localhost:8000/user/insertUser`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName,
                    lastName: `${lastName1} ${lastName2}`,
                    email,
                    userName,
                    password,
                    rol: 'worker',
                    activated: 1,
                    enterprise: idEnterprise
                })
            });
            if (responseUser.ok) {
                toast.success('Trabajador añadido correctamente');
                setTimeout(() => closeModal(), 1200);
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
            toast.error('Error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.');
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            <div style={{
                background: 'rgba(255,255,255,0.97)',
                borderRadius: 18,
                boxShadow: '0 4px 24px rgba(44, 62, 80, 0.10), 0 1.5px 8px #90caf9',
                padding: '36px 24px 24px 24px',
                width: 400,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative'
            }}>
                <span
                    className="close"
                    onClick={closeModal}
                    style={{
                        cursor: 'pointer',
                        position: 'absolute',
                        top: 12,
                        right: 18,
                        fontSize: 28,
                        color: '#1976d2'
                    }}
                >&times;</span>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1em' }}>
                    <Image src={imgLogo} alt="Logo" width={65} height={65} />
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginLeft: 12 }}>Añadir Trabajador</h3>
                </div>
                <form
                    style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}
                    onSubmit={e => { e.preventDefault(); insertWorker(); }}
                >
                    <label style={{ fontWeight: 600, fontSize: 14 }}>Nombre</label>
                    <input
                        type="text"
                        name="firstName"
                        value={inputUser.firstName}
                        onChange={handleChangeUser}
                        style={inputStyle}
                        placeholder="Ejemplo"
                        autoFocus
                    />
                    <label style={{ fontWeight: 600, fontSize: 14 }}>Primer apellido</label>
                    <input
                        type="text"
                        name="lastName1"
                        value={inputUser.lastName1}
                        onChange={handleChangeUser}
                        style={inputStyle}
                        placeholder="Apellido1"
                    />
                    <label style={{ fontWeight: 600, fontSize: 14 }}>Segundo apellido</label>
                    <input
                        type="text"
                        name="lastName2"
                        value={inputUser.lastName2}
                        onChange={handleChangeUser}
                        style={inputStyle}
                        placeholder="Apellido2"
                    />
                    <label style={{ fontWeight: 600, fontSize: 14 }}>Correo</label>
                    <input
                        type="email"
                        name="email"
                        value={inputUser.email}
                        onChange={handleChangeUser}
                        style={inputStyle}
                        placeholder="correo@ejemplo.com"
                    />
                    <label style={{ fontWeight: 600, fontSize: 14 }}>Nombre de usuario</label>
                    <input
                        type="text"
                        name="userName"
                        value={inputUser.userName}
                        onChange={handleChangeUser}
                        style={inputStyle}
                        placeholder="Ejemplo123"
                    />
                    <label style={{ fontWeight: 600, fontSize: 14 }}>Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        value={inputUser.password}
                        onChange={handleChangeUser}
                        style={inputStyle}
                        placeholder="********"
                    />
                    <label style={{ fontWeight: 600, fontSize: 14 }}>Repetir contraseña</label>
                    <input
                        type="password"
                        name="password2"
                        value={inputUser.password2}
                        onChange={handleChangeUser}
                        style={inputStyle}
                        placeholder="********"
                    />
                    <button
                        type="submit"
                        style={{
                            background: 'linear-gradient(90deg, #1976d2 60%, #64b5f6 100%)',
                            color: 'white',
                            fontWeight: 700,
                            borderRadius: 8,
                            padding: '10px 0',
                            fontSize: 16,
                            marginTop: 16,
                            border: 'none',
                            boxShadow: '0 2px 8px #90caf9',
                            cursor: 'pointer'
                        }}
                    >
                        Añadir Trabajador
                    </button>
                </form>
                <ToastContainer position="bottom-right" autoClose={5000} />
            </div>
        </div>
    );
};

const inputStyle: React.CSSProperties = {
    padding: '8px',
    borderRadius: '6px',
    border: '1px solid #bfc0c0',
    fontSize: '1rem',
    background: '#f4f8ff',
    marginBottom: 6
};

export default WorkerModal;

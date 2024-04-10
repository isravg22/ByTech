'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import imgLogo from '@/app/img/logo.png';
import Image from 'next/image';

interface WorkerModalProps {
    closeModal: () => void;
}

const WorkerModal: React.FC<WorkerModalProps> = ({ closeModal }) => {
    const router= useRouter();

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
            console.log("ID ENTERPRISE", idEnterprise);
            const responseUser = await fetch(`http://localhost:8000/user/insertUser`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName: `${lastName1} ${lastName2}`, email, userName, password, rol: 'worker', activated: 1, enterprise: idEnterprise })
            });

            if (responseUser.ok) {
                const dataUser = await responseUser.json();
    
                const idEnterprise = localStorage.getItem('idEnterprise');
                const responseUpdateEnterprise = await fetch(`http://localhost:8000/enterprise/${idEnterprise}/addWorker`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dataUser.id)
                });
    
                if (responseUpdateEnterprise.ok) {
                    console.log('Se ha agregado correctamente el nuevo trabajador');
                    closeModal();
                }
            }

        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
            toast.error('Error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.');
        }
    };


    return (
        <div style={{ display: 'flex', justifyContent: 'center', height: 'auto' }}>
            <div style={{ backgroundColor: 'white', padding: '1em', borderRadius: '10px', marginTop: '5%', display: 'flex', flexDirection: 'column', width: '30%' }}>
                <span className="close" onClick={closeModal} style={{ cursor: 'pointer' }}>&times;</span>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5em' }}>
                    <Image src={imgLogo} alt="Logo" width="65" height="65" />
                    <h3 style={{ fontSize: '25px', fontWeight: 'bold', }}>Añadir Trabajador</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>

                    {['Nombre', 'Primer apellido', 'Segundo apellido', 'Correo', 'Nombre de usuario', 'Contraseña', 'Repetir contraseña'].map((label, index) => (
                        <div key={index} >
                            <label style={{ fontWeight: 'bold', fontSize: '13px' }}>{label}</label>
                            <input
                                type={index >= 5 ? "password" : "text"}
                                placeholder={`Ejemplo${index === 4 ? "123" : ""}`}
                                style={{ padding: '0.3em', borderRadius: '3px', fontSize: '13px', border: '1px solid black', width: '100%' }}
                                name={Object.keys(inputUser)[index]}
                                value={inputUser[Object.keys(inputUser)[index] as keyof typeof inputUser]}
                                onChange={handleChangeUser}
                            />
                        </div>
                    ))}

                    <button style={{ backgroundColor: '#00a2ff', padding: '0.3em 0', borderRadius: '3px', border: 'none', color: 'white', fontWeight: 'bold', fontSize: '16px', marginTop: '3%' }} onClick={insertWorker}>
                        Añadir Trabajador
                    </button>
                </div>
            </div>
            <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
        </div>

    );
}

export default WorkerModal;

'use client'
import React, { useState, useEffect } from 'react';
import NavBar from '@/Component/NavBar/Navbar';
import Image from 'next/image';
import { AiFillEdit } from 'react-icons/ai';
import imageLogo from '@/app/img/logo.png';
import Footer from '@/Component/Footer/Footer';
import { UserData } from '@/Interface/UserData';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Profile() {
    const [userData, setUserData] = useState<UserData>({
        firstName: '',
        lastName: '',
        email: '',
        userName: '',
        password: ''
    });

    const [editableField, setEditableField] = useState<string>('');

    const userDetails = async () => {
        try {
            const token = localStorage.getItem('idUser');
            const response = await fetch(`http://localhost:8000/user/${token}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const userData = await response.json();
                setUserData(userData);
            } else {
                toast.error('Error al obtener los datos del perfil');
            }
        } catch (error) {
            toast.error('Error al procesar la solicitud');
        }
    };

    useEffect(() => {
        userDetails();
    }, []);

    const handleEdit = (fieldName: string) => {
        setEditableField(fieldName);
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('idUser');
            const response = await fetch(`http://localhost:8000/user/${token}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                toast.success('Datos actualizados correctamente');
                setEditableField('');
            } else {
                const errorMessage = await response.text();
                if (errorMessage === 'Username already exists') {
                    toast.error('Nombre de usuario no válido, prueba otro');
                } else if (errorMessage === 'Email already exists') {
                    toast.error('Correo electrónico no válido, prueba otro');
                } else {
                    toast.error('Error al actualizar los datos del perfil');
                }
            }
        } catch (error) {
            toast.error('Error al procesar la solicitud');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        const { value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [fieldName]: value
        }));
    };

    const LabelInput = (label: string, value: string, fieldName: string, type: string = 'text') => (
        <div className="flex flex-col gap-1">
            <label className="text-base font-semibold text-[#3949ab]">{label}</label>
            <div className="relative w-full">
                <input
                    type={type}
                    name={fieldName}
                    className={`w-full border border-gray-300 rounded-lg px-4 py-2 bg-[#f4f8ff] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150 ${editableField === fieldName ? 'ring-2 ring-blue-400' : ''}`}
                    value={editableField === fieldName ? userData[fieldName as keyof UserData] : value}
                    onChange={(e) => handleChange(e, fieldName)}
                    readOnly={editableField !== fieldName}
                    autoComplete={fieldName}
                />
                {editableField !== fieldName && (
                    <button
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-blue-500 focus:outline-none"
                        onClick={() => handleEdit(fieldName)}
                        tabIndex={0}
                        aria-label={`Editar ${label}`}
                    >
                        <AiFillEdit className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>
    );

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(120deg, #e3f0ff 0%, #b3c6f7 100%)',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <NavBar />
            <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem 0'
            }}>
                <div style={{
                    background: 'rgba(255,255,255,0.92)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    borderRadius: '24px',
                    boxShadow: '0 8px 32px rgba(44, 62, 80, 0.12), 0 1.5px 8px #90caf9',
                    padding: '2.5em 2.5em',
                    width: '100%',
                    maxWidth: '480px'
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.5em' }}>
                        <Image src={imageLogo} alt="Logotipo" height={70} width={70} />
                        <h2 className="text-2xl font-bold mt-3 text-[#1a237e]">Perfil de Usuario</h2>
                    </div>
                    <form className="space-y-5">
                        {LabelInput('Nombre', userData.firstName, 'firstName')}
                        {LabelInput('Apellidos', userData.lastName, 'lastName')}
                        {LabelInput('Correo electrónico', userData.email, 'email', 'email')}
                        {LabelInput('Nombre de Usuario', userData.userName, 'userName')}
                        {LabelInput('Contraseña', userData.password, 'password', 'password')}
                    </form>
                    {editableField && (
                        <button
                            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700 mt-6 font-semibold transition-all duration-150"
                            onClick={handleSave}
                            type="button"
                        >
                            Guardar cambios
                        </button>
                    )}
                </div>
            </div>
            <Footer />
            <ToastContainer position="bottom-right" autoClose={4000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
}

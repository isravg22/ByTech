'use client'
import React, { useState, useEffect } from 'react';
import NavBar from '@/Component/NavBar/Navbar';
import Image from 'next/image';
import { AiFillEdit } from 'react-icons/ai';
import imageLogo from '@/app/img/logo.png';
import Footer from '@/Component/Footer/Footer';
import { UserData } from '@/Interface/UserData';
import {toast, ToastContainer} from 'react-toastify';

export default function Profile() {

    const [userData, setUserData] = useState<UserData>({
        firstName: '',
        lastName: '',
        email:'',
        userName:'',
        password:''
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
                console.error('Error al obtener los datos del perfil');
            }
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
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
                console.log('Datos actualizados correctamente');
                setEditableField('');
            } else {
                const errorMessage= await response.text();
                if(errorMessage==='Username already exists'){
                    toast.error('Nombre de usuario no válido, prueba otro');
                }else if(errorMessage==='Email already exists'){
                    toast.error('Correo electrónico no válido, prueba otro');
                }else{
                    console.error('Error al actualizar los datos del perfil');
                    toast.error('Error al actualizar los datos del perfil');
                }
                
            }
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        const { value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [fieldName]: value
        }));
    };

    const LabelInput = (label: string, value: string, fieldName: string) => (
        <div className="flex flex-col ">
            <label className="text-lg font-medium mb-1">{label}</label>
            <div className="relative w-full">
                <input
                    type={label === 'Contraseña' ? 'password' : 'text'}
                    name={label}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={editableField === label ? userData[fieldName as keyof UserData] : value}
                    onChange={(e) => handleChange(e, fieldName)}
                    readOnly={editableField !== label}
                />
                {editableField !== label && (
                    <button className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-blue-500 focus:outline-none" onClick={() => handleEdit(label)}>
                        <AiFillEdit className="w-6 h-6" />
                    </button>
                )}
            </div>
        </div>
    );

    return (
        <div>
            <NavBar />
            <div>
                <div className="container flex-grow mx-auto p-4 bg-white rounded-lg shadow-lg" style={{ justifyContent:'center',width:'50%',marginTop:'4.5rem',height:'15%'}}>
                    <div style={{display:'flex',justifyContent:'center'}}>
                        <Image src={imageLogo} alt="Logotipo" height={70} width={70}/>
                        <h2 className="text-3xl font-semibold mb-6" style={{marginTop:'20px'}}>Perfil de Usuario</h2>
                    </div>
                    <div className="space-y-6">
                        {LabelInput('Nombre', userData.firstName, 'firstName')}
                        {LabelInput('Apellidos', userData.lastName, 'lastName')}
                        {LabelInput('Correo electrónico', userData.email, 'email')}
                        {LabelInput('Nombre de Usuario', userData.userName, 'userName')}
                        {LabelInput('Contraseña', userData.password, 'password')}
                    </div>
                    {editableField && (
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mt-4" onClick={handleSave}>Guardar</button>
                    )}
                </div>
            </div>
            <Footer/>
        </div>
    );
}

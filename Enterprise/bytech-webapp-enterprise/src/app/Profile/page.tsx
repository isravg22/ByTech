'use client'
import React, { useState, useEffect } from 'react';
import NavBar from '@/Component/NavBar/Navbar';
import Image from 'next/image';
import { AiFillEdit } from 'react-icons/ai';
import imageLogo from '@/app/img/logo.png';
import Footer from '@/Component/Footer/Footer';

interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    userName: string;
    password: string;
}

export default function Profile() {

    const [userData, setUserData] = useState<UserData>({
        firstName: '',
        lastName: '',
        email:'',
        userName:'',
        password:''
    });


    useEffect(() => {
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
        userDetails();
    }, []);

    const LabelInput = (label: string, value: string) => (
        <div className="flex flex-col ">
            <label className="text-lg font-medium mb-1">{label}</label>
            <div className="relative w-full">
                <input
                    type={label === 'Contraseña' ? 'password' : 'text'}
                    name={label}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={value}
                    readOnly
                />
                <button className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-blue-500 focus:outline-none">
                    <AiFillEdit className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
    

    return (
        <div>
            <NavBar />
            <div>
                <div className="container flex-grow mx-auto p-4 bg-white rounded-lg shadow-lg" style={{ justifyContent:'center',width:'40%',marginTop:'5rem'}}>
                    <div className="flex flex-col items-center justify-center mb-6">
                        <Image src={imageLogo} alt="Logotipo" height={100} width={100} />
                        <h2 className="text-3xl font-semibold mb-6">Perfil de Usuario</h2>
                    </div>
                    <div className="space-y-6">
                        {LabelInput('Nombre', userData.firstName)}
                        {LabelInput('Apellidos', userData.lastName)}
                        {LabelInput('Correo electrónico', userData.email)}
                        {LabelInput('Nombre de Usuario', userData.userName)}
                        {LabelInput('Contraseña', userData.password)}
                    </div>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mt-4">Guardar</button>
                </div>
            </div>
            <Footer />
        </div>
        
    );
}

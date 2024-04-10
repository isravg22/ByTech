'use client'
import React, { useState,useEffect } from 'react';
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
    
    const [inputUser,setInputUser]=useState<{
        firstName:string;
        lastName1:string;
        lastName2:string;       
        email:string;
        userName:string;
        password: string;
        password2:string;
    }>({
        firstName:'',
        lastName1:'',
        lastName2:'',       
        email:'',
        userName:'',
        password: '',
        password2:'',
    });

    const handleChangeUser = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;
        setInputUser(prevInputs => ({ ...prevInputs, [name]: value }));
    };

    const handleChangeEnterprise = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;
        setInputsEnterprise(prevInputs => ({ ...prevInputs, [name]: value }));
    };


    const insertEnterprise = async () => {
        const {  firstName, lastName1, lastName2, email, userName, password, password2 } = inputUser;
        if (!firstName || !lastName1 || !lastName2 || !email || !userName || !password || !password2 ) {
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
            toast.error('Por favor completa todos los campos.');
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
                        boss:bossId
                    })
                });
    
                if (responseEnterprise.ok) {
                    const enterpriseData= await responseEnterprise.json();
                    const enterprise_id= enterpriseData.id;
                    
                    const updateUser=await fetch(`http://localhost:8000/user/${bossId}`,{
                        method:'PUT',
                        headers:{'Content-Type':'application/json'},
                        body:JSON.stringify({...userData,enterprise:enterprise_id})
                    })
                    if(updateUser.ok){
                        toast.success('Empresa creada correctamente');
                        router.push('/');
                    }
                    
                } else {
                    const errorData = await responseEnterprise.json();
                    if (errorData.message) {
                        toast.error(errorData.message);
                    } else {
                        toast.error('La Empresa no se ha podido crear.');
                    }
                }
            } else {
                throw new Error('Error al guardar el usuario');
            }
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
            toast.error('Error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.');
        }
    };
    
    return (
        <div style={{ display: 'flex', justifyContent: 'center', height: 'auto' }}>
            <div style={{ backgroundColor: 'white', padding: '1em', borderRadius: '10px', marginTop: '0.5%', display: 'flex', flexDirection: 'column', width: '30%' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5em' }}>
                    <Image src={imgLogo} alt="Logo" width="65" height="65" />
                    <h3 style={{ fontSize: '25px', fontWeight: 'bold',}}>Crear cuenta de empresa</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {['Nombre de la Empresa', 'NIF', 'Descripción'].map((label, index) => (
                        <div key={index} >
                            <label style={{ fontWeight: 'bold', fontSize: '13px' }}>{label}</label>
                            <input
                                type="text"
                                placeholder={`Ejemplo`}
                                style={{ padding: '0.3em', borderRadius: '3px', fontSize: '13px', border: '1px solid black', width: '100%' }}
                                name={Object.keys(inputsEnterprise)[index]}
                                value={inputsEnterprise[Object.keys(inputsEnterprise)[index] as keyof typeof inputsEnterprise]}
                                onChange={handleChangeEnterprise}
                            />
                        </div>
                    ))}
                    {['Nombre', 'Primer apellido', 'Segundo apellido', 'Correo', 'Nombre de usuario', 'Contraseña', 'Repetir contraseña'].map((label, index) => (
                        <div key={index} >
                            <label style={{ fontWeight: 'bold', fontSize: '13px' }}>{label}</label>
                            <input
                                type={index >= 5 ? "password" : "text"}
                                placeholder={`Ejemplo${index === 4 ? "123" : ""}`}
                                style={{ padding: '0.3em', borderRadius: '3px', fontSize: '13px', border: '1px solid black', width: '100%' }}
                                name={Object.keys(inputUser)[index]}
                                value={inputUser[Object.keys(inputUser)[index] as keyof typeof inputUser] }
                                onChange={handleChangeUser}
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

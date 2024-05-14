import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import NavBar from '../NavBar/NavBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserData } from '@/interfaces/UserData';
import Icon from 'react-native-vector-icons/FontAwesome';

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
            const token = await AsyncStorage.getItem('idUser');
            const response = await fetch(`http://192.168.0.247:8001/user/${token}`, {
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
            const token = await AsyncStorage.getItem('idUser');
            const response = await fetch(`http://192.168.0.247:8001/user/${token}`, {
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
                console.error('Error al actualizar los datos del perfil');
            }
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
        }
    };

    const handleChange = (value: string, fieldName: string) => {
        setUserData(prevState => ({
            ...prevState,
            [fieldName]: value
        }));
    };
    
    const LabelInput = (label: string, value: string, fieldName: string) => (
        <View style={{ flexDirection: 'column', alignItems: 'flex-start', marginBottom: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{label}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 5, padding: 10, backgroundColor: 'white', color: 'black', flex: 1, width: '90%' }}
                    secureTextEntry={label === 'Contraseña'}
                    value={editableField === label ? userData[fieldName as keyof UserData] : value}
                    onChangeText={(text) => handleChange(text, fieldName)}
                    editable={editableField === label}
                />
                {editableField !== label && (
                    <TouchableOpacity onPress={() => handleEdit(label)} style={{ marginLeft: 10 }}>
                        <Icon name="pencil" size={24} color="blue" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );

    return (
        <View style={{ flex: 1, backgroundColor: '#00C8E6' }}>
            <NavBar />
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image source={{ uri: 'https://s3-bytech.s3.eu-west-3.amazonaws.com/logo.png' }} style={{ width: 100, height: 100 }} />
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Perfil de Usuario</Text>
            </View>
            <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                {LabelInput('Nombre', userData.firstName, 'firstName')}
                {LabelInput('Apellidos', userData.lastName, 'lastName')}
                {LabelInput('Correo electrónico', userData.email, 'email')}
                {LabelInput('Nombre de Usuario', userData.userName, 'userName')}
                {LabelInput('Contraseña', userData.password, 'password')}
                {editableField && (
                    <TouchableOpacity onPress={handleSave} style={{ alignItems: 'center', marginTop: 10,backgroundColor: '#00a2ff',borderRadius: 5,height:'10%',justifyContent:'center' }}>
                        <Text style={{ color: 'white', fontSize: 18, textDecorationLine: 'none' }}>Guardar</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

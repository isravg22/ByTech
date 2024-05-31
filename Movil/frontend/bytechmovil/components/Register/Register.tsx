import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ToastAndroid, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { Link } from '@react-navigation/native';

export default function Registro({ navigation }: any) {
    const [inputUser, setInputUser] = useState({
        firstName: '',
        lastName1: '',
        lastName2: '',
        email: '',
        userName: '',
        password: '',
        password2: '',
    });

    const handleChangeUser = (field: keyof typeof inputUser) => (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        const { text } = event.nativeEvent;
        setInputUser(prevInputs => ({ ...prevInputs, [field]: text }));
    };

    const insertUser = async () => {
        const { firstName, lastName1, lastName2, email, userName, password, password2 } = inputUser;
        if (!firstName || !lastName1 || !email || !userName || !password || !lastName2) {
            const missingFields = [];
            if (!firstName) missingFields.push('Nombre');
            if (!lastName1) missingFields.push('Primer apellido');
            if (!lastName2) missingFields.push('Segundo apellido');
            if (!email) missingFields.push('Correo');
            if (!userName) missingFields.push('Nombre de usuario');
            if (!password) missingFields.push('Contraseña');
            if (!password2) missingFields.push('Repetir contraseña');

            ToastAndroid.show(`Por favor completa los siguientes campos: ${missingFields.join(', ')}`, ToastAndroid.SHORT);
            return;
        }
        if (password !== password2) {
            ToastAndroid.show('Las contraseñas no coinciden.', ToastAndroid.SHORT);
            return;
        }
        const emailRegex = /\S+@\S+\.\S+/;

        if (!emailRegex.test(email)) {
            ToastAndroid.show('El correo electrónico no tiene un formato válido.', ToastAndroid.SHORT);
            return;
        }
        if (password.length < 8) {
            ToastAndroid.show('La contraseña debe tener al menos 8 caracteres.', ToastAndroid.SHORT);
            return;
        }
        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        if (!usernameRegex.test(userName)) {
            ToastAndroid.show('El nombre de usuario solo puede contener letras, números y guiones bajos.', ToastAndroid.SHORT);
            return;
        }
        try {
            const lastName = `${lastName1} ${lastName2}`;
            const response = await fetch('http://192.168.0.247:8001/user/insertUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName, email, userName, password, rol: 'user', activated: 0, enterprise: 0 }),
            });
            if (response.ok) {
                ToastAndroid.show('Usuario creado correctamente', ToastAndroid.SHORT);
                navigation.navigate('Login');
            } else {
                ToastAndroid.show('El usuario no se ha podido crear.', ToastAndroid.SHORT);
            }
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
            ToastAndroid.show('Error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.', ToastAndroid.SHORT);
        }
    };

    const labels = ['Nombre', 'Primer apellido', 'Segundo apellido', 'Correo', 'Nombre de usuario', 'Contraseña', 'Repetir contraseña'];
    const fields = ['firstName', 'lastName1', 'lastName2', 'email', 'userName', 'password', 'password2'];

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#00C8E6' }}>
            <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, marginTop: 10, flexDirection: 'column', width: '80%', height: 'auto' }}>
                <Image source={{ uri: 'https://s3-bytech.s3.eu-west-3.amazonaws.com/logo.png' }} alt="Logo" style={{ width: 128, height: 128, alignSelf: 'center', marginBottom: 10 }} />
                <Text style={{ marginBottom: 10, fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>Crear cuenta</Text>
                <View style={{ flexDirection: 'column', marginVertical: 10 }}>
                    {fields.map((field, index) => (
                        <View key={index} style={{ marginBottom: 10 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 13 }}>{labels[index]}</Text>
                            <TextInput
                                placeholder="Ejemplo"
                                style={{ padding: 5, borderRadius: 3, fontSize: 13, borderWidth: 1, borderColor: 'black', width: '100%' }}
                                secureTextEntry={index >= 5}
                                onChange={handleChangeUser(field as keyof typeof inputUser)}
                                value={inputUser[field as keyof typeof inputUser]}
                            />
                        </View>
                    ))}
                    <Text style={{ fontSize: 14, textAlign: 'center' }}>
                        Si ya tienes cuenta, pulsa <Link to={'/Login'} style={{ fontWeight: 'bold' }}>aquí</Link>.
                    </Text>
                    <TouchableOpacity style={{ backgroundColor: '#00a2ff', padding: 5, borderRadius: 3, borderWidth: 0, alignItems: 'center', marginTop: 10 }} onPress={insertUser}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Crear cuenta</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

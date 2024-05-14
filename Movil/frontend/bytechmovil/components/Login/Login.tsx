import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';
import { Link } from '@react-navigation/native';

export default function Login({navigation}:any) {
    const [userName, setName] = useState('');
    const [password, setPassword] = useState('');

    const goHome = async () => {
        try {
            const response = await fetch('http://192.168.0.247:8001/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userName, password })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.rol === 'admin' || data.rol === 'superadmin' || data.rol === 'user') {
                    console.log('Inicio de sesión correcto');
                    await AsyncStorage.setItem('idUser', data.id.toString());
                    navigation.navigate('HomePage')
                }
            }else{
                ToastAndroid.show('Credenciales incorrectas.', ToastAndroid.SHORT);
            }
        } catch (error) {
            ToastAndroid.show('Error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.', ToastAndroid.SHORT);
            console.error('Error al procesar la solicitud:', error);
        } 
        
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'#00C8E6'}}>
            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 20, width: '80%' }}>
                <Text style={{ marginBottom: 20, fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>Bienvenido a ByTech</Text>
                <Image source={{uri:'https://s3-bytech.s3.eu-west-3.amazonaws.com/logo.png'}} style={{ width: 256, height: 256, alignSelf: 'center', marginBottom: 20 }} />
                <View style={{ flexDirection: 'column', gap: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Nombre de usuario:</Text>
                    <TextInput
                        placeholder="Ejemplo123"
                        style={{ padding: 10, borderRadius: 5, fontSize: 18, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={(text) => setName(text)}
                        value={userName}
                    />
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Contraseña:</Text>
                    <TextInput
                        secureTextEntry={true}
                        placeholder="***********"
                        style={{ padding: 10, borderRadius: 5, fontSize: 18, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                    />
                    <Text>
                        Si no tienes cuenta, pulsa{' '}
                        <Link to={'/Register'} style={{ fontWeight: 'bold', color: 'blue' }}>aquí</Link>
                    </Text>
                    <TouchableOpacity
                        style={{ backgroundColor: '#00a2ff', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 10 }}
                        onPress={goHome}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Iniciar Sesión</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>


    );
}

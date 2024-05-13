import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Aside from '@/components/Aside/Aside';
import {Link} from '@react-navigation/native';

export default function NavBar() {
    const [showAside, setShowAside] = useState(false);
    const [showUserDetails, setShowUserDetails] = useState(false);

    const toggleAside = () => {
        setShowAside(!showAside);
    };

    const toggleUserDetails = () => {
        setShowUserDetails(!showUserDetails);
    };

    return (
        <View style={{ width: '100%' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#ffffff', borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                <TouchableOpacity onPress={toggleAside} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name="bars" size={24} color="black" style={{ marginRight: 10 }} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={{ uri: 'https://s3-bytech.s3.eu-west-3.amazonaws.com/logo.png' }} style={{ width: 100, height: 100 }} />
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>ByTech</Text>
                </View>
                <TouchableOpacity onPress={toggleUserDetails} style={{ borderColor: '#ccc', borderWidth: 1.0, borderRadius: 8 }}>
                    <Icon name="user" size={24} color="black" style={{ margin: 4 }} />
                </TouchableOpacity>
            </View>
            {showUserDetails && (
                <View style={{ position: 'absolute', top: 60, right: 20, backgroundColor: '#ffffff', borderRadius: 8, borderWidth: 1, borderColor: '#ccc', zIndex: 1 }}>
                    <Link to={'/Profile'} style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
                        <Text>Mi perfil</Text>
                    </Link>
                    <Link to={'/Login'} style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
                        <Text>Cerrar Sesión</Text>
                    </Link>
                </View>
            )}
            {showAside && <Aside/>}
        </View>
    );
}

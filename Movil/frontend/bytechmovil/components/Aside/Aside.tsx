import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SubMenu from "@/components/SubMenu/SubMenu";
import { Link } from '@react-navigation/native';
import IconBox from 'react-native-vector-icons/Feather';

export default function Aside() {
    const [showSubMenu, setShowSubMenu] = useState(false);

    const toggleSubMenu = () => {
        setShowSubMenu(!showSubMenu);
    };

    return (
        <View
            style={{
                position: 'absolute',
                top: 64,
                left: 0,
                zIndex: 40,
                width: 250,
                height: 'auto',
                paddingTop: 20,
                backgroundColor: '#ffffff',
                borderRightWidth: 1,
                borderRightColor: '#ccc'
            }}
        >
            <View style={{ paddingHorizontal: 10 }}>

                <Link to={'/HomePage'} style={{ fontSize: 16, flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                    <Icon name="home" size={24} color="#888888" />
                    Inicio
                </Link>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }} onPress={toggleSubMenu}>
                    <Icon name="shopping-cart" size={24} color="#888888" />
                    <Text style={{ fontSize: 16 }}>Productos</Text>
                </TouchableOpacity>
                {showSubMenu && <SubMenu />}
                <Link to={'/Order'} style={{ fontSize: 16, flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                    <IconBox name="box" size={24} color="#888888"/>
                    Pedidos
                </Link>
                <Link to={'/Login'}style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                    <Icon name="sign-out" size={24} color="#888888" />
                    Cerrar Sesión
                </Link>
            </View>
        </View>
    );
}

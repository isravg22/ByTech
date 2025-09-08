import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Link } from '@react-navigation/native';

export default function SubMenu() {

    return (
        <View style={{ paddingHorizontal: 10 }}>
            <Link to={'/Ordenador'} style={{ fontSize: 16, flexDirection: 'row', alignItems: 'center', padding: 10 }}>Ordenadores</Link>

            <Link to={'/Smartphone'} style={{ fontSize: 16, flexDirection: 'row', alignItems: 'center', padding: 10 }}>Smartphones</Link>

            <Link to={'/Componente'} style={{ fontSize: 16, flexDirection: 'row', alignItems: 'center', padding: 10 }}>Componentes</Link>

            <Link to={'/Gaming'} style={{ fontSize: 16, flexDirection: 'row', alignItems: 'center', padding: 10 }}>Gaming</Link>
        </View>
    );
};

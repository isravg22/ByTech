import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../components/Login/Login';
import HomePage from '../components/HomePage/HomePage';

const Stack = createNativeStackNavigator();

const MainStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='HomePage' component={HomePage} />
        </Stack.Navigator>
    );
}

export default MainStack;

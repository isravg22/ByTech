import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '@/components/Login/Login';
import HomePage from '@/components/HomePage/HomePage';
import Register from '@/components/Register/Register';
import Profile from '@/components/Profile/Profile';
import Detail from '@/components/HomePage/details/details';
import Ordenador from '@/components/Ordenador/Ordenador';
import Smartphone from '@/components/Smartphone/Smartphone';
import Componente from '@/components/Componente/Componente';
import Gaming from '@/components/Gaming/Gaming';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}  />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}  />
        <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }}/>
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
        <Stack.Screen name="Detail" component={Detail} options={{ headerShown: false }}/>
        <Stack.Screen name="Ordenador" component={Ordenador} options={{ headerShown: false }}/>
        <Stack.Screen name="Smartphone" component={Smartphone} options={{ headerShown: false }}/>
        <Stack.Screen name="Componente" component={Componente} options={{ headerShown: false }}/>
        <Stack.Screen name="Gaming" component={Gaming} options={{ headerShown: false }}/> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

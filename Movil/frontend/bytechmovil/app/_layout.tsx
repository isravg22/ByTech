import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '@/components/Login/Login';
import HomePage from '@/components/HomePage/HomePage';
import Register from '@/components/Register/Register';
import NavBar from '@/components/NavBar/NavBar';
import Aside from '@/components/Aside/Aside';
import SubMenu from '@/components/SubMenu/SubMenu';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}  />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}  />
        <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

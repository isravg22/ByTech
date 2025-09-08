/* import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '@/components/Login';
import HomePage from '@/components/HomePage/HomePage';
import Register from '@/components/Register/Register';
import Profile from '@/components/Profile/Profile';
import Detail from '@/components/HomePage/details/details';
import Ordenador from '@/components/Ordenador/Ordenador';
import Smartphone from '@/components/Smartphone/Smartphone';
import Componente from '@/components/Componente/Componente';
import Gaming from '@/components/Gaming/Gaming';
import Carrito from '@/components/Order/Order'; */
/* import { Stack } from 'expo-router';

/* const StackNavigator = createNativeStackNavigator(); */

/* export default function Layout() {
  return <Stack screenOptions={{ headerShown: false }} />; *//* (
  <StackNavigator.Navigator>
    <StackNavigator.Screen name="Login" component={Login} options={{ headerShown: false }} />
    <StackNavigator.Screen name="Register" component={Register} options={{ headerShown: false }} />
    <StackNavigator.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} />
    <StackNavigator.Screen name="Detail" component={Detail} options={{ headerShown: false }} />
    <StackNavigator.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
    <StackNavigator.Screen name="Ordenador" component={Ordenador} options={{ headerShown: false }} />
    <StackNavigator.Screen name="Smartphone" component={Smartphone} options={{ headerShown: false }} />
    <StackNavigator.Screen name="Componente" component={Componente} options={{ headerShown: false }} />
    <StackNavigator.Screen name="Gaming" component={Gaming} options={{ headerShown: false }} />
    <StackNavigator.Screen name="Carrito" component={Carrito} options={{ headerShown: false }} />
  </StackNavigator.Navigator>
); */

import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack screenOptions={{headerShown:false}}/>
        {/* <Stack.Screen name="Login" options={{ headerShown: false }} />
        <Stack.Screen name="Register" options={{ headerShown: false }} />
        <Stack.Screen name="HomePage" options={{ headerShown: false }} />
        <Stack.Screen name="Detail" options={{ headerShown: false }} />
        <Stack.Screen name="Profile" options={{ headerShown: false }} />
        <Stack.Screen name="Ordenador" options={{ headerShown: false }} />
        <Stack.Screen name="Smartphone" options={{ headerShown: false }} />
        <Stack.Screen name="Componente"  options={{ headerShown: false }} />
        <Stack.Screen name="Gaming" options={{ headerShown: false }} />
        <Stack.Screen name="Carrito" options={{ headerShown: false }} /> */
        /* <Stack   name="index"  screenOptions={{ headerShown: false }} />
      </Stack> */}
    </ThemeProvider>
  );
}
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import VerUsuario from '../screens/Especialista/Usuarios/VerUsuario';
import Login from '../screens/Auth/Login';

const Stack = createNativeStackNavigator();

export default function NavNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,

            }}
        >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="VerUsuario" component={VerUsuario} />

        </Stack.Navigator>
    );
}
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import HomeEspecialista from '../screens/Especialista/HomeEspecialista';

import Informes from '../screens/Especialista/Informes/Informes';

import Usuarios from '../screens/Especialista/Usuarios/Usuarios';

import Productos from '../screens/Shared/Productos/Productos';


import Buscador from '../screens/Shared/Buscador'

import Controles from '../screens/Shared/Controles';


const Stack = createNativeStackNavigator();

export default function FooterNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,

      }}
    >
      <Stack.Screen name="Home" component={HomeEspecialista} />
      <Stack.Screen name="Informes" component={Informes} />
      <Stack.Screen name="Usuarios" component={Usuarios} />
      <Stack.Screen name="Productos" component={Productos} />
      <Stack.Screen name="Buscador" component={Buscador} />
      <Stack.Screen name="Controles" component={Controles} />
    </Stack.Navigator>
  );
}
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import HomeControlCalidad from '../screens/ControlCalidad/HomeControlCalidad';

import VerUsuario from '../screens/Especialista/Usuarios/VerUsuario';
import EditarUsuario from '../screens/Especialista/Usuarios/EditarUsuario';

import Productos from '../screens/Shared/Productos/Productos';
import VerProducto from '../screens/Shared/Productos/VerProducto';

import Buscador from '../screens/Shared/Buscador'

import Controles from '../screens/Shared/Controles';
import ListadoControles from '../screens/Shared/ListadoControles';


const Stack = createNativeStackNavigator();

export default function EspecialistaNavigator() {
  return (
    <Stack.Navigator

      screenOptions={{
        headerShown: false,

      }}
    >
      <Stack.Screen name="Home" component={HomeControlCalidad} />
      {/*BORRAR INFORME */}
      <Stack.Screen name="Productos" component={Productos} />
      <Stack.Screen name="VerProducto" component={VerProducto} />
      <Stack.Screen name="Usuarios" component={VerUsuario} />
      <Stack.Screen name="EditarUsuario" component={EditarUsuario} />
      <Stack.Screen name="Buscador" component={Buscador} />
      <Stack.Screen name="Controles" component={Controles} />
      <Stack.Screen name="ListadoControles" component={ListadoControles} />
    </Stack.Navigator>
  );
}
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
import CrearControl from '../screens/Shared/CrearControl';
import EditarControl from '../screens/Shared/EditarControl';
import VerControl from '../screens/Shared/VerControl';

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
      <Stack.Screen name="VerUsuario" component={VerUsuario} />
      <Stack.Screen name="EditarUsuario" component={EditarUsuario} />
      <Stack.Screen name="Buscador" component={Buscador} />

      <Stack.Screen name="Controles" component={Controles} />
      
      <Stack.Screen name="ListadoControles" component={ListadoControles} />
      <Stack.Screen name="CrearControl" component={CrearControl} />
      <Stack.Screen name="EditarControl" component={EditarControl} />
      <Stack.Screen name="VerControl" component={VerControl} /> 

    </Stack.Navigator>
  );
}
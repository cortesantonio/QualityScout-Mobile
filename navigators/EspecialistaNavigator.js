import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import HomeEspecialista from '../screens/Especialista/HomeEspecialista';

import Informes from '../screens/Especialista/Informes/Informes';
import VerInforme from "../screens/Especialista/Informes/VerInforme"
import CrearInforme from '../screens/Especialista/Informes/CrearInforme';


import Usuarios from '../screens/Especialista/Usuarios/Usuarios';
import CrearUsuario from '../screens/Especialista/Usuarios/CrearUsuario';
import VerUsuario from '../screens/Especialista/Usuarios/VerUsuario';
import EditarUsuario from '../screens/Especialista/Usuarios/EditarUsuario';

import CrearProducto from '../screens/Shared/Productos/CrearProducto';
import EditarProducto from '../screens/Shared/Productos/EditarProducto';
import Productos from '../screens/Shared/Productos/Productos';
import VerProducto from '../screens/Shared/Productos/VerProducto';

import Buscador from '../screens/Shared/Buscador'

import Controles from '../screens/Shared/Controles';
import ListadoControles from '../screens/Shared/ListadoControles';
import CrearControl from '../screens/Shared/CrearControl';
import EditarControl from '../screens/Shared/EditarControl';
import VerControl from '../screens/Shared/VerControl';
import Reconocimiento from '../screens/Shared/Reconocimiento';

import Dashboard from '../screens/Shared/Dashboard';



const Stack = createNativeStackNavigator();

export default function EspecialistaNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,

      }}
    >
      <Stack.Screen name="Home" component={HomeEspecialista} />
      <Stack.Screen name="Informes" component={Informes} />
      <Stack.Screen name="VerInforme" component={VerInforme} />
      <Stack.Screen name="CrearInforme" component={CrearInforme} />
      
      <Stack.Screen name="Usuarios" component={Usuarios} />
      <Stack.Screen name="VerUsuario" component={VerUsuario} />
      <Stack.Screen name="CrearUsuario" component={CrearUsuario} />
      <Stack.Screen name="EditarUsuario" component={EditarUsuario} />
      
      <Stack.Screen name="Productos" component={Productos} />
      <Stack.Screen name="VerProducto" component={VerProducto} />
      <Stack.Screen name="CrearProducto" component={CrearProducto} />
      <Stack.Screen name="EditarProducto" component={EditarProducto} />

      <Stack.Screen name="Buscador" component={Buscador} />
      <Stack.Screen name="Controles" component={Controles} />

      <Stack.Screen name="ListadoControles" component={ListadoControles} />
      <Stack.Screen name="CrearControl" component={CrearControl} />
      <Stack.Screen name="EditarControl" component={EditarControl} />
      <Stack.Screen name="VerControl" component={VerControl} /> 
      <Stack.Screen name="Reconocimiento" component={Reconocimiento} />

      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  );
}
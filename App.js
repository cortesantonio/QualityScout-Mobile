import { Dimensions, StyleSheet, View, Image, ImageBackground, Button, Pressable, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { Nav, Footer } from './components/shared'
import React from 'react';
import HomeControlCalidad from './screens/ControlCalidad/HomeControlCalidad';
import Login from './screens/Auth/Login'
import Controles from './screens/Shared/Controles'
import ListadoControles from './screens/Shared/ListadoControles'
import HomeEspecialista from './screens/Especialista/HomeEspecialista';
import Buscador from './screens/Shared/Buscador'
import Productos from './screens/Shared/Productos/Productos';
import Usuarios from './screens/Especialista/Usuarios';
import Informes from './screens/Especialista/Informes';
import VerProducto from './screens/Shared/Productos/VerProducto';


export default function App() {
  return (

    <View style={styles.app}>
      <StatusBar style="light" barStyle="light-content" translucent={true} backgroundColor="transparent" />
      <VerProducto />
    </View>

  );
}

const styles = StyleSheet.create({
  app: {
    width: '100%',
    height: '100%',

  },

});
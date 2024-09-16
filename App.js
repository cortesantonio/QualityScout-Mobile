import { Dimensions, StyleSheet, View, Image, ImageBackground, Button, Pressable, SafeAreaView, ScrollView } from 'react-native';
import { Nav, Footer } from './components/shared'
import React from 'react';
import HomeControlCalidad from './screens/ControlCalidad/HomeControlCalidad';
import Login from './screens/Auth/Login'
import Controles from './screens/Shared/Controles'
import HomeEspecialista from './screens/Especialista/HomeEspecialista';
import Buscador from './screens/Shared/Buscador'
import Productos from './screens/Shared/Productos';

export default function App() {
  return (
    <SafeAreaView style={styles.app}>
      <Login/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  app: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('screen').height,
  },

});
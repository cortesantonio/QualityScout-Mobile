import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View, Image, ImageBackground, Button, Pressable, SafeAreaView } from 'react-native';
import Login from './screens/Login';
import { Nav, Footer } from './components/shared'
import React from 'react';
import { height, width } from '@fortawesome/free-solid-svg-icons/fa0';
import { icon } from '@fortawesome/fontawesome-svg-core';


// iconos propios 
const iconDashboard = require('./img/iconDashboard.png')
const iconUsuarios = require('./img/iconUsuarios.png')
const iconControles = require('./img/iconControles.png')
const iconProductos = require('./img/iconProductos.png')
const iconInformes = require('./img/iconInformes.png')
const iconBuscador = require('./img/iconBuscador.png')


const HomeAdmin = () => {
  return (
    <View style={styles.containerHomeAdmin}>

      {/* Accesos Rapidos */}

      <Text style={{ fontSize: 18, }}>Accesos Rapidos.</Text>
      <View style={styles.ContainerAccesosRapidos} >
        <Pressable style={styles.PressableCard}>
          <View style={styles.IconBackground}>
            <Image source={iconDashboard} style={{ width: 50, height: 50 }} resizeMode='contain' ></Image>
          </View>
          <Text>Dashboard</Text>
        </Pressable>

        <Pressable style={styles.PressableCard}>
          <View style={styles.IconBackground}>
            <Image source={iconUsuarios} style={{ width: 50, height: 50 }} resizeMode='contain' ></Image>
          </View>
          <Text>Usuarios</Text>
        </Pressable>
        <Pressable style={styles.PressableCard}>
          <View style={styles.IconBackground}>
            <Image source={iconControles} style={{ width: 50, height: 50 }} resizeMode='contain' ></Image>
          </View>
          <Text>Controles</Text>
        </Pressable>
        <Pressable style={styles.PressableCard}>
          <View style={styles.IconBackground}>
            <Image source={iconProductos} style={{ width: 50, height: 50 }} resizeMode='contain' ></Image>
          </View>
          <Text>Productos</Text>
        </Pressable>
        <Pressable style={styles.PressableCard}>
          <View style={styles.IconBackground}>
            <Image source={iconInformes} style={{ width: 50, height: 50 }} resizeMode='contain' ></Image>
          </View>
          <Text>Informes</Text>
        </Pressable>
        <Pressable style={styles.PressableCard}>
          <View style={styles.IconBackground}>
            <Image source={iconBuscador} style={{ width: 50, height: 50 }} resizeMode='contain' ></Image>
          </View>
          <Text>Buscador</Text>
        </Pressable>



      </View >

      {/* Indicadores de rendimientos */}
      <Text style={{ fontSize: 18, }}>Indicadores de rendimientos actuales.</Text>
      <View>

      </View>


    </View >
  );
};


export default function App() {
  return (

    <View style={styles.app}>
      <Nav />
      <HomeAdmin />
      <Footer />
    </View>

  );
};

const styles = StyleSheet.create({

  app: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  containerHomeAdmin: {
    padding: 25,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 20,

  },
  ContainerAccesosRapidos: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 6,
  },
  IconBackground:
  {
    backgroundColor: '#260202',
    borderRadius: 50,
    width: 75,
    height: 75,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  PressableCard: {
    display: 'flex',
    alignItems: 'center',
  }




});

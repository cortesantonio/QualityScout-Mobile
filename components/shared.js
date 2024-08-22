import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View, Image, ImageBackground, Button, Pressable, SafeAreaView } from 'react-native';
import React from 'react';
import { height, width } from '@fortawesome/free-solid-svg-icons/fa0';

const UserP = require('../img/UserExample.jpg');

 const Nav = () => {
    return (
        <View style={styles.Nav}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Image source={UserP} style={{ width: 50, height: 50, borderRadius: 50, marginRight: 10 }} ></Image>
                <View >
                    <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>Bienvenido!</Text>
                    <Text style={{ color: 'white', fontSize: 16 }}>Antonio Cortes</Text>
                </View>

            </View>

            <Pressable style={{ width: 35, height: 35, backgroundColor: 'white', borderRadius: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../img/settings.png')} style={{ width: 30, height: 30 }}></Image>
            </Pressable>

        </View>
    );
}


 const Footer = () => {
    return (
        <View style={styles.Footer}>
            <Pressable style={styles.PressableFooter}>
                <Image source={require('../img/home.png')} style={{ width: 30, height: 30 }}></Image>
                <Text style={{ color: 'white', fontSize: 10 }}>Inicio</Text>
            </Pressable>
            <Pressable style={styles.PressableFooter}>
                <Image source={UserP} style={{ width: 30, height: 30, borderRadius: 50 }} ></Image>
                <Text style={{ color: 'white', fontSize: 10 }}>Perfil </Text>

            </Pressable >
        </View >
    );


}

const styles = StyleSheet.create({
    Nav: {
      backgroundColor: '#260202',
      width: Dimensions.get('window').width,
      height: 120,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
  
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 25,
      paddingLeft: 25,
      paddingRight: 25,
  
    },
  
  
    Footer: {
  
      backgroundColor: '#260202',
      width: Dimensions.get('window').width,
      height: 100,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingLeft: 25,
      paddingRight: 25,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
  
      position: 'absolute',
      bottom: 0
    },
    PressableFooter: {
      height: 50,
      width: 40,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 20
  
    },
    
  
  });
  
  export {Nav, Footer};
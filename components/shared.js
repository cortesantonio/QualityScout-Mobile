import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View, Image, ImageBackground, Button, Pressable, SafeAreaView } from 'react-native';
import React from 'react';
import { height, width } from '@fortawesome/free-solid-svg-icons/fa0';
import { useNavigation } from '@react-navigation/native';  // Importa el hook de navegación

const UserP = require('../assets/images/UserExample.jpg');
// iconos propios 
const iconDashboard = require('../assets/icons/iconDashboard.png')
const iconUsuarios = require('../assets/icons/iconUsuarios.png')
const iconControles = require('../assets/icons/iconControles.png')
const iconProductos = require('../assets/icons/iconProductos.png')
const iconInformes = require('../assets/icons/iconInformes.png')
const iconBuscador = require('../assets/icons/iconBuscador.png')







const Nav = ({}) => {
    return (
        <View style={styles.Nav}>
            <View style={styles.containerNav}>



                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={UserP} style={{ width: 50, height: 50, borderRadius: 50, marginRight: 10 }} ></Image>
                    <View >
                        <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>Bienvenido!</Text>
                        <Text style={{ color: 'white', fontSize: 16 }}>Antonio Cortes</Text>
                    </View>

                </View>

                <Pressable style={{ width: 35, height: 35, backgroundColor: 'white', borderRadius: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../assets/icons/settings.png')} style={{ width: 25, height: 25 }}></Image>
                </Pressable>


            </View>
        </View >
    );
}


const Footer = () => {
    const navigation = useNavigation();  // Usa el hook para obtener el objeto de navegación

    return (
        <View style={styles.Footer}>
            <Pressable style={styles.PressableFooter} onPress={() => navigation.navigate('Buscador')} > 
                <Image source={iconBuscador} style={styles.iconPressable}></Image>
                <Text style={{ color: 'white', fontSize: 8 }}>Buscador</Text>
            </Pressable>
            <Pressable style={styles.PressableFooter} onPress={() => navigation.navigate('Informes')}>
                <Image source={iconInformes} style={styles.iconPressable}></Image>
                <Text style={{ color: 'white', fontSize: 8 }}>Informes</Text>
            </Pressable>
            <Pressable style={styles.PressableFooter} onPress={() => navigation.navigate('Productos')}>
                <Image source={iconProductos} style={styles.iconPressable}></Image>
                <Text style={{ color: 'white', fontSize: 8 }}>Productos</Text>
            </Pressable>
            <Pressable style={styles.PressableFooter} onPress={() => navigation.navigate('Controles')}>
                <Image source={iconControles} style={styles.iconPressable}></Image>
                <Text style={{ color: 'white', fontSize: 8 }}>Controles</Text>
            </Pressable>
            <Pressable style={styles.PressableFooter} onPress={() => navigation.navigate('Usuarios')}>
                <Image source={iconUsuarios} style={styles.iconPressable}></Image>
                <Text style={{ color: 'white', fontSize: 8 }}>Usuarios</Text>
            </Pressable>

            <Pressable style={styles.PressableFooter} onPress={() => navigation.navigate('Home')}>
                <Image source={require('../assets/icons/home.png')} style={styles.iconPressable}></Image>
                <Text style={{ color: 'white', fontSize: 8 }}>Inicio</Text>
            </Pressable>
            <Pressable style={styles.PressableFooter} onPress={() => navigation.navigate('Perfil')}>
                <Image source={UserP} style={[styles.iconPressable, { borderRadius: 50 }]} resizeMode='cover' ></Image>
                <Text style={{ color: 'white', fontSize: 8 }}>Perfil</Text>
            </Pressable>
        </View>
    );
}
const styles = StyleSheet.create({
    Nav: {
        backgroundColor: 'transparent'

       
    },
    containerNav: {
        backgroundColor: '#270403',
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

        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        elevation: 1,

        backgroundColor: '#260202',
        width: Dimensions.get('window').width,
        height: 100,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 25,
        paddingRight: 25,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        gap: 5,
    },
    PressableFooter: {
        height: 50,
        width: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
    iconPressable: {
        width: 30,
        height: 30,
        resizeMode: 'contain'
    }


});

export { Nav, Footer };
import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View, Image, ImageBackground, Button, Pressable, SafeAreaView } from 'react-native';
import { height, width } from '@fortawesome/free-solid-svg-icons/fa0';
import { useNavigation } from '@react-navigation/native';  // Importa el hook de navegación
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserP = require('../assets/icons/iconUsuario.png')
// iconos propios 
const iconDashboard = require('../assets/icons/iconDashboard.png')
const iconUsuarios = require('../assets/icons/iconUsuarios.png')
const iconControles = require('../assets/icons/iconControles.png')
const iconProductos = require('../assets/icons/iconProductos.png')
const iconInformes = require('../assets/icons/iconInformes.png')
const iconBuscador = require('../assets/icons/iconBuscador.png')






import React, { useEffect, useState } from 'react';

const Nav = ({ navigate }) => {
    const navigation = useNavigation();  // Usa el hook para obtener el objeto de navegación

    const [userLog, setUserLog] = useState(null); // Estado para almacenar los datos del usuario

    useEffect(() => {
        const fetchUserData = async () => {
            const userLogJSON = await AsyncStorage.getItem('userJson');
            if (userLogJSON) {
                try {
                    const userLogData = JSON.parse(userLogJSON); // Convertir de nuevo a objeto
                    setUserLog(userLogData); // Actualiza el estado con los datos del usuario
                } catch (error) {
                    console.error("Error al parsear el JSON:", error);
                }
            }
        };

        fetchUserData(); // Llama a la función para recuperar los datos
    }, []); // El efecto se ejecutará solo una vez al montar el componente


    // Función para cerrar sesión
    const handleLogout = async () => {
        try {
            // Eliminar el token y los datos del usuario de AsyncStorage
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('userJson');

            // Navegar a la pantalla de inicio de sesión o cualquier otra pantalla
            navigation.navigate('Login')
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            Alert.alert("Error", "No se pudo cerrar sesión. Inténtalo de nuevo.");
        }
    };



    return (
        <View style={styles.Nav}>
            <View style={styles.containerNav}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={UserP} style={{ width: 40, height: 40, borderRadius: 50, marginRight: 10 , resizeMode:"contain"}} />
                    <View>
                        <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>Bienvenido!</Text>
                        {/* Usa el nombre del usuario recuperado */}
                        <Text style={{ color: 'white', fontSize: 16 }}>{userLog ? userLog.Nombre : 'Cargando...'}</Text>
                    </View>
                </View>

                <Pressable style={{ width: 35, height: 35, backgroundColor: 'white', borderRadius: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }} onPress={handleLogout}>
                    <Image source={require('../assets/icons/iconLogout.png')} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                </Pressable>
            </View>
        </View>
    );
};

export default Nav;
const Footer = () => {
    const navigation = useNavigation();  // Usa el hook para obtener el objeto de navegación
    const [UserSession, setUserSession] = useState(null); // Estado para almacenar los datos del usuario
    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchUserData = async () => {
            const sessionUser = await AsyncStorage.getItem('userJson');
            if (sessionUser) {
                try {
                    const userLogData = JSON.parse(sessionUser);
                    setUser(userLogData);
                    setUserSession(userLogData.Rol); // Actualiza el estado con los datos del usuario
                } catch (error) {
                    console.error("Error al parsear el JSON:", error);
                }
            }
        };

        fetchUserData(); // Llama a la función para recuperar los datos
    }, []); // El efecto se ejecutará solo una vez al montar el componente    

    return (
        <View style={styles.Footer}>
            <Pressable style={styles.PressableFooter} onPress={() => navigation.navigate('Buscador')} >
                <Image source={iconBuscador} style={styles.iconPressable}></Image>
                <Text style={{ color: 'white', fontSize: 8 }}>Buscador</Text>
            </Pressable>
            {UserSession === "Especialista" && (
                <Pressable style={styles.PressableFooter} onPress={() => navigation.navigate('Informes')}>
                    <Image source={iconInformes} style={styles.iconPressable}></Image>
                    <Text style={{ color: 'white', fontSize: 8 }}>Informes</Text>
                </Pressable>

            )}

            <Pressable style={styles.PressableFooter} onPress={() => navigation.navigate('Productos')}>
                <Image source={iconProductos} style={styles.iconPressable}></Image>
                <Text style={{ color: 'white', fontSize: 8 }}>Productos</Text>
            </Pressable>
            <Pressable style={styles.PressableFooter} onPress={() => navigation.navigate('Controles')}>
                <Image source={iconControles} style={styles.iconPressable}></Image>
                <Text style={{ color: 'white', fontSize: 8 }}>Controles</Text>
            </Pressable>
            {UserSession === "Especialista" && (

                <Pressable style={styles.PressableFooter} onPress={() => navigation.navigate('Usuarios')}>
                    <Image source={iconUsuarios} style={styles.iconPressable}></Image>
                    <Text style={{ color: 'white', fontSize: 8 }}>Usuarios</Text>
                </Pressable>
            )}

            <Pressable style={styles.PressableFooter} onPress={() => navigation.navigate('Home')}>
                <Image source={require('../assets/icons/home.png')} style={styles.iconPressable}></Image>
                <Text style={{ color: 'white', fontSize: 8 }}>Inicio</Text>
            </Pressable>
            <Pressable style={styles.PressableFooter} onPress={() => navigation.navigate('VerUsuario', { RUT: user.Rut, Nombre: user.Nombre, Rol: user.Rol, Correo: user.Email })} >
                <Image source={UserP} style={[styles.iconPressable, { resizeMode:'contain'}]}  ></Image>
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
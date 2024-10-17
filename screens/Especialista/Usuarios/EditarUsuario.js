import { text } from '@fortawesome/fontawesome-svg-core';
import { height, width } from '@fortawesome/free-solid-svg-icons/fa0';
import React, { useState } from 'react';
import {
    View, Text, TouchableOpacity, Image, TextInput, FlatList, Modal, StyleSheet, Dimensions
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { URL_API_BACKEND } from '../../../config';
import { Nav, Footer } from '../../../components/shared';
import AsyncStorage from '@react-native-async-storage/async-storage';

// iconos propios
const iconUsuario = require('../../../assets/icons/iconUsuario.png')
const iconContrasena = require('../../../assets/icons/iconContrasena.png')
const EditarUsuario = ({ navigation }) => {
    const route = useRoute();
    const { RUT, Nombre, Rol, Correo } = route.params;

    const [password, setPassword] = useState('');



    const EnviarCambios = async () => {
        const token = await AsyncStorage.getItem('userToken');
        if (token == null) {
            alert('No se encontro token, no se pudo crear el usuario.')
            return;
        }
        if (password === '' || RUT === '') {
            alert('Campos incompletos', 'Por favor complete todos los campos');
            return;
        }

        try {
            const response = await fetch(`${URL_API_BACKEND}/api/AuthApi/UpdatePassword/${RUT}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`

                },
                body: JSON.stringify(password), // Enviar como JSON
            });

            if (response.ok) {
                alert('La contraseña ha sido actualizada correctamente.');
                setPassword('');
                navigation.navigate('Usuarios');

            } else {
                const errorData = await response.json();
                alert('Error al actualizar contraseña', errorData.message);
            }
        } catch (error) {
            console.error('Error al actualizar la contraseña:', error);
            alert('Ocurrió un error al intentar actualizar la contraseña.');
        }
    };


    return (
        <>
            <Nav />
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.InfoHeader}>
                        <Text style={{ fontSize: 14, color: 'gray', textTrasform: 'uppercase' }}>{Rol}</Text>
                        <Text style={{ fontSize: 28, width: 100, textAlign: 'center', fontWeight: 'bold', textTrasform: 'capitalize' }}>
                            {Nombre}
                        </Text>
                        <Text style={{ fontSize: 14, color: 'gray' }}>{RUT}</Text>

                    </View>
                    <View style={{ backgroundColor: '#4b0404', width: 130, height: 130, borderRadius: 65, alignItems: 'center', justifyContent: 'center' }}>

                        <Image source={iconUsuario} style={{ width: 80, height: 80, resizeMode: 'contain' }} />

                    </View>
                </View>
                <View>
                    <Text style={{ fontSize: 18, color: '#4b0404', marginBottom: 15 }}>
                        Editar Informacion Personal
                    </Text>

                    <Text style={styles.label}>RUT</Text>
                    <Text style={styles.dataInfo}>{RUT}</Text>
                    <Text style={styles.label}>Nombre</Text>
                    <Text style={styles.dataInfo}>{Nombre}</Text>

                    <Text style={styles.label}>Contrasena</Text>

                    <TextInput
                        secureTextEntry={true}
                        style={[styles.dataInfo, { height: 30, backgroundColor: '#dbd7d7', marginLeft: 0, paddingLeft: 10, borderRadius: 5, marginBottom: 0 }]}
                        placeholder='**********'
                        onChangeText={text => setPassword(text)}
                    >
                    </TextInput>


                    <Text style={styles.comentario}>
                        Para editar otros campos, acceda desde la plataforma web con los permisos correspondientes.
                    </Text>

                    <View style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'row' }}>

                        <TouchableOpacity style={styles.buttonEditarContrasena} onPress={EnviarCambios}>
                            <Text style={{ textAlign: 'center', color: 'white' }}>Guardar Cambios</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.buttonEditarContrasena, { backgroundColor: 'white' }]}>
                            <Text style={{ color: 'black', textAlign: 'center', }}>Cancelar Cambios</Text>
                        </TouchableOpacity>
                    </View>


                </View>

            </View >
            <Footer />
        </>

    )


};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 25,
        alignContent: 'center',
        justifyContent: 'center'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        marginBottom: 20
    },
    InfoHeader: {
        alignItems: 'center', justifyContent: 'center'
    },
    label: {
        fontSize: 14,
        marginBottom: 5
    }, dataInfo: {
        fontSize: 12,
        color: 'black',
        marginBottom: 10,
        marginLeft: 10,
        color: 'gray'

    }, buttonEditarContrasena: {
        marginTop: 20,
        backgroundColor: '#bf6565',
        height: 30,
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        padding: 5,
        borderRadius: 3,
    }, comentario: {
        fontSize: 10,
        color: 'gray',
        marginTop: 10
        , textAlign: 'justify'
    }

});

export default EditarUsuario;
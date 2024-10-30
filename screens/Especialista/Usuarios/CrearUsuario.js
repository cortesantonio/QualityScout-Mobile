import {
    TouchableOpacity, StyleSheet, View, Text, Image, ScrollView,
    TextInput, Switch, Platform, Button, Alert
} from 'react-native';

import { useState } from 'react';
import { Footer, Nav } from '../../../components/shared';
import DropDownPicker from 'react-native-dropdown-picker';
import { URL_API_BACKEND } from '../../../config';
import { React } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const iconAdd = require('../../../assets/icons/iconAdd.png')

const CrearUsuario = ({ navigation }) => {


    const [items, setItems] = useState([]);

    const obtenerRoles = () => {
        fetch(`${URL_API_BACKEND}/api/Rols`)
            .then(response => response.json())
            .then(data => {
                setItems(data.map(rol => ({ label: rol.nombre, value: rol.idRol })));
            })
            .catch(error => console.error('Error al obtener los roles:', error));
    };
    if (items.length == 0) {
        obtenerRoles();
    }




    const handleChange = (field, value) => {
        setUsuario({ ...Usuario, [field]: value });
    };
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);


    const [Usuario, setUsuario] = useState({
        idUsuario: '',
        Nombre: '',
        Rut: '',
        Email: '',
        Password: '',
        RolId: null,
    });



    const EnviarUsuario = async () => {
        const token = await AsyncStorage.getItem('userToken');
        const UserToSend = { ...Usuario, RolId: value };
        if (UserToSend.Rut == '' || UserToSend.Nombre == '' || UserToSend.Email == '' || UserToSend.Password == '' || UserToSend.RolId == null) {
            Alert.alert('Campos incompletos', 'Por favor complete todos los campos')
        } if (token == null){
            alert('No se encontro token, no se pudo crear el usuario.')
            return;
        }
        try {
            const response = await fetch(`${URL_API_BACKEND}/api/authapi/CreateUsuario`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`

                },
                body: JSON.stringify({
                    Nombre: UserToSend.Nombre,
                    Rut: UserToSend.Rut,
                    Email: UserToSend.Email,
                    Password: UserToSend.Password,
                    RolId: UserToSend.RolId,
                }),
            });
            if (response.ok) {
                Alert.alert('Usuario Creado', 'Usuario creado correctamente.');
                navigation.navigate('Usuarios');

            } else {
                const errorData = await response.json();
                Alert.alert('Error al crear usuario', errorData.message);
            }
        }
        catch (error) {
            console.error('Error during login:', error);
            Alert.alert('Login Error', 'An error occurred during login.');
        }

    }




    return (
        <>
            <Nav />

            <View style={styles.container}>
                <Text style={styles.titulo}>
                    Gestión De Usuario
                </Text>

                <View style={styles.containerForm}>

                    <Text style={styles.tituloForm}>
                        Añadir Usuario
                    </Text>

                    <View style={styles.form}>
                        <Text style={styles.label}>RUT</Text>
                        <TextInput style={styles.input}
                            value={Usuario.Rut}
                            onChangeText={(value) => handleChange('Rut', value)} />


                        <Text style={styles.label}>Nombre Completo</Text>
                        <TextInput style={styles.input}
                            value={Usuario.Nombre}
                            onChangeText={(value) => handleChange('Nombre', value)}
                        />


                        <Text style={styles.label}>Email</Text>
                        <TextInput style={styles.input}
                            value={Usuario.Email}
                            onChangeText={(value) => handleChange('Email', value)}
                        />


                        <Text style={styles.label}>Rol</Text>
                        <DropDownPicker
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            placeholder={'Selecciona el rol.'}
                            style={styles.input}

                        />

                        <Text style={styles.label}>Contraseña</Text>
                        <TextInput style={styles.input} secureTextEntry={true}

                            value={Usuario.Password}
                            onChangeText={(value) => handleChange('Password', value)}
                        />
                        <Text style={{ color: 'gray', fontSize: 10 }}>CONTRASEÑA TEMPORAL*</Text>




                        <TouchableOpacity style={styles.TouchableBoton} onPress={EnviarUsuario}>
                            <Image source={iconAdd} style={styles.iconsBotones} />
                            <Text style={styles.botonText}>Añadir Usuarios</Text>
                        </TouchableOpacity>
                    </View>




                </View>

            </View>

            <Footer />
        </>

    );

}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        padding: 25
    },
    titulo: {
        fontSize: 16,
        color: 'gray'

    },
    containerForm: {
        width: '100%',
        height: '100%',
        marginTop: 25
    },
    tituloForm: {
        fontSize: 18,
        color: '#4b0404',
        marginBottom: 15
    },
    input: {
        height: 30,
        backgroundColor: '#dbd7d7',
        marginLeft: 0,
        paddingLeft: 10,
        borderRadius: 4,
        marginBottom: 12,
        height: 40
    }, label: {
        fontSize: 15
    }, iconsBotones: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    TouchableBoton: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#bf6565',
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,

        marginTop: 15,
        width: 150

    },
    botonText: {
        color: 'white', fontSize: 14
    },
})

export default CrearUsuario;
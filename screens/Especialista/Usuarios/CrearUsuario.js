import {
    TouchableOpacity, StyleSheet, View, Text, Image, ScrollView,
    TextInput, Switch, Platform, Button, Alert
} from 'react-native';

import { useState } from 'react';
import { Footer, Nav } from '../../../components/shared';
import DropDownPicker from 'react-native-dropdown-picker';
import { width } from '@fortawesome/free-solid-svg-icons/fa0';

const iconAdd = require('../../../assets/icons/iconAdd.png')

const CrearUsuario = () => {

    const [Usuario, setUsuario] = useState({
        idUsuario: '',
        Nombre: '',
        Rut: '',
        Email: '',
        Contraseña: '',
        RolId: 0,
    });


    const handleChange = (field, value) => {
        setUsuario({ ...Usuario, [field]: value });
    };

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Control de Calidad', value: 1 },
        { label: 'Especialista', value: 0 },
    ]);
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
                        <TextInput style={styles.input} />
                        <Text style={styles.label}>Nombre Completo</Text>
                        <TextInput style={styles.input} />
                        <Text style={styles.label}>Email</Text>
                        <TextInput style={styles.input} />
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
                        <TextInput style={styles.input} secureTextEntry={true} />
                        <Text style={{ color: 'gray', fontSize: 10 }}>CONTRASEÑA TEMPORAL*</Text>

                        <TouchableOpacity style={styles.TouchableBoton} onPress={() => navigation.navigate('CrearUsuario')}>
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

        marginTop:15,
        width:150

    },
    botonText: {
        color: 'white', fontSize: 14
    },
})

export default CrearUsuario;
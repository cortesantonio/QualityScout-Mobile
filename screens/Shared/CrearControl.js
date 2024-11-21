import {
    TouchableOpacity, StyleSheet, View, Text, Image, ScrollView,
    TextInput, Switch, Platform, Button, Alert
} from 'react-native';
import { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RadioButton } from 'react-native-paper';
import { URL_API_BACKEND } from '../../config';



const CrearControl = ({ navigation }) => {
    const route = useRoute();
    const { productoRecibido } = route.params;

    const iconRA = require('../../assets/icons/iconRA.png')

    let vinoImagen = ''
    if (!productoRecibido.urlImagen) {
        vinoImagen = require('../../assets/images/VinoEjemplo.jpg')
    } else {
        vinoImagen = { uri: productoRecibido.urlImagen }
    }

    const [value, setValue] = React.useState('Rechazado'); // Estado inicial predeterminado
    const [value2, setValue2] = React.useState('Reproceso');

    const [user, setUser] = useState({});
    const [control, setControl] = useState({
        idProductos: productoRecibido.id,
        linea: '',
        paisDestino: productoRecibido.paisDestino,
        comentario: '',
        tipodecontrol: '',  // Se puede asignar el valor adecuado basado en la selección
        estado: '',
        idUsuario: 1,  // Inicialmente null hasta que se cargue el usuario
    });

    const obtenerUsuario = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const userJson = await AsyncStorage.getItem('userJson');
            if (token == null) {
                alert('Token de autorización no encontrado.');
                return;
            }
            const user = JSON.parse(userJson);
            setUser(user);
        } catch (error) {
            console.error('Error al obtener el usuario', error);
        }
    };

    useEffect(() => {
        obtenerUsuario();
    }, []); // Se ejecuta solo una vez al montar el componente

    const enviarControl = async () => {

        if (control.linea == '' || control.comentario == '' || control.tipodecontrol == '' || control.estado == '') {
            alert('Por favor, complete todos los campos.');
            return;
        }

        const controlToSend = { ...control, idUsuario: user.Id };  // Aseguramos que idUsuario se asigna correctamente
        const token = await AsyncStorage.getItem('userToken');
        if (token == null) {
            alert('No se encontro token, no se pudo crear el producto.');
            return;
        }
        try {
            const response = await fetch(`${URL_API_BACKEND}/api/ApiControles/CrearControl`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    idProducto: controlToSend.idProductos,
                    Linea: controlToSend.linea,
                    PaisDestino: controlToSend.paisDestino,
                    Comentario: controlToSend.comentario,
                    TipoDeControl: controlToSend.tipodecontrol,
                    Estado: controlToSend.estado,
                    idUsuario: controlToSend.idUsuario
                }
                ),
            });
            if (response.ok) {
                alert('Control creado correctamente.');
                navigation.navigate('Controles');
            } else {
                alert('Hubo un problema al crear el control.');
            }
        } catch (error) {
            console.error('Error al crear el control:', error);
            alert('Error', 'Ocurrió un error al intentar crear el control.');
        }




    };




    return (
        <View style={styles.container}>
            <ScrollView style={styles.scroll}>
                <Image source={vinoImagen} style={styles.image} />
                <View style={styles.containerInfo}>
                    <View style={{ marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ width: '90%' }}>
                            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                                {productoRecibido.nombre}
                            </Text>
                            <Text style={{ fontSize: 12, fontWeight: 'light' }}>
                                CODIGO: {productoRecibido.codigoBarra}
                            </Text>
                        </View>
                    </View>

                    {/* Línea Controlada */}
                    <View style={styles.TextAndPickerForm}>
                        <Text style={{ fontSize: 18 }}>Linea Controlada</Text>
                        <TextInput
                            style={styles.input}
                            value={control.linea}
                            onChangeText={(value) => setControl({ ...control, linea: value })}
                        />
                    </View>

                    {/* Tipo de Control */}
                    <View style={styles.TextAndPickerForm}>
                        <Text style={{ fontSize: 18 }}>Tipo de Control</Text>
                        <RadioButton.Group
                            onValueChange={value2 => {
                                setValue2(value2);
                                setControl(prevControl => ({ ...prevControl, tipodecontrol: value2 }));
                            }}
                            value={value2}
                        >
                            <RadioButton.Item label="Reproceso" value="Reproceso" />
                            <RadioButton.Item label="Preventivo" value="Preventivo" />
                        </RadioButton.Group>
                    </View>

                    {/* Estado de Control */}
                    <View style={styles.TextAndPickerForm}>
                        <Text style={{ fontSize: 18 }}>Estado de Control</Text>
                        <RadioButton.Group
                            onValueChange={value => {
                                setValue(value);
                                setControl(prevControl => ({ ...prevControl, estado: value }));
                            }}
                            value={value}
                        >
                            <RadioButton.Item label="Rechazado" value="Rechazado" />
                            <RadioButton.Item label="Reproceso" value="Reproceso" />
                            <RadioButton.Item label="Aprobado" value="Aprobado" />
                        </RadioButton.Group>
                    </View>

                    {/* Comentario sobre control */}
                    <View style={styles.TextAndPickerForm}>
                        <Text style={{ fontSize: 18 }}>Comentario sobre control:</Text>
                        <TextInput
                            style={styles.inputComentario}
                            multiline={true}
                            value={control.comentario}
                            onChangeText={(value) => setControl({ ...control, comentario: value })}
                        />
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => { navigation.navigate('Reconocimiento') }} >
                            <Image source={iconRA} style={styles.iconRA} />
                            <Text style={{ marginTop: 10 }}>Completar con inteligencia artificial.</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {/* Botón para retroceder */}
            <TouchableOpacity style={styles.ButtonCirculoAtras} onPress={() => navigation.goBack()}>
                <View style={styles.CirculoAtras}>
                    <View style={{ flexDirection: 'row', marginTop: 25 }}>
                        <Text style={{ color: 'white', fontSize: 34 }}>Atrás</Text>
                    </View>
                    <Text style={{ color: 'white', fontSize: 22 }}>Ver Producto</Text>
                </View>
            </TouchableOpacity>

            {/* Botón para agregar control */}
            <View style={styles.botonRealizarControl}>
                <TouchableOpacity style={[styles.BotonesFinales, { backgroundColor: '#260202' }]} onPress={enviarControl}>
                    <Text style={{ color: 'white', fontSize: 18 }}>Agregar control</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    image: {
        height: 400,
        width: '100%',
        resizeMode: 'cover',
    },

    ButtonCirculoAtras: {
        position: 'absolute',
        top: -50,
        left: -50,
        zIndex: 1
    },

    CirculoAtras: {
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: '#270403',
        display: 'flex',

        justifyContent: 'center',
        alignItems: 'center',

    },
    scroll: {
        width: '100%',
        height: '100%',
    },

    containerInfo: {
        padding: 25,
        paddingBottom: 100,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -30,
        gap: 10
    },
    botonRealizarControl: {
        position: 'absolute',
        bottom: 20,
        left: '10%',

        width: '80%',
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5

    }, BotonesFinales: {

        backgroundColor: '#270403',
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },

    botonBuscadorFlotante: {
        position: 'absolute',
        top: 30,
        right: 20,
        width: 50,
        height: 50,
        backgroundColor: '#270403',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50
    },
    input: {
        borderColor: 'gray',
        padding: 4,
        fontSize: 18,
        backgroundColor: '#dbd7d7',
        borderRadius: 3

    }, inputComentario: {
        minHeight: 100,
        padding: 4,
        fontSize: 14,
        backgroundColor: '#dbd7d7',
        borderRadius: 3
    },
    TextAndInputForm: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
    },
    dropdown: {
        width: 50,
    },
    picker: {
        width: 'auto',
    },
    itemInPicker: {
        fontSize: 14,
        height: 'auto',
    }, botonFechas: {
        backgroundColor: '#dbd7d7',
        padding: 5,
        borderRadius: 3,
    }, iconRA: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        marginTop: 10
    }


})

export default CrearControl;
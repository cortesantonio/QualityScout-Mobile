import {
    TouchableOpacity, StyleSheet, View, Text, Image, ScrollView,
    TextInput, Switch, Platform, Button, Alert
} from 'react-native';
import { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import * as React from 'react';
import { RadioButton } from 'react-native-paper';
import { URL_API_BACKEND } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';



const EditarControl = ({ navigation }) => {
   

    const route = useRoute();
    const { ControlJson } = route.params;

    const [control, setControl] = useState({
        id: ControlJson.id,
        comentario: ControlJson.comentario,
        estadoFinal: '',
    });

    const iconRA = require('../../assets/icons/iconRA.png')

    function formatearFecha(fechaISO) {
        // Convertir la cadena ISO 8601 a un objeto Date
        const fecha = new Date(fechaISO);

        // Formatear la fecha como "dd/MM/yyyy HH:mm:ss"
        const dia = fecha.getDate().toString().padStart(2, '0'); // Día
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Mes (getMonth() devuelve 0 para enero)
        const anio = fecha.getFullYear(); // Año

        const horas = fecha.getHours().toString().padStart(2, '0'); // Horas
        const minutos = fecha.getMinutes().toString().padStart(2, '0'); // Minutos
        const segundos = fecha.getSeconds().toString().padStart(2, '0'); // Segundos

        // Devolver la fecha formateada
        return `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`;
    }


    let VinoEjemplo
    if (ControlJson.productos.urlImagen == '' || ControlJson.productos.urlImagen == null || ControlJson.productos.urlImagen == undefined) {

        VinoEjemplo = require('../../assets/images/VinoEjemplo.jpg')

    } else {
        VinoEjemplo = { uri: ControlJson.productos.urlImagen }
    }

    const ActualizarControl = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            if (!token) {
                alert('Token de autorización no encontrado.');
                return;
            }
    
            const response = await fetch(`${URL_API_BACKEND}/api/ApiControles/EditarControl`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: control.id,
                    comentario: control.comentario,
                    estadoFinal: control.estadoFinal,
                })
            });
    
            if (!response.ok) {
                const errorData = await response.json(); // Obtener el mensaje de error del servidor
                throw new Error(errorData.message || 'Error en la solicitud');
            }
    
            // Si la respuesta es exitosa, puedes manejar la lógica aquí
            alert('Control actualizado con éxito.');
            navigation.navigate('Controles');
            
        } catch (error) {
            console.error('Error al actualizar los datos:', error);
            alert('Ocurrió un error al actualizar los datos: ' + error.message);
        }
    };

    return (

        <View style={styles.container}>


            <ScrollView style={styles.scroll}>
                <Image source={VinoEjemplo} style={styles.image} />



                <View style={styles.containerInfo} >
                    <View style={{ marginBottom: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' }}>
                        <View style={{ width: '90%' }}>
                            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                                REPROCESO CONTROL N.{ControlJson.id}
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: 'light' }}>
                                {ControlJson.productos.nombre} - CODIGO: {ControlJson.codigoBarra}
                            </Text>
                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'gray', textTransform: 'uppercase', marginTop: 10 }}>
                                Encargado de control: {ControlJson.usuarios.nombre}
                            </Text>
                        </View>

                    </View>

                    <View style={styles.TextAndPickerForm}>
                        <Text style={{ fontSize: 18 }}>Fecha primer control</Text>
                        <Text style={{ fontSize: 16, paddingLeft: 10 }}>{formatearFecha(ControlJson.fechaHoraPrimerControl)}</Text>
                    </View>

                    <View style={styles.TextAndPickerForm}>
                        <Text style={{ fontSize: 18 }}>Linea Controlada</Text>
                        <Text style={{ fontSize: 16, paddingLeft: 10 }}>{ControlJson.linea}</Text>

                    </View>

                    <View style={styles.TextAndPickerForm}>
                        <Text style={{ fontSize: 18 }}>Estado de control Inicial</Text>
                        <View>
                            <Text style={{ fontSize: 16, paddingLeft: 10 }}>{ControlJson.estado}</Text>


                        </View>
                    </View>

                    <View style={styles.TextAndPickerForm}>
                        <Text style={{ fontSize: 18 }}>Estado de Control final</Text>
                        <View>
                        <RadioButton.Group
                                onValueChange={value => {
                                    setControl(prevControl => ({ ...prevControl, estadoFinal: value }));
                                }}
                                value={control.estadoFinal} // Usa el estadoFinal del objeto control
                            >
                                <RadioButton.Item label="Rechazado" value="Rechazado" />
                                <RadioButton.Item label="Aprobado" value="Aprobado" />
                            </RadioButton.Group>

                        </View>
                    </View>






                    <View style={styles.TextAndPickerForm}>
                        <Text style={{ fontSize: 18 }}>Comentario sobre control:</Text>
                        <TextInput
                            style={styles.inputComentario}
                            keyboardType="text"
                            multiline={true}
                            value={control.comentario}
                            onChangeText={(value) => setControl({ ...control, comentario: value })}


                        />
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={iconRA} style={styles.iconRA} />
                            <Text style={{ marginTop: 10 }}>Completar con inteligencia artificial.</Text>
                        </TouchableOpacity>
                    </View>




                </View>

            </ScrollView>

            <TouchableOpacity style={styles.ButtonCirculoAtras} onPress={() => navigation.goBack()}>
                <View style={styles.CirculoAtras}>
                    <View style={{ flexDirection: 'row', marginTop: 25 }}>
                        <Text style={{ color: 'white', fontSize: 34 }}>Atrás</Text>
                    </View>
                    <Text style={{ color: 'white', fontSize: 22 }}>Ver Control</Text>
                </View>
            </TouchableOpacity>

            <View style={styles.botonRealizarControl} >

                <TouchableOpacity style={[styles.BotonesFinales, { backgroundColor: '#260202' }]} onPress={ActualizarControl}>
                    <Text style={{ color: 'white', fontSize: 18 }}>
                        Actualizar control
                    </Text>

                </TouchableOpacity>

            </View>


        </View>


    )
}

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

export default EditarControl;
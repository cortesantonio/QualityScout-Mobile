import {
    TouchableOpacity, StyleSheet, View, Text, Image, ScrollView,
    TextInput, Switch, Platform, Button, Alert
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import * as React from 'react';

import { RadioButton } from 'react-native-paper';

const VerControl = ({ navigation }) => {
    const [producto, setProducto] = useState({
        id: 1,
        idProductos: 1,
        linea: 'Tinto',
        paisDestino: 'España',
        comentario: 'Comentario de ejemplo',
        tipodecontrol: 'Control de calidad',
        fechaHoraPrimerControl: '90-10-2024 13:01:21',
        fechaHoraControlFinal: '10-10-2024 18:11:31',
        estado: 'Reproceso',
        estadoFinal: 'Aprobado',
        idUsuarios: 1,
        nombre_usuario: 'Antonio',

    });

    const iconRA = require('../../assets/icons/iconRA.png')

    const VinoEjemplo = require('../../assets/images/VinoEjemplo.jpg')

    const route = useRoute();
    const { idProducto, codigo, nombre_vino, PrimerEstado } = route.params;




    const [value, setValue] = React.useState('first');
    const [value2, setValue2] = React.useState('first');

    return (

        <View style={styles.container}>


            <ScrollView style={styles.scroll}>
                <Image source={VinoEjemplo} style={styles.image} />



                <View style={styles.containerInfo} >
                    <View style={{ marginBottom: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' }}>
                        <View style={{ width: '90%' }}>
                            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                                INFORMACION CONTROL N.{producto.id}
                            </Text>
                            <Text style={{ fontSize: 15, fontWeight: 'light' }}>
                                {nombre_vino} - CODIGO: {codigo}
                            </Text>
                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'gray', textTransform: 'uppercase', marginTop: 10 }}>
                                Encargado de control: {producto.nombre_usuario}
                            </Text>
                        </View>

                    </View>


                    <View style={styles.TextAndPickerForm}>
                        <Text style={{ fontSize: 18 }}>Numero de control</Text>
                        <Text style={{ fontSize: 16, paddingLeft: 10, color: 'gray' }}>{producto.id}</Text>
                    </View>

                    <View style={styles.TextAndPickerForm}>
                        <Text style={{ fontSize: 18 }}>Linea Controlada</Text>
                        <Text style={{ fontSize: 16, paddingLeft: 10, color: 'gray' }}>{producto.linea}</Text>
                    </View>

                    <View style={styles.TextAndPickerForm}>
                        <Text style={{ fontSize: 18 }}>Tipo de control</Text>
                        <Text style={{ fontSize: 16, paddingLeft: 10, color: 'gray' }}>{producto.tipodecontrol}</Text>
                    </View>

                    <View style={styles.TextAndPickerForm}>
                        <Text style={{ fontSize: 18 }}>Fecha control inicial</Text>
                        <Text style={{ fontSize: 16, paddingLeft: 10, color: 'gray' }}>{producto.fechaHoraPrimerControl}</Text>
                    </View>

                    <View style={styles.TextAndPickerForm}>
                        <Text style={{ fontSize: 18 }}>Estado control inicial</Text>
                        <Text style={{ fontSize: 16, paddingLeft: 10, color: 'gray' }}>{producto.estado}</Text>
                    </View>


                    {producto.estadoFinal != null ?
                        <View>
                            <View style={styles.TextAndPickerForm}>
                                <Text style={{ fontSize: 18 }}>Fecha control final</Text>
                                <Text style={{ fontSize: 16, paddingLeft: 10, color: 'gray' }}>{producto.fechaHoraControlFinal}</Text>
                            </View>
                            <View style={styles.TextAndPickerForm}>
                                <Text style={{ fontSize: 18 }}>Estado control final</Text>
                                <Text style={{ fontSize: 16, paddingLeft: 10, color: 'gray' }}>{producto.estadoFinal}</Text>
                            </View>
                        </View>

                        : null}








                </View>

            </ScrollView>

            <TouchableOpacity style={styles.ButtonCirculoAtras} onPress={() => navigation.goBack()}>
                <View style={styles.CirculoAtras}>
                    <View style={{ flexDirection: 'row', marginTop: 25 }}>
                        <FontAwesomeIcon icon={faArrowLeftLong} size={38} color="white" />
                        <Text style={{ color: 'white', fontSize: 34 }}>Atrás</Text>
                    </View>
                    <Text style={{ color: 'white', fontSize: 22 }}>Registros</Text>
                </View>
            </TouchableOpacity>


            {producto.estado == 'Reproceso' && producto.estadoFinal != null ?
                <View style={styles.botonRealizarControl} >

                    <TouchableOpacity style={[styles.BotonesFinales, { backgroundColor: '#260202' }]} onPress={() => navigation.navigate('EditarControl', { idProducto: idProducto, codigo: codigo })}>
                        <Text style={{ color: 'white', fontSize: 18 }}>
                            Actualizar control
                        </Text>

                    </TouchableOpacity>

                </View> : null}





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
        width: 220,
        height: 220,
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

export default VerControl;
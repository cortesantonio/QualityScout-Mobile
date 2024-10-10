import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    TouchableOpacity, StyleSheet, View, Text, Image, ScrollView,
    TextInput, Switch, Platform, Button, Alert
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

import DateTimePicker from '@react-native-community/datetimepicker';

const CrearProducto = ({navigation}) => {

    const [producto, setProducto] = useState({
        id: '',
        codigoVE: '',
        nombre_vino: '',
        cepa_vino: '',
        pais_origen: 'Chile',
        pais_destino: '',
        fecha_cosecha: '',
        fecha_produccion: '',
        capacidad_ml: '',
        grado_alcoholico: '',
        azucar_gr: '',
        sulfuros_mg_l: '',
        densidad_g_ml: '',
        tipo_capsula: '',
        tipo_etiqueta: '',
        color_botella: '',
        medalla: false,
        color_capsula: '',
        tipo_corcho: '',
        tipo_botella: '',
        altura_botella_mm: '',
        ancho_botella_mm: '',
        unidad_medida_etiqueta: '',
        medida_etiqueta_corcho: '',
        medida_etiqueta_base: '',
        fecha_registro: ''
    });

    

    const VinoEjemplo = require('../../../assets/images/VinoEjemplo.jpg')
    const [medalla, setMedalla] = useState(false);
    const toggleSwitch = () => {
        setProducto((prevProducto) => ({
            ...prevProducto,
            medalla: !prevProducto.medalla,
        }));
    };

    const handleChange = (field, value) => {
        setProducto({ ...producto, [field]: value });
    };

    

    const enviarProducto = async () => {
        try {
            // Recuperar el producto almacenado
            const productoJson = JSON.stringify(producto);

            if (productoJson) {
                const response = await fetch('https://tu-api-endpoint.com/productos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(productoJson),
                });

                const result = await response.json();
                if (response.ok) {
                    Alert.alert('Éxito', 'Producto enviado exitosamente');
                } else {
                    Alert.alert('Error', `Error al enviar producto: ${result.message}`);
                }
            } else {
                Alert.alert('Error', 'No hay producto guardado localmente.');
            }
        } catch (error) {
            Alert.alert('Error', 'No se pudo conectar con la API.');
        }
    };

    const [dateCosecha, setDateCosecha] = useState(new Date(1598051730000));
    const [dateProduccion, setDateProduccion] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [showCosecha, setShowCosecha] = useState(false);
    const [showProduccion, setShowProduccion] = useState(false);

    const onChangeCosecha = (event, selectedDate) => {
        const currentDate = selectedDate || dateCosecha;
        setShowCosecha(false);
        setDateCosecha(currentDate);
    };

    const onChangeDateProduccion = (event, selectedDate) => {
        const currentDate = selectedDate || dateProduccion;
        setShowProduccion(false);
        setDateProduccion(currentDate);
    };

    const showModeCosecha = (currentMode) => {
        setShowCosecha(true);
        setMode(currentMode);
    };

    const showModeProduccion = (currentMode) => {
        setShowProduccion(true);
        setMode(currentMode);
    };

    const showDatepickerCosecha = () => {
        showModeCosecha('date');
    };

    const showTimepickerCosecha = () => {
        showModeCosecha('time');
    };

    const showDatepickerProduccion = () => {
        showModeProduccion('date');
    };

    const showTimepickerProduccion = () => {
        showModeProduccion('time');
    };


    return (

        <View style={styles.container}>


            <ScrollView style={styles.scroll}>
                <Image source={VinoEjemplo} style={styles.image} />

                <View style={styles.containerInfo} >
                    <View style={{ marginBottom: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' }}>
                        <View style={{ width: '90%' }}>
                            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Registrar Nuevo Producto</Text>

                        </View>

                    </View>

                    <View style={styles.TextAndInputForm}>
                        <Text style={{ fontSize: 18 }}>Código Barra:</Text>
                        <TextInput
                            style={styles.input}
                            value={producto.id.toString()}
                            keyboardType="numeric"
                            onChangeText={(text) => handleChange('id', text)}
                        />
                    </View>

                    <View style={styles.TextAndInputForm}>
                        <Text style={{ fontSize: 18 }}>Código VE:</Text>
                        <TextInput
                            style={styles.input}
                            value={producto.codigoVE}
                            keyboardType="numeric"
                            onChangeText={(text) => handleChange('codigoVE', text)}
                        />
                    </View>

                    <View style={styles.TextAndInputForm}>
                        <Text style={{ fontSize: 18 }}>Nombre:</Text>
                        <TextInput
                            style={styles.input}
                            value={producto.nombre_vino}
                            onChangeText={(text) => handleChange('nombre_vino', text)}
                        />
                    </View>

                    <View style={styles.TextAndInputForm}>
                        <Text style={{ fontSize: 18 }}>Cepa:</Text>
                        <TextInput
                            style={styles.input}
                            value={producto.cepa_vino}
                            onChangeText={(text) => handleChange('cepa_vino', text)}
                        />
                    </View>

                    <View style={styles.TextAndPickerForm}>
                        <Text style={{ fontSize: 18 }}>País de Destino:</Text>
                        <Picker
                            itemStyle={{ height: 120, fontSize: 14 }}
                            style={styles.itemInPicker}
                        >
                            <Picker.Item label="Chile" value="Chile" />
                            <Picker.Item label="Argentina" value="Argentina" />
                        </Picker>

                    </View>


                    <View style={styles.TextAndPickerForm}>
                        <Text style={{ fontSize: 18 }}>Fecha de Cosecha: {dateCosecha.toLocaleString()} </Text>

                        {Platform.OS === 'ios' ? (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={dateCosecha}
                                mode="datetime"
                                is24Hour={true}
                                onChange={onChangeCosecha}
                                display="inline"
                            />
                        ) : Platform.OS === 'android' ? (
                            <>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <TouchableOpacity style={styles.botonFechas} onPress={showDatepickerCosecha}>
                                        <Text style={{ color: '#4b0404' }}>Escoger Fecha</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.botonFechas} onPress={showTimepickerCosecha}>
                                        <Text style={{ color: '#4b0404' }}>Escoger Hora</Text>
                                    </TouchableOpacity>
                                </View>

                                {showCosecha && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={dateCosecha}
                                        mode={mode}
                                        is24Hour={true}
                                        onChange={onChangeCosecha}
                                    />
                                )}
                            </>
                        ) : (
                            <Text>Plataforma desconocida</Text>
                        )}
                    </View>

                    <View style={styles.TextAndPickerForm}>
                        <Text style={{ fontSize: 18 }}>Fecha de Producción: {dateProduccion.toLocaleString()} </Text>

                        {Platform.OS === 'ios' ? (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={dateProduccion}
                                mode="datetime"
                                is24Hour={true}
                                onChange={onChangeDateProduccion}
                                display="inline"
                            />
                        ) : Platform.OS === 'android' ? (
                            <>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <TouchableOpacity style={styles.botonFechas} onPress={showDatepickerProduccion}>
                                        <Text style={{ color: '#4b0404' }}>Escoger Fecha</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.botonFechas} onPress={showTimepickerProduccion}>
                                        <Text style={{ color: '#4b0404' }}>Escoger Hora</Text>
                                    </TouchableOpacity>
                                </View>

                                {showProduccion && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={dateProduccion}
                                        mode={mode}
                                        is24Hour={true}
                                        onChange={onChangeDateProduccion}
                                    />
                                )}
                            </>
                        ) : (
                            <Text>Plataforma desconocida</Text>
                        )}
                    </View>

                    <View style={styles.TextAndInputForm}>
                        <Text style={{ fontSize: 18 }}>Capacidad:</Text>
                        <TextInput
                            style={styles.input}
                            value={producto.capacidad_ml.toString()}
                            keyboardType="numeric"
                            onChangeText={(text) => handleChange('capacidad_ml', text)}
                        />
                        <Text style={{ fontSize: 18 }}>ml.</Text>

                    </View>


                    <View style={styles.TextAndPickerForm}>
                        <Text style={{ fontSize: 18 }}>Tipo de Cápsula:</Text>
                        <Picker itemStyle={styles.itemInPicker}
                            style={styles.itemInPicker}
                        >
                            <Picker.Item label="PVC" value="PVC" />
                            <Picker.Item label="Estaño" value="Estaño" />
                            <Picker.Item label="Aluminio" value="Aluminio" />
                            <Picker.Item label="Complejo" value="Complejo" />
                            <Picker.Item label="Otros" value="Otros" />


                        </Picker>

                    </View>

                    <View style={styles.TextAndPickerForm}>
                        <Text style={{ fontSize: 18 }}>Tipo de Etiqueta:</Text>
                        <Picker itemStyle={{ height: 100, fontSize: 14 }}
                            style={styles.itemInPicker}
                        >
                            <Picker.Item label="Adhesivas" value="Adhesivas" />
                            <Picker.Item label="Engomadas" value="Engomadas" />

                        </Picker>
                    </View>

                    <View style={styles.TextAndPickerForm}>
                        <Text style={{ fontSize: 18 }}>Color de la Botella:</Text>
                        <Picker itemStyle={{ height: 180, fontSize: 14 }}
                            style={styles.itemInPicker}
                        >
                            <Picker.Item label="Verde" value="Verde" />
                            <Picker.Item label="Ámbar" value="Ámbar" />
                            <Picker.Item label="Transparente" value="Transparente" />
                            <Picker.Item label="Azul" value="Azul" />
                            <Picker.Item label="Marrón" value="Marrón" />
                        </Picker>

                    </View>

                    <View style={styles.TextAndInputForm}>
                        <Text style={{ fontSize: 18 }}>Medalla:</Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#bf6565' }}
                            thumbColor={producto.medalla ? '#f4f3f4' : '#f4f3f4'}
                            onValueChange={toggleSwitch}
                            value={producto.medalla}
                            style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }} // Reducir tamaño
                        />
                    </View>

                    <View style={styles.TextAndPickerForm}>
                        <Text style={{ fontSize: 18 }}>Color de la Cápsula:</Text>
                        <Picker itemStyle={{ height: 180, fontSize: 14 }}
                            style={styles.itemInPicker}
                        >
                            <Picker.Item label="Rojo" value="Rojo" />
                            <Picker.Item label="Dorado" value="Dorado" />
                            <Picker.Item label="Plateado" value="Plateado" />
                            <Picker.Item label="Negro" value="Negro" />
                            <Picker.Item label="Azul" value="Azul" />
                            <Picker.Item label="Verde" value="Verde" />
                        </Picker>

                    </View>

                    <View style={styles.TextAndPickerForm}>
                        <Text style={{ fontSize: 18 }}>Tipo de Corcho:</Text>
                        <Picker itemStyle={{ height: 180, fontSize: 14 }}
                            style={styles.itemInPicker}
                        >
                            <Picker.Item label="Corcho Natural" value="CorchoNatural" />
                            <Picker.Item label="Corcho Aglomerado" value="CorchoAglomerado" />
                            <Picker.Item label="Corcho Colmatado" value="CorchoColmatado" />
                            <Picker.Item label="Corcho Sintético" value="CorchoSintetico" />
                            <Picker.Item label="Tapa a Rosca" value="TapaRosca" />
                        </Picker>

                    </View>

                    <View style={styles.TextAndPickerForm}>
                        <Text style={{ fontSize: 18 }}>Tipo de Botella:</Text>
                        <Picker itemStyle={{ height: 180, fontSize: 14 }}
                            style={styles.itemInPicker}
                        >
                            <Picker.Item label="Bordeaux" value="Bordeaux" />
                            <Picker.Item label="Borgoña" value="Borgoña" />
                            <Picker.Item label="Champagne" value="Champagne" />
                            <Picker.Item label="Rin" value="Rin" />
                            <Picker.Item label="Jerez" value="Jerez" />
                            <Picker.Item label="Porto" value="Porto" />
                        </Picker>
                    </View>


                    <View style={styles.TextAndPickerForm}>
                        <Text style={{ fontSize: 18 }}>Unidad de Medida de Etiqueta:</Text>
                        <Picker itemStyle={{ height: 100, fontSize: 14 }}
                            style={styles.itemInPicker}
                        >
                            <Picker.Item label="Centimetros" value="cm" />
                            <Picker.Item label="Milimetros" value="mm" />

                        </Picker>
                    </View>

                    <View style={styles.TextAndInputForm}>
                        <Text style={{ fontSize: 18 }}>Medida de Etiqueta a Corcho:</Text>
                        <TextInput
                            style={styles.input}
                            value={producto.medida_etiqueta_corcho.toString()}
                            keyboardType="numeric"
                            onChangeText={(text) => handleChange('medida_etiqueta_corcho', text)}
                        />
                    </View>

                    <View style={styles.TextAndInputForm}>
                        <Text style={{ fontSize: 18 }}>Medida de Etiqueta a Base:</Text>
                        <TextInput
                            style={styles.input}
                            value={producto.medida_etiqueta_base.toString()}
                            keyboardType="numeric"
                            onChangeText={(text) => handleChange('medida_etiqueta_base', text)}
                        />
                    </View>

                    <View style={styles.TextAndPickerForm}>
                        <Text style={{ fontSize: 18 }}>Idioma:</Text>
                        <Picker itemStyle={{ height: 140, fontSize: 14 }}
                            style={styles.itemInPicker}
                        >
                            <Picker.Item label="Español" value="Español" />
                            <Picker.Item label="Inglés" value="Inglés" />
                            <Picker.Item label="Francés" value="Francés" />
                            <Picker.Item label="Alemán" value="Alemán" />
                            <Picker.Item label="Italiano" value="Italiano" />
                            <Picker.Item label="Portugués" value="Portugués" />
                            <Picker.Item label="Chino" value="Chino" />
                            <Picker.Item label="Japonés" value="Japonés" />
                            <Picker.Item label="Ruso" value="Ruso" />
                            <Picker.Item label="Árabe" value="Árabe" />
                        </Picker>

                    </View>

                    <View style={styles.TextAndPickerForm}>
                        <Text style={{ fontSize: 18 }}>Desc. de Cápsula:</Text>
                        <TextInput
                            style={styles.input}
                            value={producto.descripcion_capsula}
                            onChangeText={(text) => handleChange('descripcion_capsula', text)}
                        />
                    </View>

                    <View style={styles.TextAndPickerForm}>
                        <Text style={{ fontSize: 18 }}>Desc. de Etiqueta:</Text>
                        <TextInput
                            style={styles.input}
                            value={producto.descripcion_etiqueta}
                            onChangeText={(text) => handleChange('descripcion_etiqueta', text)}
                        />
                    </View>

                    <View style={styles.TextAndPickerForm}>
                        <Text style={{ fontSize: 18 }}>Desc. de Botella:</Text>
                        <TextInput
                            style={styles.input}
                            value={producto.descripcion_botella}
                            onChangeText={(text) => handleChange('descripcion_botella', text)}
                        />
                    </View>

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

            <View style={styles.botonRealizarControl} >

                <TouchableOpacity style={[styles.BotonesFinales, { backgroundColor: '#f25757' }]} onPress={enviarProducto} >
                    <Text style={{ color: 'white', }}>
                        Guardar

                    </Text>

                </TouchableOpacity>
                <TouchableOpacity style={styles.BotonesFinales}  >
                    <Text style={{ color: 'white', }}>
                        Cancelar

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
        width: '50%',
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
        borderBottomWidth: 1,
        padding: 2,
        minWidth: 80,
        fontSize: 18,
        color: 'gray'
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
    }


})

export default CrearProducto;
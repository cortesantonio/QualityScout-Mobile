import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    TouchableOpacity, StyleSheet, View, Text, Image, ScrollView,
    TextInput, Switch, Platform, Button, Alert, KeyboardAvoidingView
} from 'react-native';
import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { URL_API_BACKEND } from '../../../config';
import DateTimePicker from '@react-native-community/datetimepicker';

const CrearProducto = ({ navigation }) => {

    {/* DROPDOWNPICKER DE UNIDAD DE MEDIDAS */ }
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);


    {/**Informacion quimioca */ }
    const [nuevaInfoQuimica, setNuevaInfoQuimicaX] = useState(false); // Manejo de nuevo registro
    const [infoQuimica, setInfoQuimica] = useState([]);



    // Asincronía para obtener la info química desde la API
    const obtenerInfoQuimica = async () => {
        try {
            const response = await fetch(`${URL_API_BACKEND}/api/ProductosApi/GetInfoQuimica`);
            const data = await response.json();
            setInfoQuimica(data); // Asignación correcta de la info
        } catch (error) {
            console.error('Error al obtener la info química:', error);
        }
    };

    useEffect(() => {
        if (infoQuimica.length === 0) {
            obtenerInfoQuimica(); // Solo carga si aún no hay datos
        }
    }, [infoQuimica]);



    const [botellas, setBotellas] = useState([])

    // Asincronía para obtener la info química desde la API
    const obtenerBotellas = async () => {
        try {
            const response = await fetch(`${URL_API_BACKEND}/api/ProductosApi/GetBotellas`);
            const data = await response.json();
            setBotellas(data); // Asignación correcta de la info
        } catch (error) {
            console.error('Error al obtener la info química:', error);
        }
    };

    useEffect(() => {
        if (botellas.length === 0) {
            obtenerBotellas(); // Solo carga si aún no hay datos
        }
    }, [botellas]);




    {/* PRODUCTO*/ }


    {/**detalles del producto */ }

    const [agregarDetalles, setAgregarDetallesX] = useState(false)

    {/*Agregar botella */ }
    const [agregarBotella, setAgregarBotellaX] = useState(false)


    {/*historial del producto */ }
    const [agregarHistorial, setAgregarHistorialX] = useState(false)

    const [mode, setMode] = useState('date');


    const [producto, setProducto] = useState({
        codigoBarra: '',
        codigoVE: '',
        nombreVino: '',
        paisDestino: '',
        idioma: '',
        unidadMedida: '',
        descripcionCapsula: '',
        urlImagen: '',

        capacidad: 0,
        tipoCapsula: '',
        colorCapsula: '',
        colorBotella: '',
        tipoEtiqueta: '',
        tipoCorcho: '',
        medidaEtiquetaBoquete: 0,
        medidaEtiquetaBase: 0,
        medalla: false,

        idInformacionQuimica: 0,
        cepa: '',
        azucarMin: 0,
        azucarMax: 0,
        sulfurosMin: 0,
        sulfurosMax: 0,
        densidadMin: 0,
        densidadMax: 0,
        gradoAlcoholicoMin: 0,
        gradoAlcoholicoMax: 0,

        idBotellaDetalle: 0,
        nombreBotella: '',
        AltoBotella: 0,
        AnchoBotella: 0,

        guardarHistorial: false, // booleano
        fechaCosecha: '',
        fechaProduccion: '',
        fechaEnvasado: '',
    });


    const handleChange = (name, value) => {
        setProducto(prevState => ({
            ...prevState,
            [name]: value
        }))
    }


    const VinoEjemplo = require('../../../assets/images/VinoEjemplo.jpg')
    const toggleSwitch = () => {
        setProducto((prevProducto) => ({
            ...prevProducto,
            medalla: !prevProducto.medalla,
        }));
    };

    const setAgregarDetalles = (bool) => {
        if (bool) {

            handleChange('capacidad', 0)
            handleChange('tipoCapsula', '')
            handleChange('colorCapsula', '')
            handleChange('colorBotella', '')
            handleChange('tipoEtiqueta', '')
            handleChange('tipoCorcho', '')
            handleChange('medidaEtiquetaBoquete', 0)
            handleChange('medidaEtiquetaBase', 0)
            setAgregarDetallesX(bool)
        } else {
            setAgregarDetallesX(bool)
        }
    }

    const setAgregarBotella = (bool) => {
        if (bool) {
            handleChange('idBotellaDetalle', 0)
            handleChange('nombreBotella', '')
            handleChange('AltoBotella', 0)
            handleChange('AnchoBotella', 0)
            setAgregarBotellaX(bool)
        } else {
            handleChange('idBotellaDetalle', 0)
            setAgregarBotellaX(bool)
        }
    }

    const setAgregarHistorial = (bool) => {
        if (bool) {
            handleChange('guardarHistorial', true)
            setAgregarHistorialX(bool)
        } else {
            handleChange('guardarHistorial', false)
            setAgregarHistorialX(bool)
        }
    }

    const setNuevaInfoQuimica = (bool) => {
        if (bool) {
            handleChange('idInformacionQuimica', 0)
            setNuevaInfoQuimicaX(bool)
        } else {
            handleChange('cepa', '')
            handleChange('azucarMin', 0)
            handleChange('azucarMax', 0)
            handleChange('sulfurosMin', 0)
            handleChange('sulfurosMax', 0)
            handleChange('densidadMin', 0)
            handleChange('densidadMax', 0)
            handleChange('gradoAlcoholicoMin', 0)
            handleChange('gradoAlcoholicoMax', 0)

            setNuevaInfoQuimicaX(bool)

        }
    }





    const enviarProducto = async () => {


        if (producto.codigoBarra == '' || producto.codigoVE == '' || producto.nombreVino == '' || producto.paisDestino == ''
            || producto.idioma == '' || producto.unidadMedida == '' || producto.descripcionCapsula == '') {
            return alert('Por favor, complete todos los campos de información del producto.')
        }


        if (agregarDetalles) {
            if (producto.capacidad == 0 || producto.tipoCapsula == '' || producto.colorCapsula == '' || producto.tipoEtiqueta == ''
                || producto.tipoCorcho == '' || producto.medidaEtiquetaBoquete == 0 || producto.medidaEtiquetaBase == 0) {
                return alert('Por favor, complete todos los campos de detalles.')
            }
            if (agregarBotella) {
                if (producto.nombreBotella == '' || producto.AltoBotella == 0 || producto.AnchoBotella == 0) {
                    return alert('Por favor, complete todos los campos de detalle de botella.')
                }

            } else if (producto.idBotellaDetalle == 0) {
                return alert('Por favor, seleccione una botella.')
            }

        }

        if (nuevaInfoQuimica) {
            if (producto.cepa != '' && producto.azucarMax != '' && producto.azucarMin != '' && producto.sulfurosMax != ''
                && producto.sulfurosMin != '' && producto.densidadMax != '' && producto.densidadMin != '' && producto.gradoAlcoholicoMax != ''
                && producto.gradoAlcoholicoMin != '') {
                console.log('Informacion quimica agregada')
            } else {
                return alert('Por favor, complete todos los campos de información química.')
            }
        } else {
            if (producto.idInformacionQuimica == 0 || producto.idInformacionQuimica == null) {
                return alert('Por favor, seleccione una información química.')
            }
        }


        console.log(producto)
        try {
            const token = await AsyncStorage.getItem('userToken');
            if (token == null) {
                alert('No se encontro token, no se pudo crear el producto.')
                return;
            }

            const response = await fetch(`${URL_API_BACKEND}/api/ProductosApi/CrearProducto`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(producto)

            });
            const data = await response.json();
            if (response.ok) {
                Alert.alert('Éxito', 'Producto creado correctamente');
                navigation.navigate('VerProducto', { id: data.id });
            } else {
                if (data === "El codigo de barra ya existe en base de datos") {
                    Alert.alert('Error', 'El código de barras ya existe. Por favor, verifica la información.');
                } else {
                    Alert.alert('Error', 'Ocurrió un error al crear el producto.');
                }
            }
        } catch (error) {
            Alert.alert('Error', 'Error al enviar el producto, asegurese de la integridad de sus datos y/o que el codigo de barra no este ingresado.');
        }

    };

    const formatFecha = (date) => {
        const dia = String(date.getDate()).padStart(2, '0');
        const mes = String(date.getMonth() + 1).padStart(2, '0'); // Los meses comienzan desde 0
        const anio = date.getFullYear();
        const horas = String(date.getHours()).padStart(2, '0');
        const minutos = String(date.getMinutes()).padStart(2, '0');
        const segundos = String(date.getSeconds()).padStart(2, '0');
        return `${dia}-${mes}-${anio} ${horas}:${minutos}:${segundos}`;
    };

    // Estado para manejar las fechas seleccionadas
    const [dateCosecha, setDateCosecha] = useState(new Date());
    const [dateProduccion, setDateProduccion] = useState(new Date());
    const [dateEnvasado, setDateEnvasado] = useState(new Date());

    // Estado para mostrar u ocultar los pickers en Android
    const [showCosecha, setShowCosecha] = useState(false);
    const [showProduccion, setShowProduccion] = useState(false);
    const [showEnvasado, setShowEnvasado] = useState(false);

    // Estado general del producto

    // Funciones para manejar los cambios de fecha
    const onChangeCosecha = (event, selectedDate) => {
        const currentDate = selectedDate || dateCosecha;
        setShowCosecha(Platform.OS === 'ios');  // Mantener visible en iOS
        setDateCosecha(currentDate);  // Actualizar el estado del picker
        handleChange('fechaCosecha', formatFecha(currentDate));  // Actualizar el estado del producto
    };

    const onChangeDateProduccion = (event, selectedDate) => {
        const currentDate = selectedDate || dateProduccion;
        setShowProduccion(Platform.OS === 'ios');
        setDateProduccion(currentDate);
        handleChange('fechaProduccion', formatFecha(currentDate));
    };

    const onChangeDateEnvasado = (event, selectedDate) => {
        const currentDate = selectedDate || dateEnvasado;
        setShowEnvasado(Platform.OS === 'ios');
        setDateEnvasado(currentDate);
        handleChange('fechaEnvasado', formatFecha(currentDate));
    };

    // Funciones para mostrar los pickers en Android
    const showDatepickerCosecha = () => {
        setMode('date')

        setShowCosecha(true);
    };
    const showTimepickerCosecha = () => {
        setMode('time');
        setShowCosecha(true);
    }

    const showDatepickerProduccion = () => {
        setMode('date')
        setShowProduccion(true);
    };
    const showTimepickerProduccion = () => {
        setMode('time');
        setShowProduccion(true);
    }

    const showDatepickerEnvasado = () => {
        setMode('date')

        setShowEnvasado(true);
    };

    const showTimepickerEnvasado = () => {
        setMode('time');
        setShowEnvasado(true);
    }


    return (


        <View style={styles.container}>


            <ScrollView style={styles.scroll}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                >
                    <Image source={VinoEjemplo} style={styles.image} />

                    <View style={styles.containerInfo} >
                        <View style={{ marginBottom: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' }}>
                            <View style={{ width: '90%' }}>
                                <Text style={{ fontSize: 26, fontWeight: 'bold' }}>Registrar Producto</Text>

                            </View>

                        </View>

                        <Text style={[styles.botonNuevoRegistro, { color: 'black', fontSize: 22 }]}>Informacion de Producto</Text>

                        <View style={styles.TextAndInputForm}>
                            <Text style={{ fontSize: 18 }}>Código Barra:</Text>
                            <TextInput
                                style={styles.input}
                                keyboardType="numeric"
                                value={producto.codigoBarra}
                                onChangeText={(text) => handleChange('codigoBarra', text)}
                            />
                        </View>

                        <View style={styles.TextAndInputForm}>
                            <Text style={{ fontSize: 18 }}>Código VE:</Text>
                            <TextInput
                                style={styles.input}
                                value={producto.codigoVE}
                                keyboardType="numeric"
                                onChangeText={(text) => handleChange('codigoVE', text)} />
                        </View>

                        <View style={styles.TextAndInputForm}>
                            <Text style={{ fontSize: 18 }}>Nombre:</Text>
                            <TextInput
                                style={styles.input}
                                value={producto.nombreVino}
                                onChangeText={(text) => handleChange('nombreVino', text)}
                            />
                        </View>

                        <View style={styles.TextAndPickerForm}>
                            <Text style={{ fontSize: 18 }}>País de Destino:</Text>
                            <Picker
                                itemStyle={{ height: 120, fontSize: 14 }}
                                style={styles.itemInPicker}
                                selectedValue={producto.paisDestino}
                                onValueChange={(itemValue) => handleChange('paisDestino', itemValue)}
                            >
                                <Picker.Item label="Selecciona un país." value="" />

                                <Picker.Item label="Chile" value="Chile" />
                                <Picker.Item label="Japón" value="Japón" />
                                <Picker.Item label="Turquía" value="Turquía" />
                                <Picker.Item label="Rusia" value="Rusia" />
                                <Picker.Item label="Colombia" value="Colombia" />
                                <Picker.Item label="Estados Unidos" value="Estados Unidos" />
                                <Picker.Item label="Ucrania" value="Ucrania" />
                                <Picker.Item label="Venezuela" value="Venezuela" />
                                <Picker.Item label="República Checa" value="República Checa" />
                                <Picker.Item label="Brasil" value="Brasil" />
                                <Picker.Item label="Perú" value="Perú" />
                                <Picker.Item label="Canadá" value="Canadá" />
                                <Picker.Item label="México" value="México" />
                                <Picker.Item label="España" value="España" />

                            </Picker>

                        </View>
                        <View style={styles.TextAndPickerForm}>
                            <Text style={{ fontSize: 18 }}>Idioma:</Text>
                            <Picker
                                itemStyle={{ height: 120, fontSize: 14 }}
                                style={styles.itemInPicker}
                                selectedValue={producto.idioma}
                                onValueChange={(itemValue) => handleChange('idioma', itemValue)}
                            >
                                <Picker.Item label="Selecciona un idioma." value="" />

                                <Picker.Item label="Español" value="Español" />
                                <Picker.Item label="Inglés" value="Inglés" />
                                <Picker.Item label="Ruso" value="Ruso" />
                                <Picker.Item label="Japonés" value="Japonés" />
                                <Picker.Item label="Chino" value="Chino" />
                            </Picker>
                        </View>
                        <Text style={{ fontSize: 18 }}>Unidad Medida</Text>
                        <Picker
                            itemStyle={{ height: 120, fontSize: 14 }}
                            style={styles.itemInPicker}
                            selectedValue={producto.unidadMedida}
                            onValueChange={(itemValue) => handleChange('unidadMedida', itemValue)}

                        >
                            <Picker.Item label="Selecciona un unidad de medida." value="" />

                            <Picker.Item label="Centímetro Cúbico (cc)" value="cc" />
                            <Picker.Item label="Mililitros (ml)" value="ml" />
                        </Picker>

                        <View style={styles.TextAndPickerForm}>
                            <Text style={{ fontSize: 18 }}>Link de Imagen (.jpge .png)</Text>
                            <TextInput
                                style={styles.input}

                                value={producto.urlImagen}
                                onChangeText={(text) => handleChange('urlImagen', text)}

                            />

                        </View>



                        <View style={styles.TextAndPickerForm}>
                            <Text style={{ fontSize: 18 }}>Descripcion de capsula:</Text>
                            <TextInput
                                style={styles.input}

                                value={producto.descripcionCapsula}
                                onChangeText={(text) => handleChange('descripcionCapsula', text)}
                                multiline={true}

                            />

                        </View>


                        <Text style={[styles.botonNuevoRegistro, { color: 'black', fontSize: 22, marginTop: 30 }]}>Detalles de producto</Text>

                        {agregarDetalles ? <>

                            <View style={styles.TextAndInputForm}>
                                <Text style={{ fontSize: 18 }}>Capacidad:</Text>
                                <TextInput style={styles.input}
                                    value={producto.capacidad}
                                    keyboardType="numeric"
                                    onChangeText={(text) => handleChange('capacidad', text)}
                                />
                                <Text>ml.</Text>
                            </View>


                            <View style={styles.TextAndPickerForm}>
                                <Text style={{ fontSize: 18 }}>Tipo de capsula:</Text>
                                <Picker
                                    itemStyle={{ height: 120, fontSize: 14 }}
                                    style={styles.itemInPicker}
                                    selectedValue={producto.tipoCapsula}
                                    onValueChange={(itemValue) => handleChange('tipoCapsula', itemValue)}
                                >
                                    <Picker.Item label="Selecciona un tipo de cápsula." value="" />

                                    <Picker.Item label="PVC" value="PVC" />
                                    <Picker.Item label="Complex" value="Complex" />
                                    <Picker.Item label="Alutín" value="Alutín" />
                                </Picker>
                            </View>
                            <View style={styles.TextAndPickerForm}>
                                <Text style={{ fontSize: 18 }}>Color de capsula:</Text>
                                <Picker
                                    itemStyle={{ height: 120, fontSize: 14 }}
                                    style={styles.itemInPicker}
                                    selectedValue={producto.colorCapsula}
                                    onValueChange={(itemValue) => handleChange('colorCapsula', itemValue)}

                                >
                                    <Picker.Item label="Seleccione un color de cápsula." value="" />

                                    <Picker.Item label="Azul" value="Azul" />
                                    <Picker.Item label="Blanco" value="Blanco" />
                                    <Picker.Item label="Dorado" value="Dorado" />
                                    <Picker.Item label="Marrón" value="Marrón" />
                                    <Picker.Item label="Negro" value="Negro" />
                                    <Picker.Item label="Plata" value="Plata" />
                                    <Picker.Item label="Rojo" value="Rojo" />
                                    <Picker.Item label="Verde" value="Verde" />
                                    <Picker.Item label="Violeta" value="Violeta" />

                                </Picker>
                            </View>
                            <View style={styles.TextAndPickerForm}>
                                <Text style={{ fontSize: 18 }}>Color de botella:</Text>
                                <Picker
                                    itemStyle={{ height: 120, fontSize: 14 }}
                                    style={styles.itemInPicker}
                                    selectedValue={producto.colorBotella}
                                    onValueChange={(itemValue) => handleChange('colorBotella', itemValue)}

                                >
                                    <Picker.Item label="Selecciona un color de botella." value="" />

                                    <Picker.Item label="Verde" value="Verde" />
                                    <Picker.Item label="Blanco" value="Blanco" />
                                    <Picker.Item label="Ámbar" value="Ámbar" />

                                </Picker>
                            </View>

                            <View style={styles.TextAndPickerForm}>
                                <Text style={{ fontSize: 18 }}>Medalla:</Text>
                                <Picker
                                    itemStyle={{ height: 120, fontSize: 14 }}
                                    style={styles.itemInPicker}
                                    selectedValue={producto.medalla}
                                    onValueChange={toggleSwitch}
                                >
                                    <Picker.Item label="Selecciona una opcion." value="" />

                                    <Picker.Item label="SI" value={true} />
                                    <Picker.Item label="NO" value={false} />
                                </Picker>
                            </View>

                            <View style={styles.TextAndPickerForm}>
                                <Text style={{ fontSize: 18 }}>Tipo de etiqueta:</Text>
                                <Picker
                                    itemStyle={{ height: 120, fontSize: 14 }}
                                    style={styles.itemInPicker}
                                    selectedValue={producto.tipoEtiqueta}
                                    onValueChange={(itemValue) => handleChange('tipoEtiqueta', itemValue)}

                                >
                                    <Picker.Item label="Selecciona un tipo de etiqueta." value="" />

                                    <Picker.Item label="Auto-adhesiva" value="Auto-adhesiva" />
                                    <Picker.Item label="Engomada" value="Engomada" />

                                </Picker>
                            </View>
                            <View style={styles.TextAndPickerForm}>
                                <Text style={{ fontSize: 18 }}>Tipo de corcho:</Text>
                                <Picker
                                    itemStyle={{ height: 120, fontSize: 14 }}
                                    style={styles.itemInPicker}
                                    selectedValue={producto.tipoCorcho}
                                    onValueChange={(itemValue) => handleChange('tipoCorcho', itemValue)}
                                >
                                    <Picker.Item label="Selecciona un tipo de corcho." value="" />

                                    <Picker.Item label="Microaglomerado" value="Microaglomerado" />
                                    <Picker.Item label="Perfect" value="Perfect" />
                                    <Picker.Item label="Natural" value="Natural" />


                                </Picker>
                            </View>
                            <View style={styles.TextAndInputForm}>
                                <Text style={{ fontSize: 18 }}>Medida de etiqueta a boquete:</Text>
                                <TextInput style={styles.input}
                                    keyboardType="numeric"

                                    value={producto.medidaEtiquetaBoquete}
                                    onChangeText={(text) => handleChange('medidaEtiquetaBoquete', text)}
                                />
                                <Text>cm.</Text>
                            </View>

                            <View style={styles.TextAndInputForm}>
                                <Text style={{ fontSize: 18 }}>Medida de etiqueta a base:</Text>
                                <TextInput style={styles.input}
                                    keyboardType="numeric"
                                    value={producto.medidaEtiquetaBase}
                                    onChangeText={(text) => handleChange('medidaEtiquetaBase', text)}
                                />
                                <Text>cm.</Text>
                            </View>



                            <Text style={[styles.botonNuevoRegistro, { color: 'black', fontSize: 22, marginTop: 30 }]}>Informacion de la botella</Text>
                            {agregarBotella ? <>



                                <View style={styles.TextAndInputForm}>
                                    <Text style={{ fontSize: 18 }}>Nombre de Botella:</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={producto.nombreBotella}
                                        onChangeText={(text) => handleChange('nombreBotella', text)}
                                    />
                                </View>


                                <View style={styles.TextAndInputForm}>
                                    <Text style={{ fontSize: 18 }}>Alto</Text>
                                    <TextInput
                                        style={styles.input}
                                        keyboardType="numeric"

                                        value={producto.AltoBotella}
                                        onChangeText={(text) => handleChange('AltoBotella', text)}

                                    />
                                    <Text style={{ fontSize: 18 }}>cm.</Text>
                                </View>
                                <View style={styles.TextAndInputForm}>
                                    <Text style={{ fontSize: 18 }}>Ancho</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={producto.AnchoBotella}
                                        keyboardType="numeric"

                                        onChangeText={(text) => handleChange('AnchoBotella', text)}

                                    />
                                    <Text style={{ fontSize: 18 }}>cm.</Text>
                                </View>

                                <TouchableOpacity onPress={() => {
                                    setAgregarBotella(false)
                                }}>
                                    <Text style={[styles.botonNuevoRegistro, { fontSize: 14, paddingLeft: 10 }]}>X  No agregar nuevo registro</Text>
                                </TouchableOpacity>

                            </> :
                                <>

                                    <View style={styles.TextAndPickerForm}>
                                        <Text style={{ fontSize: 18 }}>Botella:</Text>
                                        <Picker
                                            itemStyle={{ height: 120, fontSize: 14 }}
                                            style={styles.itemInPicker}
                                            selectedValue={producto.idBotellaDetalle}
                                            onValueChange={(itemValue) => handleChange('idBotellaDetalle', itemValue)}
                                        >
                                            <Picker.Item label="Selecciona una botella" value={0} />
                                            {botellas.map((item) => (

                                                <Picker.Item key={item.id} label={item.nombreBotella} value={item.id} />

                                            ))}


                                        </Picker>
                                    </View>


                                    <TouchableOpacity onPress={() => {
                                        setAgregarBotella(true)
                                    }}>
                                        <Text style={[styles.botonNuevoRegistro, { fontSize: 14, paddingLeft: 10 }]}>
                                            + Agregar botella nueva
                                        </Text>
                                    </TouchableOpacity>
                                </>

                            }












                            <TouchableOpacity onPress={() => {
                                setAgregarDetalles(false)
                            }}>
                                <Text style={[styles.botonNuevoRegistro, { fontSize: 14, paddingLeft: 10 }]}>x No agregar informcion en detalles.</Text>
                            </TouchableOpacity>

                        </> : <>

                            <TouchableOpacity onPress={() => {
                                setAgregarDetalles(true)
                            }}>
                                <Text style={[styles.botonNuevoRegistro, { fontSize: 14, paddingLeft: 10 }]}>+ Agregar detalles</Text>
                            </TouchableOpacity>

                        </>}






                        <Text style={[styles.botonNuevoRegistro, { color: 'black', fontSize: 22, marginTop: 30 }]}>Informacion Quimica de producto</Text>

                        {/* Información Química */}
                        {nuevaInfoQuimica ? (
                            <>
                                <View style={styles.TextAndPickerForm}>
                                    <Text style={{ fontSize: 18 }}>Cepa:</Text>
                                    <TextInput style={styles.input}
                                        value={producto.cepa}
                                        onChangeText={(text) => handleChange('cepa', text)}
                                    />

                                </View>
                                <View style={styles.TextAndPickerForm}>
                                    <Text style={{ fontSize: 18 }}>Azucar:</Text>
                                    <View style={styles.InfoQuimicaRangosBox}>
                                        <Text>Min.</Text>
                                        <TextInput style={styles.input}
                                            value={producto.azucarMin}
                                            onChangeText={(text) => handleChange('azucarMin', text)}
                                            keyboardType="numeric"

                                        />
                                        <Text>Max.</Text>
                                        <TextInput style={styles.input}
                                            value={producto.azucarMax}
                                            onChangeText={(text) => handleChange('azucarMax', text)}
                                            keyboardType="numeric"

                                        />
                                    </View>
                                </View>

                                <View style={styles.TextAndPickerForm}>
                                    <Text style={{ fontSize: 18 }}>Sulfuroso:</Text>
                                    <View style={styles.InfoQuimicaRangosBox}>
                                        <Text>Min.</Text>
                                        <TextInput style={styles.input}
                                            value={producto.sulfurosMin}
                                            onChangeText={(text) => handleChange('sulfurosMin', text)}
                                            keyboardType="numeric"

                                        />
                                        <Text>Max.</Text>
                                        <TextInput style={styles.input}
                                            value={producto.sulfurosMax}
                                            onChangeText={(text) => handleChange('sulfurosMax', text)}
                                            keyboardType="numeric"

                                        />
                                    </View>
                                </View>

                                <View style={styles.TextAndPickerForm}>
                                    <Text style={{ fontSize: 18 }}>Densidad:</Text>
                                    <View style={styles.InfoQuimicaRangosBox}>
                                        <Text>Min.</Text>
                                        <TextInput style={styles.input}
                                            value={producto.densidadMin}
                                            onChangeText={(text) => handleChange('densidadMin', text)}
                                            keyboardType="numeric"

                                        />
                                        <Text>Max.</Text>
                                        <TextInput style={styles.input}
                                            value={producto.densidadMax}
                                            onChangeText={(text) => handleChange('densidadMax', text)}
                                            keyboardType="numeric"

                                        />
                                    </View>
                                </View>

                                <View style={styles.TextAndPickerForm}>
                                    <Text style={{ fontSize: 18 }}>Grados de Alcohol:</Text>
                                    <View style={styles.InfoQuimicaRangosBox}>
                                        <Text>Min.</Text>
                                        <TextInput style={styles.input}
                                            value={producto.gradoAlcoholicoMin}
                                            onChangeText={(text) => handleChange('gradoAlcoholicoMin', text)}
                                            keyboardType="numeric"
                                        />
                                        <Text>Max.</Text>
                                        <TextInput style={styles.input}
                                            value={producto.gradoAlcoholicoMax}
                                            onChangeText={(text) => handleChange('gradoAlcoholicoMax', text)}
                                            keyboardType="numeric"

                                        />
                                    </View>


                                </View>



                                <TouchableOpacity onPress={() => setNuevaInfoQuimica(false)}>
                                    <Text style={[styles.botonNuevoRegistro, { fontSize: 14, paddingLeft: 10 }]}>X No agregar nuevo registro</Text>
                                </TouchableOpacity>




                            </>

                        ) : (
                            <>
                                <Picker
                                    itemStyle={{ height: 120, fontSize: 14 }}
                                    style={styles.itemInPicker}
                                    selectedValue={producto.idInformacionQuimica}
                                    onValueChange={(itemValue) => handleChange('idInformacionQuimica', itemValue)}

                                >
                                    <Picker.Item label="Selecciona cepa" value={0} />

                                    {infoQuimica.map((item) => (
                                        <Picker.Item key={item.id} label={item.cepa} value={item.id} />

                                    ))}
                                </Picker>
                                <TouchableOpacity onPress={() => setNuevaInfoQuimica(true)}>
                                    <Text style={[styles.botonNuevoRegistro, { fontSize: 14, paddingLeft: 10 }]}>+ Agregar Nueva Información Química</Text>
                                </TouchableOpacity>
                            </>
                        )}








                        <Text style={[styles.botonNuevoRegistro, { color: 'black', fontSize: 22, marginTop: 30 }]}>Historial del producto</Text>

                        {agregarHistorial ?

                            <>
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

                                <View style={styles.TextAndPickerForm}>
                                    <Text style={{ fontSize: 18 }}>Fecha de Envasado: {dateEnvasado.toLocaleString()} </Text>

                                    {Platform.OS === 'ios' ? (
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            value={dateEnvasado}
                                            mode="datetime"
                                            is24Hour={true}
                                            onChange={onChangeDateEnvasado}
                                            display="inline"
                                        />
                                    ) : Platform.OS === 'android' ? (
                                        <>
                                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                                <TouchableOpacity style={styles.botonFechas} onPress={showDatepickerEnvasado}>
                                                    <Text style={{ color: '#4b0404' }}>Escoger Fecha</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.botonFechas} onPress={showTimepickerEnvasado}>
                                                    <Text style={{ color: '#4b0404' }}>Escoger Hora</Text>
                                                </TouchableOpacity>
                                            </View>

                                            {showEnvasado && (
                                                <DateTimePicker
                                                    testID="dateTimePicker"
                                                    value={dateEnvasado}
                                                    mode={mode}
                                                    is24Hour={true}
                                                    onChange={onChangeDateEnvasado}
                                                />
                                            )}
                                        </>
                                    ) : (
                                        <Text>Plataforma desconocida</Text>
                                    )}
                                    <Text style={{ color: 'red', fontSize: 12, marginBottom: 20, marginTop: 20 }}>*Complete todos los campos, fecha y hora.</Text>

                                </View>


                                <TouchableOpacity onPress={() => {
                                    setAgregarHistorial(false)
                                }}>
                                    <Text style={[styles.botonNuevoRegistro, { fontSize: 14, paddingLeft: 10 }]}>X  No agregar nuevo registro</Text>
                                </TouchableOpacity>
                            </>
                            :
                            <TouchableOpacity onPress={() => {
                                setAgregarHistorial(true)
                            }}>
                                <Text style={[styles.botonNuevoRegistro, { fontSize: 14, paddingLeft: 10 }]}>+ Agregar Historial</Text>
                            </TouchableOpacity>
                        }

                    </View>
                </KeyboardAvoidingView>
            </ScrollView >

            <TouchableOpacity style={styles.ButtonCirculoAtras} onPress={() => navigation.goBack()}>
                <View style={styles.CirculoAtras}>
                    <View style={{ flexDirection: 'row', marginTop: 25 }}>
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
                <TouchableOpacity style={styles.BotonesFinales} onPress={() => navigation.goBack()} >
                    <Text style={{ color: 'white', }}>
                        Cancelar

                    </Text>

                </TouchableOpacity>
            </View>


        </View >


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
    , InfoQuimicaRangosBox: {
        paddingLeft: 10,
        flexDirection: 'row', gap: 5
    },
    botonNuevoRegistro: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#bf6565',
        marginBottom: 10
    }

})

export default CrearProducto;
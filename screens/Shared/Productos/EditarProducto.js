import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    TouchableOpacity, StyleSheet, View, Text, Image, ScrollView,
    TextInput, Switch, Platform, Button, Alert
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeftLong, faGuaraniSign, fas, faSleigh } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { URL_API_BACKEND } from '../../../config';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute } from '@react-navigation/native';
import { createIconSetFromFontello } from 'react-native-vector-icons';





const EditarProducto = ({ navigation }) => {

    const route = useRoute();
    const { id } = route.params;
    const [isLoading, setIsLoading] = useState(true);

    const [producto, setProducto] = useState({});


    {/* detalles PRODUCTO*/ }
    const [agregarDetalles, setAgregarDetallesX] = useState(true)

    {/*Agregar botella */ }
    const [agregarBotella, setAgregarBotellaX] = useState(false)

    {/*historial del producto */ }
    const [agregarHistorial, setAgregarHistorialX] = useState(false)
    const [mode, setMode] = useState('date');
    {/**Informacion quimioca */ }
    const [infoQuimica, setInfoQuimica] = useState([]);
    const [nuevaInfoQuimica, setNuevaInfoQuimicaX] = useState(false); // Manejo de nuevo registro




    const obtenerDatos = async (id) => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            if (token == null) {
                alert('Token de autorización no encontrado.');
                return;
            }
            const response = await fetch(`${URL_API_BACKEND}/api/ProductosApi/GetProductoToEdit/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }

            const data = await response.json();
            setProducto(data); // Almacena los datos en el estado
            setIsLoading(false);
            console.log(data);

            if (data.capacidad > 0 || data.tipoCapsula != '') {
               setAgregarBotellaX(true)
            } else {
                setAgregarBotellaX(false)

            }

        } catch (error) {
            console.error('Error obteniendo los datos:', error);
            alert('Ocurrió un error al obtener los datos.');
        }
    };
    useEffect(() => {
        obtenerDatos(id); // Llama a la función al montar el componente
    }, [id]); // Solo se ejecuta al montar el componente









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
        console.log(producto)
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
        handleChange('fechaCosecha', currentDate.toISOString());  // Actualizar el estado del producto
    };

    const onChangeDateProduccion = (event, selectedDate) => {
        const currentDate = selectedDate || dateProduccion;
        setShowProduccion(Platform.OS === 'ios');
        setDateProduccion(currentDate);
        handleChange('fechaProduccion', currentDate.toISOString());
    };

    const onChangeDateEnvasado = (event, selectedDate) => {
        const currentDate = selectedDate || dateEnvasado;
        setShowEnvasado(Platform.OS === 'ios');
        setDateEnvasado(currentDate);
        handleChange('fechaEnvasado', currentDate.toISOString());
    };

    // Funciones para mostrar los pickers en Android
    const showDatepickerCosecha = () => {
        setShowCosecha(true);
    };

    const showDatepickerProduccion = () => {
        setShowProduccion(true);
    };

    const showDatepickerEnvasado = () => {
        setShowEnvasado(true);
    };


    return (


        <View style={styles.container}>


            <ScrollView style={styles.scroll}>
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
                            <Picker.Item label="Selecciona un pais." value="" />

                            <Picker.Item label="Chile" value="Chile" />
                            <Picker.Item label="Argentina" value="Argentina" />
                            <Picker.Item label="Francia" value="Francia" />
                            <Picker.Item label="Italia" value="Italia" />
                            <Picker.Item label="España" value="España" />
                            <Picker.Item label="Estados Unidos" value="Estados Unidos" />
                            <Picker.Item label="Australia" value="Australia" />
                            <Picker.Item label="Sudáfrica" value="Sudáfrica" />
                            <Picker.Item label="Portugal" value="Portugal" />
                            <Picker.Item label="Nueva Zelanda" value="Nueva Zelanda" />
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

                            <Picker.Item label="Inglés" value="Inglés" />
                            <Picker.Item label="Árabe" value="Árabe" />
                            <Picker.Item label="Español" value="Español" />
                            <Picker.Item label="Francés" value="Francés" />
                            <Picker.Item label="Italiano" value="Italiano" />
                            <Picker.Item label="Alemán" value="Alemán" />
                            <Picker.Item label="Portugués" value="Portugués" />
                            <Picker.Item label="Chino" value="Chino" />
                            <Picker.Item label="Japonés" value="Japonés" />
                            <Picker.Item label="Ruso" value="Ruso" />
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

                        <Picker.Item label="Onzas (oz)" value="oz" />
                        <Picker.Item label="Mililitros (ml)" value="ml" />
                        <Picker.Item label="Litros (L)" value="L" />
                        <Picker.Item label="Centilitros (cl)" value="cl" />
                        <Picker.Item label="Gramos (g)" value="g" />
                        <Picker.Item label="Kilogramos (kg)" value="kg" />
                        <Picker.Item label="Galones (gal)" value="gal" />
                    </Picker>

                    <View style={styles.TextAndInputForm}>
                        <Text style={{ fontSize: 18 }}>Descripcion de capsula:</Text>
                        <TextInput
                            style={styles.input}

                            value={producto.descripcionCapsula}
                            onChangeText={(text) => handleChange('descripcionCapsula', text)}
                        />

                    </View>


                    <Text style={[styles.botonNuevoRegistro, { color: 'black', fontSize: 22, marginTop: 30 }]}>Detalles de producto</Text>

                    {agregarDetalles ? <>

                        <View style={styles.TextAndInputForm}>
                            <Text style={{ fontSize: 18 }}>Capacidad:</Text>
                            <TextInput style={styles.input}
                                value={producto.capacidad?.toString()}
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
                                <Picker.Item label="Selecciona el tipo de capsula." value="" />

                                <Picker.Item label="Estándar" value="estandar" />
                                <Picker.Item label="Térmica" value="termica" />
                                <Picker.Item label="Corcho" value="corcho" />
                                <Picker.Item label="Twist-off" value="twist-off" />
                                <Picker.Item label="Cápsula de aluminio" value="aluminio" />
                                <Picker.Item label="Cápsula de estaño" value="estano" />
                                <Picker.Item label="Cápsula retráctil" value="retráctil" />
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
                                <Picker.Item label="Selecciona un color." value="" />

                                <Picker.Item label="Rojo" value="rojo" />
                                <Picker.Item label="Negro" value="negro" />
                                <Picker.Item label="Dorado" value="dorado" />
                                <Picker.Item label="Plata" value="plata" />
                                <Picker.Item label="Verde" value="verde" />
                                <Picker.Item label="Azul" value="azul" />
                                <Picker.Item label="Blanco" value="blanco" />
                                <Picker.Item label="Marrón" value="marron" />
                                <Picker.Item label="Violeta" value="violeta" />
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
                                <Picker.Item label="Selecciona un color." value="" />

                                <Picker.Item label="Rojo" value="rojo" />
                                <Picker.Item label="Negro" value="negro" />
                                <Picker.Item label="Dorado" value="dorado" />
                                <Picker.Item label="Plata" value="plata" />
                                <Picker.Item label="Verde" value="verde" />
                                <Picker.Item label="Azul" value="azul" />
                                <Picker.Item label="Blanco" value="blanco" />
                                <Picker.Item label="Marrón" value="marron" />
                                <Picker.Item label="Violeta" value="violeta" />
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
                                <Picker.Item label="Selecciona una opcion." value="" />

                                <Picker.Item label="Clásica" value="clasica" />
                                <Picker.Item label="Moderna" value="moderna" />
                                <Picker.Item label="Minimalista" value="minimalista" />
                                <Picker.Item label="Elegante" value="elegante" />
                                <Picker.Item label="Vintage" value="vintage" />
                                <Picker.Item label="Ecológica" value="ecologica" />
                                <Picker.Item label="Edición limitada" value="edicion-limitada" />
                                <Picker.Item label="Personalizada" value="personalizada" />
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
                                <Picker.Item label="Selecciona una opcion." value="" />

                                <Picker.Item label="Natural" value="natural" />
                                <Picker.Item label="Aglomerado" value="aglomerado" />
                                <Picker.Item label="Sintético" value="sintetico" />
                                <Picker.Item label="Corcho con tapa roscada" value="tapa-rosca" />
                                <Picker.Item label="Corcho técnico" value="tecnico" />
                                <Picker.Item label="Vidrio" value="vidrio" />
                                <Picker.Item label="Zanconia" value="zanconia" />

                            </Picker>
                        </View>
                        <View style={styles.TextAndInputForm}>
                            <Text style={{ fontSize: 18 }}>Medida de etiqueta a boquete:</Text>
                            <TextInput style={styles.input}
                                keyboardType="numeric"

                                value={producto.medidaEtiquetaBoquete?.toString()}
                                onChangeText={(text) => handleChange('medidaEtiquetaBoquete', text)}
                            />
                            <Text>cm.</Text>
                        </View>

                        <View style={styles.TextAndInputForm}>
                            <Text style={{ fontSize: 18 }}>Medida de etiqueta a base:</Text>
                            <TextInput style={styles.input}
                                keyboardType="numeric"

                                value={producto.medidaEtiquetaBase?.toString()}
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

                                    value={producto.altoBotella?.toString()}
                                    onChangeText={(text) => handleChange('AltoBotella', text)}

                                />
                                <Text style={{ fontSize: 18 }}>cm.</Text>
                            </View>
                            <View style={styles.TextAndInputForm}>
                                <Text style={{ fontSize: 18 }}>Ancho</Text>
                                <TextInput
                                    style={styles.input}
                                    value={producto.anchoBotella?.toString()}
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
                                    />
                                    <Text>Max.</Text>
                                    <TextInput style={styles.input}
                                        value={producto.azucarMax}
                                        onChangeText={(text) => handleChange('azucarMax', text)}
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
                                    />
                                    <Text>Max.</Text>
                                    <TextInput style={styles.input}
                                        value={producto.sulfurosMax}
                                        onChangeText={(text) => handleChange('sulfurosMax', text)}
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
                                    />
                                    <Text>Max.</Text>
                                    <TextInput style={styles.input}
                                        value={producto.densidadMax}
                                        onChangeText={(text) => handleChange('densidadMax', text)}
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
                                    />
                                    <Text>Max.</Text>
                                    <TextInput style={styles.input}
                                        value={producto.gradoAlcoholicoMax}
                                        onChangeText={(text) => handleChange('gradoAlcoholicoMax', text)}
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

            </ScrollView >

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
                        Guardar Cambios

                    </Text>

                </TouchableOpacity>
                <TouchableOpacity style={styles.BotonesFinales}  >
                    <Text style={{ color: 'white', }}>
                        Cancelar Cambios

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

export default EditarProducto;
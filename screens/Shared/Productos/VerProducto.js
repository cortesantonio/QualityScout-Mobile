import { TouchableOpacity, StyleSheet, View, Text, Image, ScrollView, } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL_API_BACKEND } from '../../../config';

const VerProducto = ({ navigation }) => {

    const route = useRoute();
    const { id } = route.params;
    const [JsonProducto, setJsonProducto] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [jsonBotella, setJsonBotella] = useState({})

    const obtenerDatos = async (id) => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            if (token == null) {
                alert('Token de autorización no encontrado.');
                return;
            }
            const response = await fetch(`${URL_API_BACKEND}/api/ProductosApi/${id}`, {
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
            setJsonProducto(data); // Almacena los datos en el estado
            setIsLoading(false);
            obtenerBotella(data.productoDetalles[0]?.idBotellaDetalles)

        } catch (error) {
            console.error('Error obteniendo los datos:', error);
            alert('Ocurrió un error al obtener los datos restantes, verifica que existan los datos relacionados a producto.');
        }
    };





    const [UserSession, setUserSession] = useState(null); // Estado para almacenar los datos del usuario

    // Efecto para obtener la sesión de usuario desde AsyncStorage
    useEffect(() => {
        const fetchUserData = async () => {
            const sessionUser = await AsyncStorage.getItem('userJson');

            if (sessionUser) {
                try {
                    const userLogData = JSON.parse(sessionUser); // Convertir de nuevo a objeto
                    setUserSession(userLogData.Rol); // Actualiza el estado con los datos del usuario
                } catch (error) {
                    console.error("Error al parsear el JSON:", error);
                }
            }
        };

        fetchUserData(); // Llama a la función para recuperar los datos
    }, []);

    const obtenerBotella = async (id) => {

        try {
            const token = await AsyncStorage.getItem('userToken');
            if (token == null) {
                alert('Token de autorización no encontrado.');
                return;
            }
            const response = await fetch(`${URL_API_BACKEND}/api/ProductosApi/getbotella/${id}`, {
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
            setJsonBotella(data); // Almacena los datos en el estado

        } catch (error) {
            alert('No se encontraron datos relacionados a la botella');
        }
    }

    // Efecto para obtener los datos al montar el componente
    useEffect(() => {
        obtenerDatos(id); // Llama a la función al montar el componente
    }, [id]); // Solo se ejecuta al montar el componente

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 24, color: 'black' }}>Cargando...</Text>
            </View>
        );
    }



    const actualizarEstadoActivo = async (id) => {

        const token = await AsyncStorage.getItem('userToken');

        if (token == null) {
            alert('No se encontro token, no se pudo crear el producto.')
            return;
        }
        try {
            const response = await fetch(`${URL_API_BACKEND}/api/ProductosApi/UpdateActivo/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`

                },
            });

            if (response.ok) {
                alert('El estado del producto ha sido actualizado correctamente.');
                navigation.goBack()
            } else {
                alert('Hubo un problema al actualizar el estado del producto.');
            }
        } catch (error) {
            console.error('Error al actualizar el estado del producto:', error);
            alert('Error', 'Ocurrió un error al intentar actualizar el estado del producto.');
        }
    };



    const formatearFecha = (fechaIso, soloFecha) => {
        const fecha = new Date(fechaIso);
        const dia = fecha.getDate().toString().padStart(2, '0');
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const anio = fecha.getFullYear();
        const horas = fecha.getHours().toString().padStart(2, '0');
        const minutos = fecha.getMinutes().toString().padStart(2, '0');
        const segundos = fecha.getSeconds().toString().padStart(2, '0');
        if (soloFecha) {
            return `${dia}-${mes}-${anio}`;
        }

        return `${dia}-${mes}-${anio} ${horas}:${minutos}:${segundos}`;



    };

    const iconEditarProducto = require('../../../assets/icons/editarProducto.png');
    const iconPausa = require('../../../assets/icons/iconPausa.png');
    const iconBuscador = require('../../../assets/icons/iconBuscador.png');

    let VinoImagen = ''
    if (JsonProducto.urlImagen == null || JsonProducto.urlImagen == '' || JsonProducto.urlImagen == undefined) {
        JsonProducto.urlImagen = require('../../../assets/images/VinoEjemplo.jpg');
    } else {
        VinoImagen = { uri: JsonProducto.urlImagen };
    }




    return (
        <View style={styles.container}>
            <ScrollView style={styles.scroll}>
                <Image source={VinoImagen} style={styles.image} />

                <View style={styles.containerInfo}>
                    <View style={{ marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ width: '75%' }}>
                            <Text style={{ fontSize: 21, fontWeight: 'bold', textTransform: 'capitalize' }}>{JsonProducto.nombre}</Text>
                            <Text style={{ fontSize: 10 }}>CODIGO: {JsonProducto.codigoBarra}</Text>
                            <Text style={{ fontSize: 10 }}>COD. VE: {JsonProducto.codigoVE}</Text>
                            <Text style={{ fontSize: 10 }}>ENCARGADO: {JsonProducto.idUsuarios}</Text>
                        </View>

                        {UserSession === "Especialista" && (

                            <View style={{ flexDirection: 'row', gap: 10 }}>
                                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => { navigation.navigate("EditarProducto", { id: JsonProducto.id }) }}
                                >
                                    <Image source={iconEditarProducto} style={{ width: 20, height: 20 }} />
                                    <Text style={{ fontSize: 8 }}>EDITAR</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => { actualizarEstadoActivo(JsonProducto.id) }}>
                                    <Image source={iconPausa} style={{ width: 20, height: 20 }} />
                                    <Text style={{ fontSize: 8 }}>DESACTIVAR</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                    </View>

                    <Text style={[styles.textInfo, { fontWeight: 'bold', marginBottom: 5 }]}>Informacion Producto.</Text>
                    <Text style={styles.textInfo}>Nombre: {JsonProducto.nombre}</Text>
                    <Text style={styles.textInfo}>Pais Destino: {JsonProducto.paisDestino}</Text>
                    <Text style={styles.textInfo}>Fecha Registro: {formatearFecha(JsonProducto.fechaRegistro)}</Text>
                    <Text style={styles.textInfo}>Idioma: {JsonProducto.idioma}</Text>
                    <Text style={styles.textInfo}>Unidad de Medida: {JsonProducto.unidadMedida}</Text>
                    <Text style={styles.textInfo}>Descripcion de Capsula: {JsonProducto.descripcionCapsula}</Text>

                    <Text style={[styles.textInfo, { fontWeight: 'bold', marginBottom: 5, marginTop: 20 }]}>Informacion Quimica del Producto.</Text>
                    <Text style={styles.textInfo}>Cepa: {JsonProducto.informacionQuimica?.cepa}</Text>
                    <Text style={styles.textInfo}>Azucar: {JsonProducto.informacionQuimica?.minAzucar} - {JsonProducto.informacionQuimica?.maxAzucar}</Text>
                    <Text style={styles.textInfo}>Sulfuro: {JsonProducto.informacionQuimica?.minSulfuroso} - {JsonProducto.informacionQuimica?.maxSulfuroso}</Text>
                    <Text style={styles.textInfo}>Densidad: {JsonProducto.informacionQuimica?.minDensidad} - {JsonProducto.informacionQuimica?.maxDensidad}</Text>
                    <Text style={styles.textInfo}>Grados Alcoholicos: {JsonProducto.informacionQuimica?.minGradoAlcohol} - {JsonProducto.informacionQuimica?.maxGradoAlcohol}</Text>

                    <Text style={[styles.textInfo, { fontWeight: 'bold', marginBottom: 5, marginTop: 20 }]}>Detalles del Producto.</Text>
                    <Text style={styles.textInfo}>Capacidad: {JsonProducto.productoDetalles[0]?.capacidad}</Text>
                    <Text style={styles.textInfo}>Tipo de Capsula: {JsonProducto.productoDetalles[0]?.tipoCapsula}</Text>
                    <Text style={styles.textInfo}>Tipo de Etiqueta: {JsonProducto.productoDetalles[0]?.tipoEtiqueta}</Text>
                    <Text style={styles.textInfo}>Color de Botella: {JsonProducto.productoDetalles[0]?.colorBotella}</Text>
                    <Text style={styles.textInfo}>Medalla: {JsonProducto.productoDetalles[0]?.medalla ? <Text>Si</Text> : <Text>No</Text>}</Text>
                    <Text style={styles.textInfo}>Color de Capsula: {JsonProducto.productoDetalles[0]?.colorCapsula}</Text>
                    <Text style={styles.textInfo}>Tipo de Corcho: {JsonProducto.productoDetalles[0]?.tipoCorcho}</Text>
                    <Text style={styles.textInfo}>Medida de Etiqueta a Boquete: {JsonProducto.productoDetalles[0]?.medidaEtiquetaABoquete}</Text>
                    <Text style={styles.textInfo}>Medida de Etiqueta a Base: {JsonProducto.productoDetalles[0]?.medidaEtiquetaABase}</Text>



                    <Text style={[styles.textInfo, { fontWeight: 'bold', marginBottom: 5, marginTop: 20 }]}>Historial del Producto.</Text>
                    <Text style={styles.textInfo}>Fecha de Cosecha: {formatearFecha(JsonProducto.productoHistorial[0]?.fechaCosecha, true)}</Text>
                    <Text style={styles.textInfo}>Fecha de Producción: {formatearFecha(JsonProducto.productoHistorial[0]?.fechaProduccion, true)}</Text>
                    <Text style={styles.textInfo}>Fecha de Envasado: {formatearFecha(JsonProducto.productoHistorial[0]?.fechaEnvasado, true)}</Text>


                    <Text style={[styles.textInfo, { fontWeight: 'bold', marginBottom: 5, marginTop: 20 }]}>Detalle de botella.</Text>
                    <Text style={styles.textInfo}>Nombre: {jsonBotella.nombreBotella}</Text>
                    <Text style={styles.textInfo}>Altura: {jsonBotella.alturaBotella}cm.</Text>
                    <Text style={styles.textInfo}>Ancho: {jsonBotella.anchoBotella}cm.</Text>



                </View>
            </ScrollView>

            <TouchableOpacity style={styles.ButtonCirculoAtras} onPress={() => navigation.goBack()}>
                <View style={styles.CirculoAtras}>
                    <View style={{ flexDirection: 'row', marginTop: 25 }}>
                        <Text style={{ color: 'white', fontSize: 34 }}>Atrás</Text>
                    </View>
                    <Text style={{ color: 'white', fontSize: 22 }}>Registros</Text>
                </View>
            </TouchableOpacity>


            {UserSession != "Especialista" && (

                <TouchableOpacity style={styles.botonRealizarControl} onPress={() => navigation.navigate('CrearControl', { productoRecibido: JsonProducto })}>
                    <Text style={{ color: 'white' }}>REALIZAR CONTROL</Text>
                </TouchableOpacity>
            )}

            < TouchableOpacity style={styles.botonBuscadorFlotante} onPress={() => navigation.navigate('Buscador')}>
                <Image source={iconBuscador} style={{ width: 30, height: 30 }} resizeMode="contain" />
            </TouchableOpacity>
        </View >
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
    },
    botonRealizarControl: {
        position: 'absolute',
        bottom: 20,
        left: '10%',

        width: '80%',
        height: 50,
        backgroundColor: '#270403',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5

    }, botonBuscadorFlotante: {
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
    textInfo: {
        fontSize: 14,
    }

})

export default VerProducto;
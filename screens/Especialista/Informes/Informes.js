import { Dimensions, StyleSheet, Text, View, Image, Pressable, FlatList, TextInput, Animated, ActivityIndicator } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Nav, Footer } from '../../../components/shared';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL_API_BACKEND } from '../../../config';

// iconos propios 


const iconLupa = require('../../../assets/icons/iconLupa.png')
const iconInformes = require('../../../assets/icons/iconInformes.png')

const iconGo = require('../../../assets/icons/iconGo.png')
const iconVarita = require('../../../assets/icons/iconVarita.png')
const iconReload = require('../../../assets/icons/iconReload.png')

const Informes = ({ navigation }) => {
    const [loading, setLoading] = useState(false)

    //datos para generar informe
    const [user, setUser] = useState({});
    const [nuevoInforme, setNuevoInforme] = useState(
        {
            titulo: '',
            descripcion: '',
            encargado: '',
            idUsuario: null,
        }
    )
    const handleChange = (name, value) => {
        setNuevoInforme({
            ...nuevoInforme,
            [name]: value
        })
    }


    const [busqueda, setBusqueda] = useState(''); // Estado para la búsqueda

    // recupera el usuario logeado
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


    //recupera todos los informes de base de datos.
    const [DATA, setDATA] = useState([])


    const obtenerInformes =async () => {
        await fetch(`${URL_API_BACKEND}/api/ApiDashboard/ResumenControles`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.error('Error al obtener los informes:', error);
            });
    };

    useEffect(() => {
        obtenerInformes();
    }, []);





    const [usuariosFiltrados, setUsuariosFiltrados] = useState(DATA); // Estado para la lista filtrada

    const handleBuscar = (text) => {
        setBusqueda(text);
        if (text) {
            const filtrados = DATA.filter(item =>
                item.encargado.toLowerCase().includes(text.toLowerCase()) ||
                item.encargado.includes(text)
            );
            setUsuariosFiltrados(filtrados);
        } else {
            setUsuariosFiltrados(DATA);
        }
    };
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
        return `${dia}.${mes}.${anio} ${horas}:${minutos}Hrs.`;
    }
    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <View style={{ backgroundColor: '#4b0404', width: 40, height: 40, padding: 5, borderRadius: 7, justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ width: '80%', height: '80%', resizeMode: 'contain' }} source={iconInformes} />
            </View>

            <View style={styles.infoCard} >
                <Text style={styles.titleInfo}>Fecha: {formatearFecha(item.fecha)}</Text>
                <Text style={styles.subtitleInfo}>Titulo: {item.titulo} - Encargado: {item.usuario.nombre}</Text>

            </View>

            <View style={{ display: 'flex', backgroundColor: '#bf6565', padding: 3, borderRadius: 3 }}>

                <TouchableOpacity onPress={() => navigation.navigate('VerInforme', { item: item })}>
                    <Image source={iconGo} style={styles.iconAcciones}></Image>
                </TouchableOpacity>
            </View>
        </View>
    );
    // Estado animado para controlar el desplazamiento de la FlatList
    const translateY = useRef(new Animated.Value(0)).current;

    // Efecto para controlar el desplazamiento según el estado de loading
    useEffect(() => {
        Animated.timing(translateY, {
            toValue: loading ? 50 : 0,  // Desplazamiento de 50 hacia abajo si loading está activo
            duration: 300,              // Duración de la animación
            useNativeDriver: true       // Mejora el rendimiento usando animaciones nativas
        }).start();
    }, [loading]);

    

    return (

        <>
            <Nav />
            <View style={styles.container}>
                <Text style={styles.TituloPantalla}>Gestión de Registro.

                    <TouchableOpacity style={{ backgroundColor: '#4b0404', padding: 5, borderRadius: 10 }} onPress={() => { obtenerInformes() }}>
                        <Image source={iconReload} style={{ width: 10, height: 10 }}></Image>
                    </TouchableOpacity>
                </Text>

                <View style={styles.buscador}>
                    <Image source={iconLupa} style={styles.iconLupa} ></Image>

                    <TextInput
                        style={styles.inputBuscador}
                        placeholder="Ingresa Nombre del Usuario"
                        value={busqueda}
                        onChangeText={handleBuscar}
                    />
                </View>
                <View style={styles.contenedorBotones}>


                    <TouchableOpacity style={styles.TouchableBoton} onPress={() => { navigation.navigate('CrearInforme') }}>
                        <Image source={iconVarita} style={styles.iconsBotones} ></Image>
                        <Text style={styles.botonText}>Generar Informe con IA</Text>
                    </TouchableOpacity>

                </View>
                <View>
                    {/*encabezado de la lista*/}
                    <View style={styles.encabezado}>
                        <Text style={{ fontSize: 18 }}>Registros</Text>

                    </View>

                    {/* cuerpo de la lista*/}
                    <View style={styles.containerProductos}>

                        {loading && (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="large" color="#260202" />
                                <Text style={styles.loadingText}>Cargando...</Text>
                            </View>
                        )}


                        <Animated.View style={{ transform: [{ translateY }] }}>
                            <FlatList
                                style={styles.flatList}
                                data={usuariosFiltrados}
                                keyExtractor={item => item.id}
                                renderItem={renderItem}
                            />
                        </Animated.View>

                    </View>
                </View>


            </View>
            <Footer />
        </>


    );
};


const styles = StyleSheet.create({

    container: {
        width: '100%',
        padding: 25
    },
    inputBuscador: {
        width: '90%'
    },
    iconLupa: {
        width: 15,
        height: 15

    },
    buscador: {
        width: '100%',
        borderColor: 'black',
        height: 30,
        borderWidth: 1,
        borderRadius: 10, padding: 5,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        gap: 10,

    },
    contenedorBotones: {
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    iconsBotones: {
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
        gap: 5

    },
    botonText: {
        color: 'white', fontSize: 14
    },


    TituloPantalla: {
        fontSize: 20,
        marginBottom: 20
    }
    , filtros: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
        marginBottom: 10,
        gap: 15

    },
    TouchableBotonLista: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    }, encabezado: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    containerProductos: {
        width: '100%',
        height: '70%'

    },

    item: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        paddingBottom: 10,
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 5

    }

    ,
    infoCard: {
        width: '75%'
    },
    titleInfo: {
        fontSize: 16,
    }
    , subtitleInfo: {
        fontSize: 12,
        color: 'gray'
    }
    , iconAcciones: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
    }, flatList: {
        height: Dimensions.get('window').height/2.5,
        flexGrow: 0,
    },


    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
        paddingBottom: 10

    },
    modalButton: {
        marginBottom: 15,
        marginLeft: 10,

    }, inputModal: {
        backgroundColor: '#dbd7d7',
        borderRadius: 4,
        padding: 2,
        marginBottom: 10,
        color: 'gray',
        height: 30
    }, labels: {
        fontSize: 14,
        color: 'gray'

    }, loadingContainer: {
        marginTop: 50,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    }
});


export default Informes;
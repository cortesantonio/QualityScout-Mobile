import React, { useState, useEffect, useRef } from 'react';
import {
    View, Text, TouchableOpacity, Image, TextInput, FlatList, Modal, StyleSheet, Dimensions, ActivityIndicator, Animated
} from 'react-native';
import { Footer, Nav } from '../../../components/shared';
import { URL_API_BACKEND } from '../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

// iconos propios
const iconLupa = require('../../../assets/icons/iconLupa.png')
const iconAdd = require('../../../assets/icons/iconAdd.png')
const iconUsuario = require('../../../assets/icons/iconUsuario.png')
const iconPausa = require('../../../assets/icons/iconPausaWhite.png')
const iconGo = require('../../../assets/icons/iconGo.png')
const iconActivarUser = require('../../../assets/icons/iconActivarUser.png')
const iconReload = require('../../../assets/icons/iconReload.png')



const Usuarios = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [usuarioActivo, setUsuarioActivo] = useState();

    const [busqueda, setBusqueda] = useState('');
    const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para manejar la carga


    const [DATA, setDATA] = useState('');





    const obtenerDatos = async () => {
        setLoading(true); // Cambia el estado de carga al inicio
        try {

            const token = await AsyncStorage.getItem('userToken');
            if (token == null) {
                alert('Token de autorización no encontrado.');
                return;
            }
            const response = await fetch(`${URL_API_BACKEND}/api/UsuariosApi`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }

            setDATA(await response.json())

        } catch (error) {
            console.error('Error obteniendo los datos:', error);
            alert('Ocurrió un error al obtener los datos.');
        } finally {
            setLoading(false); // Cambia el estado de carga al final
        }
        setLoading(false)
    };



    useEffect(() => {
        obtenerDatos(); // Llama a la función al montar el componente
    }, []); // Solo se ejecuta al montar el componente



    const actualizarEstadoActivo = async (idUsuario) => {

        const token = await AsyncStorage.getItem('userToken');

        if (token == null) {
            alert('No se encontro token, no se pudo crear el usuario.')
            return;
        }
        try {
            const response = await fetch(`${URL_API_BACKEND}/api/UsuariosApi/UpdateActivo/${idUsuario}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`

                },
            });

            if (response.ok) {
                alert('El estado del usuario ha sido actualizado correctamente.');
                obtenerDatos()

            } else {
                alert('Hubo un problema al actualizar el estado del usuario.');
            }
        } catch (error) {
            console.error('Error al actualizar el estado del usuario:', error);
            alert('Error', 'Ocurrió un error al intentar actualizar el estado del usuario.');
        }
    };

    const abrirModal = (rut, activo) => {
        setUsuarioSeleccionado(rut);
        setUsuarioActivo(activo);
        setModalVisible(true);
    };

    const cerrarModal = () => {
        setModalVisible(false);
        setUsuarioSeleccionado(null);
        setUsuarioActivo(null);
    };

    const ModalDesactivarUsuario = () => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={cerrarModal}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Desea {usuarioActivo ? 'desactivar' : 'activar'} al usuario con rut {usuarioSeleccionado}?</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 10, justifyContent: 'space-around' }}>
                        <TouchableOpacity onPress={cerrarModal} style={{ backgroundColor: '#bf6565', padding: 10, borderRadius: 5, }}>
                            <Text style={{ fontSize: 14, color: 'white', textTransform: 'uppercase' }}>No</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            actualizarEstadoActivo(usuarioSeleccionado, usuarioActivo ? false : true);
                            cerrarModal();
                        }}
                            style={{ backgroundColor: '#bf6565', padding: 10, borderRadius: 5, }}>
                            <Text style={{ fontSize: 14, color: 'white', textTransform: 'uppercase' }}>Si</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );


    useEffect(() => {
        setUsuariosFiltrados(DATA); // Inicialmente muestra todos los datos
    }, [DATA]); // Se ejecuta cuando los datos cambian

    const handleBuscar = (text) => {
        setBusqueda(text);
        if (text) {
            const filtrados = DATA.filter(item =>
                item.nombre.toLowerCase().includes(text.toLowerCase()) ||
                item.rut.includes(text)
            );
            setUsuariosFiltrados(filtrados);
        } else {
            setUsuariosFiltrados(DATA);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <View style={{ backgroundColor: '#4b0404', width: 40, height: 40, padding: 5, borderRadius: 7, justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ width: '80%', height: '80%', resizeMode: 'contain' }} source={iconUsuario} />
            </View>

            <View style={styles.infoCard}>
                <Text style={styles.titleInfo}>{item.nombre}</Text>
                <Text style={[styles.subtitleInfo, { textTransform: 'capitalize', fontSize: 10 }]}>{item.nombreRol}</Text>
                <Text style={styles.subtitleInfo}>{item.rut}</Text>

            </View>

            <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#bf6565', gap: 10, padding: 3, borderRadius: 3 }}>
                <TouchableOpacity onPress={() => abrirModal(item.rut, item.activo)}>
                    {item.activo ? <Image source={iconPausa} style={styles.iconAcciones} /> : <Image source={iconActivarUser} style={styles.iconAcciones} />}
                </TouchableOpacity>


                <TouchableOpacity onPress={() => navigation.navigate('VerUsuario', { RUT: item.rut, Nombre: item.nombre, Rol: item.nombreRol, Correo: item.email })}>
                    <Image source={iconGo} style={styles.iconAcciones} />
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
                <Text style={styles.TituloPantalla}>Gestión de Usuarios.

                    <TouchableOpacity style={{ backgroundColor: '#4b0404', padding: 5, borderRadius: 10 }} onPress={() => { obtenerDatos() }}>
                        <Image source={iconReload} style={{ width: 10, height: 10 }}></Image>
                    </TouchableOpacity>


                </Text>

                <View style={styles.buscador}>
                    <Image source={iconLupa} style={styles.iconLupa} />
                    <TextInput
                        style={styles.inputBuscador}
                        placeholder="Ingresa RUT o Nombre del Usuario"
                        value={busqueda}
                        onChangeText={handleBuscar}
                    />
                </View>

                <View style={styles.contenedorBotones}>
                    <TouchableOpacity style={styles.TouchableBoton} onPress={() => navigation.navigate('CrearUsuario')}>
                        <Image source={iconAdd} style={styles.iconsBotones} />
                        <Text style={styles.botonText}>Añadir Usuarios</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <View style={styles.encabezado}>
                        <Text style={{ fontSize: 18 }}>Registros</Text>
                    </View>

                    <View style={styles.containerProductos}>
                        {loading && (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="large" color="#260202" />
                                <Text style={styles.loadingText}>Cargando...</Text>
                            </View>
                        )}

                        {/* FlatList envuelta en un Animated.View */}
                        <Animated.View style={{ transform: [{ translateY }] }}>
                            <FlatList
                                style={styles.flatList}
                                data={usuariosFiltrados}  // Cambia de DATA a usuariosFiltrados
                                keyExtractor={item => item.id.toString()}  // Asegúrate de que el ID sea una cadena
                                renderItem={renderItem}
                            />
                        </Animated.View>
                    </View>
                </View>

                {usuarioSeleccionado && <ModalDesactivarUsuario />}
            </View>
            <Footer />
        </>


    );
};

const styles = StyleSheet.create({

    container: {
        width: '100%',
        padding: 25,

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
        gap: 5,
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
        width: '60%'
    }, titleInfo: { fontSize: 16 }
    , subtitleInfo: {
        fontSize: 12,
        color: 'gray'
    }
    , iconAcciones: {
        width: 20,
        height: 25,
        resizeMode: 'contain',
    }, flatList: {
        height: Dimensions.get('window').height,
        flexGrow: 0,
    },
    modalContainer: {
        width: 300,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',

    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    modalButton: {
        backgroundColor: '#4b0404',
        padding: 10,
        borderRadius: 8,
        width: 80,
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#fff',
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

    },
    loadingContainer: {
        marginTop: 50,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    }



});


export default Usuarios;
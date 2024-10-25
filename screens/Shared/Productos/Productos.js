import { Dimensions, StyleSheet, Text, View, Image, Pressable, FlatList, TextInput } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Footer, Nav } from '../../../components/shared';

import { useRoute } from '@react-navigation/native';
import { useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { URL_API_BACKEND } from '../../../config';
import { icon } from '@fortawesome/fontawesome-svg-core';


// iconos propios 

const iconFiltro = require('../../../assets/icons/iconFiltro.png')
const iconOrden = require('../../../assets/icons/iconOrden.png')

const iconLupa = require('../../../assets/icons/iconLupa.png')
const iconAdd = require('../../../assets/icons/iconAdd.png')
const iconCamara = require('../../../assets/icons/iconCamara.png')

const iconVino = require('../../../assets/icons/iconVino.png')
const iconPausaWhite = require('../../../assets/icons/iconPausaWhite.png')
const iconGo = require('../../../assets/icons/iconGo.png')
const iconCheck = require('../../../assets/icons/iconCheck.png')

const iconReload = require('../../../assets/icons/iconReload.png')

const Productos = ({ navigation }) => {

    const [UserSession, setUserSession] = useState(null); // Estado para almacenar los datos del usuario
    const [DATA, setDATA] = useState([]); // Inicializa el estado de DATA como un array vacío
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState([]); // Inicializa filteredData como un array vacío

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

    // Función para obtener los datos de productos
    const obtenerDatos = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            if (token == null) {
                alert('Token de autorización no encontrado.');
                return;
            }
            const response = await fetch(`${URL_API_BACKEND}/api/ProductosApi`, {
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
            setDATA(data); // Almacena los datos en el estado DATA
        } catch (error) {
            console.error('Error obteniendo los datos:', error);
            alert('Ocurrió un error al obtener los datos.');
        }
    };

    // Efecto para obtener los datos al montar el componente
    useEffect(() => {
        obtenerDatos(); // Llama a la función al montar el componente
    }, []); // Solo se ejecuta al montar el componente

    // Efecto para actualizar `filteredData` cuando cambie `DATA`
    useEffect(() => {
        setFilteredData(DATA);  // Actualiza filteredData cuando DATA cambia
    }, [DATA]);

    // Manejo de la búsqueda
    const handleSearch = (text) => {
        setSearchText(text);
        const filtered = DATA.filter(item =>
            item.cod.includes(text) || item.nombre.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredData(filtered);
    };





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
                obtenerDatos()

            } else {
                alert('Hubo un problema al actualizar el estado del producto.');
            }
        } catch (error) {
            console.error('Error al actualizar el estado del producto:', error);
            alert('Error', 'Ocurrió un error al intentar actualizar el estado del producto.');
        }
    };








    // Renderiza cada elemento de la lista
    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <>
                <View style={{ backgroundColor: '#4b0404', width: 40, height: 40, padding: 5, borderRadius: 7 }}>
                    <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={iconVino} />
                </View>

                <View style={styles.infoCard} >
                    <Text style={styles.titleInfo}>{item.nombre} - {item.informacionQuimica.cepa}</Text>
                    <Text style={styles.subtitleInfo}>Cod. Barra: {item.codigoBarra}  Destino: {item.paisDestino} </Text>
                </View>
            </>

            <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#bf6565', gap: 10, padding: 5, borderRadius: 3 }}>
                {UserSession === "Especialista" && (

                    <TouchableOpacity onPress={() => { actualizarEstadoActivo(item.id) }}>
                        {item.activo ? <Image source={iconPausaWhite} style={styles.iconAcciones} /> : <Image source={iconCheck} style={styles.iconAcciones} />}
                    </TouchableOpacity>



                )}

                {item.activo ?
                    <TouchableOpacity onPress={() => navigation.navigate('VerProducto', { id: item.id })}>
                        <Image source={iconGo} style={styles.iconAcciones}></Image>
                    </TouchableOpacity> :

                    <></>}

            </View>
        </View>
    );

    return (
        <>
            <Nav />
            <View style={styles.container}>
                <Text style={styles.TituloPantalla}>Gestión de productos. <TouchableOpacity style={{ backgroundColor: '#4b0404', padding: 5, borderRadius: 10 }} onPress={() => { obtenerDatos() }}>
                    <Image source={iconReload} style={{ width: 10, height: 10 }}></Image>
                </TouchableOpacity></Text>


                <View style={styles.buscador}>
                    <Image source={iconLupa} style={styles.iconLupa}></Image>
                    <TextInput
                        style={styles.inputBuscador}
                        placeholder='Ingresa codigo o nombre del producto'
                        value={searchText}
                        onChangeText={handleSearch}  // Actualiza el estado cuando el usuario escribe
                    />
                </View>
                <View style={styles.contenedorBotones}>
                    <TouchableOpacity style={styles.TouchableBoton} onPress={() => navigation.navigate('Buscador')}>
                        <Image source={iconCamara} style={styles.iconsBotones}></Image>
                        <Text style={styles.botonText}>Abrir Escaner</Text>
                    </TouchableOpacity>

                    {UserSession === "Especialista" && (
                        <TouchableOpacity style={styles.TouchableBoton} onPress={() => navigation.navigate('CrearProducto')}>
                            <Image source={iconAdd} style={styles.iconsBotones}></Image>
                            <Text style={styles.botonText}>Añadir Productos</Text>
                        </TouchableOpacity>
                    )}
                </View>

                <View>
                    {/* Encabezado de la lista */}
                    <View style={styles.encabezado}>
                        <Text style={{ fontSize: 18 }}>Registros</Text>

                    </View>

                    {/* Cuerpo de la lista */}
                    <View style={styles.containerProductos}>
                        <FlatList
                            style={styles.flatList}
                            data={filteredData}
                            keyExtractor={item => item.id}
                            renderItem={renderItem}
                        />
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
        justifyContent: 'space-between'
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
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
        marginTop: 10
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
    }, titleInfo: { fontSize: 16, textTransform: 'capitalize' }
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
    }
});


export default Productos;
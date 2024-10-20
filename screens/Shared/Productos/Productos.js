import { Dimensions, StyleSheet, Text, View, Image, Pressable, FlatList, TextInput } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Footer, Nav } from '../../../components/shared';

import { useRoute } from '@react-navigation/native';
import { useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

// iconos propios 

const iconFiltro = require('../../../assets/icons/iconFiltro.png')
const iconOrden = require('../../../assets/icons/iconOrden.png')

const iconLupa = require('../../../assets/icons/iconLupa.png')
const iconAdd = require('../../../assets/icons/iconAdd.png')
const iconCamara = require('../../../assets/icons/iconCamara.png')

const iconVino = require('../../../assets/icons/iconVino.png')
const iconBasurero = require('../../../assets/icons/iconBasurero.png')
const iconGo = require('../../../assets/icons/iconGo.png')

const Productos = ({ navigation }) => {

    const [UserSession, setUserSession] = useState(null); // Estado para almacenar los datos del usuario

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


    const DATA = [
        {
            cod: '12312323123',
            nombe: 'Sauvignon 1234k',
            reserva: 'Reserva Especial',
            destino: 'Chile'
        },
        {
            cod: '444444',
            nombe: 'Sauvignonk',
            reserva: 'Reserva',
            destino: 'Chile'
        },

    ]


    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState(DATA);

    const route = useRoute();

    const handleSearch = (text) => {
        setSearchText(text);
        const filtered = DATA.filter(item =>
            item.cod.includes(text) || item.nombe.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredData(filtered);
    };
    const { codigo } = route.params || {};


    useEffect(() => {
        if (codigo) {
            handleSearch(codigo);  // Ejecutar la búsqueda con el código una vez
        }
    }, [codigo]);


    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <>
                <View style={{ backgroundColor: '#4b0404', width: 40, height: 40, padding: 5, borderRadius: 7 }}>
                    <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={iconVino} />
                </View>

                <View style={styles.infoCard} >
                    <Text style={styles.titleInfo}>{item.nombe} - {item.reserva}</Text>
                    <Text style={styles.subtitleInfo}>VE: {item.cod}  Destino: {item.destino}</Text>
                </View>


            </>

            <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#bf6565', gap: 10, padding: 3, borderRadius: 3 }}>

                {UserSession === "Especialista" && (

                    <TouchableOpacity >
                        <Image source={iconBasurero} style={styles.iconAcciones}></Image>
                    </TouchableOpacity>

                )}
                <TouchableOpacity onPress={() => navigation.navigate('VerProducto')} >
                    <Image source={iconGo} style={styles.iconAcciones}></Image>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <>
            <Nav />
            <View style={styles.container}>
                <Text style={styles.TituloPantalla}>Gestión de productos.</Text>

                <View style={styles.buscador}>
                    <Image source={iconLupa} style={styles.iconLupa} ></Image>
                    <TextInput
                        style={styles.inputBuscador}
                        placeholder='Ingresa codigo o nombre del producto'
                        value={searchText}
                        onChangeText={handleSearch}  // Actualiza el estado cuando el usuario escribe
                    />
                </View>
                <View style={styles.contenedorBotones}>
                    <TouchableOpacity style={styles.TouchableBoton} onPress={() => navigation.navigate('Buscador')} >
                        <Image source={iconCamara} style={styles.iconsBotones}></Image>
                        <Text style={styles.botonText}>Abrir Escaner</Text>
                    </TouchableOpacity>

                    {UserSession === "Especialista" && (
                        <TouchableOpacity style={styles.TouchableBoton} onPress={() => navigation.navigate('CrearProducto')}>
                            <Image source={iconAdd} style={styles.iconsBotones} ></Image>
                            <Text style={styles.botonText}>Añadir Productos</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <View>
                    {/*encabezado de la lista*/}
                    <View style={styles.encabezado}>
                        <Text style={{ fontSize: 18 }}>Registros</Text>
                        <View style={styles.filtros}>
                            <TouchableOpacity style={styles.TouchableBotonLista}>
                                <Image source={iconFiltro} style={styles.iconsBotones}></Image>
                                <Text>
                                    Filtro
                                </Text>

                            </TouchableOpacity>
                            <TouchableOpacity style={styles.TouchableBotonLista}>
                                <Image source={iconOrden} style={styles.iconsBotones}></Image>

                                <Text>
                                    Ordenar
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                    {/* cuerpo de la lista*/}
                    <View style={styles.containerProductos}>
                        <FlatList
                            style={styles.flatList}
                            data={filteredData}
                            keyExtractor={item => item.cod}
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
    }
});


export default Productos;
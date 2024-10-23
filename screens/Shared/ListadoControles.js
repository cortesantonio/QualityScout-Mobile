import { Dimensions, StyleSheet, Text, View, Image, Pressable, FlatList, TextInput, Modal, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { Footer, Nav } from '../../components/shared';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL_API_BACKEND } from '../../config';
// iconos propios 

const iconFiltro = require('../../assets/icons/iconFiltro.png')
const iconOrden = require('../../assets/icons/iconOrden.png')
const iconOrdenArriba = require('../../assets/icons/iconOrdenArriba.png')


const iconGo = require('../../assets/icons/iconGo.png')
const iconControlCheck = require('../../assets/icons/iconControlCheck.png')


const ListadoControles = ({ navigation }) => {
    const [DATA, setDATA] = useState([]); // Inicializa el estado de DATA como un array vacío


    const [filteredData, setFilteredData] = useState(DATA);
    const [isAscending, setIsAscending] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);



    const obtenerDatos = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            if (token == null) {
                alert('Token de autorización no encontrado.');
                return;
            }
            const response = await fetch(`${URL_API_BACKEND}/api/ApiControles`, {
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
    useEffect(() => {
        setFilteredData(DATA);  // Actualiza filteredData cuando DATA cambia
    }, [DATA]);




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
      
      
      



    const getBackgroundColor = (estado) => {
        switch (estado.toLowerCase()) {
            case 'aprobado':
                return 'rgba(0, 128, 0, 0.1)';
            case 'rechazado':
                return 'rgba(255, 0, 0, 0.1)';
            case 'reproceso':
                return 'rgba(0, 0, 255, 0.1)';
            default:
                return 'rgba(255, 255, 255, 0)';
        }
    };

    const getStateColor = (estado) => {
        switch (estado.toLowerCase()) {
            case 'aprobado':
                return 'green';
            case 'rechazado':
                return 'red';
            case 'reproceso':
                return 'blue';
            default:
                return '#bf6565';
        }
    };

    const sortDataByDate = () => {
        const sortedData = [...filteredData].sort((a, b) => {
            // Convertimos las fechas ISO a objetos Date
            const dateA = new Date(a.fechaHoraPrimerControl);
            const dateB = new Date(b.fechaHoraPrimerControl);
    
            // Ordenamos por fecha
            return isAscending ? dateA - dateB : dateB - dateA;
        });
    
        setFilteredData(sortedData);
        setIsAscending(!isAscending);
    };
    
    const resetFilter = () => {
        setFilteredData(DATA); // Restablecer a los datos originales
        setModalVisible(false); // Cerrar el modal después de seleccionar un filtro

    };
    const filterDataByState = (estado) => {
        const filtered = DATA.filter(item => item.estado.toLowerCase() === estado.toLowerCase());
        setFilteredData(filtered);
        setModalVisible(false); // Cerrar el modal después de seleccionar un filtro
    };

    const renderItem = ({ item }) => (
        <View style={[styles.item, { backgroundColor: getBackgroundColor(item.estado) }]}>
            <View style={{ backgroundColor: '#4b0404', width: 40, height: 40, padding: 5, borderRadius: 7 }}>
                <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={iconControlCheck} />
            </View>

            <View style={styles.infoCard}>
                <Text style={styles.titleInfo}>{item.productos.nombre}</Text>
                <Text style={styles.subtitleInfo}>Fecha: {formatearFecha(item.fechaHoraPrimerControl)} | Estado:<Text style={{ color: getStateColor(item.estado), textTransform: 'uppercase' }}>{item.estado}</Text></Text>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#bf6565', borderRadius: 3, width: 30, height: 30, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => navigation.navigate('VerControl', { ControlJson: item })} >
                    <Image source={iconGo} style={styles.iconAcciones}></Image>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (

        <>
            <Nav />

            <View style={styles.container}>
                <Text style={styles.TituloPantalla}>Registro de Controles.</Text>

                <View>
                    {/* Encabezado de la lista */}
                    <View style={styles.encabezado}>
                        <Text style={{ fontSize: 18 }}>Registros</Text>
                        <View style={styles.filtros}>
                            {/* Botón para abrir el modal de filtros */}
                            <TouchableOpacity style={styles.TouchableBotonLista} onPress={() => setModalVisible(true)}>
                                <Image source={iconFiltro} style={styles.iconsBotones}></Image>
                                <Text>Filtro</Text>
                            </TouchableOpacity>

                            {/* Botón para ordenar por fecha */}
                            <TouchableOpacity style={styles.TouchableBotonLista} onPress={sortDataByDate}>
                                <Image

                                    source={isAscending ? iconOrden : iconOrdenArriba}

                                    style={
                                        styles.iconsBotones
                                    }
                                />
                                <Text>Ordenar por Fecha</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Modal para seleccionar el tipo de estado */}
                    <Modal
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Seleccionar Filtro por Estado</Text>
                                <TouchableOpacity onPress={() => filterDataByState('Aprobado')} style={styles.modalButton}>
                                    <Text>Aprobado</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => filterDataByState('Rechazado')} style={styles.modalButton}>
                                    <Text>Rechazado</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => filterDataByState('Reproceso')} style={styles.modalButton}>
                                    <Text>Reproceso</Text>
                                </TouchableOpacity>

                                <View style={{ display: 'flex', flexDirection: 'row', gap: 10, justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={() => resetFilter()}>
                                        <Text style={{ fontSize: 14, color: '#260202', textTransform: 'uppercase' }}>Restablecer</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                                        <Text style={{ fontSize: 14, color: '#bf6565', textTransform: 'uppercase' }}>Cancelar</Text>
                                    </TouchableOpacity>
                                </View>


                            </View>
                        </View>
                    </Modal>

                    {/* Cuerpo de la lista */}
                    <View style={styles.containerProductos}>
                        <FlatList
                            style={styles.flatList}
                            data={filteredData}
                            keyExtractor={item => item.cod}
                            renderItem={renderItem}
                        />
                    </View>
                </View>
            </View >
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
        height: '70%',
        marginTop: 10
    },

    item: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 5,
        borderRadius: 5,
        marginBottom: 5
    }

    ,
    infoCard: {
        width: '70%'
    },
    titleInfo: {
        fontSize: 16,
        textTransform: 'capitalize'
    }
    , subtitleInfo: {
        fontSize: 10,
        color: 'gray',
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
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        textAlign: 'center', paddingBottom: 10

    },
    modalButton: {
        marginBottom: 15,
        marginLeft: 10,

    },
    buttonCloseModal: {
    }
});


export default ListadoControles;
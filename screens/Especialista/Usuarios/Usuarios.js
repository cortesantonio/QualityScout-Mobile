import React, { useState } from 'react';
import {
    View, Text, TouchableOpacity, Image, TextInput, FlatList, Modal, StyleSheet, Dimensions
} from 'react-native';
import { Footer, Nav } from '../../../components/shared';

// iconos propios
const iconLupa = require('../../../assets/icons/iconLupa.png')
const iconAdd = require('../../../assets/icons/iconAdd.png')
const iconUsuario = require('../../../assets/icons/iconUsuario.png')
const iconBasurero = require('../../../assets/icons/iconBasurero.png')
const iconGo = require('../../../assets/icons/iconGo.png')

const Usuarios = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [busqueda, setBusqueda] = useState(''); // Estado para la búsqueda

    const DATA = [
        {
            RUT: '20.967.892-6',
            nombe: 'Antonio Cortes',
            rol: 'Especialista',
            correo: ''
        },
        {
            RUT: '32.417.812-3',
            nombe: 'Trinidad Garay',
            rol: 'Control de Calidad',
            correo: ''

        },
    ];

    const [usuariosFiltrados, setUsuariosFiltrados] = useState(DATA); // Estado para la lista filtrada

    const abrirModal = (rut) => {
        setUsuarioSeleccionado(rut);
        setModalVisible(true);
    };

    const cerrarModal = () => {
        setModalVisible(false);
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
                    <Text style={styles.modalTitle}>Desea desactivar al usuario con rut {usuarioSeleccionado}?</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 10, justifyContent: 'space-around' }}>
                        <TouchableOpacity onPress={cerrarModal}>
                            <Text style={{ fontSize: 14, color: '#260202', textTransform: 'uppercase' }}>No</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={cerrarModal}>
                            <Text style={{ fontSize: 14, color: '#bf6565', textTransform: 'uppercase' }}>Si</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );

    const handleBuscar = (text) => {
        setBusqueda(text);
        if (text) {
            const filtrados = DATA.filter(item =>
                item.nombe.toLowerCase().includes(text.toLowerCase()) ||
                item.RUT.includes(text)
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
                <Text style={styles.titleInfo}>{item.nombe}</Text>
                <Text style={[styles.subtitleInfo, { textTransform: 'capitalize', fontSize: 10 }]}>{item.rol}</Text>
                <Text style={styles.subtitleInfo}>{item.RUT}</Text>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#bf6565', gap: 10, padding: 3, borderRadius: 3 }}>
                <TouchableOpacity onPress={() => abrirModal(item.RUT)}>
                    <Image source={iconBasurero} style={styles.iconAcciones} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('VerUsuario', { RUT: item.RUT , Nombre : item.nombe , Rol: item.rol , Correo: item.Correo})}>
                    <Image source={iconGo} style={styles.iconAcciones} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <>
            <Nav />
            <View style={styles.container}>
                <Text style={styles.TituloPantalla}>Gestión de Usuarios.</Text>

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
                        <FlatList
                            style={styles.flatList}
                            data={usuariosFiltrados}
                            keyExtractor={item => item.RUT}
                            renderItem={renderItem}
                        />
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



});


export default Usuarios;
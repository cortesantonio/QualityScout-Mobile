import { Dimensions, StyleSheet, Text, View, Image, Pressable, FlatList, TextInput, Modal } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';


// iconos propios 


const iconLupa = require('../../../assets/icons/iconLupa.png')
const iconInformes = require('../../../assets/icons/iconInformes.png')

const iconGo = require('../../../assets/icons/iconGo.png')
const iconVarita = require('../../../assets/icons/iconVarita.png')

const Informes = () => {
    const [busqueda, setBusqueda] = useState(''); // Estado para la búsqueda

    const DATA = [
        {
            id: 1,
            fecha: '2023-05-15',
            hora: '10:30',
            enfoque: 'General',
            encargado: 'Juan Pérez',
        },
        {
            id: 2,
            fecha: '2023-05-16',
            hora: '14:45',
            enfoque: 'Especifico',
            encargado: 'María González',
        },
        {
            id: 3,
            fecha: '2023-05-17',
            hora: '09:15',
            enfoque: 'General',
            encargado: 'Pedro Sánchez',
        },

    ]
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

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <View style={{ backgroundColor: '#4b0404', width: 40, height: 40, padding: 5, borderRadius: 7, justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ width: '80%', height: '80%', resizeMode: 'contain' }} source={iconInformes} />
            </View>

            <View style={styles.infoCard} >
                <Text style={styles.titleInfo}>FECHA{item.fecha} HORA {item.hora}</Text>
                <Text style={styles.subtitleInfo}>Titulo: {item.enfoque} Encargado: {item.encargado}</Text>

            </View>

            <View style={{ display: 'flex', backgroundColor: '#bf6565', padding: 3, borderRadius: 3 }}>

                <TouchableOpacity >
                    <Image source={iconGo} style={styles.iconAcciones}></Image>
                </TouchableOpacity>
            </View>
        </View>
    );

    const [modalVisible, setModalVisible] = useState(false);

    const abrirModal = () => {
        setModalVisible(true);
    };

    const cerrarModal = () => {
        setModalVisible(false);
    };

    const ModalCrearInforme = () => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={cerrarModal}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Generar informe con IA</Text>

                    <View>
                        <Text style={styles.labels}>Título de informe</Text>
                        <TextInput style={styles.inputModal}></TextInput>
                        <Text style={styles.labels}>Características a destacar</Text>
                        <TextInput style={styles.inputModal}></TextInput>
                        <Text style={{ fontSize: 10, color: 'gray', marginBottom: 15, marginTop: 5 }}>Podrás encontrar los informes generados en registros.</Text>
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', gap: 10, justifyContent: 'space-around' }}>
                        <TouchableOpacity onPress={cerrarModal} >
                            <Text style={{ fontSize: 14, color: '#260202', textTransform: 'uppercase' }}>CANCELAR</Text>
                        </TouchableOpacity>
                        <TouchableOpacity >
                            <Text style={{ fontSize: 14, color: '#bf6565', textTransform: 'uppercase' }}>GENERAR</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );




    return (
        <View style={styles.container}>
            <Text style={styles.TituloPantalla}>Gestión de Registro.</Text>

            <View style={styles.buscador}>
                <Image source={iconLupa} style={styles.iconLupa} ></Image>

                <TextInput
                    style={styles.inputBuscador}
                    placeholder="Ingresa RUT o Nombre del Usuario"
                    value={busqueda}
                    onChangeText={handleBuscar}
                />
            </View>
            <View style={styles.contenedorBotones}>


                <TouchableOpacity style={styles.TouchableBoton} onPress={abrirModal}>
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
                    <FlatList
                        style={styles.flatList}
                        data={usuariosFiltrados}
                        keyExtractor={item => item.id}
                        renderItem={renderItem}
                    />
                </View>
            </View>

            {modalVisible && <ModalCrearInforme />}
        </View>
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
        color: 'gray'

    }, labels: {
        fontSize: 14,
        color: 'gray'

    }
});


export default Informes;
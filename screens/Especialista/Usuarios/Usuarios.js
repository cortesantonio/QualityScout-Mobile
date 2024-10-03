import { Dimensions, StyleSheet, Text, View, Image, Pressable, FlatList, TextInput } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';


// iconos propios 


const iconLupa = require('../../../assets/icons/iconLupa.png')
const iconAdd = require('../../../assets/icons/iconAdd.png')
const iconUsuario = require('../../../assets/icons/iconUsuario.png')

const iconVino = require('../../../assets/icons/iconVino.png')
const iconBasurero = require('../../../assets/icons/iconBasurero.png')
const iconGo = require('../../../assets/icons/iconGo.png')

const Usuarios = () => {
    const DATA = [
        {
            RUT: '20.967.892-6',
            nombe: 'Antonio Cortes',
            rol: 'Especialista',
        },
        
    ]
    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <View style={{ backgroundColor: '#4b0404', width: 40, height: 40, padding: 5, borderRadius: 7, justifyContent:'center', alignItems:'center' }}>
                <Image style={{ width: '80%', height: '80%', resizeMode: 'contain' }} source={iconUsuario} />
            </View>

            <View style={styles.infoCard} >
                <Text style={styles.titleInfo}>{item.nombe} </Text>
                <Text style={styles.subtitleInfo}>{item.RUT}</Text>

            </View>

            <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#bf6565', gap: 10, padding: 3, borderRadius: 3 }}>
                <TouchableOpacity >
                    <Image source={iconBasurero} style={styles.iconAcciones}></Image>
                </TouchableOpacity>
                <TouchableOpacity >
                    <Image source={iconGo} style={styles.iconAcciones}></Image>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.TituloPantalla}>Gestión de Usuarios.</Text>

            <View style={styles.buscador}>
                <Image source={iconLupa} style={styles.iconLupa} ></Image>

                <TextInput style={styles.inputBuscador} placeholder='Ingresa RUT o Nombre del Usuario'></TextInput>
            </View>
            <View style={styles.contenedorBotones}>
               

                <TouchableOpacity style={styles.TouchableBoton}>
                    <Image source={iconAdd} style={styles.iconsBotones} ></Image>
                    <Text style={styles.botonText}>Añadir Usuarios</Text>
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
                        data={DATA}
                        keyExtractor={item => item.RUT}
                        renderItem={renderItem}
                    />
                </View>
            </View>

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


export default Usuarios;
import { Dimensions, StyleSheet, Text, View, Image, Pressable, FlatList, TextInput } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';


// iconos propios 
const iconDashboard = require('../../assets/icons/iconVino.png')
const iconLupa = require('../../assets/icons/iconLupa.png')



const Productos = () => {
    const DATA = [
        {
            cod: '123123123',
            nombe: 'Cabernet Sauvignon',
            reserva: 'Reserva Especial',
            destino: 'Chile'
        },
    ]
    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{item.nombe}</Text>
            <Text>{item.destino}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.TituloPantalla}>Productos</Text>

            <View style={styles.buscador}>
                <Image source={iconLupa} style={styles.iconLupa} ></Image>

                <TextInput style={styles.inputBuscador}>asdasd</TextInput>

            </View>

            <View>
                {/*encabezado de la lista*/}
                <View>
                    <Text>Registros</Text>
                    <View>
                        <TouchableOpacity>
                            <Text>
                                Filtro
                            </Text>

                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text>
                                Ordenar
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>

                {/* cuerpo de la lista*/}
                <View style={styles.container}>
                    <FlatList
                        data={DATA}
                        keyExtractor={item => item.cod}
                        renderItem={renderItem}
                    />
                </View>
            </View>

        </View>
    );
};


const styles = StyleSheet.create({

    container: {
        width: '80%',
        margin: 'auto'
    },
    inputBuscador:{
        width:'90%'
    },  
    iconLupa: {
        width:15,
        height:15

    },
    buscador: {
        width:'100%',
        borderColor: 'black',
        height: 30,
        borderWidth: 1,
        borderRadius: 10, padding: 5,
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'center',
        gap:10
        
    },
    TituloPantalla: {

    }
});


export default Productos;
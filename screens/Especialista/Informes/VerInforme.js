import { Dimensions, StyleSheet, Text, View, Image, Pressable, FlatList, TextInput, Modal } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';


const DATA = {
    id: 1,
    titulo: "Analisis de errores por tipos de errores en tipos de botellas",
    descricion: "ESTA ES LA DESCRICION DEL INFORME GENERADO pOR LA INTELIGENCIA ARTIFICIAL DE OpENIA3.5 ",
    fecha: "2024-04-12",
    hora: "15:22:00",
    autor: "Antonio C."
}

const VerInforme = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.Titulo}>Informe Nº {DATA.id}</Text>
                <View style={styles.row}>
                    <Text style={styles.datetime}>FECHA: {DATA.fecha}</Text>
                    <Text style={styles.datetime}>HORA: {DATA.hora}</Text>
                </View>
                <Text style={styles.TituloH2}>Enfoque</Text>
                <Text >{DATA.titulo}</Text>
            </View>
            <View style={styles.containerInformacion}>
                <View >
                    <Text style={styles.TituloH2}>Descripcion de informe</Text>
                    <Text>{DATA.descricion}</Text>
                </View>
                <View>
                    <Text style={styles.encargadoTex} >
                        Generado por {DATA.autor} con IA
                    </Text>

                </View>
            </View>
            <TouchableOpacity style={styles.botonEliminar}>
                <Text style={styles.TextoBotonEliminar}>Elimiar Informe</Text>
            </TouchableOpacity>

        </View>
    );


}

const styles = StyleSheet.create({
    container: {
        padding: 25,

    },
    Titulo: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#260202'
    },
    SubTitulo: {
        fontSize: 16,
        textAlign: 'justify'
    },
    TituloH2: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#260202'

    },
    row: {
        flexDirection: 'row',
        marginBottom: 5,
        gap: 10
    }, botonEliminar: {
        backgroundColor: '#260202',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center'
    },
    TextoBotonEliminar: {
        color: 'white',
        fontSize: 16,

    },
    containerInformacion: {
        gap: 20
    },
    encargadoTex: {
        fontSize: 12,
        color: 'rgba(38, 2, 2, 0.5)',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    datetime: {
        fontSize: 14,
        color: 'rgba(38, 2, 2, 0.5)',
        fontWeight: 'light'
    }

}

);

export default VerInforme;
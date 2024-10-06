import { Dimensions, StyleSheet, Text, View, Image, Pressable, FlatList, TextInput, Modal } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';


const DATA = {
    id: 1,
    titulo: "Analisis de errores por tipos de errores en tipos de botellas",
    descricion: "ESTA ES LA DESCRICION DEL INFORME GENERADO pOR LA INTELIGENCIA ARTIFICIAL DE OpENIA3.5 ",
    fecha: "2024-04-12 15:22:00",
    autor: "Antonio C."
}

const VerInforme = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.Titulo}>Informe Nº {DATA.id}</Text>
                <Text style={styles.SubTitulo}>Titulo: {DATA.titulo} </Text>
            </View>
            <View style={styles.containerInformacion}>
                <View>
                    <Text>Descricion de informe.</Text>
                    <Text>{DATA.descricion}</Text>
                </View>
                <View>
                    <Text>
                        Encargado (Generador): {DATA.autor}
                    </Text>
                    <Text>
                        Fecha de generacion: {DATA.fecha}
                    </Text>
                </View>
            </View>
            <TouchableOpacity style={styles.botonEliminar}>
                <Text>Elimiar Informe</Text>
            </TouchableOpacity>

        </View>
    );


}

const styles = StyleSheet.create({
    container: {
        padding: 25,

    }
}

);
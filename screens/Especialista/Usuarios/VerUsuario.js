import { text } from '@fortawesome/fontawesome-svg-core';
import { height, width } from '@fortawesome/free-solid-svg-icons/fa0';
import React, { useState } from 'react';
import {
    View, Text, TouchableOpacity, Image, TextInput, FlatList, Modal, StyleSheet, Dimensions
} from 'react-native';

// iconos propios
const iconUsuario = require('../../../assets/icons/iconUsuario.png')
const iconContrasena = require('../../../assets/icons/iconContrasena.png')
const VerUsuario = () => {
    const DATA =
    {

        RUT: '20.967.892-6',
        nombe: 'Antonio Cortes',
        rol: 'Especialista',
        correo: 'contacto@gmail.cl',


    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.InfoHeader}>
                    <Text style={{ fontSize: 14, color: 'gray', textTrasform: 'uppercase' }}>{DATA.rol}</Text>
                    <Text style={{ fontSize: 28, width: 100, textAlign: 'center', fontWeight: 'bold', textTrasform: 'capitalize' }}>
                        {DATA.nombe}
                    </Text>
                    <Text style={{ fontSize: 14, color: 'gray' }}>{DATA.RUT}</Text>

                </View>
                <View style={{ backgroundColor: '#4b0404', width: 130, height: 130, borderRadius: 65, alignItems: 'center', justifyContent: 'center' }}>

                    <Image source={iconUsuario} style={{ width: 80, height: 80, resizeMode: 'contain' }} />

                </View>
            </View>
            <View>
                <Text style={{ fontSize: 18, color: '#4b0404', marginBottom: 15 }}>
                    Informacion personal
                </Text>

                <Text style={styles.label}>RUT</Text>
                <Text style={styles.dataInfo}>{DATA.RUT}</Text>
                <Text style={styles.label}>Nombre</Text>
                <Text style={styles.dataInfo}>{DATA.nombe}</Text>
                <Text style={styles.label}>Correo</Text>
                <Text style={styles.dataInfo}>{DATA.correo}</Text>

                <TouchableOpacity style={styles.buttonEditarContrasena}>
                    <Image source={iconContrasena} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                    <Text style={{ color: '#4b0404', textAlign: 'center',color:'white' }}>Editar Contrasena</Text>
                </TouchableOpacity>
            </View>

        </View>
    )


};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 25
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        marginTop: 25,
        marginBottom: 25
    },
    InfoHeader: {
        alignItems: 'center', justifyContent: 'center'
    },
    label: {
        fontSize: 14,
        marginBottom: 5
    }, dataInfo: {
        fontSize: 12,
        color: 'black',
        marginBottom: 10,
        marginLeft: 10,
        color: 'gray'

    }, buttonEditarContrasena: {
        marginTop:20,
        backgroundColor: '#bf6565',
        height: 30,
        width: 150,
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        padding: 5
    }

});

export default VerUsuario;
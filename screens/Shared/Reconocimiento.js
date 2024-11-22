import React from 'react';
import { StyleSheet, View,TouchableOpacity, Text, } from 'react-native';
import { WebView } from 'react-native-webview';

const Reconocimiento = ({navigation}) => {
    return (
        <View style={styles.container}>
            {/* WebView cargando una URL */}
            <WebView
                source={{ uri: 'https://reconqs.000.pe' }}
                style={styles.webview}

            />


            {/* Botón para retroceder */}
            <TouchableOpacity style={styles.ButtonCirculoAtras} onPress={() => navigation.goBack()}>
                <View style={styles.CirculoAtras}>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <Text style={{ color: 'white', fontSize: 28 }}>Atrás</Text>
                    </View>
                    <Text style={{ color: 'white', fontSize: 18 }}>Ver Producto</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#260202'
    },
    webview: {
        flex: 1,
        marginBottom: 30,
        marginTop: 30
    }, ButtonCirculoAtras: {
        position: 'absolute',
        top: -15,
        left: -15,
        zIndex: 5
    },

    CirculoAtras: {
        width: 150,
        height: 150,
        borderRadius: 125,
        backgroundColor: '#270403',
        display: 'flex',

        justifyContent: 'center',
        alignItems: 'center',

    },
});

export default Reconocimiento;

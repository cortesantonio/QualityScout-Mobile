import { StyleSheet, Text, View, Image, Pressable, ScrollView, Dimensions } from 'react-native';
import React from 'react';
import { Nav, Footer } from '../../components/shared';
import { PieChart } from 'react-native-chart-kit';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL_API_BACKEND } from '../../config';

// iconos propios 
const iconDashboard = require('../../assets/icons/iconDashboard.png')
const iconUsuarios = require('../../assets/icons/iconUsuarios.png')
const iconControles = require('../../assets/icons/iconControles.png')
const iconProductos = require('../../assets/icons/iconProductos.png')
const iconInformes = require('../../assets/icons/iconInformes.png')
const iconBuscador = require('../../assets/icons/iconBuscador.png')

const iconFlechaSubida = require('../../assets/icons/flechaSubida.png')
const iconBajada = require('../../assets/icons/flechaBajada.png')



const screenWidth = Dimensions.get('window').width * 0.8;
const token = AsyncStorage.getItem('userToken');



function ControlesEstados() {
    const [data, setData] = useState([]);

    const obtenerData = async () => {
        try {
            const response = await fetch(`${URL_API_BACKEND}/api/ApiDashboard/CantidadPorEstado`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();

            // Transformar los datos para el PieChart
            const formattedData = result.map((item, index) => ({
                name: item.estado,
                population: item.cantidad,
                color: getColor(index), // Generar colores dinámicos
                legendFontColor: "#7F7F7F",
                legendFontSize: 12,
            }));

            setData(formattedData);
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    };

    // Función para asignar colores únicos
    const getColor = (index) => {
        const colors = ['#f25757', '#260202', '#bf6565'];
        return colors[index];
    };

    useEffect(() => {
        obtenerData();
    }, []);



    return (
        <View>
            <PieChart
                data={data}
                width={screenWidth}
                height={200}
                chartConfig={{
                    backgroundColor: '#ffffff',
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="10"
                absolute
            />
            <Text style={{ fontWeight: 'bold', color: 'gray' }}>Cantidad de controles por estados (Mes actual). </Text>

        </View>
    );
}

const HomeControlCalidad = ({ navigation }) => {
    

    return (
        <>
            <Nav />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.containerHomeAdmin}>

                    {/* Accesos Rapidos */}

                    <Text style={{ fontSize: 18, }}>Accesos Rapidos.</Text>
                    <View style={styles.ContainerAccesosRapidos} >
                        <Pressable style={styles.PressableCard} onPress={() => navigation.navigate('Buscador')}>
                            <View style={styles.IconBackground}>
                                <Image source={iconBuscador} style={{ width: 50, height: 50 }} resizeMode='contain' />
                            </View>
                            <Text>Buscador</Text>
                        </Pressable>
                        <Pressable style={styles.PressableCard} onPress={() => navigation.navigate('Controles')}>
                            <View style={styles.IconBackground}>
                                <Image source={iconControles} style={{ width: 50, height: 50 }} resizeMode='contain' />
                            </View>
                            <Text>Controles</Text>
                        </Pressable>

                        <Pressable style={styles.PressableCard} onPress={() => navigation.navigate('Productos')}>
                            <View style={styles.IconBackground}  >
                                <Image source={iconProductos} style={{ width: 50, height: 50 }} resizeMode='contain' />
                            </View>
                            <Text>Productos</Text>
                        </Pressable>

                    </View >

                    {/* Indicadores de rendimientos */}
                    <Text style={{ fontSize: 18, }}>Estado Actual.</Text>

                    <ControlesEstados />

                    <View style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                        <View style={styles.containerCard}>
                            <View style={[styles.CardEstadisticas, { backgroundColor: '#f25757' }]}>
                                <Text style={[styles.tituloCard, { color: '#260202' }]}> Controles Aprobados </Text>
                                <Text style={styles.numeroCard}>16</Text>
                                <Text style={styles.porcentajeCard} >%</Text>
                                <Image source={iconFlechaSubida} style={styles.IconFlechaEstadistica} resizeMode='contain' />
                                <Text style={[styles.indicadorCard, { color: '#39ff14', }]}> +</Text>
                            </View>

                            <View style={[styles.CardEstadisticas, { backgroundColor: '#260202' }]}>
                                <Text style={[styles.tituloCard, { color: 'white' }]}> Controles Rechazados </Text>
                                <Text style={styles.numeroCard}>5</Text>
                                <Text style={styles.porcentajeCard} >%</Text>
                                <Image source={iconBajada} style={styles.IconFlechaEstadistica} resizeMode='contain' />
                                <Text style={[styles.indicadorCard, { color: 'red', }]}> -</Text>
                            </View>

                            <View style={[styles.CardEstadisticas, { backgroundColor: '#f25757' }]}>
                                <Text style={[styles.tituloCard, { color: '#260202' }]}> Reprocesos </Text>
                                <Text style={styles.numeroCard}>8</Text>
                                <Text style={styles.porcentajeCard} >%</Text>
                                <Image source={iconFlechaSubida} style={styles.IconFlechaEstadistica} resizeMode='contain' />
                                <Text style={[styles.indicadorCard, { color: '#39ff14', }]}> +</Text>
                            </View>

                        </View>
                        <View style={styles.SubcontainerCard}>
                            <View style={[styles.SubCardEstadisticas, { backgroundColor: '#f25757' }]}>
                                <Text style={[styles.SubtituloCard, { color: 'white' }]}> Nuevos Productos </Text>
                                <Text style={styles.SubnumeroCard}>8</Text>
                            </View>
                            <View style={[styles.SubCardEstadisticas, { backgroundColor: '#f25757' }]}>
                                <Text style={[styles.SubtituloCard, { color: 'white' }]}>Actualizaciones de prod. </Text>
                                <Text style={styles.SubnumeroCard}>12</Text>
                            </View>

                            <View style={[styles.SubCardEstadisticas, { backgroundColor: '#260202' }]}>
                                <Text style={[styles.SubtituloCard, { color: 'white' }]}>Prod. Eliminados </Text>
                                <Text style={styles.SubnumeroCard}>0</Text>
                            </View>
                            <View style={[styles.SubCardEstadisticas, { backgroundColor: '#260202' }]}>
                                <Text style={[styles.SubtituloCard, { color: 'white' }]}>Rechazos de Control </Text>
                                <Text style={styles.SubnumeroCard}>16</Text>
                            </View>

                            <View style={[styles.SubCardEstadisticas, { backgroundColor: '#f25757' }]}>
                                <Text style={[styles.SubtituloCard, { color: 'white' }]}>Nuevos Reprocesos </Text>
                                <Text style={styles.SubnumeroCard}>8</Text>
                            </View>
                            <View style={[styles.SubCardEstadisticas, { backgroundColor: '#f25757' }]}>
                                <Text style={[styles.SubtituloCard, { color: 'white' }]}>Nuevos Controles </Text>
                                <Text style={styles.SubnumeroCard}>12</Text>
                            </View>

                        </View>



                    </View>
                </View >
            </ScrollView >
            <Footer />
        </>



    );
};


const styles = StyleSheet.create({

    scrollContainer: {
        flexGrow: 1,
        padding: 25,
    },
    containerHomeAdmin: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 20,
    },
    ContainerAccesosRapidos: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 10,
    },
    IconBackground: {
        backgroundColor: '#f25757',
        borderRadius: 50,
        width: 75,
        height: 75,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
    },
    PressableCard: {
        display: 'flex',
        alignItems: 'center',
    },

    containerCard: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 10,
    },
    CardEstadisticas: {
        width: '30%',
        height: 100,
        borderRadius: 20,
        overflow: 'hidden',


    },
    IconFlechaEstadistica: {
        width: 50,
        height: 90,
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    numeroCard: {
        position: 'absolute',
        width: '100%',
        textAlign: 'left',
        marginLeft: 5,
        bottom: -25,
        fontSize: 78,
        fontWeight: '700',
        letterSpacing: -5,
        color: 'white',
        zIndex: 5,
    },
    porcentajeCard: {
        position: 'absolute',
        bottom: 20,
        right: 0,
        fontSize: 28,
        fontWeight: '900',
        color: 'white',
        opacity: 1,
        zIndex: 1000,
        opacity: 0.5,

    },
    indicadorCard: {
        position: 'absolute',
        left: -30,
        bottom: 10,
        fontSize: 130,
        fontWeight: '700',
        opacity: 0.3,
        zIndex: 0,
    }, tituloCard: {
        fontSize: 14,
        marginTop: 5,
        fontWeight: '800',
        zIndex: 10,
    }, SubcontainerCard: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 2,
        marginTop: 10,
        marginBottom: 100
    }, SubCardEstadisticas: {
        padding: 3,
        width: 50,
        height: 50,
        borderRadius: 10,
        overflow: 'hidden',
    }, SubtituloCard: {
        textAlign: 'left',
        fontSize: 8,
        fontWeight: 'medium',
        zIndex: 10,

    }, SubnumeroCard: {
        fontSize: 38,
        color: 'white',
        fontWeight: 'bold',
        position: 'absolute',
        bottom: -9,
        width: '100%',
        textAlign: 'center',
        zIndex: 5,
    }

});


export default HomeControlCalidad;
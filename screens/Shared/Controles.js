import { StyleSheet, Text, View, Image, Pressable, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Footer, Nav } from '../../components/shared';
import { URL_API_BACKEND } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { faL } from '@fortawesome/free-solid-svg-icons';

// iconos propios 
const iconControlCheck = require('../../assets/icons/iconControlCheck.png')

const iconReload = require('../../assets/icons/iconReload.png')
const iconDislike = require('../../assets/icons/iconDislike.png')
const iconStop = require('../../assets/icons/iconStop.png')
const flechaSeguir = require('../../assets/icons/flechaSeguir.png')
const token = AsyncStorage.getItem('userToken');



const Controles = ({ navigation }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const obtenerDatos = async () => {
        try {
            const response = await fetch(`${URL_API_BACKEND}/api/ApiDashboard/ResumenControles`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            // Verifica si la respuesta es válida
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }

            const data = await response.json();
            setData(data)
            setLoading(false)
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    };

    useEffect(() => {
        obtenerDatos();
    }, []);


    return (


        <>

            <Nav />

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.containerHomeAdmin}>

                    {/* Titulos / indicadores */}

                    <Text style={{ fontSize: 18, width: '100%', textAlign: 'left' }}>Controles.</Text>
                    <View style={styles.ContainerAccesosRapidos} >

                        {!loading ? (
                            <>

                                {/* Controles diarios*/}
                                <Pressable style={styles.PressableCard}>
                                    <View style={styles.IconBackground}>
                                        <Image source={iconControlCheck} style={{ width: 50, height: 50 }} resizeMode='contain' />
                                    </View>
                                    <Text style={{ fontSize: 32, fontWeight: 'bold', textAlign: 'center' }}>{data.controlesDiarios}</Text>
                                    <Text style={{ textAlign: 'center' }}>Controles{'\n'}Diarios</Text>
                                </Pressable>
                                {/* Controles semanales*/}

                                <Pressable style={styles.PressableCard}>
                                    <View style={styles.IconBackground}>
                                        <Image source={iconControlCheck} style={{ width: 50, height: 50 }} resizeMode='contain' />
                                    </View>
                                    <Text style={{ fontSize: 32, fontWeight: 'bold', textAlign: 'center' }}>{data.controlesSemanales}</Text>
                                    <Text style={{ textAlign: 'center' }}>Controles{'\n'}Semanales</Text>
                                </Pressable>
                                {/* Controles Mensuales*/}

                                <Pressable style={styles.PressableCard}>
                                    <View style={styles.IconBackground}>
                                        <Image source={iconControlCheck} style={{ width: 50, height: 50 }} resizeMode='contain' />
                                    </View>
                                    <Text style={{ fontSize: 32, fontWeight: 'bold', textAlign: 'center' }}>{data.controlesMensuales}</Text>
                                    <Text style={{ textAlign: 'center' }}>Controles{'\n'}Mensuales</Text>
                                </Pressable>
                                {/* Controles reproceso*/}

                                <Pressable style={styles.PressableCard}>
                                    <View style={styles.IconBackground}>
                                        <Image source={iconReload} style={{ width: 50, height: 50 }} resizeMode='contain' />
                                    </View>
                                    <Text style={{ fontSize: 32, fontWeight: 'bold', textAlign: 'center' }}>{data.controlesReprocesos}</Text>
                                    <Text style={{ textAlign: 'center' }}>Controles {'\n'} en reproceso </Text>
                                </Pressable>
                                {/* Controles rechazados*/}

                                <Pressable style={styles.PressableCard}>
                                    <View style={styles.IconBackground}>
                                        <Image source={iconDislike} style={{ width: 50, height: 50 }} resizeMode='contain' />
                                    </View>
                                    <Text style={{ fontSize: 32, fontWeight: 'bold', textAlign: 'center' }}>{data.controlesRechazados}</Text>
                                    <Text style={{ textAlign: 'center' }}>Controles {'\n'} Rechazados</Text>
                                </Pressable>
                                {/* Controles preventivos*/}

                                <Pressable style={styles.PressableCard}>
                                    <View style={styles.IconBackground}>
                                        <Image source={iconStop} style={{ width: 50, height: 50 }} resizeMode='contain' />
                                    </View>
                                    <Text style={{ fontSize: 32, fontWeight: 'bold', textAlign: 'center' }}>{data.controlesPreventivos}</Text>
                                    <Text style={{ textAlign: 'center' }}>Controles De {'\n'} Tipo Preventivos</Text>
                                </Pressable>




                            </>
                        ) : (
                            <Text>Cargando...</Text>
                        )}





                    </View >

                    <TouchableOpacity style={styles.PressableCard} onPress={() => navigation.navigate('ListadoControles')}>
                        <View style={styles.IconBackground}>
                            <Image source={flechaSeguir} style={{ width: 40, height: 40 }} resizeMode='contain' />
                        </View>
                        <Text style={{ fontSize: 12, marginTop: 10, fontWeight: 'bold', textAlign: 'center' }}>ABRIR  {'\n'}REGISTROS</Text>
                    </TouchableOpacity>
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
        paddingBottom: 120
    },
    containerHomeAdmin: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
    },
    ContainerAccesosRapidos: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 4,
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



});


export default Controles;
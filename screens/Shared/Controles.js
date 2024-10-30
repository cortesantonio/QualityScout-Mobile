import { StyleSheet, Text, View, Image, Pressable, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';
import { Footer, Nav } from '../../components/shared';


// iconos propios 
const iconControlCheck = require('../../assets/icons/iconControlCheck.png')

const iconReload = require('../../assets/icons/iconReload.png')
const iconDislike = require('../../assets/icons/iconDislike.png')
const iconStop = require('../../assets/icons/iconStop.png')
const flechaSeguir = require('../../assets/icons/flechaSeguir.png')



const Controles = ({navigation}) => {
    const calculatePercentages = (data) => {
        const total = data.reduce((sum, item) => sum + item.amount, 0);
        return data.map(item => ({
            ...item,
            percentage: ((item.amount / total) * 100).toFixed(2) // Calcula el porcentaje y lo formatea
        }));
    };

    const data = calculatePercentages([{
        key: 1,
        amount: 245,
        svg: { fill: '#f25757' },
        label: 'Aprobados',
        offsetY: 0,
        offsetX: -20


    },
    {
        key: 2,
        amount: 94,
        svg: { fill: '#ed8d8d' },
        label: 'Reprocesos',
        offsetY: 0,
        offsetX: -20

    },
    {
        key: 3,
        amount: 156,
        svg: { fill: '#260202' },
        label: 'Rechazados',
        offsetY: -30,
        offsetX: 0

    },
    ]);


    const Labels = ({ slices }) => {
        return slices.map((slice, index) => {
            const { pieCentroid, data } = slice;
            const offsetX = pieCentroid[0];
            const offsetY = pieCentroid[1];
            return (
                <SvgText
                    key={index}
                    x={offsetX}
                    y={offsetY}
                    fill={'white'}
                    stroke={'black'}
                    strokeWidth={0.5}
                    strokeOpacity={0.5}
                    fontWeight={'bold'}
                    textAnchor={'middle'}
                    alignmentBaseline={'middle'}
                    fontSize={12}

                >
                    {`${data.percentage}% `}
                </SvgText>
            );
        });
    };

    return (


        <>

            <Nav />

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.containerHomeAdmin}>

                    {/* Titulos / indicadores */}

                    <Text style={{ fontSize: 18, }}>Controles.</Text>
                    <View style={styles.ContainerAccesosRapidos} >
                        {/* Controles diarios*/}
                        <Pressable style={styles.PressableCard}>
                            <View style={styles.IconBackground}>
                                <Image source={iconControlCheck} style={{ width: 50, height: 50 }} resizeMode='contain' />
                            </View>
                            <Text style={{ fontSize: 32, fontWeight: 'bold', textAlign: 'center' }}>24</Text>
                            <Text style={{ textAlign: 'center' }}>Controles{'\n'}Diarios</Text>
                        </Pressable>
                        {/* Controles semanales*/}

                        <Pressable style={styles.PressableCard}>
                            <View style={styles.IconBackground}>
                                <Image source={iconControlCheck} style={{ width: 50, height: 50 }} resizeMode='contain' />
                            </View>
                            <Text style={{ fontSize: 32, fontWeight: 'bold', textAlign: 'center' }}>120</Text>
                            <Text style={{ textAlign: 'center' }}>Controles{'\n'}Semanales</Text>
                        </Pressable>
                        {/* Controles Mensuales*/}

                        <Pressable style={styles.PressableCard}>
                            <View style={styles.IconBackground}>
                                <Image source={iconControlCheck} style={{ width: 50, height: 50 }} resizeMode='contain' />
                            </View>
                            <Text style={{ fontSize: 32, fontWeight: 'bold', textAlign: 'center' }}>912</Text>
                            <Text style={{ textAlign: 'center' }}>Controles{'\n'}Mensuales</Text>
                        </Pressable>
                        {/* Controles reproceso*/}

                        <Pressable style={styles.PressableCard}>
                            <View style={styles.IconBackground}>
                                <Image source={iconReload} style={{ width: 50, height: 50 }} resizeMode='contain' />
                            </View>
                            <Text style={{ fontSize: 32, fontWeight: 'bold', textAlign: 'center' }}>912</Text>
                            <Text style={{ textAlign: 'center' }}>Controles {'\n'} en reproceso </Text>
                        </Pressable>
                        {/* Controles rechazados*/}

                        <Pressable style={styles.PressableCard}>
                            <View style={styles.IconBackground}>
                                <Image source={iconDislike} style={{ width: 50, height: 50 }} resizeMode='contain' />
                            </View>
                            <Text style={{ fontSize: 32, fontWeight: 'bold', textAlign: 'center' }}>912</Text>
                            <Text style={{ textAlign: 'center' }}>Controles {'\n'} Rechazados</Text>
                        </Pressable>
                        {/* Controles preventivos*/}

                        <Pressable style={styles.PressableCard}>
                            <View style={styles.IconBackground}>
                                <Image source={iconStop} style={{ width: 50, height: 50 }} resizeMode='contain' />
                            </View>
                            <Text style={{ fontSize: 32, fontWeight: 'bold', textAlign: 'center' }}>912</Text>
                            <Text style={{ textAlign: 'center' }}>Controles {'\n'} Preventivos</Text>
                        </Pressable>

                        <TouchableOpacity style={styles.PressableCard} onPress={() => navigation.navigate('ListadoControles')}>
                            <View style={styles.IconBackground}>
                                <Image source={flechaSeguir} style={{ width: 40, height: 40 }} resizeMode='contain' />
                            </View>
                            <Text style={{ fontSize: 12, marginTop: 10, fontWeight: 'bold', textAlign: 'center' }}>ABRIR  {'\n'}REGISTROS</Text>
                        </TouchableOpacity>
                    </View >

                    
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
        alignItems: 'flex-start',
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
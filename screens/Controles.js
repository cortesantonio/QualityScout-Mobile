import { StyleSheet, Text, View, Image, Pressable, ScrollView } from 'react-native';
import React from 'react';
import { PieChart } from 'react-native-svg-charts';
import { Text as SvgText } from 'react-native-svg';


// iconos propios 
const iconControlCheck = require('../img/iconControlCheck.png')

const iconReload = require('../img/iconReload.png')
const iconDislike = require('../img/iconDislike.png')
const iconStop = require('../img/iconStop.png')

const Controles = () => {
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

                </View >

                {/* Indicadores de rendimientos */}
                <View style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {/* Pie Chart De porcentajes de estados de controles */}
                    <View style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                        <PieChart
                            style={{ height: 150, width: 200 }}
                            valueAccessor={({ item }) => item.amount}
                            data={data}
                            spacing={0}
                            outerRadius={'80%'}
                        >
                            <Labels />
                        </PieChart>
                        <Text style={{ position: 'absolute', right: 5, top: 5, textAlign: 'center' }}>
                            Porcentajes de{'\n'}estados de {'\n'}controles.
                        </Text>

                        <View style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ backgroundColor: '#f25757', width: 10, height: 10, borderRadius: 50, marginRight: 5 }}></View>
                                <Text>Aprobado</Text>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ backgroundColor: '#ed8d8d', width: 10, height: 10, borderRadius: 50, marginRight: 5 }}></View>
                                <Text>Reprocesos</Text>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ backgroundColor: '#260202', width: 10, height: 10, borderRadius: 50, marginRight: 5 }}></View>
                                <Text>Rechazados</Text>
                            </View>
                        </View>

                    </View>

                    

                </View>
            </View >
        </ScrollView >
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
        justifyContent: 'flex-start',
        gap: 6,
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
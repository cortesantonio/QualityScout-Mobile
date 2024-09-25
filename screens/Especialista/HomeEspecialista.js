import { Dimensions, StyleSheet, Text, View, Image, Pressable, ScrollView } from 'react-native';
import React from 'react';
import { PieChart } from 'react-native-svg-charts';
import { Text as SvgText } from 'react-native-svg';
import { height, width } from '@fortawesome/free-solid-svg-icons/fa0';


// iconos propios 
const iconDashboard = require('../../assets/icons/iconDashboard.png')
const iconUsuarios = require('../../assets/icons/iconUsuarios.png')
const iconControles = require('../../assets/icons/iconControles.png')
const iconProductos = require('../../assets/icons/iconProductos.png')
const iconInformes = require('../../assets/icons/iconInformes.png')
const iconBuscador = require('../../assets/icons/iconBuscador.png')

const iconFlechaSubida = require('../../assets/icons/flechaSubida.png')
const iconBajada = require('../../assets/icons/flechaBajada.png')




const HomeEspecialista = () => {
    const calculatePercentages = (data) => {
        const total = data.reduce((sum, item) => sum + item.amount, 0);
        return data.map(item => ({
            ...item,
            percentage: ((item.amount / total) * 100).toFixed(2) // Calcula el porcentaje y lo formatea
        }));
    };
    const screenWidth = Dimensions.get('window').width;

    const data = calculatePercentages([{
        key: 1,
        amount: 145,
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
                    fontSize={14}

                >
                    {`${data.percentage}% `}
                </SvgText>
            );
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.containerHomeAdmin}>

                {/* Accesos Rapidos */}

                <Text style={{ fontSize: 18, }}>Accesos Rapidos.</Text>
                <View style={styles.ContainerAccesosRapidos} >
                    <Pressable style={styles.PressableCard}>
                        <View style={styles.IconBackground}>
                            <Image source={iconDashboard} style={{ width: 50, height: 50 }} resizeMode='contain' />
                        </View>
                        <Text>Dashboard</Text>
                    </Pressable>

                    <Pressable style={styles.PressableCard}>
                        <View style={styles.IconBackground}>
                            <Image source={iconUsuarios} style={{ width: 50, height: 50 }} resizeMode='contain' />
                        </View>
                        <Text>Usuarios</Text>
                    </Pressable>

                    <Pressable style={styles.PressableCard}>
                        <View style={styles.IconBackground}>
                            <Image source={iconControles} style={{ width: 50, height: 50 }} resizeMode='contain' />
                        </View>
                        <Text>Controles</Text>
                    </Pressable>

                    <Pressable style={styles.PressableCard}>
                        <View style={styles.IconBackground}>
                            <Image source={iconProductos} style={{ width: 50, height: 50 }} resizeMode='contain' />
                        </View>
                        <Text>Productos</Text>
                    </Pressable>

                    <Pressable style={styles.PressableCard}>
                        <View style={styles.IconBackground}>
                            <Image source={iconInformes} style={{ width: 50, height: 50 }} resizeMode='contain' />
                        </View>
                        <Text>Informes</Text>
                    </Pressable>

                    <Pressable style={styles.PressableCard}>
                        <View style={styles.IconBackground}>
                            <Image source={iconBuscador} style={{ width: 50, height: 50 }} resizeMode='contain' />
                        </View>
                        <Text>Buscador</Text>
                    </Pressable>

                </View >

                {/* Indicadores de rendimientos */}
                <Text style={{ fontSize: 18, }}>Indicadores de rendimientos actuales.</Text>
                <View style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                    <PieChart
                        style={{ height: 200,width:300 }}
                        valueAccessor={({ item }) => item.amount}
                        data={data}
                        spacing={0}
                        outerRadius={'85%'}


                    >
                        <Labels />
                    </PieChart>
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

    containerCard: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 10,
        marginTop: 25,
        marginBottom: 100
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
        bottom: -20,
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
    }

});


export default HomeEspecialista;
import { StyleSheet, Text, View, Image, Pressable, ScrollView, StatusBar, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Footer, Nav } from '../../components/shared';
import { PieChart, BarChart, LineChart } from 'react-native-chart-kit';
import { URL_API_BACKEND } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';

// iconos propios 


const token = AsyncStorage.getItem('userToken');

const screenWidth = Dimensions.get('window').width * 0.8;

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

const RechazadosPorPais = () => {
    const [data, setData] = useState(null);


    const obtenerData = async () => {
        try {
            const response = await fetch(`${URL_API_BACKEND}/api/ApiDashboard/RechazadosPais`, {
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

            // Transformar los datos para el BarChart
            const formattedData = {
                labels: result.map(item => item.pais), // Extrae los nombres de los países
                datasets: [
                    {
                        data: result.map(item => item.cantidad), // Extrae las cantidades
                    }
                ]
            };

            setData(formattedData);
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    };

    useEffect(() => {
        obtenerData();
    }, []);

    return (
        <View style={{ backgroundColor: "transparent" }}>
            {data ? (
                <BarChart
                    data={data}
                    width={screenWidth}
                    height={250}
                    yAxisLabel=""
                    fromZero={true} // Asegura que las barras comiencen desde 0
                    withInnerLines={false}
                    showValuesOnTopOfBars={true}
                    chartConfig={{
                        backgroundGradientFrom: "white",
                        backgroundGradientTo: "white",
                        backgroundGradientFromOpacity: 0,
                        backgroundGradientToOpacity: 0,
                        fillShadowGradient: '#f25757', // Color de las barras
                        fillShadowGradientOpacity: 1, // Opacidad de las barras
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(242, 87, 87, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {},
                    }}
                />
            ) : (
                <Text>Cargando datos...</Text>
            )}
            <Text style={{ textAlign: "left", fontWeight: 'bold', color: 'gray' }}>Rechazados por país.</Text>
        </View>
    );
};




function RechazadosMensuales() {
    const [data, setData] = useState(null);

    const obtenerDatosRechazados = async () => {
        try {
            const response = await fetch(`${URL_API_BACKEND}/api/ApiDashboard/RechazadosMensuales`, {
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
            console.log('Datos recibidos:', result); // Verifica los datos

            // pasar valores numericos de cantidad a listado aparte 
            const cantidad = result.map(item => item.cantidad);
            const labels = result.map(item => {
                switch (item.mes) {  // Asegúrate de que la propiedad sea 'mes' y no 'Mes'
                    case 1: return "Enero";
                    case 2: return "Febrero";
                    case 3: return "Marzo";
                    case 4: return "Abril";
                    case 5: return "Mayo";
                    case 6: return "Junio";
                    case 7: return "Julio";
                    case 8: return "Agosto";
                    case 9: return "Septiembre";
                    case 10: return "Octubre";
                    case 11: return "Noviembre"; // Corregir aquí el caso para noviembre
                    case 12: return "Diciembre";
                    default: return "Desconocido"; // Si el mes no es válido
                }
            })

            setData({
                labels: labels,
                datasets: [
                    {
                        data: cantidad
                    }
                ]
            })

        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    };

    useEffect(() => {
        obtenerDatosRechazados();
    }, []);


    return (
        <View style={{ backgroundColor: "transparent", }}>
            {data != null ? (


                <BarChart
                    data={data}
                    width={screenWidth}
                    height={250}
                    yAxisLabel=""
                    withInnerLines={false}
                    showValuesOnTopOfBars={true}
                    chartConfig={{
                        backgroundGradientFrom: "white",
                        backgroundGradientTo: "white",
                        backgroundGradientFromOpacity: 0,
                        backgroundGradientToOpacity: 0,
                        fillShadowGradient: '#270403', // Color de las barras
                        fillShadowGradientOpacity: 0.4, // Opacidad de las barras
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(39, 4, 3, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                        }
                    }}
                />
            ) : <></>}
            <Text style={{ textAlign: "left", fontWeight: 'bold', color: 'gray' }}>Rechazados por meses.</Text>
        </View>
    );
}



function ReprocesosMensuales() {
    const [data, setData] = useState(null);

    const obtenerDatosRechazados = async () => {
        try {
            const response = await fetch(`${URL_API_BACKEND}/api/ApiDashboard/ReprocesosMensuales`, {
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
            console.log('Datos recibidos:', result); // Verifica los datos

            // pasar valores numericos de cantidad a listado aparte 
            const cantidad = result.map(item => item.cantidad);
            const labels = result.map(item => {
                switch (item.mes) {  // Asegúrate de que la propiedad sea 'mes' y no 'Mes'
                    case 1: return "Enero";
                    case 2: return "Febrero";
                    case 3: return "Marzo";
                    case 4: return "Abril";
                    case 5: return "Mayo";
                    case 6: return "Junio";
                    case 7: return "Julio";
                    case 8: return "Agosto";
                    case 9: return "Septiembre";
                    case 10: return "Octubre";
                    case 11: return "Noviembre"; // Corregir aquí el caso para noviembre
                    case 12: return "Diciembre";
                    default: return "Desconocido"; // Si el mes no es válido
                }
            })

            setData({
                labels: labels,
                datasets: [
                    {
                        data: cantidad
                    }
                ]
            })

        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    };

    useEffect(() => {
        obtenerDatosRechazados();
    }, []);


    return (
        <View style={{ backgroundColor: "transparent", }}>
            {data != null ? (


                <BarChart
                    data={data}
                    width={screenWidth}
                    height={250}
                    yAxisLabel=""
                    withInnerLines={false}
                    showValuesOnTopOfBars={true}
                    chartConfig={{
                        backgroundGradientFrom: "white",
                        backgroundGradientTo: "white",
                        backgroundGradientFromOpacity: 0,
                        backgroundGradientToOpacity: 0,
                        fillShadowGradient: '#ff0000', // Color de las barras
                        fillShadowGradientOpacity: 1, // Opacidad de las barras
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(255, 4, 3, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                        }
                    }}
                />
            ) : (<></>)}
            < Text style={{ textAlign: "left", fontWeight: 'bold', color: 'gray' }}>Reprocesos por meses.</Text>
        </View >
    );
}





export default function Dashboard({ navigation }) {

    if (token == null) {
        alert('No se encontro token, no se pudo obtener los datos de la base de datos.')
        return;
    }

    const calculatePercentages = (data) => {
        const total = data.reduce((sum, item) => sum + item.amount, 0);
        return data.map(item => ({
            ...item,
            percentage: ((item.amount / total) * 100).toFixed(2) // Calcula el porcentaje y lo formatea
        }));
    };

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



    return (

        <>
            <StatusBar style="light" barStyle="light-content" translucent={true} />
            <Nav />

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={{ fontSize: 18, width: '100%', textAlign: 'left', }}>Dashboard.</Text>

                <View style={{ display: 'flex', flexDirection: 'column', gap: 40, marginBottom: 150, paddingTop: 20 }}>
                    <ControlesEstados />
                    <RechazadosMensuales />
                    <ReprocesosMensuales />
                    <RechazadosPorPais />

                </View>



            </ScrollView >
            <Footer />
        </>

    );
};


const styles = StyleSheet.create({

    scrollContainer: {
        flexGrow: 1,
        padding: 25,
        alignItems: 'center'
    },


});


import { StyleSheet, Text, View, Image, Pressable, ScrollView, StatusBar, Dimensions } from 'react-native';
import React from 'react';
import { Footer, Nav } from '../../components/shared';
import { PieChart, BarChart, LineChart } from 'react-native-chart-kit';



// iconos propios 

const screenWidth = Dimensions.get('window').width * 0.8;
function ControlesEstados() {
    const data = [
        { name: 'Aprobados', population: 124, color: '#f25757', legendFontSize: 11 },
        { name: 'Reprocesos', population: 20, color: '#ed8d8d', legendFontSize: 11 },
        { name: 'Rechazados', population: 81, color: '#260202', legendFontSize: 11 },
    ];

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
            <Text style={{ fontWeight: 'bold', color: 'gray' }}>Cantidad de estados por controles (Mes actual). </Text>

        </View>
    );
}

function RechazadosPorPais() {
    const data = {
        labels: ["Brazil", "Argentina", "Chile", "Ucrania"],
        datasets: [
            {
                data: [41, 23, 14, 12] // Ejemplo: datos de rechazos por país
            }
        ]
    };

    return (
        <View style={{ backgroundColor: "transparent", }}>
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
                    fillShadowGradient: '#f25757', // Color de las barras
                    fillShadowGradientOpacity: 1, // Opacidad de las barras
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(242, 87, 87, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                    }
                }}
            />
            <Text style={{ textAlign: "left", fontWeight: 'bold', color: 'gray' }}>Rechazados por país.</Text>
        </View>
    );
}

function RechazadosMensuales() {
    const data = {
        labels: ["Enero", "Febrero", "Marzo", "Abril"],
        datasets: [
            {
                data: [121, 113, 201, 89] // Ejemplo: datos de rechazos por país
            }
        ]
    };

    return (
        <View style={{ backgroundColor: "transparent", }}>
            
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
            <Text style={{ textAlign: "left", fontWeight: 'bold', color: 'gray' }}>Rechazados por meses.</Text>
        </View>
    );
}
function ReprocesosMensuales() {
    const data = {
        labels: ["Enero", "Febrero", "Marzo", "Abril"],
        datasets: [
            {
                data: [54, 24, 63, 18] // Ejemplo: datos de rechazos por país
            }
        ]
    };

    return (
        <View style={{ backgroundColor: "transparent", }}>
            
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
            <Text style={{ textAlign: "left", fontWeight: 'bold', color: 'gray' }}>Reprocesos por meses.</Text>
        </View>
    );
}

function ProductosPorPaises() {
    const data = {
        labels: ["Brazil", "Argentina", "Chile"],
        datasets: [
            {
                data: [12, 5, 3, 5] // Ejemplo: datos de rechazos por país
            }
        ]
    };

    return (
        <View style={{ backgroundColor: "transparent", }}>
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
                    fillShadowGradient: '#bf6565', // Color de las barras
                    fillShadowGradientOpacity: 1, // Opacidad de las barras
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(191, 101, 101, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                    }
                }}
            />
            <Text style={{ textAlign: "left", fontWeight: 'bold', color: 'gray' }}>Productos por país de destino.</Text>
        </View>
    );
}




export default function Dashboard({ navigation }) {
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
                    <ProductosPorPaises />
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


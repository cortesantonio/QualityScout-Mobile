import React from 'react';
import { Alert, Text, TouchableOpacity, View, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Nav, Footer } from '../../../components/shared';
import { URL_API_BACKEND } from '../../../config';
const VerInforme = ({ navigation }) => {
    const route = useRoute();
    const { item } = route.params;
    function formatearFecha(fechaISO) {
        // Convertir la cadena ISO 8601 a un objeto Date
        const fecha = new Date(fechaISO);

        // Formatear la fecha como "dd/MM/yyyy HH:mm:ss"
        const dia = fecha.getDate().toString().padStart(2, '0'); // Día
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Mes (getMonth() devuelve 0 para enero)
        const anio = fecha.getFullYear(); // Año

        const horas = fecha.getHours().toString().padStart(2, '0'); // Horas
        const minutos = fecha.getMinutes().toString().padStart(2, '0'); // Minutos
        const segundos = fecha.getSeconds().toString().padStart(2, '0'); // Segundos

        // Devolver la fecha formateada
        return `${dia}.${mes}.${anio} ${horas}:${minutos}`;
    }
    const eliminarInforme = async (id) => {
        // Mostrar confirmación antes de eliminar
        Alert.alert(
            "Confirmación de Eliminación",
            "¿Estás seguro de que deseas eliminar este informe?",
            [
                {
                    text: "Cancelar",
                    onPress: () => console.log("Eliminación cancelada"),
                    style: "cancel"
                },
                {
                    text: "Eliminar",
                    onPress: async () => {
                        // Proceder con la eliminación
                        try {
                            const response = await fetch(`${URL_API_BACKEND}/api/InformesApi/${id}`, {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            });

                            if (!response.ok) {
                                throw new Error('Error al eliminar el informe');
                            } else {
                                alert('Informe eliminado con éxito');
                                navigation.navigate('Informes');
                            }
                        } catch (error) {
                            console.error(error);
                            alert('Ocurrió un error al intentar eliminar el informe.');
                        }
                    },
                    style: "destructive" // Estilo rojo para el botón de eliminación
                }
            ],
            { cancelable: false }
        );
    };

    return (
        <>
            <Nav />

            <View style={styles.container}>

                <ScrollView style={{ height: '80%' }} >
                    <View style={styles.header}>
                        <Text style={styles.Titulo}>Informe Nº {item.id}</Text>
                        <View style={styles.row}>
                            <Text style={styles.datetime}>FECHA: {formatearFecha(item.fecha)}</Text>
                        </View>
                        <Text style={styles.TituloH2}>Enfoque</Text>
                        <Text>{item.titulo}</Text>
                    </View>
                    <View style={styles.containerInformacion}>
                        <View>
                            <Text style={styles.TituloH2}>Descripción de informe</Text>
                            <Text>{item.descripcion}</Text>
                            
                        </View>
                        <View>
                            <Text style={styles.encargadoTex}>
                                Generado por {item.usuario.nombre} con IA
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.botonEliminar} onPress={() => eliminarInforme(item.id)}>
                        <Text style={styles.TextoBotonEliminar}>ELIMINAR INFORME</Text>
                    </TouchableOpacity>
                </ScrollView>



            </View>
            <Footer />
        </>
    );
};


const styles = StyleSheet.create({
    container: {
        padding: 25,

    },
    Titulo: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#260202'
    },
    SubTitulo: {
        fontSize: 16,
        textAlign: 'justify'
    },
    TituloH2: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#260202'

    },
    row: {
        flexDirection: 'row',
        marginBottom: 5,
        gap: 10
    }, botonEliminar: {
        backgroundColor: '#260202',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center'
    },
    TextoBotonEliminar: {
        color: 'white',
        fontSize: 16,

    },
    containerInformacion: {
        gap: 20
    },
    encargadoTex: {
        fontSize: 12,
        color: 'rgba(38, 2, 2, 0.5)',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    datetime: {
        fontSize: 14,
        color: 'rgba(38, 2, 2, 0.5)',
        fontWeight: 'light'
    }

}

);

export default VerInforme;
// App.js
import React, { useEffect, useState } from 'react';
import { Text, TextInput, Button, View, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';

import { API_KEY_OPENIA } from '../../../config'
import { URL_API_BACKEND } from '../../../config';
import { Nav, Footer } from '../../../components/shared';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native';
import { icon } from '@fortawesome/fontawesome-svg-core';


export default function CrearInforme({ navigation }) {
    const iconVarita = require('../../../assets/icons/iconVarita.png')

    const [loading, setLoading] = useState(false)
    const [responseText, setResponseText] = useState('');
    const [enfoque, setEnfoque] = useState('')
    const [titulo, setTitulo] = useState('')
    const [jsonControles, setJsonControles] = useState([])

    const [userId, setUserId] = useState(null);

    const obtenerInfo = async () => {
        try {
            const response = await fetch(`${URL_API_BACKEND}/api/InformesApi/GetInfoToInforme`);
            const data = await response.json();
            setJsonControles(data);
        } catch (error) {
            alert("Error al obtener los controles:", error);
        }
    };

    // recupera el usuario logeado
    const obtenerUsuario = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const userJson = await AsyncStorage.getItem('userJson');
            if (token == null) {
                alert('Token de autorización no encontrado.');
                return;
            }
            const user = JSON.parse(userJson);
            setUserId(user.Id);
        } catch (error) {
            alert('Error al obtener el usuario', error);
        }
    };

    useEffect(() => {
        obtenerUsuario();
    }, []); // Se ejecuta solo una vez al montar el componente


    useEffect(() => {
        obtenerInfo();
    }, []);


    const guardarInforme = () => {
        const data = {
            titulo: titulo,
            enfoque: enfoque,
            descripcion: responseText,
            usuarioId: userId,
        }
        fetch(`${URL_API_BACKEND}/api/InformesApi`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                navigation.navigate('Informes')

                alert('Informe guardado correctamente');
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Error al guardar el informe');
            });

    }

    const prompt = (json, enfoque) => {
        return `Voy a proporcionarte los datos de control de calidad de una botella de vino en formato JSON. 
        Quiero que generes un informe técnico enfocado en "${enfoque}" basado en los datos suministrados. 
        El informe debe incluir un análisis exhaustivo de los hallazgos, indicando claramente las métricas clave, 
        incluyendo porcentajes de error, cantidades y comparativas de desempeño de los diferentes productos.
        Además, se deben proporcionar conclusiones técnicas específicas basadas en los datos numéricos, 
        destacando cualquier valor significativo en el análisis. 
        No incluyas recomendaciones generales de mantenimiento; concéntrate en detalles cuantitativos para el informe. 
        El informe debe ser útil para informes de calidad o auditorías, ser conciso, no exceder las 200 palabras y 
        evitar citas textuales de los datos JSON. Utiliza términos generales pero incluye porcentajes y cantidades de ser necesario.
    
        JSON para el análisis: ${json}.`;
    };
    


    const handleSend = async () => {
        try {
            // Genera el prompt con el JSON de control y enfoque
            if (jsonControles.length < 1) {
                return alert('No hay controles para generar el informe')
            }
            setLoading(true)

            const promptText = prompt(JSON.stringify(jsonControles), enfoque);


            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${API_KEY_OPENIA}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',  // O 'gpt-4' si tienes acceso
                    messages: [
                        {
                            role: "system",
                            content: "Eres un experto en control de calidad para productos de la industria de bebidas, especializado en vinos. Vas a recibir datos de control de calidad en formato JSON y debes generar un informe técnico basado en el enfoque específico que se te indique."
                        },
                        {
                            role: 'user',
                            content: promptText
                        }
                    ],
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error en la respuesta de la API:', errorData);
                setLoading(false)
                throw new Error(`Error: ${errorData.error.message}`);
            }

            const data = await response.json();
            const message = data.choices[0].message.content;


            setResponseText(message);



            setLoading(false)

        } catch (error) {
            console.error("Error al llamar a la API:", error);
            setResponseText("Hubo un problema al obtener la respuesta.");
            setLoading(false)

        }
    };







    return (

        <>
            <Nav />
            <View style={styles.container}>


                <Text style={styles.TituloPantalla}>

                    Generador de informes con OpenAI
                </Text>
                <Text style={{ color: 'black', fontSize: 14 }}>Titulo:</Text>

                <TextInput
                    style={styles.input}
                    value={titulo}
                    onChangeText={setTitulo}
                />
                <Text style={{ color: 'black', fontSize: 14 }}>Enfoque:</Text>

                <TextInput
                    style={styles.input}
                    value={enfoque}
                    onChangeText={setEnfoque}
                />

                <TouchableOpacity onPress={handleSend} style={{
                    flexDirection: 'row',
                    backgroundColor: '#bf6565',
                    padding: 5,
                    borderRadius: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 5,
                    marginBottom: 10
                }}>
                    <Image source={iconVarita} style={{ width: 20, height: 20 }}></Image>
                    <Text style={{ color: 'white', fontSize: 14 }}>Generar Informe con IA</Text>
                </TouchableOpacity>
                {loading && <Text>Cargando...</Text>}

                {responseText != '' && <View style={{ justifyContent: 'center', alignContent: 'center' }}>
                    <View style={{ //linea divisora
                        backgroundColor: '#bf656540', height: 1, width: '100%'
                    }}></View>

                    <Text style={{ color: '#bf6565', fontSize: 18, marginBottom: 10, marginTop: 10 }}>Informe Generado:</Text>

                    <ScrollView style={{ height: 150 }}>


                        <Text style={styles.response}>{responseText}</Text>
                    </ScrollView >

                    <Button onPress={guardarInforme} title='Guardar Informe'></Button>
                </View>}



            </View >

            <Footer />
        </>

    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
    },
    response: {
        marginTop: 20,
        fontSize: 18,
    },
    TituloPantalla: {
        fontSize: 20,
        marginBottom: 20
    }
});

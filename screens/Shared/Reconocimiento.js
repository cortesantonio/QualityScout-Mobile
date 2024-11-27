import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, ActivityIndicator } from "react-native";
import { Camera, CameraView } from "expo-camera";
import * as FileSystem from "expo-file-system";
import { DrawerActions, useRoute } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";

export default function Reconocimiento({ navigation }) {
    const route = useRoute()
    const { producto } = route.params

    const [hasPermission, setHasPermission] = useState(null);
    const [responseRoboflow, setResponseRoboflow] = useState(false);
    const [errores, setErrores] = useState([]);
    const [faltantes, setFaltantes] = useState([]); // NUEVO: Almacena objetos faltantes
    const cameraRef = useRef(null);
    const [fotoUri, setFotoUri] = useState(null);

    const [loading, setLoading] = useState(true);

    // Lista de objetos esperados
    const objetosEsperados = ["RiesgoParaTuBebe", "NoBeberMenores", "NoBeberAlConducir"];

    useEffect(() => {
        const getCameraPermissions = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        };

        getCameraPermissions();
    }, []);

    const TomarFoto = async () => {
        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePictureAsync();
                console.log("Foto tomada:", photo.uri);
                setFotoUri(photo.uri);

                // Convertir la foto a base64
                const base64Image = await FileSystem.readAsStringAsync(photo.uri, {
                    encoding: FileSystem.EncodingType.Base64,
                });

                // Realizar la petición a la API de Roboflow
                fetch("https://detect.roboflow.com/tesis-zvslj/2?api_key=g8xauDaGODbjfODnMRML", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: base64Image,
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Error en la respuesta de la API: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        const predicciones = data.predictions.map(prediction => prediction.class);
                        setLoading(false)

                        if (producto.paisDestino == 'Chile') {
                            // Identificar objetos faltantes / ADAPTAR SI SE AGREAGAN NUEVOS ERRORES.
                            const noDetectados = objetosEsperados.filter(
                                objeto => !predicciones.includes(objeto)
                            );
                            setFaltantes(noDetectados);

                            console.log("Detectados:", predicciones);
                            console.log("Faltantes:", noDetectados);

                            setErrores(`El o los sellos no estan presente: ${noDetectados}`)

                        } else {

                            const errores = objetosEsperados.filter(
                                objeto => predicciones.includes(objeto)
                            );

                            setErrores(`Los sellos nacionales entan presentes en este productos: ${errores}`)


                        }




                    })
                    .catch(error => {
                        console.error("Error al realizar la petición:", error);
                    });

                setResponseRoboflow(true);
            } catch (error) {
                console.error("Error al tomar foto o enviar a la API:", error);
            }
        }
    };

    const GuardarPrediccion = () => {
        setResponseRoboflow(false);
        setFotoUri(null);
        Clipboard.setStringAsync(errores);


    };

    if (hasPermission === null) {
        return <Text>Solicitando permiso para la cámara...</Text>;
    }
    if (hasPermission === false) {
        return <Text>Acceso a la cámara denegado.</Text>;
    }


    return (
        <View style={styles.container}>
            {fotoUri ? (
                <Image source={{ uri: fotoUri }} style={StyleSheet.absoluteFillObject} />
            ) : (
                <CameraView style={StyleSheet.absoluteFillObject} ref={cameraRef} />
            )}

            {responseRoboflow ? (
                <>


                    <View style={styles.containerResultados}>
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#270403", marginBottom: 10 }}>
                            Reconocimiento de errores
                        </Text>

                        {loading ? (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="large" color="#260202" />
                                <Text style={styles.loadingText}>Procesando Imagen...</Text>
                            </View>
                        ) :

                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                <View style={{ maxWidth: '50%' }}>
                                    <Text style={{ fontSize: 14, marginBottom: 10 }}>Errores detectados:</Text>
                                    {errores ? (
                                        <Text style={{ fontSize: 12, color: "red" }}>
                                            {errores} </Text>
                                    ) : (
                                        <Text style={{ fontSize: 12, color: "gray" }}>No se encontraron errores.</Text>
                                    )}

                                    <Text style={{ fontSize: 14, marginTop: 10 }}>Objetos faltantes:</Text>
                                    {faltantes.length > 0 ? (
                                        faltantes.map((falta, index) => (
                                            <Text key={index} style={{ fontSize: 12, color: "blue" }}>
                                                {falta}
                                            </Text>
                                        ))
                                    ) : (
                                        <Text style={{ fontSize: 12, color: "green" }}>
                                            Todos los objetos están presentes.
                                        </Text>
                                    )}
                                </View>

                                <View style={{ display: "flex", justifyContent: "flex-end" }}>
                                    <TouchableOpacity
                                        onPress={GuardarPrediccion}
                                        style={{
                                            backgroundColor: "#bf6565",
                                            padding: 10,
                                            borderRadius: 10,
                                            width: 120,
                                            alignItems: "center",
                                        }}
                                    >
                                        <Text style={{ color: "white", fontSize: 16, textAlign: 'center' }}>Copiar Hallazgos</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                    </View>

                </>
            ) : (
                <TouchableOpacity style={styles.tomarFoto} onPress={TomarFoto}>
                    <Image
                        source={require("../../assets/icons/iconCamara.png")}
                        style={{ width: 50, height: 50, resizeMode: "contain" }}
                    />
                </TouchableOpacity>

            )
            }



            <TouchableOpacity style={styles.ButtonCirculoAtras} onPress={() => navigation.goBack()}>
                <View style={styles.CirculoAtras}>
                    <View style={{ flexDirection: "row", marginTop: 25 }}>
                        <Text style={{ color: "white", fontSize: 34 }}>Atrás</Text>
                    </View>
                    <Text style={{ color: "white", fontSize: 22 }}>Ver Control</Text>
                </View>
            </TouchableOpacity>

            <View style={{ position: 'absolute', top: 60, right: 0, backgroundColor: 'white', width: '40%', minHeight: 50, borderTopLeftRadius: 5, borderBottomLeftRadius: 5, padding: 5 }}>

                <Text style={{ fontSize: 12, color: 'gray' }}>Escaneado</Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#270403', textTransform: 'capitalize' }} >
                    {producto.nombre}
                </Text>
                <Text style={{ fontSize: 11, color: 'gray' }}>
                    GTIN: {producto.codigoBarra}
                </Text>
                <Text style={{ fontSize: 11, color: 'gray' }} >
                    Pais: {producto.paisDestino}
                </Text>

                <Text style={{ textTransform: 'capitalize', fontSize: 11, color: 'gray' }}>
                    Reserva: {producto.informacionQuimica.cepa}
                </Text>


            </View>

        </View >
    );
}

const styles = StyleSheet.create({
    ButtonCirculoAtras: {
        position: 'absolute',
        top: -40,
        left: -25,
        zIndex: 1
    },

    CirculoAtras: {
        width: 225,
        height: 225,
        borderRadius: 125,
        backgroundColor: '#270403',
        display: 'flex',

        justifyContent: 'center',
        alignItems: 'center',

    },
    container: {
        width: '100%',
        height: '100%',
    },

    absoluteFillObject: {
        width: '100%',
        height: '100%'
    }
    ,
    containerResultados: {
        position: 'absolute',
        bottom: 50,
        marginLeft: '5%',
        width: '90%',
        minHeight: 100,
        backgroundColor: 'white',
        borderRadius: 30,
        padding: 20,
        gap: 10,


    },
    tomarFoto: {
        position: 'absolute',
        bottom: 50,
        width: 100,
        height: 100,
        backgroundColor: '#bf6565',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,

        marginLeft: Dimensions.get('window').width / 2 - 50
    },
    loadingContainer:{
        width:'100%',
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center',
        gap:10
    }

});
import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from "react-native";
import { Camera, CameraView } from "expo-camera";
import * as FileSystem from "expo-file-system";

export default function Reconocimiento({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [responseRoboflow, setResponseRoboflow] = useState(false);
    const [errores, setErrores] = useState([]);
    const cameraRef = useRef(null);

    const [fotoUri, setFotoUri] = useState(null); // Para almacenar la URI de la foto capturada


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
                setFotoUri(photo.uri); // Guardar la URI de la foto para mostrarla en pantalla


                // Convertir la foto a base64
                const base64Image = await FileSystem.readAsStringAsync(photo.uri, {
                    encoding: FileSystem.EncodingType.Base64,
                });

                // Realizar la petición a la API de Roboflow usando fetch
                fetch("https://detect.roboflow.com/tesis-zvslj/2?api_key=g8xauDaGODbjfODnMRML", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: base64Image, // Suponiendo que `formData` ya está definido
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Error en la respuesta de la API: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {

                        setErrores(data.predictions.map(prediction => prediction.class))

                    })
                    .catch(error => {
                        console.error("Error al realizar la petición:", error);
                    });


                setResponseRoboflow(true);

                // Actualizar errores encontrados
            } catch (error) {
                console.error("Error al tomar foto o enviar a la API:", error);
            }
        }
    };

    const GuardarPrediccion = () => {
        setResponseRoboflow(false);
        setFotoUri(null);
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
                // Mostrar la foto tomada
                <Image source={{ uri: fotoUri }} style={StyleSheet.absoluteFillObject} />
            ) : (
                // Mostrar la cámara si no se ha tomado una foto
                <CameraView
                    style={StyleSheet.absoluteFillObject}
                    ref={cameraRef}
                />
            )}

            {responseRoboflow ? (
                <>


                    {errores.map((prediction, index) => (
                        <View key={index} style={{
                            width: prediction.width, height: prediction.height, left: prediction.x,
                            top: prediction.y, position: "absolute", borderWidth: 3, borderColor: "red", borderRadius: 10, justifyContent: "center", alignItems: "center"
                        }}>
                            {prediction.class}
                        </View>
                    ))}


                    <View style={styles.containerResultados}>
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#270403", marginBottom: 10 }}>
                            Reconocimiento de errores
                        </Text>
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <View>
                                <Text style={{ fontSize: 14, marginBottom: 10 }}>Errores detectados:</Text>

                                {errores.length > 0 ? (
                                    errores.map((error, index) => (
                                        <Text key={index} style={{ fontSize: 12, color: "red" }}>
                                            {error}
                                        </Text>
                                    ))
                                ) : (
                                    <Text style={{ fontSize: 12, color: "gray" }}>No se encontraron errores.</Text>
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
                                    <Text style={{ color: "white", fontSize: 16 }}>Guardar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </>

            ) : (
                <TouchableOpacity style={styles.tomarFoto} onPress={TomarFoto}>
                    <Image
                        source={require("../../assets/icons/iconCamara.png")}
                        style={{ width: 50, height: 50, resizeMode: "contain" }}
                    />
                </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.ButtonCirculoAtras} onPress={() => navigation.goBack()}>
                <View style={styles.CirculoAtras}>
                    <View style={{ flexDirection: "row", marginTop: 25 }}>
                        <Text style={{ color: "white", fontSize: 34 }}>Atrás</Text>
                    </View>
                    <Text style={{ color: "white", fontSize: 22 }}>Ver Control</Text>
                </View>
            </TouchableOpacity>
        </View>
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
    }

});
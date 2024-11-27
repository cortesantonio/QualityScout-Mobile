import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { CameraView, Camera } from "expo-camera";
import { Footer } from "../../components/shared";
import { URL_API_BACKEND } from "../../config";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from "expo-clipboard";

const iconScanner = require('../../assets/icons/scanner.png')

export default function App({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarcodeScanned = async ({ type, data }) => {
    if (scanned) { return; }
    setScanned(true);

    const token = await AsyncStorage.getItem('userToken');

    const response = await fetch(`${URL_API_BACKEND}/api/productosapi/EstaRegistrado?codigo=${data}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.status == 200) {
      const json = await response.json();
      navigation.navigate('VerProducto', { id: json.id });

    } else {
      navigation.navigate('Productos', { codigo: data, copiado: true });
      Clipboard.setStringAsync(data);
      

    }

  };

  if (hasPermission === null) {
    return <Text>Solicitado permiso a camara.</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sin acceso a camara.</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        videoQuality="1080p"

        autofocus="off"
        barcodeScannerSettings={{
          barcodeTypes: ["ean13"],
        }}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={styles.containerScanner}>
        <Image source={iconScanner} style={styles.iconScanerContainer} ></Image>
        <Text style={styles.textcontainerScanner}>Enfoca el código de barra </Text>

        {scanned && (
          <TouchableOpacity style={styles.buttonScanAgain} onPress={() => setScanned(false)}>
            <Text style={styles.buttonScanAgainText}>
              Escanear de nuevo
            </Text>

          </TouchableOpacity >
        )}


      </View>


      <TouchableOpacity style={styles.ButtonCirculoAtras} onPress={() => navigation.goBack()}>
        <View style={styles.CirculoAtras}>
          <View style={{ flexDirection: 'row', marginTop: 25 }}>
            <Text style={{ color: 'white', fontSize: 34 }}>Atrás</Text>
          </View>
        </View>
      </TouchableOpacity>


      <Footer />



    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -5,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: 'center'

  },
  buttonScanAgain: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 'auto',
    padding: 10,
    marginTop: 20,

  },
  buttonScanAgainText: {
    fontWeight: 'bold',
  },
  containerScanner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconScanerContainer: {
    width: 300, height: 150,
    resizeMode: 'contain'
  },
  textcontainerScanner: {
    marginTop: 5,
    fontSize: 16,
    color: 'white'
  }, ButtonCirculoAtras: {
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

  }

});
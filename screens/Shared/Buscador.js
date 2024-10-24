import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { CameraView, Camera } from "expo-camera";
import { Footer } from "../../components/shared";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';



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

  const handleBarcodeScanned = ({ type, data }) => {
    setScanned(true);

    navigation.navigate('Productos', { codigo: data })
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
            <FontAwesomeIcon icon={faArrowLeftLong} size={38} color="white" />
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
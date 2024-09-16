import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { CameraView, Camera } from "expo-camera";

const iconScanner = require('../../assets/icons/scanner.png')


export default function App() {
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
    alert(`tipo de codigo${type} codigo ${data} `);
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
        mode="video"

        autofocus="off"
        barcodeScannerSettings={{
          barcodeTypes: ["ean8", "ean13"],
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



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems:'center'
  },
  buttonScanAgain: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 'auto',
    padding: 10,
    marginTop:20

  },
  buttonScanAgainText: {
    fontWeight: 'bold',
  },
  containerScanner: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconScanerContainer: {
    width: 300, height: 150,
    resizeMode: 'contain'
  },
  textcontainerScanner:{
    marginTop:5,
    fontSize:16,
    color:'white'
  }

});
import React, { useState, useEffect } from 'react';
import {
  View, Text, Image, ImageBackground,
  Pressable, Animated, TouchableOpacity,
  TextInput, StyleSheet, Dimensions, Alert,
  ActivityIndicator, SafeAreaView
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import CryptoJS from 'crypto-js';



// Clave secreta fija y vector de inicialización (IV) (deben ser de longitud adecuada)
const secretKey = "E93{P254sNRJy2XG"; // Debe tener 16, 24 o 32 bytes
const iv = 'E93{P254sNRJy2XG'; // Debe ser de 16 bytes

export const encryptText = (text) => {
  const encrypted = CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(secretKey), {
    iv: CryptoJS.enc.Utf8.parse(iv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  // Convertir el resultado a Base64
  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
};



// Imágenes
const QualityScoutLogo = require('../img/QualityScoutLogo.png');
const Uvas = require('../img/Uvas.jpg');




const Login = () => {
  // Estado para controlar si se muestra la pantalla de inicio o el formulario
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Altura animada del contenedor
  const containerHeight = useState(new Animated.Value(350))[0]; // Altura inicial de 350

  // Función para manejar el botón de acceso
  const handleAccessPress = () => {
    setIsFormVisible(!isFormVisible);
  };


  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Estado para controlar la carga



  // Efecto para animar la altura del contenedor cuando cambia el estado isFormVisible
  useEffect(() => {
    Animated.timing(containerHeight, {
      toValue: isFormVisible ? 600 : 350, // Altura final según el estado
      duration: 500, // Duración de la animación en milisegundos
      useNativeDriver: false, // Necesario si estás animando propiedades que no son transformaciones
    }).start();
  }, [isFormVisible]);

  const handleLogin = async () => {
    if (!rut || !password) {
      Alert.alert('Error', 'Por favor, ingrese su RUT y contraseña.');
      return;
    }
    setLoading(true); // Iniciar el estado de carga
    try {
      const response = await fetch('http://192.168.1.108:5071/api/authapi/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rut: encryptText(rut),
          password: encryptText(password),
        }),
      });
      if (response.ok) {
        const result = await response.text();
        Alert.alert('Login Successful', result);
      } else {
        const error = await response.text();
        Alert.alert('Login Failed', error);
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Login Error', 'An error occurred during login.');
    } finally {
      setLoading(false); // Terminar el estado de carga
    }
  };

  return (
    <SafeAreaView style={[styles.LoginStyle, { backgroundColor: '#260202' }]}>
      <ImageBackground style={styles.img} source={Uvas} resizeMode="contain" />

      {!isFormVisible ? (
        <>
          <View style={styles.contenedorLogo}>
            <Image style={styles.LoginLogoImg} source={QualityScoutLogo} resizeMode="contain" />
            <Text style={[styles.TextComentario, { width: '47%', textAlign: 'center', color: 'white' }]}>
              Plataforma de gestión y consulta de control de calidad. Si usted es usuario de esta plataforma,
              le solicitamos iniciar sesión con las credenciales facilitadas por su supervisor.
            </Text>
          </View>

          <Animated.View style={[styles.contenedorLogin, { height: containerHeight }]}>
            <Text style={[styles.TextComentario, { textTransform: 'uppercase' }]}>Opciones</Text>
            <Pressable style={styles.ButtonAcceso} onPress={handleAccessPress}>
              <Text style={styles.ButtonAccesoText}>Acceso</Text>
            </Pressable>
            <Text style={[styles.TextComentario, { textAlign: 'center', width: '47%' }]}>
              Si ha olvidado sus datos de inicio de sesión, no dude en ponerse en contacto con su superior para recibir asistencia.
            </Text>
          </Animated.View>
        </>
      ) : (
        <>
          <TouchableOpacity onPress={handleAccessPress} style={styles.ButtonCirculoAtras}>
            <View style={styles.CirculoAtras}>
              <View style={{ flexDirection: 'row', marginTop: 25 }}>
                <FontAwesomeIcon icon={faArrowLeftLong} size={38} color="white" />
                <Text style={{ color: 'white', fontSize: 34 }}>Atrás</Text>
              </View>
              <Text style={{ color: 'white', fontSize: 22 }}>Inicio</Text>
            </View>
          </TouchableOpacity>

          <Animated.View style={[styles.contenedorLogin, { height: containerHeight }]}>
            <Text style={styles.TextLoginTitle}>Acceso</Text>
            <Text style={styles.TextLoginSubTitle}>Inicie sesión para continuar.</Text>

            <Text style={styles.labelLoginInput}>RUT</Text>
            <TextInput
              style={styles.inputLogin}
              value={rut}
              onChangeText={setRut}
              placeholder="12.345.678-9"
            />

            <Text style={styles.labelLoginInput}>Contraseña</Text>
            <TextInput
              style={styles.inputLogin}
              value={password}
              onChangeText={setPassword}
              placeholder="*******"
              secureTextEntry={true}
            />

            <Pressable style={styles.ButtonAcceso} onPress={handleLogin}>
              <Text style={[styles.ButtonAccesoText, { textTransform: 'none' }]}>Iniciar Sesión</Text>
            </Pressable>
          </Animated.View>

          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#260202" />
              <Text style={styles.loadingText}>Cargando...</Text>
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({


  LoginStyle: {
    backgroundColor: '#260202',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    alignItems: 'center',
    justifyContent: 'center',

  }, Text: {
    color: 'white',
    fontSize: 20,
  },
  img: {
    width: 400,
    height: 500,
    transform: [{ rotate: '90deg' }],
    opacity: 0.1,
    position: 'absolute',
    top: -60,
    right: -120,
  },
  contenedorLogin: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'white',
    width: '100%',
    padding: 25,
    borderRadius: 40,
    bottom: -25,
  },
  ButtonAcceso: {
    backgroundColor: '#0d0d0d',
    color: 'white  ',
    width: '80%',
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 25,
    marginBottom: 25,
  },
  ButtonAccesoText: {
    color: 'white',
    fontSize: '24',
    textTransform: 'uppercase',
  },
  TextComentario: {
    color: 'gray',
    fontSize: 10,
  },
  LoginLogoImg: {
    width: 300,
    height: 130,
  },
  contenedorLogo: {
    position: 'absolute',
    top: '20%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  labelLoginInput: {
    width: '80%',
    marginBottom: 5,
    fontSize: 16,
    color: 'black',
    textTransform: 'uppercase',
    fontWeight: 100,

  },
  inputLogin: {
    width: '80%',
    height: 50,
    marginBottom: 10,
    backgroundColor: '#fdd8d8',
    borderRadius: 15,
    padding: 10,
    fontSize: 18,

  },
  TextLoginTitle: {
    fontSize: 48,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#0d0d0d',
    marginTop: 20,
  },
  TextLoginSubTitle: {
    fontSize: 16,
    fontWeight: 100,
    color: '#0d0d0d',
    marginBottom: 20,
  },
  ButtonCirculoAtras: {
    position: 'absolute',
    top: -50,
    left: -50,

  },
  CirculoAtras: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#0d0d0d',
    display: 'flex',

    justifyContent: 'center',
    alignItems: 'center',

  },
  loadingContainer: {
    position: 'absolute',
    bottom: 100,
  }
});


export default Login;
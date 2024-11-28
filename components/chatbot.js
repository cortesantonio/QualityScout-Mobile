import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Animated, Text, Image } from 'react-native';
import { WebView } from 'react-native-webview';

const ChatScreen = () => {
    const iconChat = require('../assets/icons/iconChat.png');

    const [isChatVisible, setIsChatVisible] = useState(false);

    const slideAnim = useState(new Animated.Value(600))[0]; // Posición inicial (fuera de pantalla)

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: isChatVisible ? 0 : 700, // 0: posición visible, 600: posición oculta
            duration: 500, // Duración de la animación
            useNativeDriver: true, // Mejor rendimiento
        }).start();
    }, [isChatVisible]);

    return (
        <>
            <Animated.View
                style={[
                    styles.container,
                    { transform: [{ translateY: slideAnim }] }, // Aplica la animación
                ]}
            >
                <TouchableOpacity onPress={() => setIsChatVisible(false)} style={styles.btnCerrar}>
                    <Text style={{ color: 'white' }}>Cerrar ChatBot</Text>
                </TouchableOpacity>

                <WebView
                    style={styles.webview}

                    source={{ uri: 'https://www.stack-ai.com/chat-assistant/f4e0d66c-8812-4db0-9270-b3eaaeee09e5/f9dd681e-90cd-4c15-b0a6-c40c70bd9f57/6747bfc6ae163a26df8eb677' }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true} // Muestra un indicador de carga mientras carga
                    allowsInlineMediaPlayback={true} // Permite contenido multimedia
                    allowsBackForwardNavigationGestures={true} // Mejora la experiencia de usuario

                    onError={(syntheticEvent) => {
                        const { nativeEvent } = syntheticEvent;
                        console.error('WebView error:', nativeEvent);
                    }}
                    onHttpError={(syntheticEvent) => {
                        const { nativeEvent } = syntheticEvent;
                        console.error('HTTP error:', nativeEvent);
                    }}
                />

            </Animated.View>

            {!isChatVisible && (
                <TouchableOpacity onPress={() => setIsChatVisible(true)} style={styles.btn}>
                    <Image source={iconChat} style={{ width: 20, height: 20 }} />
                    <Text style={{ color: 'white', fontSize: 12 }}>ChatBot</Text>
                </TouchableOpacity>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 700, // Altura máxima
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden',
        zIndex: 900,

    },
    btnCerrar: {
        padding: 10,
        backgroundColor: '#f25757',
        alignItems: 'center',
    },

    webview: {
        flex: 1,
        width: "100%",
        height: 700,
    },
    btn: {
        position: 'absolute',
        top: 130,
        right: 0,
        height: 50,
        padding: 5,
        backgroundColor: '#260202',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },

});

export default ChatScreen;


import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const Reconocimiento = () => {
  return (
    <View style={styles.container}>
      {/* WebView cargando una URL */}
      <WebView 
        source={{ uri: 'https://reconqs.000.pe/' }} 
        style={styles.webview}
        cacheEnabled={false}

      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#260202'
  },
  webview: {
    flex: 1,
    marginBottom:30,
    marginTop:30
  },
});

export default Reconocimiento;

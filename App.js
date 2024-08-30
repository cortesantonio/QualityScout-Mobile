import { Dimensions, StyleSheet, View, Image, ImageBackground, Button, Pressable, SafeAreaView, ScrollView } from 'react-native';
import { Nav, Footer } from './components/shared'
import React from 'react';
import HomeAdmin from './screens/HomeAdmin'
import Login from './screens/Login';
import Controles from './screens/Controles';
import HomeEspecialista from './screens/HomeEspecialista';


export default function App() {
  return (
    <View style={styles.app}>
      <Nav />
      <HomeEspecialista />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

});
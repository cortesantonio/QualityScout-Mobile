import { Dimensions, StyleSheet, View, Image, ImageBackground, Button, Pressable, SafeAreaView, ScrollView } from 'react-native';
import { Nav, Footer } from './components/shared'
import React from 'react';
import HomeAdmin from './screens/HomeAdmin'



export default function App() {
  return (
    <View style={styles.app}>
      <Nav />
      <HomeAdmin/>
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
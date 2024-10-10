import { StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './screens/Auth/Login'

import EspecialistaNavigator from './navigators/EspecialistaNavigator';
import ControlCalidadNavigator from './navigators/ControlCalidadNavigator';
import FooterNavigator from './navigators/FooterNavigator';

const Stack = createNativeStackNavigator();

export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"  
        screenOptions={{
          headerShown: false,

        }}
      >
        {/* LOGIN */}
        <Stack.Screen name="Login" component={Login} />
        
        {/* Especialista */}
        <Stack.Screen name='Especialista' component={EspecialistaNavigator}/>

        {/* Control de Calidad */}

        <Stack.Screen name="ControlCalidad" component={ControlCalidadNavigator} />

      </Stack.Navigator>
    </NavigationContainer>

 

    

  );
}

const styles = StyleSheet.create({
  app: {
    width: '100%',
    height: '100%',
  }
});
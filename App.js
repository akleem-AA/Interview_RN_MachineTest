

import React, { useEffect, createContext, useState } from 'react';

import {

  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert
} from 'react-native';
import NavigationScreen from './Component/Navigation/NavigationScreen';


const App = () => {
  return (
    <>
      <View style={{ flex: 1 }}>
        <NavigationScreen />
      </View>
    </>
  )
}
const styles = StyleSheet.create({

});

export default App;

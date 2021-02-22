//import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import AppNav from "./navigation/AppNavigation";
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './redux/store';
//import * as Font from "expo-font";
//import  AppLoading from "expo-app-loading";

/*const customFonts = () => {
  Font.loadAsync({
    sanfrancisco: require("./constants/fonts/SF-Pro-Display-Regular.otf"),
  });
};*/

export default function App() {

  /*const [loadedFonts, setLoadedFonts] = useState(false);
  if (!loadedFonts) {
    return (
      <AppLoading
        startAsync={customFonts}
        onFinish={() => setLoadedFonts(true)}
        onError={console.warn}
      />
    );
  }*/
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        < NavigationContainer >
            <AppNav headerMode="none" headerShown="false" />
        </NavigationContainer >
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import AppNav from "./navigation/AppNavigation";
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Asset } from 'expo-asset';
import { store, persistor } from './redux/store';
//import * as Font from "expo-font";
import  AppLoading from "expo-app-loading";
import { getParent} from './redux/actions';

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
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={console.warn}
        onFinish={() => setLoadingComplete(true)}
      />
    );
  } else {
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar style="light" />
        < NavigationContainer >
            <AppNav headerMode="none" headerShown="false" />
        </NavigationContainer >
      </PersistGate>
    </Provider>
  );
  }
};

const loadResourcesAsync = async () => {
  await Promise.all([
    Asset.loadAsync([
      require("./assets/mainPic.jpg"),
      require("./assets/eventPic.jpg"),
      require("./assets/restPic.jpg")
    ]),
  ]);

  await store.dispatch(getParent());
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


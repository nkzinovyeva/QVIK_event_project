import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import AppNav from "./src/navigation/AppNavigation";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Asset } from "expo-asset";
import { store, persistor } from "./src/redux/store";
import { getSetUp } from "./src/redux/actions";
import { NetworkProvider } from "react-native-offline";
import * as Font from "expo-font";

export default function App() {
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
      <NetworkProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <StatusBar style="light" />
            <NavigationContainer>
              <AppNav headerMode="none" headerShown="false" />
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </NetworkProvider>
    );
  }
}

const loadResourcesAsync = async () => {
  await Promise.all([
    Asset.loadAsync([require("./src/assets/default_img.jpg")]),
    Font.loadAsync({
      "custom-icons": require("./src/assets/icons/icomoon.ttf"),
    }),
    store.dispatch(getSetUp()),
  ]);
  //await store.dispatch(getSetUp());
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

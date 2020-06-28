import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AppLoading} from "expo";
import * as Font from 'expo-font'
import {Asset} from 'expo-asset'
import { Text, View } from "react-native";

export default function App() {
  const [loaded, setLoad] = useState(false);
  const preLoad = async () => {
    try {
      await Font.loadAsync({
        ...Ionicons.font
      });

      await Asset.loadAsync([require("./assets/logo.png")]);

      setLoad(true);

    } catch(e) {
      console.log(e.messgae);
    }
  };

  useEffect( () => {
    preLoad();
  }, []);

  return loaded ? (
    <View>
      <Text>Open up .App.js to start working on your app!</Text>      
    </View>
  ) : (
    <AppLoading />
  );
}

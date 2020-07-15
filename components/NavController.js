import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useIsLoggedIn } from "../AuthContext";
import AuthNavigation from "../navigation/AuthNavigation";
import MainNavigation from "../navigation/MainNavigation";

export default () => {
  const isLoggedIn = useIsLoggedIn();

  const styles = StyleSheet.create({
    LargeText: {
      fontWeight: "bold",
      fontSize: 100,
    },
  });
  console.log("GODOPU: " + isLoggedIn);
  return (
    <View style={{ flex: 1 }}>
        {/* {isLoggedIn === true ? <MainNavigation /> : <AuthNavigation />}                      */}
        {isLoggedIn === true ? <MainNavigation /> : <AuthNavigation />}
    </View>
  );
};

import "react-native-gesture-handler";
import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./TabNavigation";
import PhotoNavigation from "./PhotoNavigation";
import MessageNavigation from "./MessageNavigation";
import { stackStyle } from "./config";

const MainNavigation = createStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <MainNavigation.Navigator
        initialRouteName="TabNavigation"
        headerMode="none"
        screenOptions={{
          headerStyle: { ...stackStyle }          
        }}
            
      >
        <MainNavigation.Screen
          name="PhotoNavigation"
          component={PhotoNavigation}
        />
        <MainNavigation.Screen name="TabNavigation" component={TabNavigation} />
        <MainNavigation.Screen
          name="MessageNavigation"
          component={MessageNavigation}
        />
      </MainNavigation.Navigator>
    </NavigationContainer>
  );
};

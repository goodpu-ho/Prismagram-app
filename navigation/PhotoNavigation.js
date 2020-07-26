import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";
import styled from "styled-components";
import styles from "../styles";
import constants from "../constants";
import NavIcon from "../components/NavIcon";

const PhotoTab = createMaterialTopTabNavigator();
const PhotoNavigation = createStackNavigator();

function PhotoTabNavigation() {
  return (
    <PhotoTab.Navigator
      tabBarPosition="bottom"
      tabBarOptions={{
        style: {
          paddingBottom: 5,
          borderRadius: 20,
          borderWidth: 0.5,
        },
        indicatorStyle: {
          width: constants.width / 2 - 20,
          marginLeft: 10,
          backgroundColor: styles.blueColor,
          borderRadius: 50,
          borderWidth: 2,
        },
      }}
    >
      <PhotoTab.Screen
        name="Select"
        component={SelectPhoto}
      />
      <PhotoTab.Screen name="Take" component={TakePhoto} />
    </PhotoTab.Navigator>
  );
}

export default () => {
  return (
    <PhotoNavigation.Navigator
      initialRouteName="PhotoTabNavigation"
      headerMode="screen"
    >
      <PhotoNavigation.Screen
        name="Select Photo"
        component={PhotoTabNavigation}
        options={{
          headerTitleAlign: "center",
          headerTitle: () => <NavIcon name={"md-camera"} size={50} />
        }}
      />
      <PhotoNavigation.Screen name="UploadPhoto" component={UploadPhoto} />
    </PhotoNavigation.Navigator>
  );
};

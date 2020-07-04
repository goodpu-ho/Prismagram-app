import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {createStackNavigator } from  "@react-navigation/stack";
import React from "react";
import SelectPhoto from '../screens/Photo/SelectPhoto';
import TakePhoto from '../screens/Photo/TakePhoto';
import UploadPhoto from '../screens/Photo/UploadPhoto';


const PhotoTab = createMaterialTopTabNavigator();
const PhotoNavigation = createStackNavigator();

function PhotoTabNavigation () {
  return (
    <PhotoTab.Navigator tabBarPosition = "bottom">
      <PhotoTab.Screen name="SelectPhoto" component={SelectPhoto} />
      <PhotoTab.Screen name="TakePhoto" component={TakePhoto} />      
    </PhotoTab.Navigator>
  );
}

export default () => {
    return (
        <PhotoNavigation.Navigator initialRouteName="PhotoTabNavigation" headerMode="none">
            <PhotoNavigation.Screen name="PhotoTabNavigation" component={PhotoTabNavigation} />
            <PhotoNavigation.Screen name="UploadPhoto" component={UploadPhoto} />
        </PhotoNavigation.Navigator>
    );
}
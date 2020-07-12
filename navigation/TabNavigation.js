import "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createAppContainer } from "react-navigation";
import { View } from "react-native";
import * as React from "react";
import Home from "../screens//Home";
import Search from "../screens/Search";
import Notification from "../screens/Notification";
import Profile from "../screens/Profile";
import PhotoNavigation from "./PhotoNavigation";
import NavIcon from "../components/NavIcon";

const TabNavigation = createBottomTabNavigator();

export default ({ navigation }) => {
  return (
    <TabNavigation.Navigator screenOptions={({ route }) => ({
      tabBarIcon:({focused}) => {
        var iconName;
        console.log(route.name);
        if(route.name === `Home`) {
          iconName = "md-home";
        } else if(route.name === 'Search') {
          iconName = "md-search";
        } else if (route.name === "Add") {
          if(focused){
            iconName = "ios-add-circle";
          }else {
            iconName = "md-add-circle-outline";
          }
        } else if (route.name === "Notification") {
          if(focused) {
            iconName = "md-heart";
          } else {
            iconName = "md-heart-empty";
          }
          
        } else if (route.name === "Profile") {
          iconName = "ios-contact";
        }

        return <NavIcon name={iconName} focused={focused}/>
      },

      tabBarOptions:{
        tabStyle :{
          backgroundColor:"#AAAACC"
        }
      }
    })}>
      <TabNavigation.Screen name="Home" component={Home} />
      <TabNavigation.Screen name="Search" component={Search} />
      <TabNavigation.Screen name="Add" component={PhotoNavigation} />
      <TabNavigation.Screen name="Notification" component={Notification} />
      <TabNavigation.Screen name="Profile" component={Profile} />
    </TabNavigation.Navigator>
  );
};

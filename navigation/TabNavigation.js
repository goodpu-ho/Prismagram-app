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
      tabBarIcon:({focus}) => {
        let iconName;
        console.log(route.name);
        if(route.name === `Home`) {
          iconName = "md-home";
        } else if(route.name === 'Search') {
          iconName = "md-search";
        } else if (route.name === "Add") {
          iconName = "md-add-circle-outline";
        } else if (route.name === "Notification") {
          iconName = "md-heart";
        } else if (route.name === "Prifile") {
          iconName = "ios-contact";
        }

        return <NavIcon name={iconName}/>
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

import "react-native-gesture-handler";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createAppContainer } from "react-navigation";
import {View} from "react-native";
import * as React from 'react';
import Home from "../screens//Home";
import Search from "../screens/Search";
import Notification from "../screens/Notification"
import Profile from "../screens/Profile";

const TabNavigation = createBottomTabNavigator();

export default () => {

    return(
        <NavigationContainer>
            <TabNavigation.Navigator>
                <TabNavigation.Screen name="Home" component={Home}/>
                <TabNavigation.Screen name="Search" component={Search}/>
                <TabNavigation.Screen name="Add" component={View} listeners={{
                    tabPress: e =>{
                        e.preventDefault();
                        console.log("add");
                    }
                }}/>
                <TabNavigation.Screen name="Notification" component={Notification}/>
                <TabNavigation.Screen name="Profile" component={Profile}/>
            </TabNavigation.Navigator>
        </NavigationContainer>
    )

}
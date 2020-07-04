import "react-native-gesture-handler";
import React from "react";
import {createStackNavigator } from  "@react-navigation/stack";
import Message from "../screens/Messages/Message"
import Messages from "../screens/Messages/Messages"

const MessageNavigation = createStackNavigator();

export default () => {

    return(
        <MessageNavigation.Navigator>
            <MessageNavigation.Screen name="Message" component={Message}/>
            <MessageNavigation.Screen name="Messages" component={Messages}/>
        </MessageNavigation.Navigator>
    );

}
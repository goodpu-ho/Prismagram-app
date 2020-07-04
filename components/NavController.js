import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useIsLoggedIn, useLogIn, useLogOut } from "../AuthContext";
import AuthNavigation from "../navigation/AuthNavigation";
import TabNavigation from "../navigation/TabNavigation";
import MainNavigation from "../navigation/MainNavigation";


export default () => {
    const isLoggedIn = useIsLoggedIn();
    const logIn = useLogIn();
    const logOut = useLogOut();

    const styles = StyleSheet.create({
        LargeText: {
          fontWeight: 'bold',
          fontSize: 100
        }        
    });

    return (
        <View style={{flex:1}}>
            {isLoggedIn ? (
                <MainNavigation/>
            ) : (
                <AuthNavigation/>
            )}
        </View>
    );
};
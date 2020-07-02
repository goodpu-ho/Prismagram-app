import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useIsLoggedIn, useLogIn, useLogOut } from "../AuthContext";
import AuthNavigation from "../navigation/AuthNavigation";

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
                <TouchableOpacity onPress={logOut}>
                    <Text style={styles.LargeText}>Log Out</Text>
                </TouchableOpacity>
            ) : (
                <AuthNavigation/>
            )}
        </View>
    );
};
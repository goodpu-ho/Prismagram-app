import React from "react";
import styled from "styled-components";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";
import MessageLink from "../components/MessageLink";
import { useLogOut, useIsLoggedIn } from "../AuthContext";
import { Image } from "react-native";
import NavIcon from "../components/NavIcon";

const Stack = createStackNavigator();

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

function Home() {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}

export default () => {
  const islogin = useIsLoggedIn();
  const logout = useLogOut();

  console.log(islogin);
  // logout(false);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}        
        options={{      
          headerTitle: () => <NavIcon name={"logo-instagram"} size={50}/>,    
          headerRight: () => <MessageLink />,
          headerTitleAlign: "center"
        }}
      />
    </Stack.Navigator>
  );
};
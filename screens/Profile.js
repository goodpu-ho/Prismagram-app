import React from "react";
import styled from "styled-components";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

function Profile() {
  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
}

export default () => (
  <Stack.Navigator>
    <Stack.Screen name="Profile" component={Profile}/>
  </Stack.Navigator>
);
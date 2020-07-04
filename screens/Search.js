import React from "react";
import styled from "styled-components";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const View = styled.View`
    flex:1;
    justify-content:center;
    align-items:center;
`;

const Text = styled.Text``;

function Search() {
    return (
      <View>
        <Text>Search</Text>
      </View>
    );
  }

export default () => (
    <Stack.Navigator>
        <Stack.Screen name="Search" component={Search}/>
    </Stack.Navigator>
)
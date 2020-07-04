import React from "react";
import styled from "styled-components";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";

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

export default () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} options={
      {
        headerRight: (props) => <TouchableOpacity><Text>Hello</Text></TouchableOpacity>
      }
    }/>
  </Stack.Navigator>
);

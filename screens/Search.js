import React from "react";
import styled from "styled-components";
import { createStackNavigator } from "@react-navigation/stack";
import SearchBar from "../components/SearchBar";
import useInput from "../hooks/useInput";

const Stack = createStackNavigator();

const View = styled.View`
    flex:1;
    justify-content:center;
    align-items:center;
`;

const Text = styled.Text``;

function Search({navigation}) {
  
  const searchInput = useInput("");

  navigation.setOptions({
    headerTitle : props => <SearchBar {...searchInput} onSubmit={handleSubmit}/>,
    headerTitleAlign: "center",
    term:{...searchInput}        
  })
    return (
      <View>
        <Text>Search</Text>
      </View>
    );
}

const handleSubmit = () => {
  console.log("summit")
}

export default () => (
    <Stack.Navigator>
        <Stack.Screen name="Search" component={Search}/>
    </Stack.Navigator>
)
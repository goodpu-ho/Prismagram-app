import React from "react";
import styled from "styled-components";
import {gql} from "apollo-boost";
import { createStackNavigator } from "@react-navigation/stack";
import { stackStyle } from "../navigation/config";
import { USER_FRAGMENT } from "../fragments";
import { ScrollView } from "react-native";
import { useQuery } from "react-apollo-hooks";
import Loader from "../components/Loader";
import UserPropfile from "../components/UserProfile";
import SqurePhoto from "../components/SqurePhoto";
import Detail from "./Detail";

export const ME = gql`
  {
    me {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

const Stack = createStackNavigator();

const Text = styled.Text``;

function Profile({navigation}) {
  const {loading, data} = useQuery(ME);
  // console.log(data);
  return (
    <ScrollView>
      {loading ? <Loader/> : data && data.me && <UserPropfile {...data.me} navigation={navigation}/>}
    </ScrollView>
  );
}

export default () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{
        headerStyle: { ...stackStyle },
      }}
    />
    <Stack.Screen name="SqurePhoto" component={SqurePhoto} />
    <Stack.Screen
      name="Detail"
      component={Detail}
      options={{
        headerStyle: { ...stackStyle },
      }}
    />
  </Stack.Navigator>
);

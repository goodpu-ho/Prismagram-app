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

function Profile() {
  const {loading, data} = useQuery(ME);
  // console.log(data);
  return (
    <ScrollView>
      {loading ? <Loader/> : data && data.me && <UserPropfile {...data.me}/>}
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
  </Stack.Navigator>
);

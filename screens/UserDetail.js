import React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../components/Loader";
import Post from "../components/Post";
import { ScrollView } from "react-native";
import { USER_FRAGMENT } from "../fragments";
import UserPropfile from "../components/UserProfile";

const View = styled.View``;
const Text = styled.Text``;

const USER_DETAIL = gql`
  query seeUser($username: String!) {
    seeUser(username: $username) {
        ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export default ({ navigation, route }) => {

    const {loading, data} = useQuery(USER_DETAIL, {
        variables:{
            username: route.params.username
        }
    })    

    console.log("godopu test : "+route.params.username);
    console.log(data);

  return (
    <ScrollView>
      {loading ? <Loader/> : (data && data.seeUser && <UserPropfile {...data.seeUser}/>)}
    </ScrollView>
  );
};

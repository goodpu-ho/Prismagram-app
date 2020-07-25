import React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../components/Loader";
import Post from "../components/Post";
import { ScrollView } from "react-native";

const View = styled.View``;
const Text = styled.Text``;

const POST_DETAIL = gql`
  query seeFullPost($id: String!) {
    seeFullPost(id: $id) {
      id
      location
      caption
      user {
        id
        avatar
        username
      }
      files {
        id
        url
      }

      isLiked
      likeCount
      comments {
        id
        text
        user {
          id
          username
        }
        createdAt
        updatedAt
      }

      createdAt
      updatedAt
    }
  }
`;

export default ({ navigation, route }) => {

    const {loading, data} = useQuery(POST_DETAIL, {
        variables:{
            id: route.params.id
        }
    })    

  return (
    <ScrollView>
      {loading ? <Loader/> : (data && data.seeFullPost && <Post {...data.seeFullPost} navigation={navigation}/>)}
    </ScrollView>
  );
};

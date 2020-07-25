import React, { useState } from "react";
import styled from "styled-components";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";
import { gql } from "apollo-boost";
import MessageLink from "../components/MessageLink";
import { useLogOut, useIsLoggedIn } from "../AuthContext";
import { Image, ScrollView, RefreshControl } from "react-native";
import NavIcon from "../components/NavIcon";
import Loader from "../components/Loader";
import { useQuery } from "react-apollo-hooks";
import Post from "../components/Post";
import { stackStyle } from "../navigation/config";
import UserDetail from "./UserDetail";
import SqurePhoto from "../components/SqurePhoto";
import Detail from "./Detail";

const FEED_QUERY = gql`
  {
    seeFeed {
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

const Stack = createStackNavigator();

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

function Home({ navigation }) {
  const [refeshing, setRefeshing] = useState(false);
  const { loading, data, refetch } = useQuery(FEED_QUERY);
  // console.log(data, refetch);

  const refresh = async () => {
    try {
      setRefeshing(true);
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefeshing(false);
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refeshing} onRefresh={refresh} />
      }
    >
      {loading ? (
        <Loader />
      ) : (
        data &&
        data.seeFeed &&
        data.seeFeed.map((post) => (
          <Post navigation={navigation} key={post.id} {...post} />
        ))
      )}
    </ScrollView>
  );
}

export default () => {
  const islogin = useIsLoggedIn();
  const logout = useLogOut();
  // logout();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: () => <NavIcon name={"logo-instagram"} size={50} />,
          headerRight: () => <MessageLink />,
          headerTitleAlign: "center",
          headerStyle: { ...stackStyle },
        }}
      />
      <Stack.Screen name="Post" component={Post} />

      <Stack.Screen name="UserDetail" component={UserDetail} />
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
};

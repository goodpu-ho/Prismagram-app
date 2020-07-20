import React, { useState } from "react";
import styled from "styled-components";
import { createStackNavigator } from "@react-navigation/stack";
import { gql } from "apollo-boost";
import { ScrollView, RefreshControl } from "react-native";
import SearchBar from "../components/SearchBar";
import useInput from "../hooks/useInput";
import { useQuery } from "react-apollo-hooks";
import Loader from "../components/Loader";
import SqurePhoto from "../components/SqurePhoto";
import Detail from "../screens/Detail"

export const SEARCH = gql`
  query search($term: String!) {
    searchPost(term: $term) {
      id
      files {
        id
        url
      }
      likeCount
      commentCount
    }
    searchUser(term: $term) {
      id
      avatar
      username
      isFollowing
      selfMe
    }
  }
`;

const Stack = createStackNavigator();

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

function Search({ navigation }) {
  const [value, setValue] = useState("");
  const [shouldFatch, setShouldFatch] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onChange = (text) => {
    setValue(text);
    setShouldFatch(false);
  };

  const { data, loading, refetch } = useQuery(SEARCH, {
    skip: shouldFatch === false,
    variables: {
      term: value,
    },
    fetchPolicy: "network-only",
  });

  console.log(data, loading);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch({ variables: { term: value } });
    } catch (e) {
    } finally {
      setRefreshing(false);
    }
  };

  navigation.setOptions({
    headerTitle: (props) => (
      <SearchBar value={value} onChange={onChange} onSubmit={handleSubmit} />
    ),
    headerTitleAlign: "center",
  });

  const handleSubmit = () => {
    if (value === "" || value === undefined) {
      setShouldFatch(false);
      console.log("summit empty " + `${value}`);
    } else {
      setShouldFatch(true);
      console.log("summit non empty" + `${value}`);
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
    >
      {loading ? (
        <Loader />
      ) : (
        data &&
        data.searchPost &&
        data.searchPost.map((post) => (
          <SqurePhoto key={post.id} files={post.files} id={post.id} navigation={navigation}/>
        ))
      )}
    </ScrollView>
  );
}

export default () => (
  <Stack.Navigator>
    <Stack.Screen name="Search" component={Search} />
    <Stack.Screen name="SqurePhoto" component={SqurePhoto} />
    <Stack.Screen name="Detail" component={Detail} />
  </Stack.Navigator>
);

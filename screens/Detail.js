import React from "react";
import styled from "styled-components";

const View = styled.View``;
const Text = styled.Text``;

export default ({ navigation, route }) => {

    console.log(route);
  return (
    <View>
      <Text>I should fetch for {route.params.id}</Text>
    </View>
  );
};

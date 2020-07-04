import React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const Container = styled.TouchableOpacity``;
const Text = styled.Text``;

function MessageLink() {
    const navigation = useNavigation();
    return (
        <Container onPress={() => navigation.navigate("MessageNavigation")}>
          <Text>Messages</Text>
        </Container>
      );
}

export default MessageLink;


import React from "react";
import styled from "styled-components";
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles";

const Container = styled.TouchableOpacity`
  margin-right:20px;
`;
const Text = styled.Text``;

function MessageLink() {
    const navigation = useNavigation();
    return (
        <Container onPress={() => navigation.navigate("MessageNavigation")}>
          <Ionicons name="ios-paper-plane" size={30} color="black"/>
        </Container>
      );
}

export default MessageLink;


import React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native-gesture-handler";
import constants from "../../constants";
import AuthButton from "../../components/AuthButton";

const View = styled.View`
   flex:1;
   justify-content: center;
   align-items:center;
   background-color:${props=>props.theme.greyColor}
`;

const Text = styled.Text``;

const Image = styled.Image`
  width:${constants.width/2};
`;

const Touchable = styled.TouchableOpacity``;

const LoginLink = styled.View``;

const LoginLinkText = styled.Text`
  color:${props=>props.theme.blueColor};
  font-weight:600;
  margin-top:20px;
`;

export default ({ navigation}) => (
  <View>
    <Image source={require("../../assets/logo.png")} resizeMode="contain"/>
    <AuthButton text={"Create New Account"} onPress={ () => navigation.navigate("SignUp")}/>
    <Touchable onPress={ () => navigation.navigate("Login")}>
      <LoginLink>
        <LoginLinkText>Log in</LoginLinkText>
      </LoginLink>
    </Touchable>
  </View>
)
import React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native-gesture-handler";
import constants from "../../constants";

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

const SignUpButton = styled.View`
  background-color:${props=>props.theme.blueColor};
  padding : 10px;
  border-radius:4px;
  margin-bottom:25px;
`;

const SignUpButtonText = styled.Text`
  color:white;
  text-align:center;
  font-weight:600;
`;

const LoginLink = styled.View``;
const LoginLinkText = styled.Text`
  color:${props=>props.theme.blueColor}
`;

export default ({ navigation}) => (
  <View>
    <Image source={require("../../assets/logo.png")} resizeMode="contain"/>
    <Touchable onPress={ () => navigation.navigate("SignUp")}>
      <SignUpButton>
        <SignUpButtonText>Create New Account</SignUpButtonText>
      </SignUpButton>
    </Touchable>
    <Touchable onPress={ () => navigation.navigate("Login")}>
      <LoginLink>
        <LoginLinkText>Log in</LoginLinkText>
      </LoginLink>
    </Touchable>
  </View>
)

// export default ({ navigation }) => (
//   <View>
//     <Text>Auth Home</Text>
//     <TouchableOpacity onPress={() => navigation.navigate("Login")}>
//       <Text>Go to Login</Text>
//     </TouchableOpacity>
//     <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
//       <Text>Go to Signup</Text>
//     </TouchableOpacity>
//   </View>
// );
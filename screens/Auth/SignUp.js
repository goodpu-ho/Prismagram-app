import React, { useState } from "react";
import styled from "styled-components";
import * as Facebook from 'expo-facebook';
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useMutation } from "react-apollo-hooks";
import { LOGIN, CREATE_ACCOUNT } from "./AuthQueries";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

const FBContainer = styled.View`
  margin-top:25px;
  padding-top:25px;
  border-top-width:2px;
  border-color: ${props=>props.theme.lightGreyColor};
  border-style:solid;
`;

export default ({route, navigation }) => {
  const fNameInput = useInput("");
  const lNameInput = useInput("");
  const emailInput = useInput(route.params?route.params.email: "");
  const uNameInput = useInput("");
  const [loading, setLoading] = useState(false);
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables:{
      username : uNameInput.value,
      email : emailInput.value,
      firstname : fNameInput.value,
      lastname : lNameInput.value
    }
  })

  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSignUp = async () => {

    const { value:fName } = fNameInput;
    const { value:lName } = lNameInput;
    const { value:email } = emailInput;
    const { value:uName } = uNameInput;

    if (!emailRegex.test(email)) {
      return Alert.alert("That email is invalid.");
    }

    if(fName === ""){
      return Alert.alert("I need your First name");
    }

    if(uName === "") {
      return Alert.alert("Inavlid UserName");
    }

    try {
      setLoading(true);
      const {data:{createAccount}} = await createAccountMutation();
      if(createAccount) {
        Alert.alert("Account created", "Log in Now");
        navigation.navigate("Login", {email});        
      } else {

      }
    } catch (e) {
      console.log(e);
      Alert.alert("Username taken.");
      navigation.navigate("Login", {email});
    } finally {
      setLoading(false);
    }
  };

  const fbLogin = async () => {
    try {
      await Facebook.initializeAsync("1026822604380267");
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(        
        {
          permissions: ["public_profile"]
        }
      );
      if (type === "success") {
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        const data = await response.json();
        // console.log(data);
        
        Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  return (
    
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...fNameInput}
          placeholder="First Name"          
          onSubmitEditing={handleSignUp}
        />
        <AuthInput
          {...lNameInput}
          placeholder="Last Name"          
          onSubmitEditing={handleSignUp}
        />
        <AuthInput
          {...emailInput}
          placeholder="Email"
          keyboardType="email-address"
          onSubmitEditing={handleSignUp}
        />
        <AuthInput
          {...uNameInput}
          placeholder="UserName"          
          returnKeyType="send"
          onSubmitEditing={handleSignUp}
        />
        <AuthButton onPress={handleSignUp} text="Sign Up" loading={loading} />
        <FBContainer>
          <AuthButton loading={loading} onPress={fbLogin} text="Login FaceBook" bgColor={"#2D4DA7"}/>
        </FBContainer>
      </View>      
    </TouchableWithoutFeedback>

    
  );
};

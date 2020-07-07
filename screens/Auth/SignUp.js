import React, { useState } from "react";
import styled from "styled-components";
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

export default ({route, navigation }) => {
  const fNameInput = useInput("");
  const lNameInput = useInput("");
  const emailInput = useInput(route.params?.email);
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
      </View>
    </TouchableWithoutFeedback>
  );
};

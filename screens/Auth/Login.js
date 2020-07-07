import React, { useState } from "react";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useMutation } from "react-apollo-hooks";
import { LOGIN } from "./AuthQueries";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

export default ({ route, navigation }) => {
  const emailInput = useInput(route.params? route.params.email: "");
  const [loading, setLoading] = useState(false);
  const [requestSecretMutation] = useMutation(LOGIN, {
    variables: { email: emailInput.value }
  });

  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleLogin = async () => {
    const { value } = emailInput;
    if (value === "") {
      return Alert.alert("Email can't be empty");
    } else if (!value.includes("@") || !value.includes(".")) {
      return Alert.alert("Please write an email");
    } else if (!emailRegex.test(value)) {
      return Alert.alert("That email is invalid.");
    }

    try {
      setLoading(true);
      const {
        data: { requestSecret },
      } = await requestSecretMutation();

      if (requestSecret) {
        Alert.alert("Check your email");
        navigation.navigate("Confirm", {email:value});
        return;
      } else {
        Alert.alert("Account not found");
        navigation.navigate("SignUp", {email:value});
      }
    } catch (e) {
      console.log(e);
      Alert.alert("can't Login now");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          placeholder="Email"
          keyboardType="email-address"
          {...emailInput}
          returnKeyType="send"
          onSubmitEditing={handleLogin}
        />
        <AuthButton onPress={handleLogin} text="Log In" loading={loading} />
      </View>
    </TouchableWithoutFeedback>
  );
};

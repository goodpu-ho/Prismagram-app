import React from "react";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

export default () => {
  const emailInput = useInput("");
  return (
    <View>
      <AuthInput placeholder="Email" keyboardType="email-address" {...emailInput}/>
      <AuthButton onPress={() => null} text="Log In" />
    </View>
  );
};

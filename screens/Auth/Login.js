import React from "react";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";

const View = styled.View`
    flex:1;
    justify-content: center;
    align-items:center;    
 `;

const Text = styled.Text``;

export default () => (
  <View>
    <AuthInput placeholder="Email" value="" keyboardType="email-address"/>
    <AuthButton onPress={() => null} text="Log In"/>
  </View>
);
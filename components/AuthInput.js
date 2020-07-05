import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";

const Container = styled.View`
  margin-bottom: 10px;
`;

const TextInput = styled.TextInput`
    background-color:${props=>props.theme.greyColor};
    border: 2px solid ${props=>props.theme.darkGreyColor};
    width:${constants.width/2};
    padding:5px;
    border-radius:4px; 
`;

const AuthInput = ({ placeholder, value, keyboardType, autoCapitalize, onChange }) => (
  <Container>
    <TextInput
      placeholder={placeholder}
      value={value}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      onChangeText={onChange}
    />
  </Container>
);

AuthInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  keyboardType: PropTypes.oneOf([
    "default",
    "number-pad",
    "decimal-pad",
    "numeric",
    "email-address",
    "phone-pad",
  ]).isRequired,
  autoCapitalize: PropTypes.oneOf(["none", "sentences", "words", "characters"]).isRequired,
  onChange: PropTypes.func.isRequired
};

export default AuthInput;

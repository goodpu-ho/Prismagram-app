import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";
import { TextInput } from "react-native-gesture-handler";
import styles from "../styles";

const SearchBar = ({ onChange, value, onSubmit }) => (
  <TextInput
    value={value}
    onChangeText={onChange}
    placeholder={"Search"}
    onSubmitEditing={onSubmit}
    style={{width: constants.width-40, height:40, backgroundColor:styles.lightGreyColor, padding:5, textAlign:"center"}}  
    placeholderTextColor={styles.darkGreyColor}  
  />
);

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;

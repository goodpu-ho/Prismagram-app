import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";

const TextInput = styled.TextInput`    
`;

const SearchBar = ({onChange, value, onSubmit}) => (
    <TextInput value={value} onChange={onChange} placeholder={"Search"}/>
)

SearchBar.propTypes = {
    onChange:PropTypes.func.isRequired,
    value:PropTypes.string.isRequired,
    onSubmit:PropTypes.func.isRequired
}

export default SearchBar;
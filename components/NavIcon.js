import React from "react";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import styles from "../styles";
import styled from "styled-components";

const NavIcon = ({ name, color = styles.blackColor, size = 30, focused = true }) => (
  <Ionicons name={name} color={focused? color : styles.darkGreyColor} size={size} />
);

NavIcon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
  focused: PropTypes.bool
};

export default NavIcon;
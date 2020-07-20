import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { TouchableOpacity, Image } from "react-native";
import constants from "../constants";
import { withNavigation } from "react-navigation";
import Detail from "../screens/Detail";
import { createStackNavigator } from "@react-navigation/stack";

const SqurePhoto = ({ navigation, files = [], id }) => {

  return (
    <TouchableOpacity onPress={() => navigation.navigate("Detail", {id})}>
      <Image
        source={{ uri: files[0].url }}
        style={{ width: constants.width / 3, height: constants.height / 6 }}
      />
    </TouchableOpacity>
  );
};

SqurePhoto.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,

  id: PropTypes.string.isRequired,
};

export default SqurePhoto;

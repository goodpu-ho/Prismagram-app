import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components";
import { Camera } from "expo-camera";
import constants from "../../constants";
import { Ionicons } from "@expo/vector-icons";

const View = styled.View`
  flex: 1;
`;

const Text = styled.Text``;

export default ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [permission, setPermission] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

  const askPermission = async () => {
    try {
      const { status } = await Camera.requestPermissionsAsync();
      if (status === "granted") {
        setPermission(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    askPermission();
  }, []);

  const toggleCameraType = () => {
    if(cameraType === Camera.Constants.Type.back) {
      setCameraType(Camera.Constants.Type.front);
    } else {
      setCameraType(Camera.Constants.Type.back);
    }
  }

  return (
    <View>
      <Camera
        type={cameraType}
        style={{
          width: constants.width,
          height: constants.height / 2,
          justifyContent:"flex-end",
          padding:20
        }}
      >
        <TouchableOpacity onPress={ () => toggleCameraType()}>
          <Ionicons name="md-reverse-camera" size={40}/>
        </TouchableOpacity>
      </Camera>
    </View>
  );
};

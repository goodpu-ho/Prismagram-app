import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components";
import { Camera } from "expo-camera";

const View = styled.View`
  flex: 1;
`;

const Text = styled.Text``;

export default ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [permission, setPermission] = useState(false);

  const askPermission = async () => {
    try {
      const { status } = await Camera.requestPermissionsAsync();
      if (status === "granted") {
        setPermission(true);
      }
    } catch {}
  };

  useEffect(() => {
    askPermission();
  }, []);

  return (
    <View>
      <Camera style={{ flex: 1 }}>

      </Camera>
    </View>
  );
};

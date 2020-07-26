import React, { useState, useEffect, useRef } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components";
import { Camera } from "expo-camera";
import constants from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import styles from "../../styles";
import UploadPhoto from "./UploadPhoto";

const View = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text``;

const Button = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 50px;
  border: 10px solid ${styles.darkGreyColor};
`;

export default ({ navigation }) => {
  const cameraRef = useRef();
  const [canTakePhoto, setCanTakePhoto] = useState(true);
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
    if (cameraType === Camera.Constants.Type.back) {
      setCameraType(Camera.Constants.Type.front);
    } else {
      setCameraType(Camera.Constants.Type.back);
    }
  };

  const takePhoto = async () => {
    if(!canTakePhoto){
      return;
    }
    try {
      setCanTakePhoto(false);
      const { uri } = await cameraRef.current.takePictureAsync({
        quality: 1,
      });
      const asset = await MediaLibrary.createAssetAsync(uri);      
      navigation.navigate("UploadPhoto", {photo:asset});
    } catch (e) {
      console.log(e);
      setCanTakePhoto(false);
    }
  };

  return (
    <View>
      <>
        <Camera
          ref={cameraRef}
          type={cameraType}
          style={{
            width: constants.width,
            height: constants.height / 2,
            justifyContent: "flex-end",
            padding: 20,
          }}
        >
          <TouchableOpacity onPress={() => toggleCameraType()}>
            <Ionicons
              name="md-reverse-camera"
              size={40}
              color={styles.greyColor}
            />
          </TouchableOpacity>
        </Camera>
        <View>
          <TouchableOpacity onPress={() => takePhoto()} disabled={!canTakePhoto}>
            <Button />
          </TouchableOpacity>
        </View>
      </>
    </View>
  );
};

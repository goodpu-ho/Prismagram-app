import React, { useState } from "react";
import styled from "styled-components";
import { Image, Alert } from "react-native";
import axios from "axios";
import Constants from "expo-constants";
import useInput from "../../hooks/useInput";
import styles from "../../styles";
import constants from "../../constants";
import { TouchableOpacity } from "react-native-gesture-handler";

const View = styled.View`
  flex: 1;
`;

const Container = styled.View`
  flex-direction: row;
  padding: 20px;
`;

const Form = styled.View`
  justify-content: space-between;
  margin: 10px;
`;

const STextInput = styled.TextInput`
  width: ${constants.width - 180};
  border: 0px solid ${styles.lightGreyColor};
  border-bottom-width: 5px;
`;

const Button = styled.TouchableOpacity`
  background-color: ${styles.blueColor};
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  height: 30px;
`;

const Text = styled.Text`
  color: white;
  font-weight: bold;
`;

export default ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const captionInput = useInput("");
  const locationInput = useInput("");
  const photo = route.params.photo;

  const handleSubmmit = async () => {
    if (captionInput.value === "" || locationInput === "") {
      Alert.alert("Input need");
    }

    const formData = new FormData();
    const name = photo.filename;
    const [, type] = name.split(".");
    
    formData.append("file", {
      name,
      type: "image/jpeg",
      uri: photo.uri,
    });

    // const { manifest } = Constants;
    // const testuri = `http://${manifest.debuggerHost.split(':').shift()}:4000`;
    // console.log(testuri);

    
    try {
      const {
        data: { path },
      } = await axios.post("http://192.168.35.199:4000/api/upload", formData, {
        headers: {          
          "content-type": "multipart/form-data"
        },
      });
      setFileUrl(path);
    } catch (e) {
      Alert.alert("Cant upload", "Try later");
      console.log(e);
    }
  };

  return (
    <View>
      <Container>
        <Image
          source={{ uri: route.params.photo.uri }}
          style={{ height: 150, width: 150 }}
        />
        <Form>
          <STextInput
            onChangeText={captionInput.onChange}
            value={captionInput.value}
            placeholder="Caption"
            placeholderTextColor={styles.darkGreyColor}
          />
          <STextInput
            onChangeText={locationInput.onChange}
            value={locationInput.value}
            placeholder="Location"
            placeholderTextColor={styles.darkGreyColor}
          />
          <Button onPress={() => handleSubmmit()}>
            <Text>Upload</Text>
          </Button>
        </Form>
      </Container>
    </View>
  );
};

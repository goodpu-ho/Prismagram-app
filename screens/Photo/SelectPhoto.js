import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
import Loader from "../../components/Loader";
import { Image, ScrollView, StyleSheet } from "react-native";
import constants from "../../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "../../styles";

const View = styled.View`
  flex: 1;
`;

const Text = styled.Text``;

const GridView = styled.View``;

const grid = StyleSheet.create({
  list: { flex: 1, width: "100%" },
  stylegridView: {
    flexDirection: "row",
    flexWrap: "wrap",    
    paddingTop: 10,
    justifyContent: "space-between",
  },
});

export default () => {
  const [loading, setLoading] = useState(true);
  const [permission, setPermission] = useState(false);
  const [selected, setSelected] = useState();
  const [allPhotos, setAllPhotos] = useState();

  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === "granted") {
        setPermission(true);
        getPhotos();
      }
    } catch (e) {
      console.log(e);
      setPermission(false);
    }
  };

  const getPhotos = async () => {
    try {
      const { assets } = await MediaLibrary.getAssetsAsync();
      console.log("getPhoto : ", assets);
      const [firstPhoto] = assets;
      setSelected(firstPhoto);
      setAllPhotos(assets);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    askPermission();
  }, []);

  const changeSelect = (photo) => {
    setSelected(photo);
  };

  return (
    <View>
      {loading ? (
        <Loader />
      ) : (
        <View>
          {permission ? (
            <>
              <Image
                source={{ uri: selected.uri }}
                resizeMode="contain"
                style={{
                  width: constants.width,
                  height: constants.height / 3,
                  borderTopLeftRadius: 50,
                  borderTopRightRadius: 50,
                  borderBottomLeftRadius: 50,
                  borderBottomRightRadius: 50,
                  borderColor: styles.blueColor,
                }}
              />
              <ScrollView style={grid.list}>
                <GridView style={grid.stylegridView}>
                  {allPhotos &&
                    allPhotos.map((photo) => (
                      <TouchableOpacity
                        key={photo.id}
                        onPress={() => changeSelect(photo)}
                      >
                        <Image
                          source={{ uri: photo.uri }}
                          style={{
                            width: constants.width / 3,
                            height: constants.height / 5,
                            opacity: photo.id === selected.id ? 0.5 : 1,
                            borderWidth: photo.id === selected.id ? 2 : 0,
                            borderColor:
                              photo.id === selected.id
                                ? styles.redColor
                                : styles.blackColor,
                          }}
                        />
                      </TouchableOpacity>
                    ))}
                </GridView>
              </ScrollView>
            </>
          ) : null}
        </View>
      )}
    </View>
  );
};

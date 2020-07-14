import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Image, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import constants from "../constants";
import { Ionicons } from "@expo/vector-icons";

const Container = styled.View``;
const Header = styled.View`
  padding: 20px;
  flex-direction: row;
  align-items: center;
`;
const Touchable = styled.TouchableOpacity``;

const HeaderUserContainer = styled.View`
  margin-left: 10px;
`;

const Bold = styled.Text`
  font-weight: 500;
`;

const Location = styled.Text`
  font-size: 12px;
`;

const IconsContainer = styled.View`
  padding: 15px;
  flex-direction:row;
`;

const IconView = styled.View`
    margin-right:10px;
`;

const Post = ({ user, location, files = [] }) => {
  return (
    <Container>
      <Header>
        <Touchable>
          <Image
            style={{ height: 40, width: 40, borderRadius: 20 }}
            source={{ uri: user.avatar }}
          />
        </Touchable>
        <Touchable>
          <HeaderUserContainer>
            <Bold>{user.username}</Bold>
            <Location>{location}</Location>
          </HeaderUserContainer>
        </Touchable>
      </Header>
      <Swiper showsButtons={true} style={{ height: constants.height / 2.5 }}>
        {files &&
          files.map((file) => (
            <Image
              key={file.id}
              style={{ height: constants.height / 2.5, width: constants.width }}
              source={{ uri: file.url }}
            />
          ))}
      </Swiper>
      <IconsContainer>
        <IconView>
          <Touchable>
            <Ionicons name={"md-heart-empty"} size={30} />
          </Touchable>
        </IconView>
        <IconView>
          <Touchable>
            <Ionicons name={"md-message-empty"} size={30} />
          </Touchable>
        </IconView>
      </IconsContainer>
    </Container>
  );
};

Post.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  createdAt: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  location: PropTypes.string,
};

export default Post;

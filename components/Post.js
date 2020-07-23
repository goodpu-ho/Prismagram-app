import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Image, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import { gql } from "apollo-boost";
import constants from "../constants";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles";
import { useMutation } from "react-apollo-hooks";
import UserDetail from "../screens/UserDetail";

const LIKE_POST = gql`
  mutation toggleLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;

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
  font-weight: 700;
`;

const Location = styled.Text`
  font-size: 12px;
`;

const IconsContainer = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

const IconView = styled.View`
  margin-right: 10px;
`;

const InfoContainer = styled.View`
  padding: 15px;
`;

const Caption = styled.Text`
  margin-top: 3px;
`;

const CommentCount = styled.Text`
  margin-top: 5px;
  opacity: 0.5;
  font-size: 13px;
`;

const Post = ({
  id,
  user,
  location,
  files = [],
  likeCount:likeCountProp,
  caption,
  comments = [],
  isLiked: isLikedProp,
  navigation
}) => {
  const [isLiked, setIsLiked] = useState(isLikedProp);
  const [likeCount, setLikeCount] = useState(likeCountProp);
  const [toggleLikeMutation] = useMutation(LIKE_POST, {
    variables: {
      postId: id,
    },
  });
  const handleLike = async () => {
      if(isLiked === true) {
          setLikeCount(l => l-1);
      } else {
          setLikeCount(l => l+1);
      }
      setIsLiked((p) => !p);
      try{
          await toggleLikeMutation();
      } catch (e) {
        console.log(e.message);
      }
  };

  return (
    <Container>
      <Header>
        <Touchable onPress={()=>navigation.navigate("UserDetail", {username:user.username})}>
          <Image
            style={{ height: 40, width: 40, borderRadius: 20 }}
            source={{ uri: user.avatar }}
          />
        </Touchable>
        <Touchable onPress={()=>navigation.navigate("UserDetail", {username:user.username})}>
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
      <InfoContainer>
        <IconsContainer>
          <IconView>
            <Touchable onPress={handleLike}>
              <Ionicons
                name={isLiked ? "md-heart" : "md-heart-empty"}
                size={30}
                color={isLiked ? styles.redColor : styles.blackColor}                
              />
            </Touchable>
          </IconView>
          <IconView>
            <Touchable>
              <Ionicons name={"md-text"} size={30} />
            </Touchable>
          </IconView>
        </IconsContainer>

        <Touchable>
          <Bold>{likeCount === 1 ? "1 like" : `${likeCount} likes`}</Bold>
        </Touchable>

        <Caption>
          <Bold>{user.username}</Bold> {caption}
        </Caption>

        <Touchable>
          <CommentCount>See all {comments.length} comments</CommentCount>
        </Touchable>
      </InfoContainer>
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

import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Image, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import constants from "../constants";
import styles from "../styles";
import SqurePhoto from "./SqurePhoto";
import Post from "./Post";

const ProfileHeader = styled.View`
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const HeaderColum = styled.View``;

const ProfileState = styled.View`
  flex-direction: row;
`;

const Stat = styled.View`
  margin-left: 35px;
  align-items: center;
`;

const StatNumber = styled.Text`
  font-weight: bold;
  font-size: 20px;
`;

const StatName = styled.Text`
  font-size: 13px;
`;

const ProfileMeta = styled.View`
  margin-left: 20px;
`;

const BoldTex = styled.Text`
  font-weight: bold;
  font-size: 15px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  margin-top: 30px;
  padding-top: 5px;
  border: 1px solid ${styles.lightGreyColor};
`;

const Button = styled.View`
  width: ${constants.width / 2}px;
  align-items: center;
`;

const UserPropfile = ({
  avatar,
  postsCount,
  followersCount,
  followingCount,
  fullName,
  posts,
  navigation
}) => {
  const [isGrid, setIsGrid] = useState(true);
  const toggleGrid = () => {
    setIsGrid((grid) => !grid);
  };

  return (
    <View>
      <ProfileHeader>
        <Image
          style={{ height: 80, width: 80, borderRadius: 40 }}
          source={{ uri: avatar }}
        />
        <HeaderColum>
          <ProfileState>
            <Stat>
              <StatNumber>{postsCount}</StatNumber>
              <StatName>Post</StatName>
            </Stat>
            <Stat>
              <StatNumber>{followersCount}</StatNumber>
              <StatName>Follower</StatName>
            </Stat>
            <Stat>
              <StatNumber>{followingCount}</StatNumber>
              <StatName>Following</StatName>
            </Stat>
          </ProfileState>
        </HeaderColum>
      </ProfileHeader>

      <ProfileMeta>
        <BoldTex>{fullName}</BoldTex>
      </ProfileMeta>

      <ButtonContainer>
        <TouchableOpacity onPress={toggleGrid}>
          <Button>
            <Ionicons
              color={isGrid ? styles.blackColor : styles.darkGreyColor}
              size={32}
              name="md-grid"
            />
          </Button>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleGrid}>
          <Button>
            <Ionicons
              color={!isGrid ? styles.blackColor : styles.darkGreyColor}
              size={32}
              name="md-menu"
            />
          </Button>
        </TouchableOpacity>
      </ButtonContainer>

      {posts &&
        posts.map((post) =>
          isGrid ? (
            <SqurePhoto key={post.id} {...post} navigation={navigation} />
          ) : (
            <Post key={post.id} {...post} navigation={navigation} />
          )
        )}
    </View>
  );
};

UserPropfile.propTypes = {
  id: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  fullName: PropTypes.string,
  isFollowing: PropTypes.bool.isRequired,
  selfMe: PropTypes.bool.isRequired,
  followersCount: PropTypes.number.isRequired,
  followingCount: PropTypes.number.isRequired,
  postsCount: PropTypes.number.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ),
};

export default UserPropfile;

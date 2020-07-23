import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const UserPropfile = () => null;

UserPropfile.propTypes = {
  id: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  fullName: PropTypes.string,
  isFollowing: PropTypes.bool.isRequired,
  selfMe: PropTypes.bool.isRequired,
  followersCount: PropTypes.number.isRequired,
  followingCount: PropTypes.number.isRequired,
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

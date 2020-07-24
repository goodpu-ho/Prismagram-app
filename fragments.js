import { gql } from "apollo-boost";

export const POST_FRAGMENT = gql`
  fragment PostParts on Post {
    id
    location
    caption
    user {
      id
      avatar
      username
    }
    files {
      id
      url
    }
    isLiked
      likeCount
      comments {
        id
        text
        user {
          id
          username
        }
        createdAt
        updatedAt
      }

      createdAt
      updatedAt
  }
`;

export const USER_FRAGMENT = gql`
  fragment UserParts on User {
    id
    avatar
    username
    fullName
    isFollowing
    selfMe
    bio
    followingCount
    followersCount    
    postsCount
    posts {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;
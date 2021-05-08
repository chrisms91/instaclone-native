import { gql } from '@apollo/client';

export const PHOTO_FRAGMENT = gql`
  fragment PhotoFragment on Photo {
    id
    file
    totalLikes
    totalComments
    isLiked
  }
`;

export const COMMENT_FRAGMENT = gql`
  fragment CommentFragment on Comment {
    id
    user {
      userName
      avatar
    }
    payload
    isMine
    createdAt
  }
`;

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    userName
    avatar
    isFollowing
    isMe
  }
`;

export const FEED_PHOTO_FRAGMENT = gql`
  fragment FeedPhotoFragment on Photo {
    ...PhotoFragment
    user {
      id
      userName
      avatar
    }
    caption
    createdAt
    isMine
  }
  ${PHOTO_FRAGMENT}
`;

export const ROOM_FRAGMENT = gql`
  fragment RoomParts on Room {
    id
    unreadTotal
    users {
      avatar
      userName
    }
  }
`;

// export const MESSAGE_FRAGMENT = gql`
//   fragment MessageFragment on Message {
//     id
//     payload
//     user {
//       userName
//       avatar
//     }
//     read
//   }
// `;

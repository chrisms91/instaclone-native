import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { colors } from '../colors';

const FOLLOW_USER_MUTATION = gql`
  mutation followUser($userName: String!) {
    followUser(userName: $userName) {
      ok
      error
    }
  }
`;

const UNFOLLOW_USER_MUTATION = gql`
  mutation unfollowUser($userName: String!) {
    unfollowUser(userName: $userName) {
      ok
      error
    }
  }
`;

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
`;

const Column = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 25px;
  margin-right: 10px;
`;

const Username = styled.Text`
  font-weight: 600;
  color: white;
`;

const FollowBtn = styled.TouchableOpacity`
  background-color: ${colors.blue};
  justify-content: center;
  padding: 5px 10px;
  border-radius: 4px;
`;

const FollowBtnText = styled.Text`
  font-weight: 600;
  color: white;
`;

const UserRow = ({ id, avatar, userName, isFollowing, isMe }) => {
  const navigation = useNavigation();

  const followUserUpdate = (cache, result) => {
    const {
      data: {
        followUser: { ok, error },
      },
    } = result;
    if (ok) {
      cache.modify({
        id: `User:${id}`,
        fields: {
          isFollowing(cachedIsFollowing) {
            return true;
          },
        },
      });
    } else {
      console.log(error);
      return;
    }
  };

  const unfollowUserUpdate = (cache, result) => {
    const {
      data: {
        unfollowUser: { ok, error },
      },
    } = result;
    if (ok) {
      cache.modify({
        id: `User:${id}`,
        fields: {
          isFollowing(cachedIsFollowing) {
            return false;
          },
        },
      });
    } else {
      console.log(error);
      return;
    }
  };

  const [followUser] = useMutation(FOLLOW_USER_MUTATION, {
    variables: {
      userName,
    },
    update: followUserUpdate,
  });

  const [unfollowUser] = useMutation(UNFOLLOW_USER_MUTATION, {
    variables: {
      userName,
    },
    update: unfollowUserUpdate,
  });

  const onFollowBtnPress = () => {
    if (isFollowing) {
      unfollowUser();
    } else {
      followUser();
    }
  };

  return (
    <Wrapper>
      <Column
        onPress={() =>
          navigation.navigate('Profile', {
            id,
            userName,
          })
        }
      >
        <Avatar source={{ uri: avatar }} />
        <Username>{userName}</Username>
      </Column>
      {!isMe ? (
        <FollowBtn onPress={onFollowBtnPress}>
          <FollowBtnText>{isFollowing ? 'Unfollow' : 'Follow'}</FollowBtnText>
        </FollowBtn>
      ) : null}
    </Wrapper>
  );
};

export default UserRow;

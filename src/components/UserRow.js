import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../colors';

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px 15px;
`;

const Column = styled.View`
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

const UserRow = ({ avatar, userName, isFollowing, isMe }) => {
  return (
    <Wrapper>
      <Column>
        <Avatar source={{ uri: avatar }} />
        <Username>{userName}</Username>
      </Column>
      {!isMe ? (
        <FollowBtn>
          <FollowBtnText>{isFollowing ? 'Unfollow' : 'Follow'}</FollowBtnText>
        </FollowBtn>
      ) : null}
    </Wrapper>
  );
};

export default UserRow;

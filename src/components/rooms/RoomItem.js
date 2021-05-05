import { useNavigation } from '@react-navigation/core';
import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../../colors';
import useMe from '../../hooks/useMe';

const RoomContainer = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 15px 10px;
`;

const Column = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 20px;
`;

const Data = styled.View``;

const UnreadIndicator = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${colors.blue};
  margin-right: 5px;
`;

const Username = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 16px;
`;

const UnreadText = styled.Text`
  color: white;
  margin-top: 2px;
  font-weight: 500;
`;

const RoomItem = ({ users, unreadTotal, id }) => {
  const { data: meData } = useMe();
  const navigation = useNavigation();
  const talkingTo = users.find(
    (user) => user.userName !== meData?.me?.userName
  );
  const goToRoom = () =>
    navigation.navigate('Room', {
      id,
      talkingTo,
    });
  return (
    <RoomContainer onPress={goToRoom}>
      <Column>
        <Avatar source={{ uri: talkingTo.avatar }} />
        <Data>
          <Username>{talkingTo.userName}</Username>
          <UnreadText>
            {unreadTotal} unread {unreadTotal === 1 ? 'message' : 'messages'}
          </UnreadText>
        </Data>
      </Column>
      <Column>{unreadTotal > 0 ? <UnreadIndicator /> : null}</Column>
    </RoomContainer>
  );
};

export default RoomItem;

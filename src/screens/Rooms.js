import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components/native';
import { ROOM_FRAGMENT } from '../fragments';
import ScreenLayout from '../components/ScreenLayout';
import useMe from '../hooks/useMe';
import { colors } from '../colors';
import ItemSeparator from '../components/ItemSeparator';

const SEE_ROOMS_QUERY = gql`
  query seeRooms {
    seeRooms {
      ...RoomParts
    }
  }
  ${ROOM_FRAGMENT}
`;

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

const Rooms = () => {
  const { data, loading } = useQuery(SEE_ROOMS_QUERY);
  const { data: meData } = useMe();
  const renderItem = ({ item: room }) => {
    const notMe = room.users.find(
      (user) => user.userName !== meData?.me?.userName
    );

    return (
      <RoomContainer>
        <Column>
          <Avatar source={{ uri: notMe.avatar }} />
          <Data>
            <Username>{notMe.userName}</Username>
            <UnreadText>
              {room.unreadTotal} unread{' '}
              {room.unreadTotal === 1 ? 'message' : 'messages'}
            </UnreadText>
          </Data>
        </Column>
        <Column>{room.unreadTotal > 0 ? <UnreadIndicator /> : null}</Column>
      </RoomContainer>
    );
  };
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        data={data?.seeRooms}
        keyExtractor={(room) => '' + room.id}
        renderItem={renderItem}
        style={{ width: '100%' }}
        ItemSeparatorComponent={() => <ItemSeparator />}
      />
    </ScreenLayout>
  );
};

export default Rooms;

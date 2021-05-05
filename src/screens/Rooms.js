import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components/native';
import { ROOM_FRAGMENT } from '../fragments';
import ScreenLayout from '../components/ScreenLayout';
import useMe from '../hooks/useMe';
import { colors } from '../colors';
import ItemSeparator from '../components/ItemSeparator';
import RoomItem from '../components/rooms/RoomItem';

const SEE_ROOMS_QUERY = gql`
  query seeRooms {
    seeRooms {
      ...RoomParts
    }
  }
  ${ROOM_FRAGMENT}
`;

const Rooms = () => {
  const { data, loading } = useQuery(SEE_ROOMS_QUERY);
  const { data: meData } = useMe();
  const renderItem = ({ item: room }) => <RoomItem {...room} />;
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

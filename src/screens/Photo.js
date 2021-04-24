import React, { useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components/native';
import { logUserOut } from '../apollo';
import { colors } from '../colors';
import { PHOTO_FRAGMENT } from '../fragments';
import Photo from '../components/Photo';
import ScreenLayout from '../components/ScreenLayout';

const SEE_PHOTO = gql`
  query seePhoto($id: Int!) {
    seePhoto(id: $id) {
      ...PhotoFragment
      user {
        id
        userName
        avatar
      }
      caption
    }
  }
  ${PHOTO_FRAGMENT}
`;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

const PhotoScreen = ({ navigation, route }) => {
  const { data, loading, refetch } = useQuery(SEE_PHOTO, {
    variables: {
      id: route?.params?.photoId,
    },
  });
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{ backgroundColor: 'black' }}
      contentContainerStyle={{
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {data && data.seePhoto && <Photo {...data?.seePhoto} />}
    </ScrollView>
  );
};

export default PhotoScreen;

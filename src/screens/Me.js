import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components/native';
import { logUserOut } from '../apollo';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { colors } from '../colors';
import { PHOTO_FRAGMENT } from '../fragments';
import useMe from '../hooks/useMe';
import constants from '../constants';

const ME_QUERY = gql`
  query me {
    me {
      id
      firstName
      lastName
      userName
      bio
      avatar
      photos {
        ...PhotoFragment
      }
      totalFollowings
      totalFollowers
      totalPhotos
      isFollowing
    }
  }
  ${PHOTO_FRAGMENT}
`;

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const ProfileHeader = styled.View`
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;

const HeaderColumn = styled.View``;

const ProfileStats = styled.View`
  flex-direction: row;
`;

const Stat = styled.View`
  align-items: center;
  margin-left: 40px;
`;

const Bold = styled.Text`
  color: white;
  font-weight: 600;
`;

const StatName = styled.Text`
  margin-top: 2px;
  font-size: 14px;
  color: white;
`;

const ProfileMeta = styled.View`
  padding: 0 20px;
`;

const BioContainer = styled.View`
  margin-top: 3px;
  width: 50%;
`;

const Bio = styled.Text`
  color: white;
`;

const EditProfileButton = styled.TouchableOpacity`
  flex-direction: row;
  padding: 7px 0;
  margin-top: 25px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  justify-content: center;
`;

const EditProfileButtonText = styled.Text`
  color: white;
`;

const ButtonContainer = styled.View`
  padding: 5px 0;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`;

const Button = styled.View`
  width: ${constants.width / 2}px;
  align-items: center;
  border-bottom-width: ${(props) => (props.isGrid ? '1px' : '0px')};
  border-bottom-color: ${(props) => (props.isGrid ? 'white' : 'black')};
  padding: 7px 0;
`;

const Me = ({ navigation }) => {
  const {
    data: { me },
  } = useQuery(ME_QUERY);

  const [isGrid, setIsGrid] = useState(true);
  const toggleGrid = () => setIsGrid((i) => !i);

  console.log(me);

  useEffect(() => {
    navigation.setOptions({
      title: me?.userName,
    });
  }, []);

  return (
    <Container>
      <ProfileHeader>
        <Avatar source={{ uri: me?.avatar }} />
        <HeaderColumn>
          <ProfileStats>
            <Stat>
              <Bold>17</Bold>
              <StatName>Posts</StatName>
            </Stat>
            <Stat>
              <Bold>18</Bold>
              <StatName>Followers</StatName>
            </Stat>
            <Stat>
              <Bold>63</Bold>
              <StatName>Following</StatName>
            </Stat>
          </ProfileStats>
        </HeaderColumn>
      </ProfileHeader>
      <ProfileMeta>
        <Bold>Christopher Kim</Bold>
        <BioContainer>
          <Bio>Coffee rules everything</Bio>
        </BioContainer>
        <EditProfileButton>
          <EditProfileButtonText>Edit Profile</EditProfileButtonText>
        </EditProfileButton>
      </ProfileMeta>
      <ButtonContainer>
        <TouchableOpacity onPress={toggleGrid}>
          <Button isGrid={isGrid}>
            <Ionicons
              color={isGrid ? 'white' : '#999'}
              size={25}
              name={Platform.OS === 'ios' ? 'ios-grid' : 'md-grid'}
            />
          </Button>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleGrid}>
          <Button isGrid={!isGrid}>
            <Ionicons
              color={!isGrid ? 'white' : '#999'}
              size={25}
              name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'}
            />
          </Button>
        </TouchableOpacity>
      </ButtonContainer>
    </Container>
  );
};

export default Me;

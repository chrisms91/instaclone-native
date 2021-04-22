import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import { logUserOut } from '../apollo';
import { colors } from '../colors';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

const Profile = ({ navigation, route }) => {
  useEffect(() => {
    if (route?.params?.userName) {
      navigation.setOptions({
        title: route.params.userName,
      });
    }
  }, []);
  return (
    <Container>
      <Text style={{ color: 'white' }}>Someone's Profile</Text>
    </Container>
  );
};

export default Profile;

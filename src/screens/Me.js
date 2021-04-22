import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import { logUserOut } from '../apollo';
import { colors } from '../colors';
import useMe from '../hooks/useMe';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

const Me = ({ navigation }) => {
  const { data } = useMe();

  useEffect(() => {
    navigation.setOptions({
      title: data?.me?.userName,
    });
  }, []);

  return (
    <Container>
      <Text style={{ color: 'white' }}>My Profile</Text>
    </Container>
  );
};

export default Me;

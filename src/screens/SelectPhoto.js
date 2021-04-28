import React from 'react';
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

const SelectPhoto = ({ navigation }) => {
  return (
    <Container>
      <Text style={{ color: 'white' }}>SelectPhoto </Text>
    </Container>
  );
};

export default SelectPhoto;

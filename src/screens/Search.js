import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { logUserOut } from '../apollo';
import { colors } from '../colors';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

const Search = ({ navigation }) => {
  return (
    <Container>
      <TouchableOpacity onPress={() => navigation.navigate('Photo')}>
        <Text style={{ color: 'white' }}>Search</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default Search;

import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

const Comments = () => {
  return (
    <Container>
      <Text style={{ color: 'white' }}>Comments</Text>
    </Container>
  );
};

export default Comments;

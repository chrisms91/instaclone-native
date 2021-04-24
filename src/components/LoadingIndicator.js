import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: black;
  justify-content: center;
  align-items: center;
  opacity: 0.7;
`;
const LoadingIndicator = () => {
  return (
    <Container>
      <ActivityIndicator size="small" color="white" />
    </Container>
  );
};

export default LoadingIndicator;

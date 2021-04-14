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

const Content = styled.Text`
  color: white;
  font-size: 15px;
`;

const LogoutBtn = styled.TouchableOpacity`
  padding: 15px 7px;
  background-color: ${colors.blue};
  width: 80%;
`;

const LogoutBtnText = styled.Text`
  color: white;
  font-weight: 600;
  text-align: center;
`;

const Feed = () => {
  return (
    <Container>
      <Content>Feed is here :)</Content>
      <LogoutBtn onPress={logUserOut}>
        <LogoutBtnText>Logout</LogoutBtnText>
      </LogoutBtn>
    </Container>
  );
};

export default Feed;

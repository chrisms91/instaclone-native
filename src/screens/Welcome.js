import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { colors } from '../../colors';
import AuthButton from '../components/auth/AuthButton';
import AuthLayout from '../components/auth/AuthLayout';

const LoginLink = styled.Text`
  color: ${colors.blue};
  font-weight: 600;
  margin-top: 20px;
`;

const Welcome = ({ navigation }) => {
  const goToCreateAccount = () => navigation.navigate('CreateAccount');
  const goToLogIn = () => navigation.navigate('Login');
  return (
    <AuthLayout>
      <AuthButton
        text="Create new Account"
        disabled={false}
        onPress={goToCreateAccount}
      />
      <TouchableOpacity onPress={goToLogIn}>
        <LoginLink>Log In</LoginLink>
      </TouchableOpacity>
    </AuthLayout>
  );
};

export default Welcome;

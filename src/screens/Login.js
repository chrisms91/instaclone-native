import React, { useRef } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import AuthLayout from '../components/auth/AuthLayout';
import { TextInput } from '../components/auth/AuthShared';

const Login = ({ navigation }) => {
  const passwordRef = useRef();
  const onNext = (nextRef) => {
    nextRef?.current?.focus();
  };
  return (
    <AuthLayout>
      <TextInput
        autoCorrect={false}
        placeholder="UserName"
        returnKeyType="next"
        onSubmitEditing={() => onNext(passwordRef)}
        placeholderTextColor={'rgba(255, 255, 255, 0.8)'}
      />
      <TextInput
        ref={passwordRef}
        autoCorrect={false}
        placeholder="Password"
        secureTextEntry
        returnKeyType="done"
        placeholderTextColor={'rgba(255, 255, 255, 0.8)'}
        lastOne={true}
      />
    </AuthLayout>
  );
};

export default Login;

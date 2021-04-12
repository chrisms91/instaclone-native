import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Text, View, TouchableOpacity } from 'react-native';
import AuthButton from '../components/auth/AuthButton';
import AuthLayout from '../components/auth/AuthLayout';
import { TextInput } from '../components/auth/AuthShared';

const Login = ({ navigation }) => {
  const { register, handleSubmit, setValue } = useForm();
  const passwordRef = useRef();

  const onNext = (nextRef) => {
    nextRef?.current?.focus();
  };
  const onValid = (data) => {
    console.log(data);
  };

  useEffect(() => {
    register('userName');
    register('password');
  }, [register]);

  return (
    <AuthLayout>
      <TextInput
        autoCorrect={false}
        autoFocus={true}
        placeholder="Username"
        returnKeyType="next"
        autoCapitalize="none"
        onSubmitEditing={() => onNext(passwordRef)}
        placeholderTextColor={'rgba(255, 255, 255, 0.8)'}
        onChangeText={(text) => setValue('userName', text)}
      />
      <TextInput
        ref={passwordRef}
        autoCorrect={false}
        placeholder="Password"
        secureTextEntry
        returnKeyType="done"
        placeholderTextColor={'rgba(255, 255, 255, 0.8)'}
        lastOne={true}
        onSubmitEditing={handleSubmit(onValid)}
        onChangeText={(text) => setValue('password', text)}
      />
      <AuthButton
        text="Log In"
        disabled={false}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
};

export default Login;

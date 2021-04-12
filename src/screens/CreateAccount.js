import React, { useRef } from 'react';
import styled from 'styled-components/native';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import AuthLayout from '../components/auth/AuthLayout';
import AuthButton from '../components/auth/AuthButton';
import { TextInput } from '../components/auth/AuthShared';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

const CreateAccount = () => {
  const { register, handleSubmit, setValue } = useForm();
  const lastNameRef = useRef();
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const onNext = (nextRef) => {
    nextRef?.current?.focus();
  };

  const onValid = (data) => {
    console.log(data);
  };

  useEffect(() => {
    register('firstName', { required: true });
    register('lastName', { required: true });
    register('userName', { required: true });
    register('email', { required: true });
    register('password', { required: true });
  }, [register]);

  return (
    <AuthLayout>
      <TextInput
        autoCorrect={false}
        placeholder="First Name"
        returnKeyType="next"
        onSubmitEditing={() => onNext(lastNameRef)}
        placeholderTextColor={'rgba(255, 255, 255, 0.8)'}
        onChangeText={(text) => setValue('firstName', text)}
      />
      <TextInput
        ref={lastNameRef}
        autoCorrect={false}
        placeholder="Last Name"
        returnKeyType="next"
        onSubmitEditing={() => onNext(userNameRef)}
        placeholderTextColor={'rgba(255, 255, 255, 0.8)'}
        onChangeText={(text) => setValue('lastName', text)}
      />
      <TextInput
        ref={userNameRef}
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Username"
        returnKeyType="next"
        onSubmitEditing={() => onNext(emailRef)}
        placeholderTextColor={'rgba(255, 255, 255, 0.8)'}
        onChangeText={(text) => setValue('userName', text)}
      />
      <TextInput
        ref={emailRef}
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Email"
        keyboardType="email-address"
        returnKeyType="next"
        onSubmitEditing={() => onNext(passwordRef)}
        placeholderTextColor={'rgba(255, 255, 255, 0.8)'}
        onChangeText={(text) => setValue('email', text)}
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
        text="Create Account"
        disabled={false}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
};

export default CreateAccount;

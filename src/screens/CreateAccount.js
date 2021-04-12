import React, { useRef } from 'react';
import styled from 'styled-components/native';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import AuthLayout from '../components/auth/AuthLayout';
import AuthButton from '../components/auth/AuthButton';
import { TextInput } from '../components/auth/AuthShared';

const CreateAccount = () => {
  const lastNameRef = useRef();
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const onNext = (nextRef) => {
    nextRef?.current?.focus();
  };
  const onSubmitPassword = () => {
    alert('done');
  };
  return (
    <AuthLayout>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
        style={{
          width: '100%',
        }}
      >
        <TextInput
          autoFocus
          autoCorrect={false}
          placeholder="First Name"
          placeholderTextColor="gray"
          returnKeyType="next"
          onSubmitEditing={() => onNext(lastNameRef)}
          placeholderTextColor={'rgba(255, 255, 255, 0.8)'}
        />
        <TextInput
          ref={lastNameRef}
          autoCorrect={false}
          placeholder="Last Name"
          placeholderTextColor="gray"
          returnKeyType="next"
          onSubmitEditing={() => onNext(userNameRef)}
          placeholderTextColor={'rgba(255, 255, 255, 0.8)'}
        />
        <TextInput
          ref={userNameRef}
          autoCorrect={false}
          placeholder="UserName"
          placeholderTextColor="gray"
          returnKeyType="next"
          onSubmitEditing={() => onNext(emailRef)}
          placeholderTextColor={'rgba(255, 255, 255, 0.8)'}
        />
        <TextInput
          ref={emailRef}
          autoCorrect={false}
          placeholder="Email"
          placeholderTextColor="gray"
          keyboardType="email-address"
          returnKeyType="next"
          onSubmitEditing={() => onNext(passwordRef)}
          placeholderTextColor={'rgba(255, 255, 255, 0.8)'}
        />
        <TextInput
          ref={passwordRef}
          autoCorrect={false}
          placeholder="Password"
          placeholderTextColor="gray"
          secureTextEntry
          returnKeyType="done"
          onSubmitEditing={onSubmitPassword}
          placeholderTextColor={'rgba(255, 255, 255, 0.8)'}
          lastOne={true}
        />
        <AuthButton
          text="Create Account"
          disabled={true}
          onPress={() => null}
        />
      </KeyboardAvoidingView>
    </AuthLayout>
  );
};

export default CreateAccount;

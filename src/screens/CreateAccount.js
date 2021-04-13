import { gql, useMutation } from '@apollo/client';
import React, { useRef } from 'react';
import styled from 'styled-components/native';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import AuthLayout from '../components/auth/AuthLayout';
import AuthButton from '../components/auth/AuthButton';
import { TextInput } from '../components/auth/AuthShared';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $userName: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      userName: $userName
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

const CreateAccount = ({ navigation }) => {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const onCompleted = (data) => {
    const {
      createAccount: { ok },
    } = data;

    const { userName, password } = getValues();

    if (ok) {
      navigation.navigate('Login', {
        userName,
        password,
      });
    }
  };

  const [
    createAccountMutation,
    { loading },
  ] = useMutation(CREATE_ACCOUNT_MUTATION, { onCompleted });
  const lastNameRef = useRef();
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const onNext = (nextRef) => {
    nextRef?.current?.focus();
  };

  const onValid = (data) => {
    if (!loading) {
      createAccountMutation({
        variables: {
          ...data,
        },
      });
    }
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

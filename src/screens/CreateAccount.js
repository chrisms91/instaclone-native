import React from 'react';
import styled from 'styled-components/native';
import { Text, TextInput, View } from 'react-native';
import AuthLayout from '../components/auth/AuthLayout';
import AuthButton from '../components/auth/AuthButton';

const CreateAccount = () => {
  return (
    <AuthLayout>
      <TextInput
        placeholder="First Name"
        placeholderTextColor="gray"
        style={{ backgroundColor: 'white', width: '100%' }}
      />
      <TextInput
        placeholder="Last Name"
        placeholderTextColor="gray"
        style={{ backgroundColor: 'white', width: '100%' }}
      />
      <TextInput
        placeholder="UserName"
        placeholderTextColor="gray"
        style={{ backgroundColor: 'white', width: '100%' }}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor="gray"
        keyboardType="email-address"
        style={{ backgroundColor: 'white', width: '100%' }}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="gray"
        secureTextEntry
        style={{ backgroundColor: 'white', width: '100%' }}
      />
      <AuthButton text="Create Account" disabled={true} onPress={() => null} />
    </AuthLayout>
  );
};

export default CreateAccount;

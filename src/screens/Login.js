import { gql, useMutation } from '@apollo/client';
import React, { useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Text, View, TouchableOpacity } from 'react-native';
import { isLoggedInVar, logUserIn } from '../apollo';
import AuthButton from '../components/auth/AuthButton';
import AuthLayout from '../components/auth/AuthLayout';
import { TextInput } from '../components/auth/AuthShared';

const LOGIN_MUTATION = gql`
  mutation login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      ok
      token
      error
    }
  }
`;

const Login = ({ route: { params } }) => {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      userName: params?.userName,
      password: params?.password,
    },
  });
  const passwordRef = useRef();
  const onCompleted = async (data) => {
    const {
      login: { ok, token, error },
    } = data;

    if (ok) {
      await logUserIn(token);
    } else {
      console.log(error);
    }
  };
  const [logInMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  const onNext = (nextRef) => {
    nextRef?.current?.focus();
  };

  const onValid = (data) => {
    if (!loading) {
      logInMutation({
        variables: {
          ...data,
        },
      });
    }
  };

  useEffect(() => {
    register('userName', { required: true });
    register('password', { required: true });
  }, [register]);

  return (
    <AuthLayout>
      <TextInput
        value={watch('userName')}
        autoCorrect={false}
        // autoFocus={true}
        placeholder="Username"
        returnKeyType="next"
        autoCapitalize="none"
        onSubmitEditing={() => onNext(passwordRef)}
        placeholderTextColor={'rgba(255, 255, 255, 0.8)'}
        onChangeText={(text) => setValue('userName', text)}
      />
      <TextInput
        value={watch('password')}
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
        loading={loading}
        disabled={!watch('userName') || !watch('password')}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
};

export default Login;

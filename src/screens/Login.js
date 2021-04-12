import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

const Login = ({ navigation }) => {
  return (
    <View>
      <Text>Login</Text>
      <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
        <Text>Go to Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

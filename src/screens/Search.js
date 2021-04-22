import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../colors';
import DismissKeyboard from '../components/DismissKeyboard';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

const Input = styled.TextInput``;

const Search = ({ navigation }) => {
  const { setValue, register, watch } = useForm();
  const SearchBox = () => (
    <TextInput
      style={{ backgroundColor: 'white' }}
      autoCorrect={false}
      placeholderTextColor="black"
      placeholder="Search photos"
      autoCapitalize="none"
      returnKeyType="search"
      returnKeyLabel="Search"
      onChangeText={(text) => setValue('keyword', text)}
    />
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
    register('keyword');
  }, []);

  return (
    <DismissKeyboard>
      <Container>
        <Text style={{ color: 'white' }}>Search</Text>
      </Container>
    </DismissKeyboard>
  );
};

export default Search;

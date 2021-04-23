import React, { useEffect } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { useForm } from 'react-hook-form';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../colors';
import DismissKeyboard from '../components/DismissKeyboard';
import LoadingIndicator from '../components/LoadingIndicator';

const SEARCH_PHOTOS = gql`
  query searchPhotos($keyword: String!) {
    searchPhotos(keyword: $keyword) {
      id
      file
    }
  }
`;

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const MessageContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const MessageText = styled.Text`
  margin-top: 15px;
  color: white;
  font-weight: 600;
`;

const Input = styled.TextInput``;

const Search = ({ navigation }) => {
  const { setValue, register, watch, handleSubmit } = useForm();
  const [startQueryFn, { loading, data, called }] = useLazyQuery(SEARCH_PHOTOS);

  const onValid = ({ keyword }) => {
    startQueryFn({
      variables: {
        keyword,
      },
    });
  };

  console.log(data);

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
      onSubmitEditing={handleSubmit(onValid)}
    />
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
    register('keyword', {
      required: true,
    });
  }, []);

  return (
    <DismissKeyboard>
      <Container>
        {loading ? (
          <MessageContainer>
            <ActivityIndicator size="large" color="white" />
            <MessageText>Searching...</MessageText>
          </MessageContainer>
        ) : null}
        {!called ? (
          <MessageContainer>
            <MessageText>Search photos by keyword</MessageText>
          </MessageContainer>
        ) : null}
        {data?.searchPhotos !== undefined && data?.searchPhotos.length === 0 ? (
          <MessageContainer>
            <MessageText>Could not find anything...</MessageText>
          </MessageContainer>
        ) : null}
      </Container>
    </DismissKeyboard>
  );
};

export default Search;

import React, { useEffect } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { useForm } from 'react-hook-form';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ActivityIndicator,
  useWindowDimensions,
  FlatList,
  Image,
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

const Input = styled.TextInput`
  background-color: rgba(255, 255, 255, 1);
  color: black;
  width: ${(props) => props.width / 1.5}px;
  padding: 5px 10px;
  border-radius: 7px;
`;

const Search = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const numColumns = 4;
  const { setValue, register, watch, handleSubmit } = useForm();
  const [startQueryFn, { loading, data, called }] = useLazyQuery(SEARCH_PHOTOS);

  const onValid = ({ keyword }) => {
    startQueryFn({
      variables: {
        keyword,
      },
    });
  };

  const SearchBox = () => (
    <Input
      width={width}
      autoCorrect={false}
      placeholderTextColor="rgba(0, 0, 0, 0.7)"
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

  const renderItem = ({ item: photo }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Photo', {
          photoId: photo.id,
        })
      }
    >
      <Image
        source={{ uri: photo.file }}
        style={{ width: width / numColumns, height: 100 }}
      />
    </TouchableOpacity>
  );

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
        {data?.searchPhotos !== undefined ? (
          data?.searchPhotos?.length === 0 ? (
            <MessageContainer>
              <MessageText>Could not find anything.</MessageText>
            </MessageContainer>
          ) : (
            <FlatList
              data={data?.searchPhotos}
              keyExtractor={(photo) => '' + photo.id}
              renderItem={renderItem}
              numColumns={numColumns}
            />
          )
        ) : null}
      </Container>
    </DismissKeyboard>
  );
};

export default Search;

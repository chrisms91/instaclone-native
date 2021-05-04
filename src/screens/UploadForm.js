import { gql, useMutation } from '@apollo/client';
import { ReactNativeFile } from 'apollo-upload-client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import DismissKeyboard from '../components/DismissKeyboard';
import { colors } from '../colors';
import { FEED_PHOTO_FRAGMENT } from '../fragments';

const UPLOAD_PHOTO_MUTATION = gql`
  mutation uploadPhoto($file: Upload!, $caption: String) {
    uploadPhoto(file: $file, caption: $caption) {
      ok
      photo {
        ...FeedPhotoFragment
      }
    }
  }
  ${FEED_PHOTO_FRAGMENT}
`;

const Container = styled.View`
  flex: 1;
  background-color: black;
  padding: 0px 50px;
`;

const Photo = styled.Image`
  height: 350px;
`;

const CaptionContainer = styled.View`
  margin-top: 30px;
`;

const Caption = styled.TextInput`
  background-color: white;
  color: black;
  padding: 10px 20px;
  border-radius: 100px;
`;

const HeaderRightText = styled.Text`
  color: ${colors.blue};
  font-size: 16px;
  font-weight: 600;
  margin-right: 10px;
`;

const UploadForm = ({ route, navigation }) => {
  const updateUploadPhoto = (cache, result) => {
    const {
      data: {
        uploadPhoto: { ok, photo: uploadedPhoto },
      },
    } = result;
    if (ok) {
      cache.modify({
        id: `ROOT_QUERY`,
        fields: {
          seeFeed(prev) {
            return [uploadedPhoto, ...prev];
          },
        },
      });
      navigation.navigate('Tabs');
    }
  };
  const { register, handleSubmit, setValue } = useForm();
  const [uploadPhotoMutation, { loading, error }] = useMutation(
    UPLOAD_PHOTO_MUTATION,
    {
      update: updateUploadPhoto,
    }
  );

  useEffect(() => {
    register('caption');
  }, [register]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: loading ? HeaderRightLoading : HeaderRight,
      ...(loading && { headerLeft: () => null }),
    });
  }, [loading]);

  const HeaderRight = () => (
    <TouchableOpacity onPress={handleSubmit(onValid)}>
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );

  const HeaderRightLoading = () => (
    <ActivityIndicator size="small" color="white" style={{ marginRight: 15 }} />
  );

  const onValid = ({ caption }) => {
    const file = new ReactNativeFile({
      uri: route.params.file,
      name: '1.jpeg',
      type: 'image/jpeg',
    });

    uploadPhotoMutation({
      variables: {
        caption,
        file,
      },
    });
  };
  console.log(error);
  return (
    <DismissKeyboard>
      <Container>
        <Photo resizeMode="contain" source={{ uri: route.params.file }} />
        <CaptionContainer>
          <Caption
            placeholder="Write a caption..."
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            returnKeyType="done"
            onSubmitEditing={handleSubmit(onValid)}
            onChangeText={(text) => setValue('caption', text)}
          />
        </CaptionContainer>
      </Container>
    </DismissKeyboard>
  );
};

export default UploadForm;

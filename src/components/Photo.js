import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { gql, useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/core';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import LoadingIndicator from './LoadingIndicator';

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const Container = styled.View``;

const Header = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

const UserAvatar = styled.Image`
  margin-right: 10px;
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
`;

const UserName = styled.Text`
  color: white;
  font-weight: 700;
  margin-right: 5px;
`;

const File = styled.Image``;

const Actions = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Action = styled.TouchableOpacity`
  margin-right: 10px;
`;

const Caption = styled.View`
  flex-direction: row;
`;

const CaptionText = styled.Text`
  color: white;
`;

const Likes = styled.Text`
  color: white;
  margin: 7px 0px;
  font-weight: 600;
`;

const ExtraContainer = styled.View`
  padding: 10px;
`;

const Photo = ({ id, user, caption, totalLikes, isLiked, file }) => {
  const updateToggleLike = (cache, result) => {
    const {
      data: {
        toggleLike: { ok, error },
      },
    } = result;

    if (ok) {
      const photoId = `Photo:${id}`;
      cache.modify({
        id: photoId,
        fields: {
          isLiked(cachedVal) {
            return !cachedVal;
          },
          totalLikes(cachedTotalLikes) {
            if (isLiked) {
              return cachedTotalLikes - 1;
            }
            return cachedTotalLikes + 1;
          },
        },
      });
    }
  };
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: {
      id,
    },
    update: updateToggleLike,
  });

  const [imageLoading, setImageLoading] = useState(false);
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const [imageHeight, setImageHeight] = useState(height - 450);

  useEffect(() => {
    Image.getSize(file, (width, height) => {
      setImageHeight(350);
    });
  }, [file]);

  const navigateToProfile = () => {
    navigation.navigate('Profile', {
      userName: user.userName,
      id: user.id,
    });
  };

  return (
    <Container>
      <Header onPress={navigateToProfile}>
        <UserAvatar resizeMode="cover" source={{ uri: user.avatar }} />
        <UserName>{user.userName}</UserName>
      </Header>
      {imageLoading && <LoadingIndicator />}
      <File
        onLoadStart={() => setImageLoading(true)}
        onLoadEnd={() => setImageLoading(false)}
        resizeMode="cover"
        style={{
          width,
          height: imageHeight,
        }}
        source={{ uri: file }}
      />
      <ExtraContainer>
        <Actions>
          <Action onPress={toggleLikeMutation}>
            <Ionicons
              name={isLiked ? 'heart' : 'heart-outline'}
              color={isLiked ? 'tomato' : 'white'}
              size={22}
            />
          </Action>
          <Action>
            <Ionicons
              onPress={() => navigation.navigate('Comments')}
              name="chatbubble-outline"
              color="white"
              size={22}
            />
          </Action>
        </Actions>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Likes', {
              photoId: id,
            })
          }
        >
          <Likes>{totalLikes === 1 ? '1 like' : `${totalLikes} likes`}</Likes>
        </TouchableOpacity>
        <Caption>
          <CaptionText>
            <UserName onPress={navigateToProfile}>
              {user.userName + '  '}
            </UserName>
            {caption}
          </CaptionText>
        </Caption>
      </ExtraContainer>
    </Container>
  );
};

Photo.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string,
    userName: PropTypes.string.isRequired,
  }),
  caption: PropTypes.string,
  totalLikes: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  file: PropTypes.string.isRequired,
};

export default Photo;

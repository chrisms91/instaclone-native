import React, { useEffect, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { Ionicons } from '@expo/vector-icons';
import {
  FlatList,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import { logUserOut } from '../apollo';
import { colors } from '../colors';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const Top = styled.View`
  flex: 1;
  background-color: black;
`;

const Bottom = styled.View`
  flex: 1;
  background-color: black;
`;

const ImageContainer = styled.TouchableOpacity``;

const IconContainer = styled.View`
  position: absolute;
  bottom: 5px;
  right: 5px;
`;

const HeaderRightText = styled.Text`
  color: ${colors.blue};
  font-size: 16px;
  font-weight: 600;
  margin-right: 10px;
`;

//TODO: medialibrary doesn't fetch every photos in the library.

const SelectPhoto = ({ navigation }) => {
  const [ok, setOk] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [chosenPhoto, setChosenPhoto] = useState('');
  const numColumns = 4;
  const { width } = useWindowDimensions();

  useEffect(() => {
    getPermissions();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight,
    });
  }, [chosenPhoto]);

  const getPhotos = async () => {
    const {
      assets: photos,
      totalCount,
      hasNextPage,
      endCursor,
    } = await MediaLibrary.getAssetsAsync();
    // console.log(totalCount, hasNextPage, endCursor);
    setPhotos(photos);
    setChosenPhoto(photos[0]?.uri);
  };

  const getPermissions = async () => {
    const {
      accessPrivileges,
      canAskAgain,
      granted,
    } = await MediaLibrary.getPermissionsAsync();
    // if user says no or we haven't asked, ask user permission
    if (accessPrivileges === 'none' || (!granted && canAskAgain)) {
      const { accessPrivileges } = await MediaLibrary.requestPermissionsAsync();
      if (accessPrivileges !== 'none' || granted) {
        setOk(true);
        getPhotos();
      }
    } else if (accessPrivileges !== 'none' || granted) {
      setOk(true);
      getPhotos();
    }
  };

  const headerRight = () => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('UploadForm', {
          file: chosenPhoto,
        })
      }
    >
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );

  const choosePhoto = (uri) => {
    setChosenPhoto(uri);
  };

  const renderItem = ({ item: photo }) => (
    <ImageContainer onPress={() => choosePhoto(photo.uri)}>
      <Image
        source={{ uri: photo.uri }}
        style={{ width: width / numColumns, height: 100 }}
      />
      <IconContainer>
        <Ionicons
          name="checkmark-circle"
          size={18}
          color={photo.uri === chosenPhoto ? colors.blue : 'white'}
        />
      </IconContainer>
    </ImageContainer>
  );

  return (
    <Container>
      <StatusBar hidden={false} />
      <Top>
        {chosenPhoto !== '' ? (
          <Image
            source={{ uri: chosenPhoto }}
            style={{ width, height: '100%' }}
          />
        ) : null}
      </Top>
      <Bottom>
        <FlatList
          data={photos}
          numColumns={numColumns}
          keyExtractor={(photo) => photo.id}
          renderItem={renderItem}
          onEndReachedThreshold={0}
          onEndReached={() => {}}
        />
      </Bottom>
    </Container>
  );
};

export default SelectPhoto;

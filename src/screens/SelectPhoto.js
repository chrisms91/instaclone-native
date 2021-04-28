import React, { useEffect, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { Ionicons } from '@expo/vector-icons';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
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

const SelectPhoto = ({ navigation }) => {
  const [ok, setOk] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [chosenPhoto, setChosenPhoto] = useState('');
  const numColumns = 4;
  const { width } = useWindowDimensions();

  const getPhotos = async () => {
    const { assets: photos } = await MediaLibrary.getAssetsAsync();
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

  useEffect(() => {
    getPermissions();
  }, []);

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
        />
      </Bottom>
    </Container>
  );
};

export default SelectPhoto;
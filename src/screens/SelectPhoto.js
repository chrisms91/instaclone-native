import React, { useEffect, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import { logUserOut } from '../apollo';
import { colors } from '../colors';

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

const SelectPhoto = ({ navigation }) => {
  const [ok, setOk] = useState(false);
  const [photos, setPhotos] = useState([]);

  const getPhotos = async () => {
    if (ok) {
      const { assets: photos } = await MediaLibrary.getAssetsAsync();
      setPhotos(photos);
    }
  };

  const getPermissions = async () => {
    const {
      accessPrivileges,
      canAskAgain,
    } = await MediaLibrary.getPermissionsAsync();
    // if user says no or we haven't asked, ask user permission
    if (accessPrivileges === 'none' && canAskAgain) {
      const { accessPrivileges } = await MediaLibrary.requestPermissionsAsync();
      if (accessPrivileges !== 'none') {
        setOk(true);
      }
    } else if (accessPrivileges !== 'none') {
      setOk(true);
    }
  };

  useEffect(() => {
    getPermissions();
    getPhotos();
  }, []);
  return (
    <Container>
      <Top />
      <Bottom></Bottom>
    </Container>
  );
};

export default SelectPhoto;

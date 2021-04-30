import { Camera } from 'expo-camera';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { logUserOut } from '../apollo';
import { colors } from '../colors';

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const Actions = styled.View`
  flex: 0.3;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 50px;
`;

const TakePhotoBtn = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 50px;
`;

const TakePhoto = ({ navigation }) => {
  const [ok, setOk] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
  const getPermissions = async () => {
    const { granted } = await Camera.requestPermissionsAsync();
    setOk(granted);
  };

  useEffect(() => {
    getPermissions();
  }, []);

  const onCameraSwitch = () => {
    if (cameraType === Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back);
    } else {
      setCameraType(Camera.Constants.Type.front);
    }
  };
  return (
    <Container>
      <Camera type={cameraType} style={{ flex: 1 }} />
      <Actions>
        <TakePhotoBtn />
        <TouchableOpacity onPress={onCameraSwitch}>
          <Ionicons
            name={
              cameraType === Camera.Constants.Type.front
                ? 'camera-reverse'
                : 'camera'
            }
            color="white"
            size={30}
          />
        </TouchableOpacity>
      </Actions>
    </Container>
  );
};

export default TakePhoto;

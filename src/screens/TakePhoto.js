import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { logUserOut } from '../apollo';
import { colors } from '../colors';

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const Actions = styled.View`
  flex: 0.35;
  padding: 0px 50px;
  align-items: center;
  justify-content: space-around;
`;

const ButtonsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TakePhotoBtn = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 50px;
`;

const SliderContainer = styled.View``;

const ActionsContainer = styled.View`
  flex-direction: row;
`;

const CloseBtn = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const PhotoActions = styled.View`
  flex: 0.35;
  padding: 0px 35px;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
`;

const PhotoAction = styled.TouchableOpacity`
  background-color: white;
  padding: 10px 25px;
  border-radius: 4px;
`;

const PhotoActionText = styled.Text`
  font-weight: 600;
`;

const TakePhoto = ({ navigation }) => {
  const camera = useRef();
  const [photoTaken, setPhotoTaken] = useState('');
  const [cameraReady, setCameraReady] = useState(false);
  const [ok, setOk] = useState(false);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [zoom, setZoom] = useState(0);
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

  const onZoomValueChange = (e) => {
    setZoom(e);
  };

  const onFlashModeChange = () => {
    if (flashMode === Camera.Constants.FlashMode.off) {
      // on
      setFlashMode(Camera.Constants.FlashMode.on);
    } else if (flashMode === Camera.Constants.FlashMode.on) {
      // auto
      setFlashMode(Camera.Constants.FlashMode.auto);
    } else if (flashMode === Camera.Constants.FlashMode.auto) {
      // off
      setFlashMode(Camera.Constants.FlashMode.off);
    }
  };

  const onCameraReady = () => setCameraReady(true);

  const takePhoto = async () => {
    if (camera.current && cameraReady) {
      const { uri } = await camera.current.takePictureAsync({
        quality: 1,
        exif: true,
      });
      setPhotoTaken(uri);
      // const asset = await MediaLibrary.createAssetAsync(uri);
    }
  };

  const onDismiss = () => setPhotoTaken('');

  const goToUploadScreen = async (save) => {
    if (save) {
      // save photo
      console.log('photoSaved');
      await MediaLibrary.saveToLibraryAsync(photoTaken);
    }
    // go to upload screen
    console.log('Will Upload', photoTaken);
  };

  const onUpload = () => {
    Alert.alert('Save photo?', 'Save photo & upload or just upload', [
      {
        text: 'Save & Upload',
        onPress: () => goToUploadScreen(true),
      },
      {
        text: 'Just Upload',
        onPress: () => goToUploadScreen(false),
      },
    ]);
  };

  return (
    <Container>
      <StatusBar hidden={true} />
      {photoTaken === '' ? (
        <Camera
          type={cameraType}
          style={{ flex: 1 }}
          zoom={zoom}
          flashMode={flashMode}
          ref={camera}
          onCameraReady={onCameraReady}
        >
          <CloseBtn onPress={() => navigation.navigate('Tabs')}>
            <Ionicons name="close" color="white" size={30} />
          </CloseBtn>
        </Camera>
      ) : (
        <Image source={{ uri: photoTaken }} style={{ flex: 1 }} />
      )}

      {photoTaken === '' ? (
        // actions with camera
        <Actions>
          <SliderContainer>
            <Slider
              style={{ width: 200, height: 40 }}
              minimumValue={0}
              maximumValue={0.3}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="rgba(255, 255, 255, 0.5)"
              onValueChange={onZoomValueChange}
            />
          </SliderContainer>
          <ButtonsContainer>
            <TakePhotoBtn onPress={takePhoto} />
            <ActionsContainer>
              <TouchableOpacity
                onPress={onFlashModeChange}
                style={{ marginRight: 30 }}
              >
                <Ionicons
                  size={30}
                  color="white"
                  name={
                    flashMode === Camera.Constants.FlashMode.off
                      ? 'flash-off'
                      : flashMode === Camera.Constants.FlashMode.on
                      ? 'flash'
                      : flashMode === Camera.Constants.FlashMode.auto
                      ? 'eye'
                      : ''
                  }
                />
              </TouchableOpacity>
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
            </ActionsContainer>
          </ButtonsContainer>
        </Actions>
      ) : (
        // actions after photo is taken
        <PhotoActions>
          <PhotoAction onPress={onDismiss}>
            <PhotoActionText>Dismiss</PhotoActionText>
          </PhotoAction>
          <PhotoAction onPress={onUpload}>
            <PhotoActionText>Upload</PhotoActionText>
          </PhotoAction>
        </PhotoActions>
      )}
    </Container>
  );
};

export default TakePhoto;

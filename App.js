import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { StyleSheet, Text, View } from 'react-native';
import LoggedOutNav from './src/navigators/LoggedOutNav';
import { NavigationContainer } from '@react-navigation/native';
// import { Appearance, AppearanceProvider } from 'react-native-appearance';
import { ThemeProvider } from 'styled-components';

export default function App() {
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);
  const preload = () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const imagesToLoad = [
      require('./assets/logo.png'),
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/840px-Instagram_logo.svg.png',
    ];
    const imagePromises = imagesToLoad.map((img) => Asset.loadAsync(img));
    return Promise.all([...fontPromises, ...imagePromises]);
  };
  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        onError={console.warn}
        onFinish={onFinish}
      />
    );
  }
  // const subscription = Appearance.addChangeListener(({ colorScheme }) => {
  //   console.log(colorScheme);
  // });
  return (
    // <AppearanceProvider>
    <NavigationContainer>
      <LoggedOutNav />
    </NavigationContainer>
    // </AppearanceProvider>
  );
}

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
import client, { isLoggedInVar, tokenVar, cache } from './src/apollo';
import { ApolloProvider, useReactiveVar } from '@apollo/client';
import LoggedInNav from './src/navigators/LoggedInNav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageWrapper, persistCache } from 'apollo3-cache-persist';

export default function App() {
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const onFinish = () => setLoading(false);

  const preloadAssets = () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const imagesToLoad = [require('./assets/logo.png')];
    const imagePromises = imagesToLoad.map((img) => Asset.loadAsync(img));
    return Promise.all([...fontPromises, ...imagePromises]);
  };

  const preload = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      isLoggedInVar(true);
      tokenVar(token);
    }
    // store cache to asyncstorage so when the server is off, user can still access prev visited screens.
    // await persistCache({
    //   cache,
    //   storage: new AsyncStorageWrapper(AsyncStorage),
    //   serialize: false,
    // });
    return preloadAssets();
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
    <ApolloProvider client={client}>
      <NavigationContainer>
        {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
      </NavigationContainer>
    </ApolloProvider>
    // </AppearanceProvider>
  );
}

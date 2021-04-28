import React from 'react';
import useMe from '../hooks/useMe';
import { createStackNavigator } from '@react-navigation/stack';
import TabsNav from './TabsNav';
import Upload from '../screens/SelectPhoto';
import UploadNav from './UploadNav';

const Stack = createStackNavigator();

const LoggedInNav = () => {
  const { data } = useMe();
  return (
    <Stack.Navigator headerMode="none" mode="modal">
      <Stack.Screen name="Tabs" component={TabsNav} />
      <Stack.Screen name="Upload" component={UploadNav} />
    </Stack.Navigator>
  );
};

export default LoggedInNav;

import React from 'react';
import useMe from '../hooks/useMe';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import TabsNav from './TabsNav';
import Upload from '../screens/SelectPhoto';
import UploadNav from './UploadNav';
import UploadForm from '../screens/UploadForm';

const Stack = createStackNavigator();

const LoggedInNav = () => {
  const { data } = useMe();
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="Tabs"
        options={{ headerShown: false }}
        component={TabsNav}
      />
      <Stack.Screen
        name="Upload"
        options={{ headerShown: false }}
        component={UploadNav}
      />
      <Stack.Screen
        name="UploadForm"
        component={UploadForm}
        options={{
          headerBackImage: ({ tintColor }) => (
            <Ionicons
              color={tintColor}
              name="close"
              size={28}
              style={{ marginLeft: 5 }}
            />
          ),
          headerBackTitleVisible: false,
          title: 'Upload Photo',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: 'black' },
        }}
      />
    </Stack.Navigator>
  );
};

export default LoggedInNav;

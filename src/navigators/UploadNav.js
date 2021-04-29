import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';
import SelectPhoto from '../screens/SelectPhoto';
import TakePhoto from '../screens/TakePhoto';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const UploadNav = () => {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      tabBarOptions={{
        style: {
          backgroundColor: 'black',
          padding: 5,
        },
        activeTintColor: 'white',
        indicatorStyle: {
          backgroundColor: 'white',
          top: 0,
        },
      }}
    >
      <Tab.Screen name="Select">
        {() => (
          <Stack.Navigator
            screenOptions={{
              headerTintColor: 'white',
              headerBackTitleVisible: false,
              headerBackImage: ({ tintColor }) => (
                <Ionicons
                  color={tintColor}
                  name="close"
                  size={28}
                  style={{ marginLeft: 5 }}
                />
              ),
              headerStyle: {
                backgroundColor: 'black',
                shadowColor: 'rgba(255, 255, 255, 0.3)',
              },
            }}
          >
            <Stack.Screen
              name="Select"
              options={{ title: 'Choose a Photo' }}
              component={SelectPhoto}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="Take" component={TakePhoto} />
    </Tab.Navigator>
  );
};

export default UploadNav;

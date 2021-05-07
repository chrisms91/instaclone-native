import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Room from '../screens/Room';
import Rooms from '../screens/Rooms';

const Stack = createStackNavigator();

const MessagesNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: 'black',
          shadowColor: 'rgba(255, 255, 255, 0.3)',
        },
      }}
    >
      <Stack.Screen
        name="Rooms"
        component={Rooms}
        options={{
          headerBackImage: ({ tintColor }) => (
            <Ionicons
              name="chevron-down"
              color={tintColor}
              size={28}
              style={{ marginLeft: 5 }}
            />
          ),
        }}
      />
      <Stack.Screen name="Room" component={Room} />
    </Stack.Navigator>
  );
};

export default MessagesNav;

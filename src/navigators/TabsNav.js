import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feed from '../screens/Feed';
import Search from '../screens/Search';
import Notifications from '../screens/Notifications';
import Profile from '../screens/Profile';
import { Image, View } from 'react-native';
import TabIcon from '../components/nav/TabIcon';
import Me from '../screens/Me';
import SharedStackNav from './SharedStackNav';
import useMe from '../hooks/useMe';

const Tab = createBottomTabNavigator();

const TabsNav = () => {
  const { data } = useMe();
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: 'black',
          borderTopColor: 'rgba(255, 255, 255, 0.3)',
        },
        activeTintColor: 'white',
        showLabel: false,
      }}
    >
      <Tab.Screen
        name="Feed"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName="home" color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Feed" />}
      </Tab.Screen>
      <Tab.Screen
        name="Search"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName="search" color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Search" />}
      </Tab.Screen>
      <Tab.Screen
        name="Camera"
        component={View}
        listeners={({ navigation }) => {
          return {
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate('Upload');
            },
          };
        }}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName="camera" color={color} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName="heart" color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Notifications" />}
      </Tab.Screen>
      <Tab.Screen
        name="Me"
        options={{
          tabBarIcon: ({ focused, color, size }) =>
            data?.me?.avatar ? (
              <Image
                source={{ uri: data.me.avatar }}
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: 10,
                  ...(focused && { borderColor: 'white', borderWidth: 1.5 }),
                }}
              />
            ) : (
              <TabIcon iconName="person" color={color} focused={focused} />
            ),
        }}
      >
        {() => <SharedStackNav screenName="Me" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabsNav;

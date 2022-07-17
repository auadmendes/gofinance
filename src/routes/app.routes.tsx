import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import { MaterialIcons } from '@expo/vector-icons'

import { useTheme } from 'styled-components';

const { Navigator, Screen } = createBottomTabNavigator();

import { Dashboard } from '../screens/Dashboard';
import { Register } from '../screens/Register';
import { Resume } from '../screens/Resume';

export function AppRoutes() {
  const theme = useTheme();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle: {
          height: 85,
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
        }
      }}
    >
      <Screen
        name='Dashboard'
        component={Dashboard}
        options={{
          tabBarIcon: (({ size, color }) =>
            <MaterialIcons
              name='format-list-bulleted'
              size={size}
              color={color}
            />
          )
        }}
      />
      <Screen
        name='Register'
        component={Register}
        options={{
          tabBarIcon: (({ size, color }) =>
            <MaterialIcons
              name='attach-money'
              size={size}
              color={color}
            />
          )
        }}
      />
      <Screen
        name='Chart'
        component={Resume}
        options={{
          tabBarIcon: (({ size, color }) =>
            <MaterialIcons
              name='pie-chart'
              size={size}
              color={color}
            />
          )
        }}
      />
    </Navigator >
  )
}
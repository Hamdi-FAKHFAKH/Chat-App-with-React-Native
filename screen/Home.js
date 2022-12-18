import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Groupe from './fragment/Groupe';
import Profile from './fragment/Profile';
import Lists from './fragment/Lists';
import { mdiFormatListBulletedSquare } from '@mdi/js';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EP from './fragment/EP';
export default function Home() {
  const Tab = createMaterialBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="List"
      activeColor="#A0E4CB"
      inactiveColor="#fffdf6"
      barStyle={{ backgroundColor: '#4682B4' }}
    >
      <Tab.Screen
        name="profile"
        component={EP}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-box"
              size={26}
              color={color}
            ></MaterialCommunityIcons>
          ),
        }}
      />
      <Tab.Screen
        name="groupe"
        component={Groupe}
        options={{
          tabBarLabel: 'Groupe',
          tabBarIcon: ({ color }) => (
            <FontAwesome
              name="group"
              size={23}
              color={color}
            ></FontAwesome>
          ),
        }}
      />
      <Tab.Screen
        name="list"
        component={Lists}
        options={{
          tabBarLabel: 'List',
          tabBarIcon: ({ color }) => (
            <FontAwesome5
              name="list-ul"
              size={23}
              color={color}
            ></FontAwesome5>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

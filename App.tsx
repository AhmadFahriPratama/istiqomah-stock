import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, ActivityIndicator } from 'react-native';
import { Home, Package, Box, Settings } from 'lucide-react-native';

import { setupDatabase } from './src/db/schema';
import tw from './src/styles/tw';

import DashboardScreen from './src/screens/DashboardScreen';
import ScannerScreen from './src/screens/ScannerScreen';
import FloorScreen from './src/screens/FloorScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    async function initDb() {
      try {
        await setupDatabase();
        setDbReady(true);
      } catch (e) {
        console.error("Failed to setup db", e);
      }
    }
    initDb();
  }, []);

  if (!dbReady) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-background`}>
        <ActivityIndicator size="large" color={tw.color('primary')} />
        <Text style={tw`mt-4 text-gray-500 font-medium`}>Menyiapkan Database...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: tw`bg-white border-t-0 shadow-lg elevation-10 pb-2 pt-2 h-16`,
          tabBarActiveTintColor: tw.color('primary'),
          tabBarInactiveTintColor: '#94A3B8',
        }}
      >
        <Tab.Screen 
          name="Dashboard" 
          component={DashboardScreen} 
          options={{
            tabBarIcon: ({ color }) => <Home color={color} size={24} />
          }}
        />
        <Tab.Screen 
          name="Lantai" 
          component={FloorScreen} 
          options={{
            tabBarIcon: ({ color }) => <Box color={color} size={24} />
          }}
        />
        <Tab.Screen 
          name="Scanner" 
          component={ScannerScreen} 
          options={{
            tabBarIcon: ({ color }) => (
              <View style={tw`bg-primary p-3 rounded-full shadow-md -mt-6`}>
                 <Package color="white" size={24} />
              </View>
            )
          }}
        />
        <Tab.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{
            tabBarIcon: ({ color }) => <Settings color={color} size={24} />
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

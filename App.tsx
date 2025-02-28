import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { registerForPushNotificationsAsync, sendPushNotification } from './lib/notifications';
import HomeScreen from './app/tabs/index';  // Update path if needed

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    async function setupNotifications() {
      const token = await registerForPushNotificationsAsync();
      if (token) {
        await sendPushNotification(token, 'Hello!', 'This is a test push notification.');
      }
    }
    setupNotifications();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

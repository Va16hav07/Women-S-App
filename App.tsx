import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { registerForPushNotificationsAsync, sendPushNotification } from './lib/notifications';

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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Push Notification Setup Complete</Text>
    </View>
  );
}

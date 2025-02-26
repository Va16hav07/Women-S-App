import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { auth } from '../../lib/firebase';
import { Redirect } from 'expo-router';

export default function AuthLayout() {
  // Check if user is already signed in
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      // If user is authenticated, redirect to tabs
      return <Redirect href="/(tabs)" />;
    }
  }, [user]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
    </Stack>
  );
}
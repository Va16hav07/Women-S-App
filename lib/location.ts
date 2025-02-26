import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { Platform, Alert } from 'react-native';

const LOCATION_TRACKING = 'location-tracking';

const requestLocationPermissions = async () => {
  try {
    let { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
    if (foregroundStatus !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Please enable location services to use emergency features.',
        [{ text: 'OK' }]
      );
      return false;
    }

    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      let { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
      if (backgroundStatus !== 'granted') {
        Alert.alert(
          'Background Location',
          'Background location access is required for emergency tracking.',
          [{ text: 'OK' }]
        );
        return false;
      }
    }

    return true;
  } catch (err) {
    console.error('Error requesting location permissions:', err);
    return false;
  }
};

export const startLocationTracking = async () => {
  try {
    const hasPermissions = await requestLocationPermissions();
    if (!hasPermissions) {
      return false;
    }

    // Check if the task is already registered
    const isRegistered = await TaskManager.isTaskRegisteredAsync(LOCATION_TRACKING);
    if (!isRegistered) {
      await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 5000,
        distanceInterval: 10,
        foregroundService: {
          notificationTitle: "Safety Tracking Active",
          notificationBody: "Your location is being monitored for safety.",
          notificationColor: "#FF4785",
        },
        // Specific iOS settings
        ios: {
          activityType: Location.ActivityType.OtherNavigation,
          allowsBackgroundLocationUpdates: true,
          showsBackgroundLocationIndicator: true,
        },
        // Specific Android settings
        android: {
          foregroundService: {
            notificationTitle: "Safety Tracking Active",
            notificationBody: "Your location is being monitored for safety.",
            notificationColor: "#FF4785",
          },
        },
      });
    }
    return true;
  } catch (err) {
    console.error('Error starting location tracking:', err);
    return false;
  }
};

// Define the background task
TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
  if (error) {
    console.error('Location tracking error:', error);
    return;
  }
  if (data) {
    const { locations } = data as { locations: Location.LocationObject[] };
    const location = locations[0];
    
    // Here you can implement your location tracking logic
    // For example, sending the location to your backend
    console.log('New location:', location);
  }
});

export const stopLocationTracking = async () => {
  try {
    const isRegistered = await TaskManager.isTaskRegisteredAsync(LOCATION_TRACKING);
    if (isRegistered) {
      await Location.stopLocationUpdatesAsync(LOCATION_TRACKING);
    }
    return true;
  } catch (err) {
    console.error('Error stopping location tracking:', err);
    return false;
  }
};

export const getCurrentLocation = async (): Promise<Location.LocationObject | null> => {
  try {
    const hasPermissions = await requestLocationPermissions();
    if (!hasPermissions) {
      return null;
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    return location;
  } catch (err) {
    console.error('Error getting current location:', err);
    return null;
  }
};
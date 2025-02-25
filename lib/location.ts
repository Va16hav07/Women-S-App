import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

const LOCATION_TRACKING = 'location-tracking';

export const startLocationTracking = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }

    await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
      accuracy: Location.Accuracy.Balanced,
      timeInterval: 5000,
      distanceInterval: 10,
    });
  } catch (err) {
    console.error('Error starting location tracking:', err);
  }
};

TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
  if (error) {
    console.error('Location tracking error:', error);
    return;
  }
  if (data) {
    const { locations } = data as { locations: Location.LocationObject[] };
    const location = locations[0];
    
    // Here you would typically send this location to your backend
    console.log('New location:', location);
  }
});

export const stopLocationTracking = async () => {
  try {
    await Location.stopLocationUpdatesAsync(LOCATION_TRACKING);
  } catch (err) {
    console.error('Error stopping location tracking:', err);
  }
};
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

const LOCATION_TRACKING = 'background-location-task';

export const requestLocationPermissions = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    console.error('🚨 Permission to access location was denied');
    return false;
  }

  const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
  if (backgroundStatus !== 'granted') {
    console.error('🚨 Background location permission denied');
    return false;
  }

  return true;
};

export const getCurrentLocation = async () => {
  try {
    const hasPermissions = await requestLocationPermissions();
    if (!hasPermissions) return null;

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    return location;
  } catch (error) {
    console.error('❌ Error getting current location:', error);
    return null;
  }
};

export const startLocationTracking = async () => {
  try {
    const hasPermissions = await requestLocationPermissions();
    if (!hasPermissions) return false;

    const isRegistered = await TaskManager.isTaskRegisteredAsync(LOCATION_TRACKING);
    
    if (isRegistered) {
      console.log("✅ Location tracking is already running.");
      return true;
    }

    await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
      accuracy: Location.Accuracy.High,
      timeInterval: 5000, // Update every 5 seconds
      distanceInterval: 10, // Update if moved 10 meters
      deferredUpdatesInterval: 5000,
      deferredUpdatesDistance: 10,
      showsBackgroundLocationIndicator: true,
      pausesUpdatesAutomatically: false,
      activityType: Location.ActivityType.OtherNavigation,
    });

    console.log("🚀 Background location tracking started.");
    return true;
  } catch (err) {
    console.error("❌ Error starting location tracking:", err);
    return false;
  }
};

export const stopLocationTracking = async () => {
  try {
    const isRegistered = await TaskManager.isTaskRegisteredAsync(LOCATION_TRACKING);
    if (!isRegistered) {
      console.warn("⚠️ No background location task found.");
      return false;
    }

    await Location.stopLocationUpdatesAsync(LOCATION_TRACKING);
    console.log('🛑 Stopped background location tracking.');
    return true;
  } catch (error) {
    console.error('❌ Error stopping location tracking:', error);
    return false;
  }
};

// Ensure TaskManager is defined before calling any tracking functions
if (!TaskManager.isTaskDefined(LOCATION_TRACKING)) {
  TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
    if (error) {
      console.error("❌ Location tracking error:", error);
      return;
    }
    if (data) {
      const { locations } = data as { locations: Location.LocationObject[] };
      if (locations.length > 0) {
        console.log("📍 New location:", locations[0]);
      }
    }
  });
} else {
  console.log("✅ Task already defined.");
}

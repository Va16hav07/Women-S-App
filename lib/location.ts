import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { Platform, Alert } from "react-native";

const LOCATION_TRACKING = "location-tracking";

const requestLocationPermissions = async () => {
  try {
    const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
    if (foregroundStatus !== "granted") {
      Alert.alert("Permission Required", "Please enable location services to use emergency features.", [{ text: "OK" }]);
      return false;
    }

    if (Platform.OS === "android") {
      const { granted } = await Location.getForegroundPermissionsAsync();
      if (!granted) {
        Alert.alert("Foreground Service Required", "Please enable foreground service for location tracking.");
        return false;
      }
    }

    const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
    if (backgroundStatus !== "granted") {
      Alert.alert("Background Location Required", "Please allow background location access for emergency tracking.", [{ text: "OK" }]);
      return false;
    }

    return true;
  } catch (err) {
    console.error("Error requesting location permissions:", err);
    return false;
  }
};

export const startLocationTracking = async () => {
  try {
    const hasPermissions = await requestLocationPermissions();
    if (!hasPermissions) return false;

    // Check if the task is already registered
    const isRegistered = await TaskManager.isTaskRegisteredAsync(LOCATION_TRACKING);
    if (!isRegistered) {
      await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 5000, // Update every 5 seconds
        distanceInterval: 10, // Update if moved 10 meters
        foregroundService: {
          notificationTitle: "Safety Tracking Active",
          notificationBody: "Your location is being monitored for safety.",
          notificationColor: "#FF4785",
        },
        ios: {
          activityType: Location.ActivityType.OtherNavigation,
          allowsBackgroundLocationUpdates: true,
          showsBackgroundLocationIndicator: true,
        },
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
    console.error("Error starting location tracking:", err);
    return false;
  }
};

// Background task for location tracking
TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
  if (error) {
    console.error("Location tracking error:", error);
    return;
  }
  if (data) {
    const { locations } = data as { locations: Location.LocationObject[] };
    if (locations.length > 0) {
      const location = locations[0];
      console.log("New location:", location);
      // Send location to backend if required
    }
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
    console.error("Error stopping location tracking:", err);
    return false;
  }
};

export const getCurrentLocation = async (): Promise<Location.LocationObject | null> => {
  try {
    const hasPermissions = await requestLocationPermissions();
    if (!hasPermissions) return null;

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    return location;
  } catch (err) {
    console.error("Error getting current location:", err);
    return null;
  }
};

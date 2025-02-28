import React, { useEffect, useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Platform, 
  Alert, 
  useWindowDimensions,
  ActivityIndicator
} from 'react-native';
import { TriangleAlert as AlertTriangle } from 'lucide-react-native';
import { startLocationTracking, getCurrentLocation } from '../../lib/location';
import { sendEmergencySMS } from '../../lib/sms';
import { registerForPushNotificationsAsync, sendPushNotification } from '../../lib/notifications';
import * as Location from 'expo-location';

// Conditionally import MapView
let MapView, Marker;
if (Platform.OS !== 'web') {
  try {
    const Maps = require('react-native-maps');
    MapView = Maps.default;
    Marker = Maps.Marker;
  } catch (error) {
    console.error('Error importing react-native-maps:', error);
  }
}

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [pushToken, setPushToken] = useState('');
  const [isMapReady, setIsMapReady] = useState(false);
  const [isLocationLoading, setIsLocationLoading] = useState(true);
  const mapRef = useRef(null);

  const isSmallDevice = width < 375;
  const isTablet = width >= 768;
  const buttonSize = isSmallDevice ? 50 : isTablet ? 80 : 60;

  useEffect(() => {
    const initializeLocation = async () => {
      try {
        setIsLocationLoading(true);
        setErrorMsg(null);

        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Location permission denied. Please enable it in settings.');
          setIsLocationLoading(false);
          return;
        }

        const currentLocation = await getCurrentLocation();
        if (currentLocation) setLocation(currentLocation);

        await startLocationTracking();

        const token = await registerForPushNotificationsAsync();
        if (token) setPushToken(token);
      } catch (error) {
        console.error('Location initialization error:', error);
        setErrorMsg('Error initializing location services.');
      } finally {
        setIsLocationLoading(false);
      }
    };

    initializeLocation();
  }, []);

  const handleEmergency = async () => {
    if (!location) return Alert.alert('Error', 'Unable to get your location.');

    try {
      await sendEmergencySMS(
        [
          { name: 'Emergency Contact 1', phone: '+1234567890' },
          { name: 'Emergency Contact 2', phone: '+0987654321' },
        ],
        { latitude: location.coords.latitude, longitude: location.coords.longitude }
      );

      if (pushToken) {
        await sendPushNotification(pushToken, 'Emergency Alert', 'Emergency alert triggered!');
      }

      Alert.alert('Emergency Alert Sent', 'Your contacts have been notified.');
    } catch (error) {
      console.error('Emergency alert error:', error);
      Alert.alert('Error', 'Failed to send emergency alert.');
    }
  };

  const renderMap = () => {
    if (Platform.OS === 'web' || !MapView || !Marker) {
      return (
        <View style={styles.webLocationContainer}>
          <Text style={styles.webLocationText}>
            {isLocationLoading ? 'Fetching your location...' :
            location ? `Lat: ${location.coords.latitude}\nLong: ${location.coords.longitude}`
            : 'Location unavailable'}
          </Text>
        </View>
      );
    }

    return isLocationLoading ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF4785" />
        <Text style={styles.loadingText}>Fetching your location...</Text>
      </View>
    ) : (
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onMapReady={() => setIsMapReady(true)}
      >
        {isMapReady && (
          <Marker coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }} title="You are here" />
        )}
      </MapView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>SafeTravels</Text>
        <Text style={styles.subHeaderText}>Your safety companion</Text>
      </View>

      <View style={styles.mapContainer}>{renderMap()}</View>

      <TouchableOpacity 
        style={[styles.emergencyButton, { width: buttonSize, height: buttonSize, borderRadius: buttonSize / 2 }]} 
        onPress={handleEmergency}
      >
        <AlertTriangle size={buttonSize * 0.5} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerContainer: { paddingTop: 40, paddingBottom: 10, paddingHorizontal: 20 },
  headerText: { fontSize: 24, fontWeight: 'bold', color: '#FF4785' },
  subHeaderText: { fontSize: 16, color: '#666' },
  mapContainer: { flex: 1 },
  map: { flex: 1 },
  emergencyButton: { 
    backgroundColor: '#FF4785', 
    justifyContent: 'center', 
    alignItems: 'center', 
    position: 'absolute', 
    bottom: 30, 
    right: 20, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5
  },
});

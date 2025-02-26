import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Alert, useWindowDimensions } from 'react-native';
import { TriangleAlert as AlertTriangle } from 'lucide-react-native';
import { startLocationTracking, stopLocationTracking, getCurrentLocation } from '../../lib/location';
import { sendEmergencySMS } from '../../lib/sms';
import { registerForPushNotificationsAsync, sendPushNotification } from '../../lib/notifications';
import * as Location from 'expo-location';


// Conditionally import MapView to avoid web issues
let MapView: any;
let Marker: any;
if (Platform.OS !== 'web') {
  const Maps = require('react-native-maps');
  MapView = Maps.default;
  Marker = Maps.Marker;
}

export default function HomeScreen() {
  const { width, height } = useWindowDimensions();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [pushToken, setPushToken] = useState('');
  const mapRef = useRef<any>(null);

  const isSmallDevice = width < 375;
  const isTablet = width >= 768;
  const buttonSize = isSmallDevice ? 50 : isTablet ? 80 : 60;

  useEffect(() => {
    const initializeLocation = async () => {
      try {
        const currentLocation = await getCurrentLocation();
        if (currentLocation) {
          setLocation(currentLocation);
        }

        const trackingStarted = await startLocationTracking();
        if (!trackingStarted) {
          setErrorMsg('Failed to start location tracking. Some features may be limited.');
        }

        const token = await registerForPushNotificationsAsync();
        if (token) {
          setPushToken(token);
        }
      } catch (error) {
        setErrorMsg('Error initializing location services');
        console.error('Location initialization error:', error);
      }
    };

    initializeLocation();

    return () => {
      stopLocationTracking(); // Stop tracking when exiting screen
    };
  }, []);

  const handleEmergency = async () => {
    let currentLocation = location;

    if (!currentLocation) {
      currentLocation = await getCurrentLocation();
      if (!currentLocation) {
        Alert.alert('Error', 'Unable to get your location. Please ensure location services are enabled.');
        return;
      }
      setLocation(currentLocation);
    }

    try {
      const success = await sendEmergencySMS(
        [
          { name: 'Emergency Contact 1', phone: '+1234567890' },
          { name: 'Emergency Contact 2', phone: '+0987654321' },
        ],
        {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        }
      );

      if (pushToken) {
        await sendPushNotification(
          pushToken,
          'Emergency Alert',
          'Emergency alert has been triggered!'
        );
      }

      Alert.alert(
        'Emergency Alert Sent',
        'Your emergency contacts have been notified with your location.'
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to send emergency alert. Please try again.');
      console.error('Emergency alert error:', error);
    }
  };

  const renderMap = () => {
    if (Platform.OS === 'web') {
      return (
        <View style={styles.webLocationContainer}>
          <Text style={[styles.webLocationText, isSmallDevice && styles.smallText]}>
            Your Location:{'\n'}
            Latitude: {location?.coords.latitude.toFixed(6)}{'\n'}
            Longitude: {location?.coords.longitude.toFixed(6)}
          </Text>
        </View>
      );
    }

    return location ? (
      <MapView
        ref={mapRef}
        provider={Platform.OS === 'android' ? 'google' : null}
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="You are here"
        />
      </MapView>
    ) : null;
  };

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text style={[styles.errorText, isSmallDevice && styles.smallText]}>{errorMsg}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderMap()}
      <TouchableOpacity 
        style={[
          styles.emergencyButton,
          {
            width: buttonSize,
            height: buttonSize,
            borderRadius: buttonSize / 2,
            bottom: height * 0.05,
            right: width * 0.05,
          }
        ]} 
        onPress={handleEmergency}
      >
        <AlertTriangle size={buttonSize * 0.5} color="#fff" />
        <Text style={[styles.emergencyText, isSmallDevice && styles.smallText]}>HELP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  webLocationContainer: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  webLocationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  emergencyButton: {
    position: 'absolute',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  emergencyText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
  },
  smallText: {
    fontSize: 14,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
    padding: 20,
  },
});

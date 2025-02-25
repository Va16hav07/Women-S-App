import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { TriangleAlert as AlertTriangle } from 'lucide-react-native';
import { startLocationTracking, stopLocationTracking } from '../../lib/location';
import { sendEmergencySMS } from '../../lib/sms';
import { registerForPushNotificationsAsync, sendPushNotification } from '../../lib/notifications';

export default function HomeScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [pushToken, setPushToken] = useState('');
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      // Start location tracking
      await startLocationTracking();

      // Register for push notifications
      const token = await registerForPushNotificationsAsync();
      if (token) {
        setPushToken(token);
      }
    })();

    return () => {
      stopLocationTracking();
    };
  }, []);

  const handleEmergency = async () => {
    if (!location) {
      Alert.alert('Error', 'Unable to get your location');
      return;
    }

    try {
      // Send SMS to emergency contacts
      const success = await sendEmergencySMS(
        [
          { name: 'Emergency Contact 1', phone: '+1234567890' },
          { name: 'Emergency Contact 2', phone: '+0987654321' },
        ],
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }
      );

      // Send push notification
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
      Alert.alert('Error', 'Failed to send emergency alert');
    }
  };

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{errorMsg}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          ref={mapRef}
          provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : null}
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
      )}

      <TouchableOpacity style={styles.emergencyButton} onPress={handleEmergency}>
        <AlertTriangle size={32} color="#fff" />
        <Text style={styles.emergencyText}>HELP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    flex: 1,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    margin: 20,
  },
  emergencyButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    backgroundColor: '#FF4785',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  emergencyText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 2,
  },
});
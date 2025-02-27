import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PrivacyScreen() {
  const [locationTracking, setLocationTracking] = useState(true);
  const [emergencySharing, setEmergencySharing] = useState(true);
  const [anonymousReporting, setAnonymousReporting] = useState(true);
  const [dataCollection, setDataCollection] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Privacy Policy</Text>
        
        <Text style={styles.sectionTitle}>Your Privacy Matters</Text>
        <Text style={styles.text}>
          We built this app with your safety and privacy as our top priorities. We only collect 
          information that's essential to keep you safe, and we never share your data with third parties 
          without your explicit consent.
        </Text>
        
        <View style={styles.settingsSection}>
          <Text style={styles.settingsHeader}>Privacy Settings</Text>
          
          <View style={styles.setting}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Location Tracking</Text>
              <Text style={styles.settingDescription}>
                Allow the app to track your location for emergency services and safe route planning.
              </Text>
            </View>
            <Switch 
              value={locationTracking}
              onValueChange={setLocationTracking}
              trackColor={{ false: "#767577", true: "#ff6b8b" }}
            />
          </View>
          
          <View style={styles.setting}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Emergency Contact Sharing</Text>
              <Text style={styles.settingDescription}>
                Allow the app to send your location and alerts to emergency contacts.
              </Text>
            </View>
            <Switch 
              value={emergencySharing}
              onValueChange={setEmergencySharing}
              trackColor={{ false: "#767577", true: "#ff6b8b" }}
            />
          </View>
          
          <View style={styles.setting}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Anonymous Reporting</Text>
              <Text style={styles.settingDescription}>
                Report incidents anonymously to help other users.
              </Text>
            </View>
            <Switch 
              value={anonymousReporting}
              onValueChange={setAnonymousReporting}
              trackColor={{ false: "#767577", true: "#ff6b8b" }}
            />
          </View>
          
          <View style={styles.setting}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Safety Data Collection</Text>
              <Text style={styles.settingDescription}>
                Allow collection of app usage data to improve safety features.
              </Text>
            </View>
            <Switch 
              value={dataCollection}
              onValueChange={setDataCollection}
              trackColor={{ false: "#767577", true: "#ff6b8b" }}
            />
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>How We Use Your Data</Text>
        <Text style={styles.text}>
          • <Text style={styles.bold}>Location Data:</Text> Used only for emergency services, SOS alerts, 
          safe route recommendations, and sharing your location with trusted contacts during emergencies.
        </Text>
        <Text style={styles.text}>
          • <Text style={styles.bold}>Contact Information:</Text> Stored securely to enable emergency 
          contact alerts and communication.
        </Text>
        <Text style={styles.text}>
          • <Text style={styles.bold}>Incident Reports:</Text> Anonymous reporting helps improve safety for 
          all users by marking unsafe areas.
        </Text>
        
        <Text style={styles.sectionTitle}>Safety Features & Privacy</Text>
        <Text style={styles.text}>
          • <Text style={styles.bold}>SOS Alerts:</Text> When triggered, your location is shared with your 
          emergency contacts and, optionally, with local authorities.
        </Text>
        <Text style={styles.text}>
          • <Text style={styles.bold}>Safety Check-ins:</Text> Scheduled notifications that verify your 
          safety. If you don't respond, alerts can be sent to your emergency contacts.
        </Text>
        <Text style={styles.text}>
          • <Text style={styles.bold}>Fake Call Feature:</Text> No data is collected when using this 
          feature to help you exit uncomfortable situations.
        </Text>
        
        <Text style={styles.sectionTitle}>Data Protection</Text>
        <Text style={styles.text}>
          All your personal information is encrypted and stored securely. We use industry-standard 
          security measures to protect your data from unauthorized access.
        </Text>
        
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Request Data Deletion</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#e83e8c',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#ff6b8b',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
  },
  settingsSection: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginVertical: 20,
  },
  settingsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#e83e8c',
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  settingTextContainer: {
    flex: 1,
    paddingRight: 10,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: '#ff6b8b',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

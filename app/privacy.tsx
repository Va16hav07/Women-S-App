import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity, 
  SafeAreaView, useWindowDimensions, Platform 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Type definition for PrivacyOption props
type PrivacyOptionProps = {
  title: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

export default function PrivacyScreen() {
  const router = useRouter();
  const { width }: { width: number } = useWindowDimensions();
  
  const [locationTracking, setLocationTracking] = useState(true);
  const [emergencySharing, setEmergencySharing] = useState(true);
  const [anonymousReporting, setAnonymousReporting] = useState(true);
  const [dataCollection, setDataCollection] = useState(true);

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.headerContainer, { paddingHorizontal: getPadding(width) }]}>
        <View style={[styles.header, { paddingHorizontal: getPadding(width) }]}>
          <TouchableOpacity 
            style={[styles.backButton, { padding: getPadding(width) / 2 }]} 
            onPress={handleBack}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Privacy Policy</Text>
          <View style={{ width: 24 }} />
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>Your Privacy Matters</Text>
            <View style={styles.card}>
              <Text style={styles.text}>
                We built this app with your safety and privacy as our top priorities. We only collect 
                information that's essential to keep you safe, and we never share your data with third parties 
                without your explicit consent.
              </Text>
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>Privacy Settings</Text>
            <View style={styles.card}>
              <PrivacyOption 
                title="Location Tracking" 
                description="Allow the app to track your location for emergency services and safe route planning." 
                value={locationTracking}
                onValueChange={setLocationTracking}
              />
              <View style={styles.separator} />
              
              <PrivacyOption 
                title="Emergency Contact Sharing" 
                description="Allow the app to send your location and alerts to emergency contacts." 
                value={emergencySharing}
                onValueChange={setEmergencySharing}
              />
              <View style={styles.separator} />
              
              <PrivacyOption 
                title="Anonymous Reporting" 
                description="Report incidents anonymously to help other users." 
                value={anonymousReporting}
                onValueChange={setAnonymousReporting}
              />
              <View style={styles.separator} />
              
              <PrivacyOption 
                title="Safety Data Collection" 
                description="Allow collection of app usage data to improve safety features." 
                value={dataCollection}
                onValueChange={setDataCollection}
              />
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>How We Use Your Data</Text>
            <View style={styles.card}>
              <DataUsageInfo 
                title="Location Data" 
                description="Used only for emergency services, SOS alerts, safe route recommendations, and sharing your location with trusted contacts during emergencies." 
              />
              <View style={styles.separator} />
              
              <DataUsageInfo 
                title="Contact Information" 
                description="Stored securely to enable emergency contact alerts and communication." 
              />
              <View style={styles.separator} />
              
              <DataUsageInfo 
                title="Incident Reports" 
                description="Anonymous reporting helps improve safety for all users by marking unsafe areas." 
              />
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>Safety Features & Privacy</Text>
            <View style={styles.card}>
              <DataUsageInfo 
                title="SOS Alerts" 
                description="When triggered, your location is shared with your emergency contacts and, optionally, with local authorities." 
              />
              <View style={styles.separator} />
              
              <DataUsageInfo 
                title="Safety Check-ins" 
                description="Scheduled notifications that verify your safety. If you don't respond, alerts can be sent to your emergency contacts." 
              />
              <View style={styles.separator} />
              
              <DataUsageInfo 
                title="Fake Call Feature" 
                description="No data is collected when using this feature to help you exit uncomfortable situations." 
              />
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>Data Protection</Text>
            <View style={styles.card}>
              <Text style={styles.text}>
                All your personal information is encrypted and stored securely. We use industry-standard 
                security measures to protect your data from unauthorized access.
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Request Data Deletion</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Reusable component for privacy settings with toggle switch
const PrivacyOption: React.FC<PrivacyOptionProps> = ({ title, description, value, onValueChange }) => {
  return (
    <View style={styles.settingItem}>
      <View style={styles.settingInfo}>
        <View>
          <Text style={styles.settingTitle}>{title}</Text>
          <Text style={styles.settingDescription}>{description}</Text>
        </View>
      </View>
      <Switch 
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#767577", true: "#ff6b8b" }}
        thumbColor={value ? "#e83e8c" : "#f4f3f4"}
        ios_backgroundColor="#767577"
      />
    </View>
  );
};

// Component for data usage info items
const DataUsageInfo = ({ title, description }: { title: string, description: string }) => {
  return (
    <View style={styles.dataUsageItem}>
      <Ionicons name="information-circle" size={24} color="#ff6b81" style={styles.icon} />
      <View style={styles.dataUsageContent}>
        <Text style={styles.dataUsageTitle}>{title}</Text>
        <Text style={styles.dataUsageDescription}>{description}</Text>
      </View>
    </View>
  );
};

// Helper function to adjust padding based on screen width
const getPadding = (width: number) => {
  if (width < 400) return 10;
  if (width < 800) return 20;
  return 40;
};

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#f8f9fa' 
  },
  headerContainer: { 
    paddingTop: Platform.OS === 'ios' ? 40 : 20 
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingVertical: 20, 
    borderBottomWidth: 1, 
    borderBottomColor: '#eee', 
    backgroundColor: '#fff' 
  },
  backButton: { 
    padding: 5 
  },
  headerText: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#333', 
    textAlign: 'center', 
    flex: 1 
  },
  scrollView: { 
    flex: 1 
  },
  container: { 
    flex: 1, 
    padding: 20 
  },
  sectionContainer: { 
    marginBottom: 25 
  },
  sectionHeader: { 
    fontSize: 18, 
    fontWeight: '600', 
    color: '#666', 
    marginBottom: 10 
  },
  card: { 
    backgroundColor: '#fff', 
    borderRadius: 12, 
    padding: 15, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 3, 
    elevation: 3 
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
    color: '#555',
  },
  settingItem: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 12 
  },
  settingInfo: { 
    flex: 1, 
    paddingRight: 10 
  },
  settingTitle: { 
    fontSize: 16, 
    fontWeight: '500', 
    color: '#333' 
  },
  settingDescription: { 
    fontSize: 13, 
    color: '#888', 
    maxWidth: '95%', 
    marginTop: 2 
  },
  dataUsageItem: {
    flexDirection: 'row',
    paddingVertical: 12,
  },
  icon: { 
    marginRight: 12 
  },
  dataUsageContent: {
    flex: 1,
  },
  dataUsageTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  dataUsageDescription: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  separator: { 
    height: 1, 
    backgroundColor: '#f0f0f0', 
    marginVertical: 5 
  },
  deleteButton: {
    backgroundColor: '#ff6b81',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

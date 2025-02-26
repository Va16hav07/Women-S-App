import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, Link } from 'expo-router';

export default function SettingsScreen() {
  const [alertsEnabled, setAlertsEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>Safety Features</Text>
            <View style={styles.card}>
              <SettingItem 
                icon="alert-circle"
                title="Emergency Alerts"
                description="Get alerts in emergency situations"
                value={alertsEnabled}
                onValueChange={setAlertsEnabled}
              />
            </View>
          </View>
          
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>App Preferences</Text>
            <View style={styles.card}>
              <SettingItem 
                icon="notifications"
                title="Push Notifications"
                description="Receive app notifications"
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
              />
              <View style={styles.separator} />
              <SettingItem 
                icon="moon"
                title="Dark Mode"
                description="Use dark theme"
                value={darkModeEnabled}
                onValueChange={setDarkModeEnabled}
              />
            </View>
          </View>
          
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>Support</Text>
            <View style={styles.card}>
              <TouchableOption 
                icon="help-circle"
                title="FAQs"
                description="Frequently asked questions"
              />
              <View style={styles.separator} />
              <Link href="/contact-support" asChild>
                <TouchableOpacity style={styles.settingItem}>
                  <View style={styles.settingInfo}>
                    <Ionicons name="chatbubble-ellipses" size={24} color="#ff6b81" style={styles.icon} />
                    <View>
                      <Text style={styles.settingTitle}>Contact Support</Text>
                      <Text style={styles.settingDescription}>Get help with any issues</Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#999" />
                </TouchableOpacity>
              </Link>
              <View style={styles.separator} />
              <TouchableOption 
                icon="information-circle"
                title="About"
                description="App version and information"
              />
            </View>
          </View>
          
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Save Settings</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

interface SettingItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

function SettingItem({ icon, title, description, value, onValueChange }: SettingItemProps) {
  return (
    <View style={styles.settingItem}>
      <View style={styles.settingInfo}>
        <Ionicons name={icon} size={24} color="#ff6b81" style={styles.icon} />
        <View>
          <Text style={styles.settingTitle}>{title}</Text>
          <Text style={styles.settingDescription}>{description}</Text>
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#d1d1d1', true: '#ff9eb5' }}
        thumbColor={value ? '#ff6b81' : '#f4f3f4'}
      />
    </View>
  );
}

interface TouchableOptionProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  onPress?: () => void;
}

function TouchableOption({ icon, title, description, onPress }: TouchableOptionProps) {
  return (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingInfo}>
        <Ionicons name={icon} size={24} color="#ff6b81" style={styles.icon} />
        <View>
          <Text style={styles.settingTitle}>{title}</Text>
          <Text style={styles.settingDescription}>{description}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  sectionContainer: {
    marginBottom: 25,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 10,
    marginLeft: 5,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  settingDescription: {
    fontSize: 13,
    color: '#888',
    maxWidth: '90%',
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#ff6b81',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
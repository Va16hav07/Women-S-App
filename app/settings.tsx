import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Switch, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Platform,
  Dimensions,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, Link } from 'expo-router';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

// Calculate responsive sizes
const scale = Math.min(width, height) / 375; // Base scale on iPhone 8 dimensions
const normalize = (size: number) => Math.round(size * scale);

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
      <StatusBar 
        backgroundColor="#fff" 
        barStyle="dark-content" 
      />
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleBack}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons 
            name={Platform.OS === 'ios' ? 'chevron-back' : 'arrow-back'} 
            size={normalize(24)} 
            color="#333" 
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Settings</Text>
        <View style={{ width: normalize(24) }} />
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
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
                <TouchableOpacity 
                  style={styles.settingItem}
                  activeOpacity={0.7}
                >
                  <View style={styles.settingInfo}>
                    <Ionicons name="chatbubble-ellipses" size={normalize(24)} color="#ff6b81" style={styles.icon} />
                    <View style={styles.textContainer}>
                      <Text style={styles.settingTitle}>Contact Support</Text>
                      <Text style={styles.settingDescription} numberOfLines={2}>Get help with any issues</Text>
                    </View>
                  </View>
                  <Ionicons 
                    name={Platform.OS === 'ios' ? 'chevron-forward' : 'arrow-forward'} 
                    size={normalize(20)} 
                    color="#999" 
                  />
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
          
          <TouchableOpacity 
            style={styles.button}
            activeOpacity={0.8}
          >
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
        <Ionicons name={icon} size={normalize(24)} color="#ff6b81" style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.settingTitle}>{title}</Text>
          <Text style={styles.settingDescription} numberOfLines={2}>{description}</Text>
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#d1d1d1', true: '#ff9eb5' }}
        thumbColor={value ? '#ff6b81' : '#f4f3f4'}
        ios_backgroundColor="#d1d1d1"
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
    <TouchableOpacity 
      style={styles.settingItem} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.settingInfo}>
        <Ionicons name={icon} size={normalize(24)} color="#ff6b81" style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.settingTitle}>{title}</Text>
          <Text style={styles.settingDescription} numberOfLines={2}>{description}</Text>
        </View>
      </View>
      <Ionicons 
        name={Platform.OS === 'ios' ? 'chevron-forward' : 'arrow-forward'} 
        size={normalize(20)} 
        color="#999" 
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(15),
    paddingVertical: normalize(15),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  backButton: {
    padding: normalize(5),
  },
  headerText: {
    fontSize: normalize(20),
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: normalize(16),
    paddingBottom: normalize(30),
  },
  sectionContainer: {
    marginBottom: normalize(22),
  },
  sectionHeader: {
    fontSize: normalize(18),
    fontWeight: '600',
    color: '#666',
    marginBottom: normalize(10),
    marginLeft: normalize(5),
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: normalize(12),
    padding: normalize(15),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: normalize(12),
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: normalize(10),
  },
  icon: {
    marginRight: normalize(12),
  },
  textContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: normalize(16),
    fontWeight: '500',
    color: '#333',
  },
  settingDescription: {
    fontSize: normalize(13),
    color: '#888',
    marginTop: normalize(2),
  },
  separator: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: normalize(5),
  },
  button: {
    backgroundColor: '#ff6b81',
    borderRadius: normalize(10),
    padding: normalize(15),
    alignItems: 'center',
    marginTop: normalize(15),
    marginBottom: normalize(30),
  },
  buttonText: {
    color: 'white',
    fontSize: normalize(16),
    fontWeight: '600',
  },
});
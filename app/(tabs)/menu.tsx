import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Platform, StatusBar, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import {
  User,
  Settings,
  Phone,
  LogOut,
  ChevronRight,
  Shield,
} from 'lucide-react-native';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

// Calculate responsive sizes
const scale = Math.min(width, height) / 375; // Base scale on iPhone 8 dimensions
const normalize = (size: number) => Math.round(size * scale);

export default function MenuScreen() {
  const handleSignOut = () => {
    // TODO: Implement sign-out logic
    router.replace('/sign-in');
  };

  interface MenuItemProps {
    icon: React.ReactNode;
    title: string;
    onPress: () => void;
  }

  const MenuItem: React.FC<MenuItemProps> = ({ icon, title, onPress }) => (
    <TouchableOpacity 
      style={styles.menuItem} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.menuItemLeft}>
        {icon}
        <Text style={styles.menuItemText} numberOfLines={1}>{title}</Text>
      </View>
      <ChevronRight size={normalize(20)} color="#666" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar 
        backgroundColor="#fff" 
        barStyle="dark-content" 
      />
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <Text style={styles.header}>Menu</Text>

        <View style={styles.section}>
          <MenuItem
            icon={<User size={normalize(24)} color="#666" />}
            title="Profile"
            onPress={() => router.push('/profile')}
          />
          <MenuItem
            icon={<Settings size={normalize(24)} color="#666" />}
            title="Settings"
            onPress={() => router.push('/settings')}
          />
          <MenuItem
            icon={<Shield size={normalize(24)} color="#666" />}
            title="Privacy"
            onPress={() => router.push('/privacy')}
          />
        </View>

        <TouchableOpacity 
          style={styles.signOutButton} 
          onPress={handleSignOut}
          activeOpacity={0.8}
        >
          <LogOut size={normalize(24)} color="#FF4785" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: normalize(20),
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  header: {
    fontSize: normalize(24),
    fontWeight: 'bold',
    marginBottom: normalize(20),
    color: '#1a1a1a',
  },
  section: {
    backgroundColor: '#f8f8f8',
    borderRadius: normalize(12),
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: normalize(16),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(16),
    flex: 1,
    marginRight: normalize(10),
  },
  menuItemText: {
    fontSize: normalize(16),
    color: '#1a1a1a',
    flex: 1,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(16),
    marginTop: normalize(40),
    marginBottom: normalize(20),
    padding: normalize(16),
    backgroundColor: '#FFF1F5',
    borderRadius: normalize(12),
    ...Platform.select({
      ios: {
        shadowColor: '#FF4785',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  signOutText: {
    fontSize: normalize(16),
    color: '#FF4785',
    fontWeight: 'bold',
  },
});
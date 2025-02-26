import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import {
  User,
  Settings,
  Phone,
  LogOut,
  ChevronRight,
  Shield,
} from 'lucide-react-native';

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
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        {icon}
        <Text style={styles.menuItemText}>{title}</Text>
      </View>
      <ChevronRight size={20} color="#666" />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Menu</Text>

      <View style={styles.section}>
        <MenuItem
          icon={<User size={24} color="#666" />}
          title="Profile"
          onPress={() => router.push('/profile')}
        />
        <MenuItem
          icon={<Settings size={24} color="#666" />}
          title="Settings"
          onPress={() => router.push('/settings')}
        />
        <MenuItem
          icon={<Shield size={24} color="#666" />}
          title="Privacy"
          onPress={() => router.push('/privacy')}
        />
        <MenuItem
          icon={<Phone size={24} color="#666" />}
          title="Contact Us"
          onPress={() => router.push('/contact-us')}
        />
      </View>

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <LogOut size={24} color="#FF4785" />
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1a1a1a',
  },
  section: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  menuItemText: {
    fontSize: 16,
    color: '#1a1a1a',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 40,
    padding: 16,
    backgroundColor: '#FFF1F5',
    borderRadius: 12,
  },
  signOutText: {
    fontSize: 16,
    color: '#FF4785',
    fontWeight: 'bold',
  },
});
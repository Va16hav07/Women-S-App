import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const handleBack = () => {
    console.log('Going back');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Profile</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.profileContainer}>
            <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.profileImage} />
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileEmail}>johndoe@example.com</Text>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionHeader}>Account</Text>
            <View style={styles.card}>
              <TouchableOption icon="lock-closed" title="Change Password" description="Update your password" />
              <View style={styles.separator} />
              <TouchableOption icon="log-out" title="Logout" description="Sign out from your account" />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function TouchableOption({ icon, title, description }: { icon: keyof typeof Ionicons.glyphMap; title: string; description: string }) {
  return (
    <TouchableOpacity style={styles.settingItem}>
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
  safeArea: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#eee', backgroundColor: '#fff' },
  backButton: { padding: 5 },
  headerText: { fontSize: 20, fontWeight: 'bold', color: '#333', textAlign: 'center', flex: 1 },
  scrollView: { flex: 1 },
  container: { flex: 1, padding: 20 },
  profileContainer: { alignItems: 'center', marginBottom: 30 },
  profileImage: { width: 100, height: 100, borderRadius: 50 },
  profileName: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
  profileEmail: { color: '#666' },
  editButton: { marginTop: 10, padding: 10, backgroundColor: '#ff6b81', borderRadius: 8 },
  editButtonText: { color: '#fff' },
  sectionContainer: { marginBottom: 25 },
  sectionHeader: { fontSize: 18, fontWeight: '600', color: '#666', marginBottom: 10 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 3 },
  settingItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 },
  settingInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  icon: { marginRight: 12 },
  settingTitle: { fontSize: 16, fontWeight: '500', color: '#333' },
  settingDescription: { fontSize: 13, color: '#888', maxWidth: '90%', marginTop: 2 },
  separator: { height: 1, backgroundColor: '#f0f0f0', marginVertical: 5 },
});

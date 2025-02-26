import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Make sure this file is in the correct directory structure
// If your app has a specific routing structure, this file might need to be in a specific subdirectory
// For example: /app/(app)/contact-support.tsx instead of /app/contact-support.tsx

export default function ContactSupportScreen() {
  const router = useRouter();
  const supportEmail = 'Example@gmail.com';
  const supportPhone = '+1 (555) 123-4567';

  const handleBack = () => {
    router.back();
  };

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${supportEmail}`);
  };

  const handlePhonePress = () => {
    Linking.openURL(`tel:${supportPhone}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Contact Support</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>We're Here to Help</Text>
          <Text style={styles.subtitle}>Reach out to us through the following channels:</Text>

          <TouchableOpacity style={styles.contactItem} onPress={handleEmailPress}>
            <View style={styles.contactInfo}>
              <Ionicons name="mail" size={24} color="#ff6b81" style={styles.icon} />
              <View>
                <Text style={styles.contactLabel}>Email us at</Text>
                <Text style={styles.contactValue}>{supportEmail}</Text>
              </View>
            </View>
            <Ionicons name="open-outline" size={20} color="#999" />
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity style={styles.contactItem} onPress={handlePhonePress}>
            <View style={styles.contactInfo}>
              <Ionicons name="call" size={24} color="#ff6b81" style={styles.icon} />
              <View>
                <Text style={styles.contactLabel}>Call us at</Text>
                <Text style={styles.contactValue}>{supportPhone}</Text>
              </View>
            </View>
            <Ionicons name="open-outline" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.infoText}>
            Our support team is available 24/7.
            We typically respond to email inquiries within 24 hours.
          </Text>
        </View>
      </View>
    </SafeAreaView>
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
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 25,
    textAlign: 'center',
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 15,
  },
  contactLabel: {
    fontSize: 14,
    color: '#888',
  },
  contactValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 5,
  },
  infoText: {
    fontSize: 15,
    color: '#777',
    lineHeight: 22,
    textAlign: 'center',
  }
});

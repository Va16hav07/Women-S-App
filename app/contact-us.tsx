import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ContactUsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Contact Us</Text>
      <Text>Contact information and support options will be available here.</Text>
    </View>
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
    marginBottom: 10,
  },
});

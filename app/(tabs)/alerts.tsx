import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { TriangleAlert as AlertTriangle, MapPin, Clock } from 'lucide-react-native';

const DUMMY_ALERTS = [
  {
    id: '1',
    type: 'danger',
    title: 'Suspicious Activity Reported',
    location: 'Central Park Area',
    time: '10 minutes ago',
  },
  {
    id: '2',
    type: 'warning',
    title: 'Poor Street Lighting',
    location: 'Downtown Main Street',
    time: '1 hour ago',
  },
];

export default function AlertsScreen() {
  const renderAlert = ({ item }) => (
    <TouchableOpacity style={styles.alertCard}>
      <View style={styles.alertHeader}>
        <AlertTriangle
          size={24}
          color={item.type === 'danger' ? '#FF4785' : '#FFA500'}
        />
        <Text style={styles.alertTitle}>{item.title}</Text>
      </View>
      
      <View style={styles.alertInfo}>
        <View style={styles.infoRow}>
          <MapPin size={16} color="#666" />
          <Text style={styles.infoText}>{item.location}</Text>
        </View>
        <View style={styles.infoRow}>
          <Clock size={16} color="#666" />
          <Text style={styles.infoText}>{item.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Area Alerts</Text>
      <FlatList
        data={DUMMY_ALERTS}
        renderItem={renderAlert}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
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
    marginBottom: 20,
    color: '#1a1a1a',
  },
  listContainer: {
    gap: 16,
  },
  alertCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  alertInfo: {
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
  },
});
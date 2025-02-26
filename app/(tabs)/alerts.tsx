import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, Platform, Dimensions, StatusBar } from 'react-native';
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
  const windowWidth = Dimensions.get('window').width;
  
  // Responsive padding based on screen width
  const horizontalPadding = windowWidth > 600 ? 32 : 20;
  
  const renderAlert = ({ item }: { item: { id: string; type: string; title: string; location: string; time: string } }) => (
    <TouchableOpacity 
      style={[
        styles.alertCard,
        { width: windowWidth > 600 ? '48%' : '100%' }
      ]}
      activeOpacity={0.7}
    >
      <View style={styles.alertHeader}>
        <AlertTriangle
          size={24}
          color={item.type === 'danger' ? '#FF4785' : '#FFA500'}
        />
        <Text style={styles.alertTitle} numberOfLines={1} ellipsizeMode="tail">
          {item.title}
        </Text>
      </View>
      
      <View style={styles.alertInfo}>
        <View style={styles.infoRow}>
          <MapPin size={16} color="#666" />
          <Text style={styles.infoText} numberOfLines={1} ellipsizeMode="tail">
            {item.location}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Clock size={16} color="#666" />
          <Text style={styles.infoText}>{item.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fff"
      />
      <View style={[styles.container, { paddingHorizontal: horizontalPadding }]}>
        <Text style={styles.header}>Area Alerts</Text>
        <FlatList
          data={DUMMY_ALERTS}
          renderItem={renderAlert}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          numColumns={windowWidth > 600 ? 2 : 1}
          key={windowWidth > 600 ? 'two-columns' : 'one-column'}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={windowWidth > 600 ? styles.columnWrapper : null}
        />
      </View>
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
    paddingVertical: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1a1a1a',
    ...Platform.select({
      ios: {
        fontFamily: 'System',
      },
      android: {
        fontFamily: 'Roboto',
      },
    }),
  },
  listContainer: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  alertCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    gap: 12,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
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
    flex: 1,
    ...Platform.select({
      ios: {
        fontFamily: 'System',
      },
      android: {
        fontFamily: 'Roboto',
      },
    }),
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
    flex: 1,
    ...Platform.select({
      ios: {
        fontFamily: 'System',
      },
      android: {
        fontFamily: 'Roboto',
      },
    }),
  },
});
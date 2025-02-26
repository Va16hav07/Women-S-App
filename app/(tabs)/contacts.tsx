import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
  Dimensions,
  Platform,
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import { Plus, User, Phone, X } from 'lucide-react-native';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

// Calculate responsive sizes
const scale = Math.min(width, height) / 375; // Base scale on iPhone 8 dimensions
const normalize = (size: number) => Math.round(size * scale);

// Interface for Contact type
interface Contact {
  id: string;
  name: string;
  phone: string;
}

const DUMMY_CONTACTS: Contact[] = [
  {
    id: '1',
    name: 'Emergency Contact 1',
    phone: '+1234567890',
  },
  {
    id: '2',
    name: 'Emergency Contact 2',
    phone: '+0987654321',
  },
];

export default function ContactsScreen() {
  const [contacts, setContacts] = useState(DUMMY_CONTACTS);
  const [modalVisible, setModalVisible] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', phone: '' });

  const addContact = () => {
    if (newContact.name && newContact.phone) {
      setContacts([
        ...contacts,
        {
          id: Date.now().toString(),
          name: newContact.name,
          phone: newContact.phone,
        },
      ]);
      setNewContact({ name: '', phone: '' });
      setModalVisible(false);
    }
  };

  const renderContact = ({ item }: { item: Contact }) => (
    <View style={styles.contactCard}>
      <View style={styles.contactInfo}>
        <User size={normalize(24)} color="#666" />
        <View style={styles.contactTextContainer}>
          <Text style={styles.contactName} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.contactPhone} numberOfLines={1}>{item.phone}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar 
        backgroundColor="#fff" 
        barStyle="dark-content" 
      />
      <View style={styles.container}>
        <Text style={styles.header}>Emergency Contacts</Text>
        
        <FlatList
          data={contacts}
          renderItem={renderContact}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />

        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.8}
          onPress={() => setModalVisible(true)}>
          <Plus size={normalize(24)} color="#fff" />
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.modalContainer}
          >
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Add Emergency Contact</Text>
                <TouchableOpacity 
                  onPress={() => setModalVisible(false)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <X size={normalize(24)} color="#666" />
                </TouchableOpacity>
              </View>

              <View style={styles.inputContainer}>
                <User size={normalize(20)} color="#666" />
                <TextInput
                  style={styles.input}
                  placeholder="Contact Name"
                  value={newContact.name}
                  onChangeText={(text) => setNewContact({ ...newContact, name: text })}
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.inputContainer}>
                <Phone size={normalize(20)} color="#666" />
                <TextInput
                  style={styles.input}
                  placeholder="Phone Number"
                  value={newContact.phone}
                  onChangeText={(text) => setNewContact({ ...newContact, phone: text })}
                  keyboardType="phone-pad"
                  placeholderTextColor="#999"
                />
              </View>

              <TouchableOpacity 
                style={styles.saveButton} 
                onPress={addContact}
                activeOpacity={0.8}
              >
                <Text style={styles.saveButtonText}>Save Contact</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </Modal>
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
    padding: normalize(20),
  },
  header: {
    fontSize: normalize(24),
    fontWeight: 'bold',
    marginBottom: normalize(20),
    color: '#1a1a1a',
  },
  listContainer: {
    paddingBottom: normalize(80),
    gap: normalize(16),
  },
  contactCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: normalize(12),
    padding: normalize(16),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(16),
  },
  contactTextContainer: {
    flex: 1,
  },
  contactName: {
    fontSize: normalize(16),
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  contactPhone: {
    fontSize: normalize(14),
    color: '#666',
    marginTop: normalize(4),
  },
  addButton: {
    position: 'absolute',
    bottom: normalize(20),
    right: normalize(20),
    backgroundColor: '#FF4785',
    width: normalize(56),
    height: normalize(56),
    borderRadius: normalize(28),
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#FF4785',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: normalize(12),
    padding: normalize(20),
    width: width * 0.9,
    maxWidth: 500,
    gap: normalize(16),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(16),
  },
  modalTitle: {
    fontSize: normalize(18),
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: normalize(8),
    padding: normalize(12),
    backgroundColor: '#f8f8f8',
  },
  input: {
    flex: 1,
    marginLeft: normalize(10),
    fontSize: normalize(16),
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#FF4785',
    padding: normalize(16),
    borderRadius: normalize(8),
    alignItems: 'center',
    marginTop: normalize(16),
  },
  saveButtonText: {
    color: '#fff',
    fontSize: normalize(16),
    fontWeight: 'bold',
  },
});
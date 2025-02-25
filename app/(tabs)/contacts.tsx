import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
} from 'react-native';
import { Plus, User, Phone, X } from 'lucide-react-native';

const DUMMY_CONTACTS = [
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

  const renderContact = ({ item }) => (
    <View style={styles.contactCard}>
      <View style={styles.contactInfo}>
        <User size={24} color="#666" />
        <View>
          <Text style={styles.contactName}>{item.name}</Text>
          <Text style={styles.contactPhone}>{item.phone}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Emergency Contacts</Text>
      
      <FlatList
        data={contacts}
        renderItem={renderContact}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}>
        <Plus size={24} color="#fff" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Emergency Contact</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <User size={20} color="#666" />
              <TextInput
                style={styles.input}
                placeholder="Contact Name"
                value={newContact.name}
                onChangeText={(text) => setNewContact({ ...newContact, name: text })}
              />
            </View>

            <View style={styles.inputContainer}>
              <Phone size={20} color="#666" />
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={newContact.phone}
                onChangeText={(text) => setNewContact({ ...newContact, phone: text })}
                keyboardType="phone-pad"
              />
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={addContact}>
              <Text style={styles.saveButtonText}>Save Contact</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  contactCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  contactPhone: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FF4785',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    gap: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f8f8f8',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#FF4785',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
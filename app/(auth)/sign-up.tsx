import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import { UserPlus, Mail, Lock, Phone, User, Calendar } from 'lucide-react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../lib/firebase';

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    password: '',
    confirmPassword: '',
  });

  const handleSignUp = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.dob ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await updateProfile(user, {
        displayName: formData.name,
      });

      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <UserPlus size={48} color="#FF4785" />
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <User size={20} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            editable={!loading}
          />
        </View>

        <View style={styles.inputContainer}>
          <Mail size={20} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
          />
        </View>

        <View style={styles.inputContainer}>
          <Phone size={20} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            keyboardType="phone-pad"
            editable={!loading}
          />
        </View>

        <View style={styles.inputContainer}>
          <Calendar size={20} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="Date of Birth (DD/MM/YYYY)"
            value={formData.dob}
            onChangeText={(text) => setFormData({ ...formData, dob: text })}
            editable={!loading}
          />
        </View>

        <View style={styles.inputContainer}>
          <Lock size={20} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
            secureTextEntry
            editable={!loading}
          />
        </View>

        <View style={styles.inputContainer}>
          <Lock size={20} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
            secureTextEntry
            editable={!loading}
          />
        </View>

        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={handleSignUp}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Creating Account...' : 'Sign Up'}</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <Link href="/sign-in" style={styles.link}>
            Sign In
          </Link>
        </View>
      </View>
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
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  form: {
    gap: 16,
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
  button: {
    backgroundColor: '#FF4785',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  footerText: {
    color: '#666',
  },
  link: {
    color: '#FF4785',
    fontWeight: 'bold',
  },
});
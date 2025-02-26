import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, 
  StyleSheet, Alert, useWindowDimensions, Platform 
} from 'react-native';
import { Link, router } from 'expo-router';
import { LogIn, Mail, Lock } from 'lucide-react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';

export default function SignIn() {
  const { width, height } = useWindowDimensions();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const isSmallDevice = width < 375;
  const isTablet = width >= 768;
  const contentWidth = isTablet ? Math.min(500, width * 0.8) : width * 0.9;

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Missing Fields', 'Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.replace('/(tabs)'); // Navigate to home screen
    } catch (error: any) {
      Alert.alert('Sign In Failed', error.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.content, { width: contentWidth }]}>
        {/* Header Section */}
        <View style={[styles.header, { marginTop: height * 0.1 }]}>
          <LogIn size={isSmallDevice ? 36 : 48} color="#FF4785" />
          <Text style={[styles.title, isSmallDevice && styles.smallTitle]}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>

        {/* Form Section */}
        <View style={styles.form}>
          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Mail size={isSmallDevice ? 18 : 20} color="#666" />
            <TextInput
              style={[styles.input, isSmallDevice && styles.smallInput]}
              placeholder="Enter your email address"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!loading}
              returnKeyType="next"
              accessibilityLabel="Email Address"
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Lock size={isSmallDevice ? 18 : 20} color="#666" />
            <TextInput
              style={[styles.input, isSmallDevice && styles.smallInput]}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!loading}
              returnKeyType="done"
              accessibilityLabel="Password"
            />
          </View>

          {/* Sign In Button */}
          <TouchableOpacity 
            style={[styles.button, loading && styles.buttonDisabled]} 
            onPress={handleSignIn}
            disabled={loading}
          >
            <Text style={styles.buttonText}>{loading ? 'Signing In...' : 'Sign In'}</Text>
          </TouchableOpacity>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <Link href="/sign-up" style={styles.link}>
              Sign Up
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}

/* --- Styles --- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: Platform.select({ ios: 40, android: 30, default: 50 }),
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#1a1a1a',
  },
  smallTitle: {
    fontSize: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  form: {
    gap: Platform.select({ ios: 12, android: 12, default: 16 }),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: Platform.select({ ios: 10, android: 10, default: 12 }),
    backgroundColor: '#f8f8f8',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    height: Platform.select({ ios: 22, android: 22, default: 24 }),
  },
  smallInput: {
    fontSize: 14,
  },
  button: {
    backgroundColor: '#FF4785',
    padding: Platform.select({ ios: 14, android: 14, default: 16 }),
    borderRadius: 8,
    alignItems: 'center',
    marginTop: Platform.select({ ios: 12, android: 12, default: 16 }),
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
  },
  footerText: {
    color: '#666',
  },
  link: {
    color: '#FF4785',
    fontWeight: 'bold',
  },
});


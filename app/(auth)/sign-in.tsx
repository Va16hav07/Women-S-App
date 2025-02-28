import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, 
  StyleSheet, Alert, useWindowDimensions, Platform,
  KeyboardAvoidingView, ScrollView
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
  const [errors, setErrors] = useState({ email: '', password: '' });

  const isSmallDevice = width < 375;
  const isTablet = width >= 768;
  const contentWidth = isTablet ? Math.min(500, width * 0.8) : width * 0.9;

  const validateInputs = () => {
    let isValid = true;
    const newErrors = { email: '', password: '' };

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignIn = async () => {
    if (!validateInputs()) {
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.replace('/(tabs)'); // Navigate to home screen
    } catch (error: any) {
      let errorMessage = 'Something went wrong';
      
      // Handle specific Firebase auth errors
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'Invalid email or password';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email format';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed login attempts. Please try again later.';
      }
      
      Alert.alert('Sign In Failed', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
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
              <View style={styles.inputWrapper}>
                <View style={[styles.inputContainer, errors.email ? styles.inputError : null]}>
                  <Mail size={isSmallDevice ? 18 : 20} color={errors.email ? "#FF4785" : "#666"} />
                  <TextInput
                    style={[styles.input, isSmallDevice && styles.smallInput]}
                    placeholder="Enter your email address"
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                      if (errors.email) setErrors({...errors, email: ''});
                    }}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    editable={!loading}
                    returnKeyType="next"
                    accessibilityLabel="Email Address"
                  />
                </View>
                {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
              </View>

              {/* Password Input */}
              <View style={styles.inputWrapper}>
                <View style={[styles.inputContainer, errors.password ? styles.inputError : null]}>
                  <Lock size={isSmallDevice ? 18 : 20} color={errors.password ? "#FF4785" : "#666"} />
                  <TextInput
                    style={[styles.input, isSmallDevice && styles.smallInput]}
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={(text) => {
                      setPassword(text);
                      if (errors.password) setErrors({...errors, password: ''});
                    }}
                    secureTextEntry
                    editable={!loading}
                    returnKeyType="done"
                    accessibilityLabel="Password"
                  />
                </View>
                {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

/* --- Styles --- */
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
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
  inputWrapper: {
    marginBottom: 8,
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
  inputError: {
    borderColor: '#FF4785',
    borderWidth: 1.5,
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
  errorText: {
    color: '#FF4785',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
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
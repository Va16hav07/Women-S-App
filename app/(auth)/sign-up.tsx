import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, 
  StyleSheet, ScrollView, Alert, Platform, KeyboardAvoidingView, useWindowDimensions
} from 'react-native';
import { Link, router } from 'expo-router';
import { UserPlus, Mail, Lock, Phone, User, Calendar } from 'lucide-react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../lib/firebase';

export default function SignUp() {
  const { width, height } = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    password: '',
    confirmPassword: '',
  });

  const isSmallDevice = width < 375;
  const isTablet = width >= 768;
  const contentWidth = isTablet ? Math.min(500, width * 0.8) : width * 0.9;

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^\d{10}$/.test(phone);
  };

  const validateDOB = (dob: string) => {
    return /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(dob);
  };

  const validateForm = () => {
    const { name, email, phone, dob, password, confirmPassword } = formData;
    const newErrors = {
      name: '',
      email: '',
      phone: '',
      dob: '',
      password: '',
      confirmPassword: '',
    };
    let isValid = true;

    // Validate name
    if (!name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    // Validate email
    if (!email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    // Validate phone
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!validatePhone(phone)) {
      newErrors.phone = 'Phone must be 10 digits';
      isValid = false;
    }

    // Validate DOB
    if (!dob.trim()) {
      newErrors.dob = 'Date of birth is required';
      isValid = false;
    } else if (!validateDOB(dob)) {
      newErrors.dob = 'Use format DD/MM/YYYY';
      isValid = false;
    }

    // Validate password
    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    // Validate confirm password
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignUp = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await updateProfile(user, { displayName: formData.name });

      // In a real app, you would store additional user data (phone, DOB) in a database
      
      router.replace('/(tabs)'); // Navigate to the main screen
    } catch (error: any) {
      let errorMessage = 'Something went wrong';
      
      // Handle specific Firebase auth errors
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email format';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak';
      }
      
      Alert.alert('Sign Up Failed', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 40 }]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ width: contentWidth, alignSelf: 'center' }}>
          {/* Header Section */}
          <View style={styles.header}>
            <UserPlus size={isSmallDevice ? 36 : 48} color="#FF4785" />
            <Text style={[styles.title, isSmallDevice && styles.smallTitle]}>Create Account</Text>
            <Text style={styles.subtitle}>Sign up to get started</Text>
          </View>

          {/* Form Section */}
          <View style={styles.form}>
            {/* Full Name */}
            <View style={styles.inputWrapper}>
              <View style={[styles.inputContainer, errors.name ? styles.inputError : null]}>
                <User size={isSmallDevice ? 18 : 20} color={errors.name ? "#FF4785" : "#666"} />
                <TextInput
                  style={[styles.input, isSmallDevice && styles.smallInput]}
                  placeholder="Full Name"
                  value={formData.name}
                  onChangeText={(text) => handleInputChange('name', text)}
                  editable={!loading}
                  returnKeyType="next"
                />
              </View>
              {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
            </View>

            {/* Email */}
            <View style={styles.inputWrapper}>
              <View style={[styles.inputContainer, errors.email ? styles.inputError : null]}>
                <Mail size={isSmallDevice ? 18 : 20} color={errors.email ? "#FF4785" : "#666"} />
                <TextInput
                  style={[styles.input, isSmallDevice && styles.smallInput]}
                  placeholder="Email"
                  value={formData.email}
                  onChangeText={(text) => handleInputChange('email', text)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!loading}
                  returnKeyType="next"
                />
              </View>
              {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
            </View>

            {/* Phone Number */}
            <View style={styles.inputWrapper}>
              <View style={[styles.inputContainer, errors.phone ? styles.inputError : null]}>
                <Phone size={isSmallDevice ? 18 : 20} color={errors.phone ? "#FF4785" : "#666"} />
                <TextInput
                  style={[styles.input, isSmallDevice && styles.smallInput]}
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChangeText={(text) => handleInputChange('phone', text)}
                  keyboardType="phone-pad"
                  maxLength={10}
                  editable={!loading}
                  returnKeyType="next"
                />
              </View>
              {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}
            </View>

            {/* Date of Birth */}
            <View style={styles.inputWrapper}>
              <View style={[styles.inputContainer, errors.dob ? styles.inputError : null]}>
                <Calendar size={isSmallDevice ? 18 : 20} color={errors.dob ? "#FF4785" : "#666"} />
                <TextInput
                  style={[styles.input, isSmallDevice && styles.smallInput]}
                  placeholder="Date of Birth (DD/MM/YYYY)"
                  value={formData.dob}
                  onChangeText={(text) => handleInputChange('dob', text)}
                  editable={!loading}
                  returnKeyType="next"
                />
              </View>
              {errors.dob ? <Text style={styles.errorText}>{errors.dob}</Text> : null}
            </View>

            {/* Password */}
            <View style={styles.inputWrapper}>
              <View style={[styles.inputContainer, errors.password ? styles.inputError : null]}>
                <Lock size={isSmallDevice ? 18 : 20} color={errors.password ? "#FF4785" : "#666"} />
                <TextInput
                  style={[styles.input, isSmallDevice && styles.smallInput]}
                  placeholder="Password"
                  value={formData.password}
                  onChangeText={(text) => handleInputChange('password', text)}
                  secureTextEntry
                  editable={!loading}
                  returnKeyType="next"
                />
              </View>
              {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
            </View>

            {/* Confirm Password */}
            <View style={styles.inputWrapper}>
              <View style={[styles.inputContainer, errors.confirmPassword ? styles.inputError : null]}>
                <Lock size={isSmallDevice ? 18 : 20} color={errors.confirmPassword ? "#FF4785" : "#666"} />
                <TextInput
                  style={[styles.input, isSmallDevice && styles.smallInput]}
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChangeText={(text) => handleInputChange('confirmPassword', text)}
                  secureTextEntry
                  editable={!loading}
                  returnKeyType="done"
                />
              </View>
              {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity 
              style={[styles.button, loading && styles.buttonDisabled]} 
              onPress={handleSignUp}
              disabled={loading}
            >
              <Text style={styles.buttonText}>{loading ? 'Creating Account...' : 'Sign Up'}</Text>
            </TouchableOpacity>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <Link href="/sign-in" style={styles.link}>
                Sign In
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

/* --- Styles --- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 60 : 40,
    marginBottom: 30,
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
    gap: Platform.select({ ios: 8, android: 8, default: 12 }),
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
    padding: 12,
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
  },
  footerText: {
    color: '#666',
  },
  link: {
    color: '#FF4785',
    fontWeight: 'bold',
  },
});
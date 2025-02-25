import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import useStore from './store';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const login = useStore((state) => state.login);

  // Animation value for button press
  const buttonScale = new Animated.Value(1);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Email dan password harus diisi');
      return;
    }

    try {
      setError('');
      setIsLoading(true);
      await login(email, password);
      router.replace('/(tabs)');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Login gagal. Periksa email dan password Anda.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <LinearGradient
      colors={['#93E9BE', '#7FDBAC']}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <View style={styles.logoContainer}>
          <View style={styles.logoPlaceholder}>
            <Image 
              source={require('../assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>

        <Text style={styles.welcomeText}>Selamat Datang di</Text>
        <Text style={styles.brandText}>Mie Ayam Harum Sari</Text>
        <Text style={styles.subtitle}>Silakan masuk untuk melanjutkan</Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#2F7955" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="rgba(47, 121, 85, 0.7)"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#2F7955" style={styles.inputIcon} />
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Password"
            placeholderTextColor="rgba(47, 121, 85, 0.7)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={20}
              color="#2F7955"
            />
          </TouchableOpacity>
        </View>

        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              animateButton();
              handleLogin();
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>MASUK</Text>
            )}
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity
          onPress={() => router.push('/register')}
          style={styles.linkButton}
        >
          <Text style={styles.linkText}>
            Belum punya akun? <Text style={styles.linkTextBold}>Daftar</Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 0,
  },
  welcomeText: {
    fontSize: 24,
    color: '#2F7955',
    textAlign: 'center',
    marginBottom: 0,
  },
  brandText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2F7955',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 16,
    color: '#3D8B64',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 15,
    marginBottom: 15,
    paddingHorizontal: 15,
    shadowColor: '#2F7955',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  input: {
    flex: 1,
    color: '#2F7955',
    padding: 15,
    fontSize: 16,
  },
  passwordInput: {
    paddingRight: 50,
  },
  inputIcon: {
    marginRight: 10,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
  },
  button: {
    backgroundColor: '#2F7955',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  error: {
    color: '#e74c3c',
    marginBottom: 15,
    textAlign: 'center',
    backgroundColor: 'rgba(231, 76, 60, 0.1)',
    padding: 10,
    borderRadius: 8,
  },
  linkButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#2F7955',
    fontSize: 14,
  },
  linkTextBold: {
    color: '#2F7955',
    fontWeight: 'bold',
  },
});
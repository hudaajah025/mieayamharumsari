import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ActivityIndicator, ScrollView, Image } from 'react-native';
import { router } from 'expo-router';
import useStore from './store';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const register = useStore((state) => state.register);

  const handleRegister = async () => {
    if (!fullName || !email || !password) {
      setError('Nama lengkap, email, dan password harus diisi');
      return;
    }

    if (password.length < 6) {
      setError('Password harus minimal 6 karakter');
      return;
    }

    try {
      setError('');
      setIsLoading(true);
      await register({
        email,
        password,
        full_name: fullName,
        phone,
        address,
      });
      router.replace('/(tabs)');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Terjadi kesalahan saat registrasi. Silakan coba lagi.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#93E9BE', '#7FDBAC']}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.formContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.welcomeText}>Selamat Datang di</Text>
            <Text style={styles.welcomeText}>Mie Ayam Harum Sari</Text>
          </View>

          <Text style={styles.subtitle}>Silakan lengkapi data diri Anda</Text>
          
          {error ? <Text style={styles.error}>{error}</Text> : null}

          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="#2F7955" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Nama Lengkap"
              value={fullName}
              onChangeText={setFullName}
              placeholderTextColor="rgba(47, 121, 85, 0.7)"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#2F7955" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="rgba(47, 121, 85, 0.7)"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#2F7955" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="rgba(47, 121, 85, 0.7)"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="call-outline" size={20} color="#2F7955" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Nomor Telepon"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholderTextColor="rgba(47, 121, 85, 0.7)"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="location-outline" size={20} color="#2F7955" style={styles.inputIcon} />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Alamat"
              value={address}
              onChangeText={setAddress}
              multiline
              numberOfLines={3}
              placeholderTextColor="rgba(47, 121, 85, 0.7)"
            />
          </View>

          <TouchableOpacity 
            style={styles.button}
            onPress={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>DAFTAR</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => router.push('/login')}
            style={styles.linkButton}
          >
            <Text style={styles.linkText}>
              Sudah punya akun? <Text style={styles.linkTextBold}>Masuk</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    padding: 20,
    paddingTop: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius:25,
    marginBottom: 5,
  },
  welcomeText: {
    fontSize: 24,
    color: '#2F7955',
    textAlign: 'center',
    marginBottom: 5,
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
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#2F7955',
    padding: 15,
    fontSize: 16,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
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
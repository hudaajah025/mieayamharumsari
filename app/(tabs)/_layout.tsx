import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, Image } from 'react-native';
import useStore from '../store';


function LogoTitle() {
  return (
    <View style={styles.logoContainer}>
      <Image 
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.logoText}>Mie Ayam</Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e2e8f0',
          height: 60,
          paddingBottom: 4,
          paddingTop: 4,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: -4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
        tabBarActiveTintColor: '#22c55e',
        tabBarInactiveTintColor: '#64748b',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Beranda',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Keranjang',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="cart-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Pesanan',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="receipt-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#22c55e',
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 8
  },
});
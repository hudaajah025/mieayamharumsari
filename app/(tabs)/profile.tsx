import { View, Text, StyleSheet, Pressable, ScrollView, Alert, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useStore from '../store';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';

const MENU_ITEMS = [
  {
    id: 'edit-profile',
    icon: 'person-outline',
    title: 'Edit Profil',
    route: '/edit-profile',
  },
  {
    id: 'change-password',
    icon: 'lock-closed-outline',
    title: 'Ubah Kata Sandi',
    route: '/change-password', 
  },
  {
    id: 'notifications',
    icon: 'notifications-outline',
    title: 'Notifikasi',
  },
  {
    id: 'help',
    icon: 'help-circle-outline',
    title: 'Bantuan',
  },
  {
    id: 'about',
    icon: 'information-circle-outline',
    title: 'Tentang Aplikasi',
    route: '/about',
  },
];

export default function ProfileScreen() {
  const { user, logout } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !user) {
      router.replace('/login');
    }
  }, [mounted, user]);

  if (!mounted || !user) {
    return null;
  }

  const handleLogout = () => {
    // Langsung arahkan ke halaman login
    router.replace('/login');
  };

  const handleMenuPress = (item: typeof MENU_ITEMS[0]) => {
    if (item.id === 'help') {
      // Buka WhatsApp
      Linking.openURL('https://api.whatsapp.com/send/?phone=628971571349');
      return;
    }

    if (item.route) {
      router.push(item.route);
    } else if (item.id === 'notifications') {
      router.push('/notification');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Ionicons name="restaurant" size={24} color="#22c55e" />
          <Text style={styles.title}>Profil</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileCard}>
          <Text style={styles.name}>{user.full_name}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <Text style={styles.phone}>{user.phone || 'Belum ada nomor telepon'}</Text>
        </View>

        <View style={styles.menuSection}>
          {MENU_ITEMS.map((item) => (
            <Pressable
              key={item.id}
              style={styles.menuItem}
              onPress={() => handleMenuPress(item)}>
              <View style={styles.menuItemLeft}>
                <Ionicons name={item.icon} size={24} color="#64748b" />
                <Text style={styles.menuItemTitle}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#64748b" />
            </Pressable>
          ))}
        </View>

        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#ef4444" />
          <Text style={styles.logoutText}>Keluar</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 2,
  },
  phone: {
    fontSize: 14,
    color: '#64748b',
  },
  menuSection: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuItemTitle: {
    fontSize: 16,
    color: '#1e293b',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 32,
  },
  logoutText: {
    fontSize: 16,
    color: '#ef4444',
  },
});
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1e293b" />
        </Pressable>
        <Text style={styles.title}>Tentang Aplikasi</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>Mie Ayam Harum Sari</Text>
          <Text style={styles.version}>Pembuat Aplikasi : Huda Saputra</Text>
          <Text style={styles.version}>Versi 1.0.0</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Deskripsi</Text>
          <Text style={styles.sectionText}>
          Mie Ayam Harum Sari adalah tempat kuliner di Bandung, khususnya bagi pencinta mie ayam. Restoran ini menawarkan berbagai variasi hidangan mie dengan cita rasa khas yang memanjakan lidah.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kontak</Text>
          <View style={styles.contactItem}>
            <Ionicons name="call-outline" size={20} color="#64748b" />
            <Text style={styles.contactText}>+62 897-1571-349</Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons name="mail-outline" size={20} color="#64748b" />
            <Text style={styles.contactText}>hudasaputra046@gmail.com</Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons name="location-outline" size={20} color="#64748b" />
            <Text style={styles.contactText}>
            3M7X+H8G, Mekar Mulya, Kec. Panyileukan, Kota Bandung, Jawa Barat
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Jam Operasional</Text>
          <Text style={styles.sectionText}>
           Selasa - Sabtu{'\n'}
            09:00 - 18:00 WIB {'\n'}
            Minggu{'\n'}
            06:00 - 15:00 WIB
          </Text>
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  backButton: {
    marginRight: 16,
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
  logoContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#22c55e',
    marginBottom: 4,
  },
  version: {
    fontSize: 14,
    color: '#64748b',
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  contactText: {
    fontSize: 14,
    color: '#64748b',
    flex: 1,
  },
});

import { View, Text, StyleSheet, Image, Pressable, Alert } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import useStore from '../store';

const MENU_ITEMS = [
  {
    id: '1',
    name: 'Mie Ayam Original',
    price: 25000,
    description: 'Mie ayam dengan topping ayam cincang dan sayuran segar',
    image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=800',
  },
  {
    id: '2',
    name: 'Mie Ayam Spesial',
    price: 30000,
    description: 'Mie ayam dengan tambahan jamur, bakso, dan pangsit goreng',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800',
  },
  {
    id: '3',
    name: 'Mie Ayam Pedas',
    price: 28000,
    description: 'Mie ayam dengan tambahan sambal dan cabe rawit',
    image: 'https://images.unsplash.com/photo-1632467674545-57e8c77e4891?auto=format&fit=crop&w=800',
  },
];

interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export default function HomeScreen() {
  const user = useStore((state) => state.user);
  const { addToCart } = useStore();

  const handleAddToCart = (item: MenuItem) => {
    if (!user) {
      router.push('/login');
      return;
    }
    
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      description: item.description
    });

    Alert.alert('Sukses', 'Item berhasil ditambahkan ke keranjang');
  };

  const renderMenuItem = ({ item }) => (
    <Pressable style={styles.menuItem}>
      <Image source={{ uri: item.image }} style={styles.menuImage} />
      <View style={styles.menuContent}>
        <Text style={styles.menuName}>{item.name}</Text>
        <Text style={styles.menuDescription}>{item.description}</Text>
        <View style={styles.menuFooter}>
          <Text style={styles.menuPrice}>Rp {item.price.toLocaleString()}</Text>
          <Pressable 
            style={styles.addButton}
            onPress={() => handleAddToCart(item)}>
            <Ionicons name="add" size={24} color="#ffffff" />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Selamat Datang</Text>
          <Text style={styles.title}>Mie Ayam Harum Sari</Text>
        </View>
        <Link href="/notification" asChild>
          <Pressable style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color="#22c55e" />
          </Pressable>
        </Link>
      </View>

      {!user && (
        <Pressable 
          style={styles.loginNotification}
          onPress={() => router.push('/login')}>
          <Ionicons name="log-in-outline" size={20} color="#22c55e" />
          <Text style={styles.loginText}>
            Masuk untuk menyimpan keranjang dan melihat riwayat pesanan
          </Text>
          <Ionicons name="chevron-forward" size={20} color="#22c55e" />
        </Pressable>
      )}

      <View style={styles.bannerContainer}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?auto=format&fit=crop&w=800' }}
          style={styles.bannerImage}
        />
        <View style={styles.bannerContent}>
          <Text style={styles.bannerTitle}>Promo Spesial</Text>
          <Text style={styles.bannerText}>Diskon 20% untuk pembelian pertama</Text>
        </View>
      </View>

      <FlashList
        data={MENU_ITEMS}
        renderItem={renderMenuItem}
        estimatedItemSize={200}
        contentContainerStyle={styles.menuList}
      />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
  },
  greeting: {
    fontSize: 14,
    color: '#64748b',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#22c55e',
  },
  notificationButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f0fdf4',
  },
  loginNotification: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    margin: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dcfce7',
  },
  loginText: {
    flex: 1,
    color: '#22c55e',
    marginHorizontal: 8,
    fontSize: 14,
  },
  bannerContainer: {
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bannerImage: {
    width: '100%',
    height: 120,
  },
  bannerContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  bannerText: {
    fontSize: 14,
    color: '#ffffff',
  },
  menuList: {
    padding: 16,
  },
  menuItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuImage: {
    width: '100%',
    height: 160,
  },
  menuContent: {
    padding: 16,
  },
  menuName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 12,
  },
  menuFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#22c55e',
  },
  addButton: {
    backgroundColor: '#22c55e',
    padding: 8,
    borderRadius: 8,
  },
});
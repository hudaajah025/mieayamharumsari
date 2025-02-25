import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import useStore from '../store';

export default function CartScreen() {
  const { cart = [], removeFromCart, updateQuantity } = useStore();
  const total = cart?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;

  const handleCheckout = () => {
    router.push('/payment');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Ionicons name="restaurant" size={24} color="#22c55e" />
          <Text style={styles.title}>Keranjang</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {cart && cart.length > 0 ? (
          cart.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>Rp {item.price.toLocaleString()}</Text>
                <View style={styles.quantityControl}>
                  <Pressable 
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, item.quantity - 1)}>
                    <Ionicons name="remove" size={20} color="#64748b" />
                  </Pressable>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <Pressable 
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, item.quantity + 1)}>
                    <Ionicons name="add" size={20} color="#64748b" />
                  </Pressable>
                </View>
              </View>
              <Pressable 
                style={styles.deleteButton}
                onPress={() => removeFromCart(item.id)}>
                <Ionicons name="trash-outline" size={20} color="#ef4444" />
              </Pressable>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>Keranjang kosong</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalAmount}>Rp {total.toLocaleString()}</Text>
        </View>
        <Pressable 
          style={[styles.checkoutButton, (!cart || cart.length === 0) && styles.checkoutButtonDisabled]}
          onPress={handleCheckout}
          disabled={!cart || cart.length === 0}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 16,
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#22c55e',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: '#22c55e',
    fontWeight: '500',
    marginBottom: 8,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
  },
  deleteButton: {
    padding: 8,
  },
  footer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    color: '#64748b',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#22c55e',
  },
  checkoutButton: {
    backgroundColor: '#22c55e',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkoutButtonDisabled: {
    backgroundColor: '#e2e8f0',
  },
  checkoutText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#64748b',
  },
});
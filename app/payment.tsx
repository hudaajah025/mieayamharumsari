import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import useStore from './store';

const PAYMENT_METHODS = [
  {
    id: 'cod',
    name: 'Bayar di Tempat (COD)',
    icon: 'cash-outline',
  },
  {
    id: 'transfer',
    name: 'Transfer Bank',
    icon: 'card-outline',
    accountInfo: {
      bank: 'BCA',
      number: '1234567890',
      name: 'Harum Sari Group',
    },
  },
];

export default function PaymentScreen() {
  const [selectedMethod, setSelectedMethod] = useState('cod');
  const [senderAccount, setSenderAccount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const { cart, createOrder, clearCart, user } = useStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !user) {
      router.replace('/login');
    }
  }, [isMounted, user]);

  // Hitung total dari item keranjang
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isMounted || !user) {
    return null;
  }

  const handleConfirmPayment = async () => {
    if (!user?.address) {
      setError('Alamat pengiriman belum diatur. Silakan lengkapi profil Anda terlebih dahulu.');
      return;
    }

    if (selectedMethod === 'transfer' && !senderAccount) {
      setError('Mohon masukkan nomor rekening pengirim');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      await createOrder({
        user_id: user.id!,
        items: cart,
        total_price: total,
        status: 'processing',
        payment_method: selectedMethod,
        sender_account: selectedMethod === 'transfer' ? senderAccount : '-',
        address: user.address,
      });

      await clearCart();
      router.replace('/(tabs)/orders');
    } catch (err) {
      setError('Terjadi kesalahan saat memproses pembayaran. Silakan coba lagi.');
      console.error('Error processing payment:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1e293b" />
        </Pressable>
        <Text style={styles.title}>Pembayaran</Text>
      </View>

      <ScrollView style={styles.content}>
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Metode Pembayaran</Text>
          {PAYMENT_METHODS.map((method) => (
            <Pressable
              key={method.id}
              style={styles.methodItem}
              onPress={() => setSelectedMethod(method.id)}>
              <View style={styles.methodInfo}>
                <Ionicons name={method.icon} size={24} color="#22c55e" />
                <Text style={styles.methodName}>{method.name}</Text>
              </View>
              <View style={styles.radioButton}>
                {selectedMethod === method.id && (
                  <View style={styles.radioButtonSelected} />
                )}
              </View>
            </Pressable>
          ))}
        </View>

        {selectedMethod === 'transfer' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informasi Rekening Tujuan</Text>
            <View style={styles.accountInfo}>
              <Text style={styles.accountText}>Bank: {PAYMENT_METHODS[1].accountInfo.bank}</Text>
              <Text style={styles.accountText}>No. Rekening: {PAYMENT_METHODS[1].accountInfo.number}</Text>
              <Text style={styles.accountText}>Atas Nama: {PAYMENT_METHODS[1].accountInfo.name}</Text>
            </View>
            
            <Text style={styles.sectionTitle}>Nomor Rekening Pengirim</Text>
            <TextInput
              style={styles.input}
              value={senderAccount}
              onChangeText={setSenderAccount}
              placeholder="Masukkan nomor rekening pengirim"
              keyboardType="numeric"
            />
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Pressable 
          style={[styles.confirmButton, isLoading && styles.confirmButtonDisabled]}
          onPress={handleConfirmPayment}
          disabled={isLoading}>
          <Text style={styles.confirmText}>
            {isLoading ? 'Memproses...' : 'Konfirmasi Pembayaran'}
          </Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
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
  errorContainer: {
    backgroundColor: '#fef2f2',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#ef4444',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  methodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  methodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  methodName: {
    fontSize: 16,
    color: '#1e293b',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#22c55e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#22c55e',
  },
  accountInfo: {
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  accountText: {
    fontSize: 14,
    color: '#1e293b',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  footer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  confirmButton: {
    backgroundColor: '#22c55e',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    backgroundColor: '#e2e8f0',
  },
  confirmText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
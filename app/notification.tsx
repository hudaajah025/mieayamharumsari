import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import useStore from './store';
import { useEffect, useState } from 'react';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  date: string;
  orderId: string;
}

export default function NotificationScreen() {
  const { orders } = useStore();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    // Mengubah data orders menjadi format notifikasi
    const notificationsList = orders.map(order => {
      let items;
      try {
        items = typeof order.items === 'string' 
          ? JSON.parse(order.items)
          : order.items;
      } catch (error) {
        console.error('Error parsing order items:', error);
        items = [];
      }

      const itemNames = Array.isArray(items)
        ? items.map((item: any) => item.name).join(', ')
        : '';

      // Format tanggal
      const date = new Intl.DateTimeFormat('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(new Date(order.created_at || Date.now()));

      // Buat notifikasi berdasarkan status
      const notifications = [];

      // Notifikasi pesanan dibuat
      notifications.push({
        id: `${order.id}-created`,
        title: 'Pesanan Diterima',
        message: `Pesanan: ${itemNames}`,
        date: date,
        orderId: order.id
      });

      // Notifikasi status pesanan
      if (order.status === 'processing') {
        notifications.push({
          id: `${order.id}-processing`,
          title: 'Pesanan Sedang Diproses',
          message: `Pesanan: ${itemNames}`,
          date: date,
          orderId: order.id
        });
      } else if (order.status === 'delivered') {
        notifications.push({
          id: `${order.id}-delivered`,
          title: 'Pesanan Selesai',
          message: `Pesanan: ${itemNames}`,
          date: date,
          orderId: order.id
        });
      }

      return notifications;
    }).flat();

    // Urutkan notifikasi berdasarkan tanggal terbaru
    setNotifications(notificationsList.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ));
  }, [orders]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1e293b" />
        </Pressable>
        <Text style={styles.title}>Notifikasi</Text>
      </View>

      <ScrollView style={styles.content}>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <Pressable
              key={notification.id}
              style={styles.notificationItem}
              onPress={() => router.push(`/orders/${notification.orderId}`)}>
              <View style={styles.notificationIcon}>
                <Ionicons
                  name={notification.title.includes('Diproses') ? 'time-outline' : 'checkmark-circle-outline'}
                  size={24}
                  color={notification.title.includes('Diproses') ? '#eab308' : '#22c55e'}
                />
              </View>
              <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>{notification.title}</Text>
                <Text style={styles.notificationMessage}>{notification.message}</Text>
                <Text style={styles.notificationDate}>{notification.date}</Text>
              </View>
            </Pressable>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>Belum ada notifikasi</Text>
          </View>
        )}
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
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  notificationIcon: {
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  notificationDate: {
    fontSize: 12,
    color: '#94a3b8',
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

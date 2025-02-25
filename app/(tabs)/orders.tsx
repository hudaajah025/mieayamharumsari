import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useStore from '../store';

function OrderStatus({ status }: { status: string }) {
  const getStatusColor = () => {
    switch (status) {
      case 'processing':
        return '#eab308';
      case 'delivered':
        return '#22c55e';
      default:
        return '#64748b';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'processing':
        return 'Sedang Diproses';
      case 'delivered':
        return 'Selesai';
      default:
        return status;
    }
  };

  return (
    <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor()}20` }]}>
      <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
      <Text style={[styles.statusText, { color: getStatusColor() }]}>
        {getStatusText()}
      </Text>
    </View>
  );
}

export default function OrdersScreen() {
  const orders = useStore((state) => state.orders) || [];

  const handleViewDetails = (orderId: string) => {
    // Implement order details view
    console.log('View order details:', orderId);
  };

  const handleReorder = (orderId: string) => {
    // Implement reorder functionality
    console.log('Reorder:', orderId);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Ionicons name="restaurant" size={24} color="#22c55e" />
          <Text style={styles.title}>Pesanan</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <View key={order.id} style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <OrderStatus status={order.status} />
                <Text style={styles.orderDate}>
                  {new Date(order.created_at).toLocaleDateString('id-ID')}
                </Text>
              </View>

              <View style={styles.orderItems}>
                {order.items && order.items.map((item: any) => (
                  <Text key={item.id} style={styles.orderItem}>
                    {item.quantity}x {item.name}
                  </Text>
                ))}
              </View>

              <View style={styles.orderFooter}>
                <Text style={styles.orderTotal}>
                  Total: Rp {order.total_price?.toLocaleString()}
                </Text>
                <View style={styles.orderActions}>
                  <Pressable 
                    onPress={() => handleViewDetails(order.id)}
                    style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>Lihat Detail</Text>
                  </Pressable>
                  <Pressable 
                    onPress={() => handleReorder(order.id)}
                    style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>Pesan Lagi</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>Belum ada pesanan</Text>
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
  orderCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderDate: {
    fontSize: 14,
    color: '#64748b',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  orderItems: {
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingVertical: 12,
  },
  orderItem: {
    fontSize: 14,
    color: '#1e293b',
    marginBottom: 4,
  },
  orderFooter: {
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 12,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: '600',
    color: '#22c55e',
    marginBottom: 8,
  },
  orderActions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    padding: 8,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '500',
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
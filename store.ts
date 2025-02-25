import { create } from 'zustand';
import database, { UserData, OrderData } from './app/database';

// Tambahkan interface untuk item keranjang
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description?: string;
}

interface StoreState {
  user: UserData | null;
  orders: OrderData[];
  isLoading: boolean;
  error: string | null;
  cart: CartItem[];
  
  // Auth actions
  login: (email: string, password: string) => Promise<void>;
  register: (userData: UserData) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: UserData | null) => void;
  
  // Order actions
  createOrder: (orderData: Omit<OrderData, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  fetchOrders: () => Promise<void>;
  
  // State actions
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  
  // Cart actions
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

const useStore = create<StoreState>((set, get) => ({
  // Initial state
  user: null,
  orders: [],
  isLoading: false,
  error: null,
  cart: [],

  // Auth actions
  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const user = await database.login(email, password);
      if (!user) throw new Error('Login gagal');
      
      set({ user });
      
      // Fetch user's orders after successful login
      const orders = await database.getOrdersByUserId(user.id!);
      set({ orders: orders || [] });
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan saat login';
      set({ error: errorMessage });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (userData: UserData) => {
    try {
      set({ isLoading: true, error: null });
      
      const user = await database.createUser(userData);
      if (!user) throw new Error('Registrasi gagal');
      
      set({ 
        user,
        orders: [],
      });
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan saat registrasi';
      set({ error: errorMessage });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true, error: null });
      
      await database.supabase.auth.signOut();
      
      set({ 
        user: null,
        orders: [],
      });
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan saat logout';
      set({ error: errorMessage });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  setUser: (user: UserData | null) => {
    set({ user });
  },

  // Order actions
  createOrder: async (orderData) => {
    try {
      set({ isLoading: true, error: null });
      
      const newOrder = await database.createOrder(orderData);
      
      set((state) => ({
        orders: [newOrder, ...state.orders],
      }));
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan saat membuat pesanan';
      set({ error: errorMessage });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  fetchOrders: async () => {
    const { user } = get();
    if (!user?.id) return;

    try {
      set({ isLoading: true, error: null });
      
      const orders = await database.getOrdersByUserId(user.id);
      set({ orders: orders || [] });
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan saat mengambil data pesanan';
      set({ error: errorMessage });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // State actions
  setLoading: (isLoading: boolean) => {
    set({ isLoading });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  clearError: () => {
    set({ error: null });
  },

  // Cart actions
  addToCart: (item) => {
    const { cart } = get();
    const existingItem = cart.find((i) => i.id === item.id);

    if (existingItem) {
      set({
        cart: cart.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ),
      });
    } else {
      set({
        cart: [...cart, { ...item, quantity: 1 }],
      });
    }
  },

  removeFromCart: (itemId) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== itemId),
    }));
  },

  updateQuantity: (itemId, quantity) => {
    if (quantity < 1) return;
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      ),
    }));
  },

  clearCart: () => {
    set({ cart: [] });
  },
}));

export default useStore;

// Helper hooks untuk mengakses state tertentu
export const useUser = () => useStore((state) => state.user);
export const useOrders = () => useStore((state) => state.orders);
export const useLoading = () => useStore((state) => state.isLoading);
export const useError = () => useStore((state) => state.error);

// Helper hook untuk auth actions
export const useAuth = () => {
  const login = useStore((state) => state.login);
  const register = useStore((state) => state.register);
  const logout = useStore((state) => state.logout);
  const setUser = useStore((state) => state.setUser);
  
  return { login, register, logout, setUser };
};

// Helper hook untuk order actions
export const useOrderActions = () => {
  const createOrder = useStore((state) => state.createOrder);
  const fetchOrders = useStore((state) => state.fetchOrders);
  
  return { createOrder, fetchOrders };
};

// Tambahkan helper hook untuk cart
export const useCart = () => {
  const cart = useStore((state) => state.cart);
  const addToCart = useStore((state) => state.addToCart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const clearCart = useStore((state) => state.clearCart);
  
  return { cart, addToCart, removeFromCart, updateQuantity, clearCart };
};
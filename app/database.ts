import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';
import { Database } from '../types/supabase';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export interface UserData {
  id?: string;
  email: string;
  password?: string;
  full_name: string;
  phone?: string;
  address?: string;
}

export interface OrderData {
  id: string;
  user_id: string;
  items: any;
  total_price: number;
  status: string;
  payment_method: string;
  sender_account: string;
  address: string;
  created_at: string;
  updated_at: string;
}

const database = {
  async createUser(userData: UserData) {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([{
          email: userData.email,
          password: userData.password, // Dalam praktik nyata, password harus di-hash
          full_name: userData.full_name,
          phone: userData.phone || null,
          address: userData.address || null,
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  async login(email: string, password: string) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('password', password) // Dalam praktik nyata, harus membandingkan hash
        .single();

      if (error) throw error;
      if (!data) throw new Error('Email atau password salah');
      
      return data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  async getOrdersByUserId(userId: string) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  async createOrder(orderData: Omit<OrderData, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  async updateUser(userId: string, userData: Partial<UserData>) {
    try {
      const { data, error } = await supabase
        .from('users')
        .update({
          full_name: userData.full_name,
          email: userData.email,
          phone: userData.phone,
          address: userData.address,
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  async updateUserPassword(userId: string, newPassword: string) {
    try {
      const { data, error } = await supabase
        .from('users')
        .update({ password: newPassword })
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
    }
  },

  async updateProfile(userId: string, userData: Partial<UserData>) {
    try {
      const { data, error } = await supabase
        .from('users')
        .update({
          full_name: userData.full_name,
          email: userData.email,
          phone: userData.phone,
          address: userData.address
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },
};

export default database;
import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, StyleSheet, Image } from 'react-native';
// ... existing code ...
import useStore from './store';
import { supabase } from './database';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
// ... existing code ...

// Ubah nama komponen menjadi CustomSplashScreen
function CustomSplashScreen() {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <ActivityIndicator 
        size="large" 
        color="#ffffff" 
        style={styles.loader}
      />
    </View>
  );
}

// Tahan splash screen sampai font selesai dimuat
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const setUser = useStore((state) => state.setUser);

  // Load fonts
  const [fontsLoaded] = useFonts({
    // Font yang dibutuhkan
  });

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Cek session yang ada
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;

        if (session?.user) {
          // Jika ada session, ambil data user
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (userError) throw userError;
          
          if (userData) {
            setUser(userData);
          }
        }
      } catch (error) {
        console.error('Error initializing app:', error);
      } finally {
        setIsLoading(false);
        // Sembunyikan splash screen setelah font dimuat
        await SplashScreen.hideAsync();
      }
    };

    initializeApp();

    // Set up auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          // Ketika user sign in, ambil data user
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (!userError && userData) {
            setUser(userData);
          }
        } else if (event === 'SIGNED_OUT') {
          // Ketika user sign out, set user ke null
          setUser(null);
        }
      }
    );

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Tampilkan CustomSplashScreen selama loading
  if (!fontsLoaded || isLoading) {
    return <CustomSplashScreen />;
  }

  return (
    <>
      <Stack screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
        <Stack.Screen 
          name="index"
          options={{
            // Redirect ke home jika sudah login
            redirect: useStore.getState().user !== null,
          }}
        />
        <Stack.Screen 
          name="login"
          options={{
            // Redirect ke home jika sudah login
            redirect: useStore.getState().user !== null,
          }}
        />
        <Stack.Screen 
          name="register"
          options={{
            // Redirect ke home jika sudah login
            redirect: useStore.getState().user !== null,
          }}
        />
        <Stack.Screen 
          name="(tabs)"
          options={{
            // Redirect ke login jika belum login
            redirect: useStore.getState().user === null,
          }}
        />
        <Stack.Screen 
          name="payment"
          options={{
            // Redirect ke login jika belum login
            redirect: useStore.getState().user === null,
          }}
        />
        <Stack.Screen 
          name="edit-profile"
          options={{
            // Redirect ke login jika belum login
            redirect: useStore.getState().user === null,
          }}
        />
        <Stack.Screen 
          name="change-password"
          options={{
            // Redirect ke login jika belum login
            redirect: useStore.getState().user === null,
          }}
        />
        <Stack.Screen 
          name="notification"
          options={{
            // Redirect ke login jika belum login
            redirect: useStore.getState().user === null,
          }}
        />
        <Stack.Screen 
          name="about"
          options={{
            // Redirect ke login jika belum login
            redirect: useStore.getState().user === null,
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#22c55e20', // Warna hijau pastel
  },
  logo: {
    width: 200,  // Ukuran dikecilkan agar lebih proporsional
    height: 200,
    marginBottom: 24,
  },
  loader: {
    position: 'absolute',
    bottom: 50,
  }
});
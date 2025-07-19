import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { blink } from '@/lib/blink';
import '../global.css';

export default function RootLayout() {
  useFrameworkReady();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user);
      setLoading(state.isLoading);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View className="flex-1 bg-background justify-center items-center">
        <Text className="text-primary text-lg font-inter-semibold">Loading Mayan Movers...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View className="flex-1 bg-background justify-center items-center px-6">
        <Text className="text-primary text-2xl font-inter-semibold mb-4">Welcome to Mayan Movers</Text>
        <Text className="text-gray-600 text-center mb-8">Please sign in to access your driver dashboard</Text>
      </View>
    );
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}
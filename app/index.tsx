import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { router } from 'expo-router';
import { blink } from '../lib/blink';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      // For demo purposes, we'll skip actual auth check
      // and go straight to the auth screen
      setTimeout(() => {
        setIsLoading(false);
        router.replace('/auth');
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      router.replace('/auth');
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-blue-900 justify-center items-center">
        <Text className="text-4xl font-bold text-white mb-4">🚛</Text>
        <Text className="text-2xl font-bold text-white mb-2">Mayan Movers</Text>
        <Text className="text-blue-200">Loading...</Text>
      </View>
    );
  }

  return null;
}
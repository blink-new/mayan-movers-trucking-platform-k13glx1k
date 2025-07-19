import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { blink } from '../lib/blink';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        // For demo purposes, we'll create a mock driver profile
        Alert.alert('Success', 'Account created! You can now sign in.');
        setIsSignUp(false);
      } else {
        // For demo, accept any email/password combination
        Alert.alert('Success', 'Signed in successfully!');
        router.replace('/(tabs)/dashboard');
      }
    } catch (error) {
      Alert.alert('Error', 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    router.replace('/(tabs)/dashboard');
  };

  return (
    <View className="flex-1 bg-slate-50 px-6 justify-center">
      <View className="bg-white rounded-2xl p-8 shadow-lg">
        <Text className="text-3xl font-bold text-blue-900 text-center mb-2">
          Mayan Movers
        </Text>
        <Text className="text-gray-600 text-center mb-8">
          {isSignUp ? 'Create your driver account' : 'Sign in to your account'}
        </Text>

        <View className="space-y-4">
          <View>
            <Text className="text-gray-700 font-medium mb-2">Email</Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View>
            <Text className="text-gray-700 font-medium mb-2">Password</Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            className={`rounded-lg py-4 ${loading ? 'bg-gray-400' : 'bg-blue-900'}`}
            onPress={handleAuth}
            disabled={loading}
          >
            <Text className="text-white text-center font-semibold text-lg">
              {loading ? 'Loading...' : (isSignUp ? 'Create Account' : 'Sign In')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="py-3"
            onPress={() => setIsSignUp(!isSignUp)}
          >
            <Text className="text-blue-900 text-center">
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </Text>
          </TouchableOpacity>

          <View className="border-t border-gray-200 pt-4 mt-6">
            <TouchableOpacity
              className="bg-amber-500 rounded-lg py-4"
              onPress={handleDemoLogin}
            >
              <Text className="text-white text-center font-semibold text-lg">
                🚛 Try Demo (No Login Required)
              </Text>
            </TouchableOpacity>
            <Text className="text-gray-500 text-center text-sm mt-2">
              Explore the app with sample data
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
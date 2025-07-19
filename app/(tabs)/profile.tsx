import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Truck, FileText, Star, Settings, LogOut, Shield, Phone, Mail, Calendar } from 'lucide-react-native';
import { blink } from '@/lib/blink';

interface DriverProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  cdl_number: string;
  cdl_expiry: string;
  experience_years: number;
  truck_type: string;
  rating: number;
  total_jobs: number;
  status: string;
}

export default function Profile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState<DriverProfile | null>(null);

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user);
      if (state.user) {
        loadProfile();
      }
    });
    return unsubscribe;
  }, []);

  const loadProfile = async () => {
    try {
      const user = await blink.auth.me();
      const drivers = await blink.db.drivers.list({
        where: { user_id: user.id },
        limit: 1,
      });

      if (drivers.length > 0) {
        setProfile(drivers[0]);
      } else {
        // Create default profile if none exists
        const newProfile = {
          id: `driver_${Date.now()}`,
          user_id: user.id,
          first_name: 'John',
          last_name: 'Driver',
          email: user.email,
          phone: '+1 (555) 123-4567',
          cdl_number: 'CDL123456789',
          cdl_expiry: '2025-12-31',
          experience_years: 5,
          truck_type: 'Dry Van',
          rating: 4.8,
          total_jobs: 127,
          status: 'verified',
        };
        
        await blink.db.drivers.create(newProfile);
        setProfile(newProfile);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: () => blink.auth.logout()
        },
      ]
    );
  };

  const ProfileSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100">
      <Text className="text-lg font-inter-semibold text-gray-900 mb-3">{title}</Text>
      {children}
    </View>
  );

  const ProfileItem = ({ icon: Icon, label, value, onPress = null }: { 
    icon: any; 
    label: string; 
    value: string; 
    onPress?: (() => void) | null 
  }) => (
    <TouchableOpacity 
      onPress={onPress}
      disabled={!onPress}
      className="flex-row items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
    >
      <View className="flex-row items-center flex-1">
        <Icon color="#6B7280" size={20} />
        <View className="ml-3 flex-1">
          <Text className="text-sm text-gray-600">{label}</Text>
          <Text className="font-inter-semibold text-gray-900">{value}</Text>
        </View>
      </View>
      {onPress && (
        <Text className="text-primary font-inter-semibold">Edit</Text>
      )}
    </TouchableOpacity>
  );

  const StatCard = ({ icon: Icon, title, value, color = '#1B365D' }: { 
    icon: any; 
    title: string; 
    value: string | number; 
    color?: string 
  }) => (
    <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex-1 mx-1">
      <View className="flex-row items-center justify-between mb-2">
        <Icon color={color} size={24} />
        <Text className="text-2xl font-inter-semibold text-gray-900">{value}</Text>
      </View>
      <Text className="text-sm font-inter text-gray-600">{title}</Text>
    </View>
  );

  if (!profile) {
    return (
      <SafeAreaView className="flex-1 bg-background justify-center items-center">
        <Text className="text-gray-600 font-inter">Loading profile...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="px-6 py-6 bg-white border-b border-gray-100">
          <View className="flex-row items-center">
            <View className="w-16 h-16 bg-primary rounded-full items-center justify-center">
              <User color="#FFFFFF" size={32} />
            </View>
            <View className="ml-4 flex-1">
              <Text className="text-2xl font-inter-semibold text-gray-900">
                {profile.first_name} {profile.last_name}
              </Text>
              <View className="flex-row items-center mt-1">
                <Shield 
                  color={profile.status === 'verified' ? '#10B981' : '#F59E0B'} 
                  size={16} 
                />
                <Text className={`ml-1 text-sm font-inter-semibold ${
                  profile.status === 'verified' ? 'text-green-600' : 'text-amber-600'
                }`}>
                  {profile.status === 'verified' ? 'Verified Driver' : 'Pending Verification'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View className="px-4 py-6">
          <View className="flex-row mb-4">
            <StatCard
              icon={Star}
              title="Rating"
              value={profile.rating.toFixed(1)}
              color="#F59E0B"
            />
            <StatCard
              icon={Truck}
              title="Jobs Completed"
              value={profile.total_jobs}
            />
          </View>
        </View>

        {/* Personal Information */}
        <View className="px-6">
          <ProfileSection title="Personal Information">
            <ProfileItem
              icon={User}
              label="Full Name"
              value={`${profile.first_name} ${profile.last_name}`}
              onPress={() => {}}
            />
            <ProfileItem
              icon={Mail}
              label="Email"
              value={profile.email}
              onPress={() => {}}
            />
            <ProfileItem
              icon={Phone}
              label="Phone"
              value={profile.phone}
              onPress={() => {}}
            />
          </ProfileSection>

          {/* CDL Information */}
          <ProfileSection title="CDL Information">
            <ProfileItem
              icon={FileText}
              label="CDL Number"
              value={profile.cdl_number}
              onPress={() => {}}
            />
            <ProfileItem
              icon={Calendar}
              label="CDL Expiry"
              value={new Date(profile.cdl_expiry).toLocaleDateString()}
              onPress={() => {}}
            />
            <ProfileItem
              icon={Truck}
              label="Experience"
              value={`${profile.experience_years} years`}
              onPress={() => {}}
            />
            <ProfileItem
              icon={Truck}
              label="Truck Type"
              value={profile.truck_type}
              onPress={() => {}}
            />
          </ProfileSection>

          {/* Documents */}
          <ProfileSection title="Documents">
            <TouchableOpacity className="flex-row items-center justify-between py-3">
              <View className="flex-row items-center">
                <FileText color="#6B7280" size={20} />
                <Text className="ml-3 font-inter-semibold text-gray-900">CDL License</Text>
              </View>
              <View className="bg-green-100 px-2 py-1 rounded">
                <Text className="text-green-700 text-xs font-inter-semibold">Verified</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity className="flex-row items-center justify-between py-3">
              <View className="flex-row items-center">
                <FileText color="#6B7280" size={20} />
                <Text className="ml-3 font-inter-semibold text-gray-900">Insurance Certificate</Text>
              </View>
              <View className="bg-green-100 px-2 py-1 rounded">
                <Text className="text-green-700 text-xs font-inter-semibold">Verified</Text>
              </View>
            </TouchableOpacity>
          </ProfileSection>

          {/* Settings */}
          <ProfileSection title="Settings">
            <TouchableOpacity className="flex-row items-center justify-between py-3">
              <View className="flex-row items-center">
                <Settings color="#6B7280" size={20} />
                <Text className="ml-3 font-inter-semibold text-gray-900">App Settings</Text>
              </View>
              <Text className="text-primary font-inter-semibold">→</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={handleLogout}
              className="flex-row items-center justify-between py-3"
            >
              <View className="flex-row items-center">
                <LogOut color="#EF4444" size={20} />
                <Text className="ml-3 font-inter-semibold text-red-500">Sign Out</Text>
              </View>
            </TouchableOpacity>
          </ProfileSection>
        </View>

        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}
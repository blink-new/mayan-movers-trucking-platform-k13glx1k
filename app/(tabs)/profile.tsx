import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  User, 
  Phone, 
  Mail, 
  FileText, 
  Star, 
  Settings, 
  LogOut, 
  Shield,
  Truck,
  Calendar,
  Award,
  ChevronRight,
  Edit,
  Camera,
  Bell,
  Lock,
  HelpCircle
} from 'lucide-react-native';
import { mockDriver } from '../../lib/mockData';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';

export default function ProfileScreen() {
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => {} }
      ]
    );
  };

  const ProfileSection = ({ title, children, delay = 0 }) => (
    <Card animated delay={delay} variant="elevated" padding="lg" margin="sm" className="mb-4">
      <Text className="text-lg font-inter-bold text-gray-900 mb-4">
        {title}
      </Text>
      {children}
    </Card>
  );

  const ProfileItem = ({ icon: Icon, label, value, onPress, showArrow = true, status, color = '#6B7280' }) => (
    <TouchableOpacity 
      onPress={onPress}
      className="flex-row items-center py-4 border-b border-gray-100 last:border-b-0"
    >
      <View className="bg-gray-50 p-2 rounded-lg mr-3">
        <Icon color={color} size={20} />
      </View>
      <View className="flex-1">
        <Text className="text-sm text-gray-600 font-inter">{label}</Text>
        <Text className="text-gray-900 font-inter-semibold text-base">{value}</Text>
      </View>
      {status && (
        <View className="mr-3">
          <StatusBadge status={status} size="sm" />
        </View>
      )}
      {showArrow && (
        <ChevronRight color="#D1D5DB" size={20} />
      )}
    </TouchableOpacity>
  );

  const StatItem = ({ icon: Icon, label, value, color = '#6B7280' }) => (
    <View className="flex-1 items-center py-6">
      <View className="bg-gray-50 p-4 rounded-2xl mb-3">
        <Icon color={color} size={28} />
      </View>
      <Text className="text-2xl font-inter-bold text-gray-900 mb-1">
        {value}
      </Text>
      <Text className="text-sm text-gray-600 font-inter text-center">{label}</Text>
    </View>
  );

  const SettingsItem = ({ icon: Icon, title, subtitle, onPress, color = '#6B7280', danger = false }) => (
    <TouchableOpacity 
      onPress={onPress}
      className="flex-row items-center py-4 border-b border-gray-100 last:border-b-0"
    >
      <View className={`p-2 rounded-lg mr-3 ${danger ? 'bg-error-50' : 'bg-gray-50'}`}>
        <Icon color={danger ? '#EF4444' : color} size={20} />
      </View>
      <View className="flex-1">
        <Text className={`font-inter-semibold text-base ${danger ? 'text-error-600' : 'text-gray-900'}`}>
          {title}
        </Text>
        {subtitle && (
          <Text className="text-sm text-gray-600 font-inter">{subtitle}</Text>
        )}
      </View>
      <ChevronRight color="#D1D5DB" size={20} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-4 py-4" showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <Card animated delay={0} variant="elevated" padding="xl" margin="sm" className="mb-6">
          <View className="items-center">
            {/* Avatar */}
            <View className="relative mb-4">
              <View className="bg-primary rounded-full w-24 h-24 items-center justify-center">
                <Text className="text-white text-2xl font-inter-bold">
                  {mockDriver.name.split(' ').map(n => n[0]).join('')}
                </Text>
              </View>
              <TouchableOpacity className="absolute -bottom-1 -right-1 bg-accent p-2 rounded-full">
                <Camera color="white" size={16} />
              </TouchableOpacity>
            </View>
            
            {/* Name and Status */}
            <Text className="text-2xl font-inter-bold text-gray-900 mb-2">
              {mockDriver.name}
            </Text>
            <View className="flex-row items-center mb-4">
              {mockDriver.verified && (
                <Shield color="#10B981" size={18} fill="#10B981" />
              )}
              <Text className="text-gray-600 ml-2 font-inter-medium">
                {mockDriver.verified ? 'Verified Driver' : 'Pending Verification'}
              </Text>
            </View>

            {/* Edit Profile Button */}
            <Button
              title="Edit Profile"
              onPress={() => {}}
              variant="outline"
              size="md"
              icon={Edit}
            />
          </View>

          {/* Stats Row */}
          <View className="flex-row border-t border-gray-100 mt-6 -mx-2">
            <StatItem
              icon={Star}
              label="Rating"
              value={mockDriver.rating.toFixed(1)}
              color="#F59E0B"
            />
            <StatItem
              icon={Award}
              label="Jobs Completed"
              value={mockDriver.total_jobs}
              color="#10B981"
            />
            <StatItem
              icon={Calendar}
              label="Years Experience"
              value={mockDriver.experience_years}
              color="#3B82F6"
            />
          </View>
        </Card>

        {/* Contact Information */}
        <ProfileSection title="Contact Information" delay={200}>
          <ProfileItem
            icon={Mail}
            label="Email Address"
            value={mockDriver.email}
            onPress={() => {}}
            color="#3B82F6"
          />
          <ProfileItem
            icon={Phone}
            label="Phone Number"
            value={mockDriver.phone}
            onPress={() => {}}
            color="#10B981"
          />
        </ProfileSection>

        {/* Driver Details */}
        <ProfileSection title="Driver Information" delay={300}>
          <ProfileItem
            icon={FileText}
            label="CDL Number"
            value={mockDriver.cdl_number}
            onPress={() => {}}
            color="#8B5CF6"
          />
          <ProfileItem
            icon={Calendar}
            label="CDL Expiry Date"
            value={new Date(mockDriver.cdl_expiry).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
            onPress={() => {}}
            color="#F59E0B"
          />
          <ProfileItem
            icon={Truck}
            label="Preferred Truck Type"
            value={mockDriver.truck_type}
            onPress={() => {}}
            color="#1B365D"
          />
        </ProfileSection>

        {/* Documents */}
        <ProfileSection title="Documents & Verification" delay={400}>
          <ProfileItem
            icon={FileText}
            label="CDL License"
            value="View Document"
            onPress={() => {}}
            status="completed"
            color="#10B981"
          />
          <ProfileItem
            icon={Shield}
            label="Insurance Certificate"
            value="View Document"
            onPress={() => {}}
            status="completed"
            color="#10B981"
          />
          <ProfileItem
            icon={FileText}
            label="Background Check"
            value="View Results"
            onPress={() => {}}
            status="completed"
            color="#10B981"
          />
        </ProfileSection>

        {/* Settings */}
        <ProfileSection title="Settings & Preferences" delay={500}>
          <SettingsItem
            icon={Bell}
            title="Notifications"
            subtitle="Push notifications, email alerts"
            onPress={() => {}}
            color="#F59E0B"
          />
          <SettingsItem
            icon={Lock}
            title="Privacy & Security"
            subtitle="Password, two-factor authentication"
            onPress={() => {}}
            color="#8B5CF6"
          />
          <SettingsItem
            icon={Settings}
            title="App Preferences"
            subtitle="Language, units, display"
            onPress={() => {}}
            color="#6B7280"
          />
          <SettingsItem
            icon={HelpCircle}
            title="Help & Support"
            subtitle="FAQ, contact support"
            onPress={() => {}}
            color="#3B82F6"
          />
        </ProfileSection>

        {/* Logout */}
        <Card animated delay={600} variant="elevated" padding="lg" margin="sm" className="mb-8">
          <SettingsItem
            icon={LogOut}
            title="Logout"
            subtitle="Sign out of your account"
            onPress={handleLogout}
            danger
          />
        </Card>

        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}
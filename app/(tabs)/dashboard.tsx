import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DollarSign, MapPin, Clock, Star, TrendingUp, Truck, Target, Award } from 'lucide-react-native';
import { mockStats, mockEarnings, mockDriver } from '../../lib/mockData';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';

interface DashboardStats {
  totalEarnings: number;
  activeJobs: number;
  completedJobs: number;
  rating: number;
  pendingBids: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalEarnings: 0,
    activeJobs: 0,
    completedJobs: 0,
    rating: 0,
    pendingBids: 0,
  });
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Use mock data for demo
      setStats({
        totalEarnings: mockEarnings.month,
        activeJobs: mockStats.active_jobs,
        completedJobs: mockStats.completed_jobs,
        rating: mockStats.rating,
        pendingBids: mockStats.pending_bids,
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color = '#1B365D', trend, delay = 0 }) => (
    <Card 
      animated 
      delay={delay}
      variant="elevated" 
      padding="lg" 
      margin="sm"
      className="flex-1"
    >
      <View className="flex-row items-center justify-between mb-3">
        <View className="bg-gray-50 p-3 rounded-xl">
          <Icon color={color} size={24} />
        </View>
        {trend && (
          <View className="flex-row items-center">
            <TrendingUp color="#10B981" size={16} />
            <Text className="text-success-600 text-sm font-inter-semibold ml-1">
              +{trend}%
            </Text>
          </View>
        )}
      </View>
      <Text className="text-3xl font-inter-bold text-gray-900 mb-1">{value}</Text>
      <Text className="text-sm font-inter-medium text-gray-600">{title}</Text>
      {subtitle && (
        <Text className="text-xs text-gray-500 mt-1">{subtitle}</Text>
      )}
    </Card>
  );

  const QuickActionCard = ({ icon: Icon, title, subtitle, onPress, color = '#1B365D', delay = 0 }) => (
    <Card 
      animated 
      delay={delay}
      onPress={onPress}
      variant="elevated" 
      padding="lg" 
      margin="sm"
      className="flex-1"
    >
      <View className="items-center">
        <View className="bg-primary-50 p-4 rounded-2xl mb-3">
          <Icon color={color} size={28} />
        </View>
        <Text className="text-base font-inter-semibold text-gray-900 text-center mb-1">
          {title}
        </Text>
        <Text className="text-sm text-gray-600 text-center">
          {subtitle}
        </Text>
      </View>
    </Card>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView 
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View 
          entering={FadeInDown.duration(600)}
          className="px-6 py-6 bg-gradient-to-r from-primary to-primary-700"
          style={{
            background: 'linear-gradient(135deg, #1B365D 0%, #243B53 100%)',
          }}
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-white/80 text-base font-inter">Good morning,</Text>
              <Text className="text-white text-2xl font-inter-bold">
                {mockDriver.name.split(' ')[0]}! 👋
              </Text>
              <Text className="text-white/90 text-sm font-inter-medium mt-1">
                Ready to hit the road today?
              </Text>
            </View>
            <View className="bg-white/10 p-4 rounded-2xl">
              <Truck color="white" size={32} />
            </View>
          </View>
        </Animated.View>

        {/* Performance Stats */}
        <View className="px-4 py-6">
          <Animated.View entering={FadeInRight.delay(200).duration(600)}>
            <Text className="text-xl font-inter-bold text-gray-900 mb-1 px-2">
              Your Performance
            </Text>
            <Text className="text-gray-600 font-inter mb-6 px-2">
              Track your earnings and job progress
            </Text>
          </Animated.View>
          
          <View className="flex-row mb-4">
            <StatCard
              icon={DollarSign}
              title="Monthly Earnings"
              value={`$${stats.totalEarnings.toLocaleString()}`}
              subtitle="This month"
              color="#F59E0B"
              trend={12}
              delay={300}
            />
            <StatCard
              icon={Target}
              title="Active Jobs"
              value={stats.activeJobs}
              subtitle="In progress"
              color="#3B82F6"
              delay={400}
            />
          </View>

          <View className="flex-row mb-6">
            <StatCard
              icon={Award}
              title="Completed"
              value={stats.completedJobs}
              subtitle="Total jobs"
              color="#10B981"
              trend={8}
              delay={500}
            />
            <StatCard
              icon={Star}
              title="Rating"
              value={stats.rating.toFixed(1)}
              subtitle="Average rating"
              color="#F59E0B"
              delay={600}
            />
          </View>
        </View>

        {/* Quick Actions */}
        <View className="px-4 pb-6">
          <Animated.View entering={FadeInRight.delay(700).duration(600)}>
            <Text className="text-xl font-inter-bold text-gray-900 mb-1 px-2">
              Quick Actions
            </Text>
            <Text className="text-gray-600 font-inter mb-6 px-2">
              Get started with your next move
            </Text>
          </Animated.View>
          
          <View className="flex-row mb-4">
            <QuickActionCard
              icon={MapPin}
              title="Find Jobs"
              subtitle="Browse nearby loads"
              onPress={() => {}}
              color="#F59E0B"
              delay={800}
            />
            <QuickActionCard
              icon={Clock}
              title="My Bids"
              subtitle={`${stats.pendingBids} pending`}
              onPress={() => {}}
              color="#3B82F6"
              delay={900}
            />
          </View>
        </View>

        {/* Recent Activity */}
        <View className="px-4 pb-8">
          <Animated.View entering={FadeInRight.delay(1000).duration(600)}>
            <Text className="text-xl font-inter-bold text-gray-900 mb-1 px-2">
              Recent Activity
            </Text>
            <Text className="text-gray-600 font-inter mb-6 px-2">
              Your latest job updates
            </Text>
          </Animated.View>
          
          <Card animated delay={1100} variant="elevated" padding="lg" margin="sm">
            <View className="space-y-4">
              <View className="flex-row items-center justify-between pb-4 border-b border-gray-100">
                <View className="flex-1">
                  <Text className="font-inter-semibold text-gray-900 text-base mb-1">
                    Bid submitted for Chicago to Detroit
                  </Text>
                  <Text className="text-sm text-gray-600">
                    $2,400 • 2 hours ago
                  </Text>
                </View>
                <StatusBadge status="pending" size="sm" />
              </View>
              
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="font-inter-semibold text-gray-900 text-base mb-1">
                    Job completed: Miami to Orlando
                  </Text>
                  <Text className="text-sm text-gray-600">
                    $1,850 • Yesterday
                  </Text>
                </View>
                <StatusBadge status="completed" size="sm" />
              </View>
            </View>
          </Card>
        </View>

        {/* Bottom Action */}
        <View className="px-6 pb-8">
          <Button
            title="View All Jobs"
            onPress={() => {}}
            variant="primary"
            size="lg"
            fullWidth
            icon={MapPin}
          />
        </View>

        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}
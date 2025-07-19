import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DollarSign, MapPin, Clock, Star, TrendingUp } from 'lucide-react-native';
import { blink } from '@/lib/blink';

interface DashboardStats {
  totalEarnings: number;
  activeJobs: number;
  completedJobs: number;
  rating: number;
  pendingBids: number;
}

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalEarnings: 0,
    activeJobs: 0,
    completedJobs: 0,
    rating: 0,
    pendingBids: 0,
  });
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user);
      if (state.user) {
        loadDashboardData();
      }
    });
    return unsubscribe;
  }, []);

  const loadDashboardData = async () => {
    try {
      // Load driver profile and stats
      const driver = await blink.db.drivers.list({
        where: { user_id: user?.id },
        limit: 1,
      });

      if (driver.length > 0) {
        const driverData = driver[0];
        setStats({
          totalEarnings: 12450.75, // Mock data for now
          activeJobs: 2,
          completedJobs: driverData.total_jobs || 0,
          rating: driverData.rating || 0,
          pendingBids: 3, // Mock data
        });
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color = '#1B365D' }) => (
    <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex-1 mx-1">
      <View className="flex-row items-center justify-between mb-2">
        <Icon color={color} size={24} />
        <Text className="text-2xl font-inter-semibold text-gray-900">{value}</Text>
      </View>
      <Text className="text-sm font-inter text-gray-600">{title}</Text>
      {subtitle && (
        <Text className="text-xs text-gray-500 mt-1">{subtitle}</Text>
      )}
    </View>
  );

  const QuickAction = ({ icon: Icon, title, onPress, color = '#1B365D' }) => (
    <TouchableOpacity 
      onPress={onPress}
      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex-1 mx-1"
    >
      <Icon color={color} size={28} className="mb-2" />
      <Text className="text-sm font-inter-semibold text-gray-900">{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView 
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View className="px-6 py-4 bg-white border-b border-gray-100">
          <Text className="text-2xl font-inter-semibold text-primary">Good morning!</Text>
          <Text className="text-gray-600 font-inter">
            {user?.email || 'Driver'}
          </Text>
        </View>

        {/* Stats Grid */}
        <View className="px-4 py-6">
          <Text className="text-lg font-inter-semibold text-gray-900 mb-4 px-2">
            Your Performance
          </Text>
          
          <View className="flex-row mb-4">
            <StatCard
              icon={DollarSign}
              title="Total Earnings"
              value={`$${stats.totalEarnings.toLocaleString()}`}
              subtitle="This month"
              color="#F59E0B"
            />
            <StatCard
              icon={TrendingUp}
              title="Active Jobs"
              value={stats.activeJobs}
              subtitle="In progress"
            />
          </View>

          <View className="flex-row mb-6">
            <StatCard
              icon={Clock}
              title="Completed"
              value={stats.completedJobs}
              subtitle="Total jobs"
            />
            <StatCard
              icon={Star}
              title="Rating"
              value={stats.rating.toFixed(1)}
              subtitle="Average rating"
              color="#F59E0B"
            />
          </View>
        </View>

        {/* Quick Actions */}
        <View className="px-4 pb-6">
          <Text className="text-lg font-inter-semibold text-gray-900 mb-4 px-2">
            Quick Actions
          </Text>
          
          <View className="flex-row mb-4">
            <QuickAction
              icon={MapPin}
              title="Find Nearby Jobs"
              onPress={() => {}}
              color="#F59E0B"
            />
            <QuickAction
              icon={Clock}
              title="View Bids"
              onPress={() => {}}
            />
          </View>
        </View>

        {/* Recent Activity */}
        <View className="px-4 pb-8">
          <Text className="text-lg font-inter-semibold text-gray-900 mb-4 px-2">
            Recent Activity
          </Text>
          
          <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <View className="flex-row items-center justify-between py-3 border-b border-gray-100">
              <View className="flex-1">
                <Text className="font-inter-semibold text-gray-900">
                  Bid submitted for Chicago to Detroit
                </Text>
                <Text className="text-sm text-gray-600 mt-1">
                  $2,400 • 2 hours ago
                </Text>
              </View>
              <View className="bg-accent/10 px-3 py-1 rounded-full">
                <Text className="text-accent text-xs font-inter-semibold">Pending</Text>
              </View>
            </View>
            
            <View className="flex-row items-center justify-between py-3">
              <View className="flex-1">
                <Text className="font-inter-semibold text-gray-900">
                  Job completed: Miami to Orlando
                </Text>
                <Text className="text-sm text-gray-600 mt-1">
                  $1,850 • Yesterday
                </Text>
              </View>
              <View className="bg-green-100 px-3 py-1 rounded-full">
                <Text className="text-green-700 text-xs font-inter-semibold">Completed</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
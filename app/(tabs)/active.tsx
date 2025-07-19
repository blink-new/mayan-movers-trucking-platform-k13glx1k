import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Clock, Phone, MessageCircle, Navigation, CheckCircle } from 'lucide-react-native';
import { blink } from '@/lib/blink';

interface ActiveJob {
  id: string;
  title: string;
  pickup_location: string;
  delivery_location: string;
  pickup_date: string;
  delivery_date: string;
  rate: number;
  status: string;
  shipper_contact: string;
  current_status: string;
}

export default function ActiveJobs() {
  const [activeJobs, setActiveJobs] = useState<ActiveJob[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadActiveJobs();
  }, []);

  const loadActiveJobs = async () => {
    try {
      // Load active jobs for the current driver
      const user = await blink.auth.me();
      if (user) {
        const jobs = await blink.db.jobs.list({
          where: { 
            assigned_driver_id: user.id,
            status: 'in_progress'
          },
          orderBy: { pickup_date: 'asc' },
        });
        setActiveJobs(jobs);
      }
    } catch (error) {
      console.error('Error loading active jobs:', error);
      // Mock data for demo
      setActiveJobs([
        {
          id: '1',
          title: 'Chicago to Detroit Freight',
          pickup_location: 'Chicago, IL',
          delivery_location: 'Detroit, MI',
          pickup_date: '2024-01-22T08:00:00',
          delivery_date: '2024-01-22T18:00:00',
          rate: 2400,
          status: 'in_progress',
          shipper_contact: 'John Smith',
          current_status: 'loaded',
        },
        {
          id: '2',
          title: 'Miami to Orlando Express',
          pickup_location: 'Miami, FL',
          delivery_location: 'Orlando, FL',
          pickup_date: '2024-01-23T06:00:00',
          delivery_date: '2024-01-23T14:00:00',
          rate: 1850,
          status: 'in_progress',
          shipper_contact: 'Sarah Johnson',
          current_status: 'en_route_pickup',
        },
      ]);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadActiveJobs();
    setRefreshing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en_route_pickup': return '#F59E0B';
      case 'arrived_pickup': return '#3B82F6';
      case 'loaded': return '#10B981';
      case 'en_route_delivery': return '#8B5CF6';
      case 'delivered': return '#059669';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'en_route_pickup': return 'En Route to Pickup';
      case 'arrived_pickup': return 'Arrived at Pickup';
      case 'loaded': return 'Loaded';
      case 'en_route_delivery': return 'En Route to Delivery';
      case 'delivered': return 'Delivered';
      default: return 'Unknown';
    }
  };

  const updateJobStatus = async (jobId: string, newStatus: string) => {
    try {
      // Update job status in database
      await blink.db.job_status_updates.create({
        id: `status_${Date.now()}`,
        job_id: jobId,
        driver_id: 'current_driver_id', // Replace with actual driver ID
        user_id: (await blink.auth.me()).id,
        status: newStatus,
        timestamp: new Date().toISOString(),
      });
      
      // Refresh the jobs list
      await loadActiveJobs();
    } catch (error) {
      console.error('Error updating job status:', error);
    }
  };

  const ActiveJobCard = ({ job }: { job: ActiveJob }) => (
    <View className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100">
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1">
          <Text className="text-lg font-inter-semibold text-gray-900 mb-1">
            {job.title}
          </Text>
          <View className="flex-row items-center mb-2">
            <MapPin color="#6B7280" size={16} />
            <Text className="text-sm text-gray-600 ml-1">
              {job.pickup_location} → {job.delivery_location}
            </Text>
          </View>
        </View>
        <View className="bg-accent/10 px-3 py-1 rounded-full">
          <Text className="text-accent text-sm font-inter-semibold">
            ${job.rate.toLocaleString()}
          </Text>
        </View>
      </View>

      {/* Status */}
      <View className="flex-row items-center mb-3">
        <View 
          className="w-3 h-3 rounded-full mr-2"
          style={{ backgroundColor: getStatusColor(job.current_status) }}
        />
        <Text className="text-sm font-inter-semibold" style={{ color: getStatusColor(job.current_status) }}>
          {getStatusText(job.current_status)}
        </Text>
      </View>

      {/* Timeline */}
      <View className="mb-4">
        <View className="flex-row items-center justify-between mb-2">
          <View className="flex-row items-center">
            <Clock color="#6B7280" size={16} />
            <Text className="text-sm text-gray-600 ml-1">Pickup</Text>
          </View>
          <Text className="text-sm font-inter-semibold text-gray-900">
            {new Date(job.pickup_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Clock color="#6B7280" size={16} />
            <Text className="text-sm text-gray-600 ml-1">Delivery</Text>
          </View>
          <Text className="text-sm font-inter-semibold text-gray-900">
            {new Date(job.delivery_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
      </View>

      {/* Actions */}
      <View className="flex-row space-x-2">
        <TouchableOpacity className="flex-1 bg-primary/10 flex-row items-center justify-center py-2 rounded-lg">
          <Phone color="#1B365D" size={16} />
          <Text className="text-primary font-inter-semibold text-sm ml-1">Call</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="flex-1 bg-primary/10 flex-row items-center justify-center py-2 rounded-lg">
          <MessageCircle color="#1B365D" size={16} />
          <Text className="text-primary font-inter-semibold text-sm ml-1">Message</Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="flex-1 bg-accent/10 flex-row items-center justify-center py-2 rounded-lg">
          <Navigation color="#F59E0B" size={16} />
          <Text className="text-accent font-inter-semibold text-sm ml-1">Navigate</Text>
        </TouchableOpacity>
      </View>

      {/* Status Update Buttons */}
      <View className="mt-3 pt-3 border-t border-gray-100">
        <Text className="text-sm font-inter-semibold text-gray-900 mb-2">Update Status:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row space-x-2">
            {job.current_status === 'en_route_pickup' && (
              <TouchableOpacity 
                onPress={() => updateJobStatus(job.id, 'arrived_pickup')}
                className="bg-blue-100 px-3 py-1 rounded-full"
              >
                <Text className="text-blue-700 text-xs font-inter-semibold">Arrived at Pickup</Text>
              </TouchableOpacity>
            )}
            {job.current_status === 'arrived_pickup' && (
              <TouchableOpacity 
                onPress={() => updateJobStatus(job.id, 'loaded')}
                className="bg-green-100 px-3 py-1 rounded-full"
              >
                <Text className="text-green-700 text-xs font-inter-semibold">Loaded</Text>
              </TouchableOpacity>
            )}
            {job.current_status === 'loaded' && (
              <TouchableOpacity 
                onPress={() => updateJobStatus(job.id, 'en_route_delivery')}
                className="bg-purple-100 px-3 py-1 rounded-full"
              >
                <Text className="text-purple-700 text-xs font-inter-semibold">En Route to Delivery</Text>
              </TouchableOpacity>
            )}
            {job.current_status === 'en_route_delivery' && (
              <TouchableOpacity 
                onPress={() => updateJobStatus(job.id, 'delivered')}
                className="bg-green-100 px-3 py-1 rounded-full flex-row items-center"
              >
                <CheckCircle color="#059669" size={12} />
                <Text className="text-green-700 text-xs font-inter-semibold ml-1">Mark Delivered</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-gray-100">
        <Text className="text-2xl font-inter-semibold text-primary">
          Active Jobs
        </Text>
        <Text className="text-gray-600 font-inter">
          {activeJobs.length} job{activeJobs.length !== 1 ? 's' : ''} in progress
        </Text>
      </View>

      {/* Jobs List */}
      <ScrollView 
        className="flex-1 px-6 py-4"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {activeJobs.map((job) => (
          <ActiveJobCard key={job.id} job={job} />
        ))}

        {activeJobs.length === 0 && (
          <View className="flex-1 justify-center items-center py-12">
            <Clock color="#6B7280" size={48} />
            <Text className="text-lg font-inter-semibold text-gray-900 mt-4">
              No active jobs
            </Text>
            <Text className="text-gray-600 text-center mt-2">
              Your active jobs will appear here
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
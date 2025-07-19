import { View, Text, ScrollView, TouchableOpacity, TextInput, RefreshControl } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, MapPin, Calendar, DollarSign, Truck, Clock } from 'lucide-react-native';
import { blink } from '@/lib/blink';

interface Job {
  id: string;
  title: string;
  pickup_location: string;
  delivery_location: string;
  pickup_date: string;
  equipment_type: string;
  rate: number;
  distance_miles: number;
  weight: number;
  status: string;
}

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      // Load available jobs
      const jobsData = await blink.db.jobs.list({
        where: { status: 'open' },
        orderBy: { created_at: 'desc' },
        limit: 20,
      });
      setJobs(jobsData);
    } catch (error) {
      console.error('Error loading jobs:', error);
      // Mock data for demo
      setJobs([
        {
          id: '1',
          title: 'Chicago to Detroit Freight',
          pickup_location: 'Chicago, IL',
          delivery_location: 'Detroit, MI',
          pickup_date: '2024-01-22',
          equipment_type: 'Dry Van',
          rate: 2400,
          distance_miles: 280,
          weight: 45000,
          status: 'open',
        },
        {
          id: '2',
          title: 'Miami to Orlando Express',
          pickup_location: 'Miami, FL',
          delivery_location: 'Orlando, FL',
          pickup_date: '2024-01-23',
          equipment_type: 'Refrigerated',
          rate: 1850,
          distance_miles: 235,
          weight: 38000,
          status: 'open',
        },
        {
          id: '3',
          title: 'Houston to Dallas Run',
          pickup_location: 'Houston, TX',
          delivery_location: 'Dallas, TX',
          pickup_date: '2024-01-24',
          equipment_type: 'Flatbed',
          rate: 1650,
          distance_miles: 240,
          weight: 42000,
          status: 'open',
        },
      ]);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadJobs();
    setRefreshing(false);
  };

  const JobCard = ({ job }: { job: Job }) => (
    <TouchableOpacity className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100">
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1">
          <Text className="text-lg font-inter-semibold text-gray-900 mb-1">
            {job.title}
          </Text>
          <View className="flex-row items-center">
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

      <View className="flex-row justify-between items-center mb-3">
        <View className="flex-row items-center">
          <Calendar color="#6B7280" size={16} />
          <Text className="text-sm text-gray-600 ml-1">
            {new Date(job.pickup_date).toLocaleDateString()}
          </Text>
        </View>
        <View className="flex-row items-center">
          <Truck color="#6B7280" size={16} />
          <Text className="text-sm text-gray-600 ml-1">
            {job.equipment_type}
          </Text>
        </View>
      </View>

      <View className="flex-row justify-between items-center">
        <Text className="text-sm text-gray-600">
          {job.distance_miles} miles • {(job.weight / 1000).toFixed(0)}k lbs
        </Text>
        <TouchableOpacity className="bg-primary px-4 py-2 rounded-lg">
          <Text className="text-white font-inter-semibold text-sm">
            Place Bid
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-gray-100">
        <Text className="text-2xl font-inter-semibold text-primary mb-4">
          Find Jobs
        </Text>
        
        {/* Search Bar */}
        <View className="flex-row items-center space-x-3">
          <View className="flex-1 flex-row items-center bg-gray-50 rounded-lg px-3 py-2">
            <Search color="#6B7280" size={20} />
            <TextInput
              className="flex-1 ml-2 text-gray-900 font-inter"
              placeholder="Search by location, route..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity 
            onPress={() => setShowFilters(!showFilters)}
            className="bg-primary p-2 rounded-lg"
          >
            <Filter color="#FFFFFF" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filters (if shown) */}
      {showFilters && (
        <View className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <Text className="text-sm font-inter-semibold text-gray-900 mb-3">
            Quick Filters
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row space-x-2">
              {['Dry Van', 'Refrigerated', 'Flatbed', 'Tanker'].map((type) => (
                <TouchableOpacity
                  key={type}
                  className="bg-white px-4 py-2 rounded-full border border-gray-200"
                >
                  <Text className="text-sm font-inter text-gray-700">{type}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      )}

      {/* Jobs List */}
      <ScrollView 
        className="flex-1 px-6 py-4"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-inter-semibold text-gray-900">
            Available Jobs ({jobs.length})
          </Text>
          <TouchableOpacity className="flex-row items-center">
            <Clock color="#6B7280" size={16} />
            <Text className="text-sm text-gray-600 ml-1">Sort by Date</Text>
          </TouchableOpacity>
        </View>

        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}

        {jobs.length === 0 && (
          <View className="flex-1 justify-center items-center py-12">
            <Truck color="#6B7280" size={48} />
            <Text className="text-lg font-inter-semibold text-gray-900 mt-4">
              No jobs available
            </Text>
            <Text className="text-gray-600 text-center mt-2">
              Check back later for new opportunities
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
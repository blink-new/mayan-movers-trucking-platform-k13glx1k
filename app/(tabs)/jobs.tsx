import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, MapPin, Calendar, DollarSign, Star, Filter, Truck, Clock, Weight } from 'lucide-react-native';
import { mockJobs } from '../../lib/mockData';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';

export default function JobsScreen() {
  const [jobs, setJobs] = useState(mockJobs);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const JobCard = ({ job, index }) => (
    <Card 
      animated 
      delay={index * 100}
      variant="elevated" 
      padding="lg" 
      margin="sm"
      className="mb-4"
    >
      <View className="flex-row justify-between items-start mb-4">
        <View className="flex-1">
          <Text className="text-lg font-inter-bold text-gray-900 mb-2">
            {job.shipper_name}
          </Text>
          <View className="flex-row items-center">
            <View className="flex-row items-center mr-4">
              <Star color="#F59E0B" size={16} fill="#F59E0B" />
              <Text className="text-sm text-gray-600 ml-1 font-inter-medium">
                {job.shipper_rating}
              </Text>
            </View>
            <View className="bg-info-50 px-2 py-1 rounded-full">
              <Text className="text-info-700 text-xs font-inter-semibold">
                {job.bids_count} bids
              </Text>
            </View>
          </View>
        </View>
        <View className="bg-accent-50 px-4 py-2 rounded-xl">
          <Text className="text-accent-700 text-lg font-inter-bold">
            ${job.rate.toLocaleString()}
          </Text>
        </View>
      </View>

      {/* Route Information */}
      <View className="bg-gray-50 p-4 rounded-xl mb-4">
        <View className="flex-row items-center mb-3">
          <MapPin color="#6B7280" size={18} />
          <Text className="text-gray-700 ml-2 flex-1 font-inter-medium">
            {job.pickup_location} → {job.delivery_location}
          </Text>
        </View>
        
        <View className="flex-row items-center mb-3">
          <Calendar color="#6B7280" size={18} />
          <Text className="text-gray-700 ml-2 font-inter-medium">
            Pickup: {new Date(job.pickup_date).toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric'
            })}
          </Text>
        </View>

        <View className="flex-row justify-between">
          <View className="flex-row items-center">
            <Truck color="#6B7280" size={16} />
            <Text className="text-sm text-gray-600 ml-1 font-inter">
              {job.distance} miles
            </Text>
          </View>
          <View className="flex-row items-center">
            <Weight color="#6B7280" size={16} />
            <Text className="text-sm text-gray-600 ml-1 font-inter">
              {job.weight}
            </Text>
          </View>
          <View className="bg-primary-50 px-2 py-1 rounded-full">
            <Text className="text-primary-700 text-xs font-inter-semibold">
              {job.truck_type}
            </Text>
          </View>
        </View>
      </View>

      {/* Commodity Info */}
      <View className="mb-4">
        <Text className="text-sm text-gray-600 font-inter">
          <Text className="font-inter-semibold">Commodity:</Text> {job.commodity}
        </Text>
      </View>

      {/* Action Buttons */}
      <View className="flex-row space-x-3">
        <Button
          title="View Details"
          onPress={() => {}}
          variant="outline"
          size="md"
          className="flex-1"
        />
        <Button
          title="Submit Bid"
          onPress={() => {}}
          variant="accent"
          size="md"
          className="flex-1"
        />
      </View>
    </Card>
  );

  const FilterButton = ({ title, value, isSelected, count }) => (
    <TouchableOpacity
      onPress={() => setSelectedFilter(value)}
      className={`px-4 py-3 rounded-xl mr-3 flex-row items-center ${
        isSelected ? 'bg-primary' : 'bg-white border border-gray-200'
      }`}
      style={{
        shadowColor: isSelected ? '#1B365D' : 'transparent',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: isSelected ? 2 : 0,
      }}
    >
      <Text className={`text-sm font-inter-semibold ${
        isSelected ? 'text-white' : 'text-gray-700'
      }`}>
        {title}
      </Text>
      {count && (
        <View className={`ml-2 px-2 py-0.5 rounded-full ${
          isSelected ? 'bg-white/20' : 'bg-gray-100'
        }`}>
          <Text className={`text-xs font-inter-bold ${
            isSelected ? 'text-white' : 'text-gray-600'
          }`}>
            {count}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <Animated.View 
        entering={FadeInDown.duration(600)}
        className="px-6 py-6 bg-white border-b border-gray-100"
      >
        <Text className="text-2xl font-inter-bold text-primary mb-6">
          Available Jobs
        </Text>
        
        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-4 mb-6">
          <Search color="#6B7280" size={20} />
          <TextInput
            className="flex-1 ml-3 text-gray-900 font-inter"
            placeholder="Search by location, company..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity className="bg-primary p-2 rounded-lg">
            <Filter color="white" size={18} />
          </TouchableOpacity>
        </View>

        {/* Filter Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <FilterButton 
            title="All Jobs" 
            value="all" 
            isSelected={selectedFilter === 'all'} 
            count={jobs.length}
          />
          <FilterButton 
            title="Dry Van" 
            value="dry_van" 
            isSelected={selectedFilter === 'dry_van'} 
            count={jobs.filter(j => j.truck_type === 'Dry Van').length}
          />
          <FilterButton 
            title="Flatbed" 
            value="flatbed" 
            isSelected={selectedFilter === 'flatbed'} 
            count={jobs.filter(j => j.truck_type === 'Flatbed').length}
          />
          <FilterButton 
            title="Refrigerated" 
            value="refrigerated" 
            isSelected={selectedFilter === 'refrigerated'} 
            count={jobs.filter(j => j.truck_type === 'Refrigerated').length}
          />
          <FilterButton 
            title="High Pay" 
            value="high_pay" 
            isSelected={selectedFilter === 'high_pay'} 
            count={jobs.filter(j => j.rate > 2000).length}
          />
        </ScrollView>
      </Animated.View>

      {/* Jobs List */}
      <ScrollView className="flex-1 px-4 py-4" showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInRight.delay(200).duration(600)}>
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-gray-600 font-inter">
              <Text className="font-inter-semibold">{jobs.length}</Text> jobs available
            </Text>
            <TouchableOpacity className="flex-row items-center bg-white px-3 py-2 rounded-lg border border-gray-200">
              <Text className="text-primary text-sm font-inter-semibold mr-1">
                Sort by Distance
              </Text>
              <Filter color="#1B365D" size={16} />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {jobs.map((job, index) => (
          <JobCard key={job.id} job={job} index={index} />
        ))}

        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}
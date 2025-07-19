import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Clock, Phone, MessageCircle, CheckCircle, Truck, Navigation, AlertCircle } from 'lucide-react-native';
import { mockActiveJobs } from '../../lib/mockData';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';

export default function ActiveJobsScreen() {
  const [activeJobs, setActiveJobs] = useState(mockActiveJobs);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en_route_pickup':
        return '#F59E0B';
      case 'loaded':
        return '#3B82F6';
      case 'en_route_delivery':
        return '#8B5CF6';
      case 'delivered':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  const ActiveJobCard = ({ job, index }) => (
    <Card 
      animated 
      delay={index * 150}
      variant="elevated" 
      padding="lg" 
      margin="sm"
      className="mb-4"
    >
      {/* Header */}
      <View className="flex-row justify-between items-start mb-4">
        <View className="flex-1">
          <Text className="text-lg font-inter-bold text-gray-900 mb-2">
            {job.shipper_name}
          </Text>
          <StatusBadge status={job.status} size="md" />
        </View>
        <View className="items-end">
          <Text className="text-2xl font-inter-bold text-accent-600 mb-1">
            ${job.rate.toLocaleString()}
          </Text>
          <Text className="text-sm text-gray-500 font-inter">
            Job #{job.id.split('_')[1]}
          </Text>
        </View>
      </View>

      {/* Progress Section */}
      <View className="bg-gray-50 p-4 rounded-xl mb-4">
        <ProgressBar
          progress={job.progress}
          color={getStatusColor(job.status)}
          showPercentage
          animated
          className="mb-4"
        />
        
        {/* Timeline */}
        <View className="space-y-3">
          <View className="flex-row items-center">
            <View className={`w-3 h-3 rounded-full mr-3 ${
              job.progress >= 25 ? 'bg-success-500' : 'bg-gray-300'
            }`} />
            <Text className={`text-sm font-inter-medium ${
              job.progress >= 25 ? 'text-gray-900' : 'text-gray-500'
            }`}>
              Job Accepted
            </Text>
          </View>
          
          <View className="flex-row items-center">
            <View className={`w-3 h-3 rounded-full mr-3 ${
              job.progress >= 50 ? 'bg-success-500' : job.progress >= 25 ? 'bg-warning-500' : 'bg-gray-300'
            }`} />
            <Text className={`text-sm font-inter-medium ${
              job.progress >= 50 ? 'text-gray-900' : job.progress >= 25 ? 'text-warning-700' : 'text-gray-500'
            }`}>
              En Route to Pickup
            </Text>
          </View>
          
          <View className="flex-row items-center">
            <View className={`w-3 h-3 rounded-full mr-3 ${
              job.progress >= 75 ? 'bg-success-500' : job.progress >= 50 ? 'bg-info-500' : 'bg-gray-300'
            }`} />
            <Text className={`text-sm font-inter-medium ${
              job.progress >= 75 ? 'text-gray-900' : job.progress >= 50 ? 'text-info-700' : 'text-gray-500'
            }`}>
              Loaded & En Route
            </Text>
          </View>
          
          <View className="flex-row items-center">
            <View className={`w-3 h-3 rounded-full mr-3 ${
              job.progress >= 100 ? 'bg-success-500' : 'bg-gray-300'
            }`} />
            <Text className={`text-sm font-inter-medium ${
              job.progress >= 100 ? 'text-gray-900' : 'text-gray-500'
            }`}>
              Delivered
            </Text>
          </View>
        </View>
      </View>

      {/* Route Information */}
      <View className="mb-4">
        <View className="flex-row items-center mb-3">
          <MapPin color="#6B7280" size={18} />
          <Text className="text-gray-700 ml-2 flex-1 font-inter-medium">
            {job.pickup_location} → {job.delivery_location}
          </Text>
        </View>
        
        <View className="flex-row justify-between">
          <View className="flex-1 mr-2">
            <View className="flex-row items-center">
              <Clock color="#6B7280" size={16} />
              <Text className="text-gray-600 ml-2 text-sm font-inter">
                Pickup
              </Text>
            </View>
            <Text className="text-gray-900 font-inter-semibold ml-6">
              {job.estimated_pickup}
            </Text>
          </View>
          
          <View className="flex-1 ml-2">
            <View className="flex-row items-center">
              <Clock color="#6B7280" size={16} />
              <Text className="text-gray-600 ml-2 text-sm font-inter">
                Delivery
              </Text>
            </View>
            <Text className="text-gray-900 font-inter-semibold ml-6">
              {job.estimated_delivery}
            </Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="space-y-3">
        <View className="flex-row space-x-3">
          <Button
            title="Call Shipper"
            onPress={() => {}}
            variant="primary"
            size="md"
            icon={Phone}
            className="flex-1"
          />
          <Button
            title="Message"
            onPress={() => {}}
            variant="outline"
            size="md"
            icon={MessageCircle}
            className="flex-1"
          />
        </View>
        
        <View className="flex-row space-x-3">
          <Button
            title="Navigate"
            onPress={() => {}}
            variant="accent"
            size="md"
            icon={Navigation}
            className="flex-1"
          />
          <Button
            title="Update Status"
            onPress={() => {}}
            variant="secondary"
            size="md"
            icon={CheckCircle}
            className="flex-1"
          />
        </View>
      </View>

      {/* Emergency Contact */}
      {job.progress > 0 && job.progress < 100 && (
        <View className="mt-4 pt-4 border-t border-gray-200">
          <TouchableOpacity className="flex-row items-center justify-center py-2">
            <AlertCircle color="#EF4444" size={16} />
            <Text className="text-error-600 font-inter-semibold ml-2">
              Emergency Contact
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Card>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <Animated.View 
        entering={FadeInDown.duration(600)}
        className="px-6 py-6 bg-white border-b border-gray-100"
      >
        <Text className="text-2xl font-inter-bold text-primary mb-2">
          Active Jobs
        </Text>
        <View className="flex-row items-center justify-between">
          <Text className="text-gray-600 font-inter">
            <Text className="font-inter-semibold">{activeJobs.length}</Text> jobs in progress
          </Text>
          {activeJobs.length > 0 && (
            <View className="bg-success-50 px-3 py-1 rounded-full">
              <Text className="text-success-700 text-sm font-inter-semibold">
                All on track
              </Text>
            </View>
          )}
        </View>
      </Animated.View>

      {/* Jobs List */}
      <ScrollView className="flex-1 px-4 py-4" showsVerticalScrollIndicator={false}>
        {activeJobs.length > 0 ? (
          activeJobs.map((job, index) => (
            <ActiveJobCard key={job.id} job={job} index={index} />
          ))
        ) : (
          <Animated.View 
            entering={FadeInRight.delay(300).duration(600)}
            className="flex-1 justify-center items-center py-20"
          >
            <View className="bg-gray-50 p-8 rounded-3xl mb-6">
              <Truck color="#D1D5DB" size={64} />
            </View>
            <Text className="text-xl font-inter-bold text-gray-500 mb-2">
              No Active Jobs
            </Text>
            <Text className="text-gray-400 text-center font-inter mb-8 px-8">
              When you accept jobs, they'll appear here for tracking and management.
            </Text>
            <Button
              title="Browse Available Jobs"
              onPress={() => {}}
              variant="primary"
              size="lg"
              icon={MapPin}
            />
          </Animated.View>
        )}

        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}
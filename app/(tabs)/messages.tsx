import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageCircle, Search, MoreVertical, Phone, Clock, CheckCheck } from 'lucide-react-native';
import { mockMessages } from '../../lib/mockData';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';

export default function MessagesScreen() {
  const [messages, setMessages] = useState(mockMessages);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const MessageCard = ({ message, index }) => (
    <Card 
      animated 
      delay={index * 100}
      onPress={() => {}}
      variant="default" 
      padding="lg" 
      margin="none"
      className="mb-2 mx-4"
    >
      <View className="flex-row items-start">
        {/* Avatar */}
        <View className="bg-primary rounded-full w-12 h-12 items-center justify-center mr-4">
          <Text className="text-white font-inter-bold text-base">
            {getInitials(message.shipper_name)}
          </Text>
        </View>
        
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row justify-between items-start mb-2">
            <View className="flex-1">
              <Text className="text-lg font-inter-bold text-gray-900">
                {message.shipper_name}
              </Text>
              <View className="flex-row items-center mt-1">
                <Text className="text-primary text-sm font-inter-semibold">
                  Job #{message.job_id.split('_')[1]}
                </Text>
                <View className="w-1 h-1 bg-gray-400 rounded-full mx-2" />
                <Text className="text-sm text-gray-500 font-inter">
                  {formatTime(message.timestamp)}
                </Text>
              </View>
            </View>
            
            <View className="flex-row items-center">
              {message.unread && (
                <View className="bg-accent w-2.5 h-2.5 rounded-full mr-3" />
              )}
              <TouchableOpacity>
                <MoreVertical color="#6B7280" size={20} />
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Message Preview */}
          <Text 
            className={`text-gray-600 mb-3 ${
              message.unread ? 'font-inter-semibold' : 'font-inter'
            }`}
            numberOfLines={2}
          >
            {message.last_message}
          </Text>
          
          {/* Action Buttons */}
          <View className="flex-row space-x-2">
            <TouchableOpacity className="bg-primary-50 px-3 py-2 rounded-lg flex-row items-center">
              <MessageCircle color="#1B365D" size={16} />
              <Text className="text-primary text-sm font-inter-semibold ml-1">
                Reply
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="bg-gray-50 px-3 py-2 rounded-lg flex-row items-center">
              <Phone color="#6B7280" size={16} />
              <Text className="text-gray-700 text-sm font-inter-semibold ml-1">
                Call
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Card>
  );

  const unreadCount = messages.filter(msg => msg.unread).length;

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <Animated.View 
        entering={FadeInDown.duration(600)}
        className="px-6 py-6 bg-white border-b border-gray-100"
      >
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-2xl font-inter-bold text-primary">
              Messages
            </Text>
            {unreadCount > 0 && (
              <Text className="text-gray-600 mt-1 font-inter">
                <Text className="font-inter-semibold text-accent">{unreadCount}</Text> unread message{unreadCount !== 1 ? 's' : ''}
              </Text>
            )}
          </View>
          <TouchableOpacity className="bg-gray-50 p-3 rounded-xl">
            <Search color="#6B7280" size={24} />
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        <View className="flex-row space-x-4">
          <View className="bg-primary-50 px-4 py-3 rounded-xl flex-1">
            <Text className="text-primary-700 text-sm font-inter">Total</Text>
            <Text className="text-primary-900 text-xl font-inter-bold">
              {messages.length}
            </Text>
          </View>
          
          <View className="bg-accent-50 px-4 py-3 rounded-xl flex-1">
            <Text className="text-accent-700 text-sm font-inter">Unread</Text>
            <Text className="text-accent-900 text-xl font-inter-bold">
              {unreadCount}
            </Text>
          </View>
          
          <View className="bg-success-50 px-4 py-3 rounded-xl flex-1">
            <Text className="text-success-700 text-sm font-inter">Active</Text>
            <Text className="text-success-900 text-xl font-inter-bold">
              {messages.filter(m => m.unread).length}
            </Text>
          </View>
        </View>
      </Animated.View>

      {/* Messages List */}
      <ScrollView className="flex-1 py-4" showsVerticalScrollIndicator={false}>
        {messages.length > 0 ? (
          <>
            <Animated.View entering={FadeInRight.delay(200).duration(600)}>
              <Text className="text-lg font-inter-bold text-gray-900 mb-4 px-6">
                Recent Conversations
              </Text>
            </Animated.View>
            
            {messages.map((message, index) => (
              <MessageCard key={message.id} message={message} index={index} />
            ))}
          </>
        ) : (
          <Animated.View 
            entering={FadeInRight.delay(300).duration(600)}
            className="flex-1 justify-center items-center py-20"
          >
            <View className="bg-gray-50 p-8 rounded-3xl mb-6">
              <MessageCircle color="#D1D5DB" size={64} />
            </View>
            <Text className="text-xl font-inter-bold text-gray-500 mb-2">
              No Messages
            </Text>
            <Text className="text-gray-400 text-center font-inter mb-8 px-8">
              Messages from shippers will appear here when you have active jobs.
            </Text>
            <Button
              title="Find Jobs"
              onPress={() => {}}
              variant="primary"
              size="lg"
              icon={MessageCircle}
            />
          </Animated.View>
        )}

        <View className="h-20" />
      </ScrollView>

      {/* Quick Actions */}
      {messages.length > 0 && (
        <Animated.View 
          entering={FadeInDown.delay(800).duration(600)}
          className="px-6 py-4 bg-white border-t border-gray-100"
        >
          <View className="flex-row space-x-3">
            <Button
              title="Mark All Read"
              onPress={() => {}}
              variant="outline"
              size="md"
              icon={CheckCheck}
              className="flex-1"
            />
            <Button
              title="Compose"
              onPress={() => {}}
              variant="primary"
              size="md"
              icon={MessageCircle}
              className="flex-1"
            />
          </View>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}
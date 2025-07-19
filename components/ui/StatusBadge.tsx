import React from 'react';
import { View, Text } from 'react-native';

interface StatusBadgeProps {
  status: 'pending' | 'active' | 'completed' | 'cancelled' | 'en_route_pickup' | 'loaded' | 'en_route_delivery' | 'delivered';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function StatusBadge({ status, size = 'md', className = '' }: StatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return {
          text: 'Pending',
          bgColor: 'bg-warning-100',
          textColor: 'text-warning-700',
          dotColor: '#F59E0B',
        };
      case 'active':
        return {
          text: 'Active',
          bgColor: 'bg-info-100',
          textColor: 'text-info-700',
          dotColor: '#3B82F6',
        };
      case 'completed':
        return {
          text: 'Completed',
          bgColor: 'bg-success-100',
          textColor: 'text-success-700',
          dotColor: '#10B981',
        };
      case 'cancelled':
        return {
          text: 'Cancelled',
          bgColor: 'bg-error-100',
          textColor: 'text-error-700',
          dotColor: '#EF4444',
        };
      case 'en_route_pickup':
        return {
          text: 'En Route to Pickup',
          bgColor: 'bg-warning-100',
          textColor: 'text-warning-700',
          dotColor: '#F59E0B',
        };
      case 'loaded':
        return {
          text: 'Loaded',
          bgColor: 'bg-info-100',
          textColor: 'text-info-700',
          dotColor: '#3B82F6',
        };
      case 'en_route_delivery':
        return {
          text: 'En Route to Delivery',
          bgColor: 'bg-purple-100',
          textColor: 'text-purple-700',
          dotColor: '#8B5CF6',
        };
      case 'delivered':
        return {
          text: 'Delivered',
          bgColor: 'bg-success-100',
          textColor: 'text-success-700',
          dotColor: '#10B981',
        };
      default:
        return {
          text: 'Unknown',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-700',
          dotColor: '#6B7280',
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          container: 'px-2 py-1',
          text: 'text-xs',
          dot: 'w-1.5 h-1.5',
        };
      case 'md':
        return {
          container: 'px-3 py-1.5',
          text: 'text-sm',
          dot: 'w-2 h-2',
        };
      case 'lg':
        return {
          container: 'px-4 py-2',
          text: 'text-base',
          dot: 'w-2.5 h-2.5',
        };
      default:
        return {
          container: 'px-3 py-1.5',
          text: 'text-sm',
          dot: 'w-2 h-2',
        };
    }
  };

  const config = getStatusConfig();
  const sizeStyles = getSizeStyles();

  return (
    <View className={`
      ${config.bgColor} 
      ${sizeStyles.container} 
      rounded-full flex-row items-center self-start
      ${className}
    `}>
      <View 
        className={`${sizeStyles.dot} rounded-full mr-2`}
        style={{ backgroundColor: config.dotColor }}
      />
      <Text className={`${config.textColor} ${sizeStyles.text} font-inter-semibold`}>
        {config.text}
      </Text>
    </View>
  );
}
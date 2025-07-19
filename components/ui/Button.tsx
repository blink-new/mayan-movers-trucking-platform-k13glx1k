import React from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import { LucideIcon } from 'lucide-react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  fullWidth = false,
  className = '',
}: ButtonProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary border-primary';
      case 'secondary':
        return 'bg-gray-100 border-gray-200';
      case 'accent':
        return 'bg-accent border-accent';
      case 'outline':
        return 'bg-transparent border-primary';
      case 'ghost':
        return 'bg-transparent border-transparent';
      default:
        return 'bg-primary border-primary';
    }
  };

  const getTextStyles = () => {
    switch (variant) {
      case 'primary':
      case 'accent':
        return 'text-white';
      case 'secondary':
        return 'text-gray-700';
      case 'outline':
        return 'text-primary';
      case 'ghost':
        return 'text-primary';
      default:
        return 'text-white';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-2';
      case 'md':
        return 'px-4 py-3';
      case 'lg':
        return 'px-6 py-4';
      default:
        return 'px-4 py-3';
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'sm':
        return 'text-sm';
      case 'md':
        return 'text-base';
      case 'lg':
        return 'text-lg';
      default:
        return 'text-base';
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'sm':
        return 16;
      case 'md':
        return 20;
      case 'lg':
        return 24;
      default:
        return 20;
    }
  };

  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      className={`
        ${getVariantStyles()}
        ${getSizeStyles()}
        ${fullWidth ? 'w-full' : ''}
        ${isDisabled ? 'opacity-50' : ''}
        border rounded-xl flex-row items-center justify-center
        ${className}
      `}
      style={{
        shadowColor: variant === 'primary' || variant === 'accent' ? '#000' : 'transparent',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: variant === 'primary' || variant === 'accent' ? 2 : 0,
      }}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'primary' || variant === 'accent' ? 'white' : '#1B365D'} 
        />
      ) : (
        <View className="flex-row items-center">
          {Icon && iconPosition === 'left' && (
            <Icon 
              size={getIconSize()} 
              color={variant === 'primary' || variant === 'accent' ? 'white' : '#1B365D'}
              style={{ marginRight: 8 }}
            />
          )}
          <Text className={`${getTextStyles()} ${getTextSize()} font-inter-semibold`}>
            {title}
          </Text>
          {Icon && iconPosition === 'right' && (
            <Icon 
              size={getIconSize()} 
              color={variant === 'primary' || variant === 'accent' ? 'white' : '#1B365D'}
              style={{ marginLeft: 8 }}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}
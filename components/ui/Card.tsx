import React from 'react';
import { View, TouchableOpacity, ViewStyle } from 'react-native';
import Animated, { FadeInDown, FadeInUp, SlideInRight } from 'react-native-reanimated';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'default' | 'elevated' | 'outlined' | 'ghost';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  margin?: 'none' | 'sm' | 'md' | 'lg';
  animated?: boolean;
  animationType?: 'fadeInDown' | 'fadeInUp' | 'slideInRight';
  delay?: number;
  className?: string;
  style?: ViewStyle;
}

export function Card({
  children,
  onPress,
  variant = 'default',
  padding = 'md',
  margin = 'md',
  animated = false,
  animationType = 'fadeInDown',
  delay = 0,
  className = '',
  style,
}: CardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'elevated':
        return 'bg-white shadow-card-lg border border-gray-100';
      case 'outlined':
        return 'bg-white border-2 border-gray-200';
      case 'ghost':
        return 'bg-transparent';
      default:
        return 'bg-white shadow-card border border-gray-100';
    }
  };

  const getPaddingStyles = () => {
    switch (padding) {
      case 'none':
        return '';
      case 'sm':
        return 'p-2';
      case 'md':
        return 'p-4';
      case 'lg':
        return 'p-6';
      case 'xl':
        return 'p-8';
      default:
        return 'p-4';
    }
  };

  const getMarginStyles = () => {
    switch (margin) {
      case 'none':
        return '';
      case 'sm':
        return 'm-1';
      case 'md':
        return 'm-2';
      case 'lg':
        return 'm-4';
      default:
        return 'm-2';
    }
  };

  const getAnimation = () => {
    switch (animationType) {
      case 'fadeInUp':
        return FadeInUp.delay(delay).duration(400);
      case 'slideInRight':
        return SlideInRight.delay(delay).duration(400);
      default:
        return FadeInDown.delay(delay).duration(400);
    }
  };

  const cardContent = (
    <View
      className={`
        ${getVariantStyles()}
        ${getPaddingStyles()}
        ${getMarginStyles()}
        rounded-xl
        ${className}
      `}
      style={style}
    >
      {children}
    </View>
  );

  const animatedContent = animated ? (
    <Animated.View entering={getAnimation()}>
      {cardContent}
    </Animated.View>
  ) : (
    cardContent
  );

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.95}
        style={{
          transform: [{ scale: 1 }],
        }}
      >
        {animatedContent}
      </TouchableOpacity>
    );
  }

  return animatedContent;
}
import React from 'react';
import { View, Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';

interface ProgressBarProps {
  progress: number; // 0-100
  color?: string;
  backgroundColor?: string;
  height?: number;
  showPercentage?: boolean;
  animated?: boolean;
  className?: string;
}

export function ProgressBar({
  progress,
  color = '#1B365D',
  backgroundColor = '#E5E7EB',
  height = 8,
  showPercentage = false,
  animated = true,
  className = '',
}: ProgressBarProps) {
  const progressValue = useSharedValue(0);

  React.useEffect(() => {
    if (animated) {
      progressValue.value = withTiming(progress, {
        duration: 1000,
        easing: Easing.out(Easing.cubic),
      });
    } else {
      progressValue.value = progress;
    }
  }, [progress, animated]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progressValue.value}%`,
    };
  });

  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <View className={className}>
      {showPercentage && (
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-sm text-gray-600 font-inter">Progress</Text>
          <Text className="text-sm font-inter-semibold text-gray-900">
            {Math.round(clampedProgress)}%
          </Text>
        </View>
      )}
      <View 
        className="rounded-full overflow-hidden"
        style={{ 
          height,
          backgroundColor,
        }}
      >
        <Animated.View
          style={[
            {
              height: '100%',
              backgroundColor: color,
              borderRadius: height / 2,
            },
            animated ? animatedStyle : { width: `${clampedProgress}%` },
          ]}
        />
      </View>
    </View>
  );
}
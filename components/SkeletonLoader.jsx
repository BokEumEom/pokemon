import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
  Easing,
} from 'react-native-reanimated';

const SkeletonLoader = () => {
  const animatedValue = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withRepeat(
        withTiming(animatedValue.value, {
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true
      ),
    };
  });

  React.useEffect(() => {
    animatedValue.value = 1;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animated.View style={[styles.avatar, animatedStyle]} />
        <View style={styles.headerText}>
          <Animated.View style={[styles.title, animatedStyle]} />
          <Animated.View style={[styles.subtitle, animatedStyle]} />
        </View>
      </View>
      <View style={styles.content}>
        <Animated.View style={[styles.row, animatedStyle]} />
        <Animated.View style={[styles.row, animatedStyle]} />
        <Animated.View style={[styles.row, animatedStyle]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e0e0e0',
  },
  headerText: {
    marginLeft: 20,
    flex: 1,
  },
  title: {
    height: 20,
    width: '50%',
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
    borderRadius: 4,
  },
  subtitle: {
    height: 16,
    width: '30%',
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
  content: {
    flex: 1,
  },
  row: {
    height: 16,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 10,
    width: '100%',
  },
});

export default SkeletonLoader;

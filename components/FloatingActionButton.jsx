import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { textColor } from '../constants/colors';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  interpolate,
  withDelay,
  Easing,
} from 'react-native-reanimated';

const FloatingActionButton = ({
  onOpenGeneration,
  onOpenSort,
  onOpenFilter,
  onToggleDisplayMode,
  displayMode,
}) => {
  const [expanded, setExpanded] = useState(false);
  const animation = useSharedValue(0); // Shared value for animation state

  const toggleMenu = () => {
    if (expanded) {
      // Collapse the menu with staggered effect
      animation.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.ease) });
      setExpanded(false);
    } else {
      // Expand the menu with staggered effect
      animation.value = withTiming(1, { duration: 300, easing: Easing.out(Easing.ease) });
      setExpanded(true);
    }
  };

  // Animated style for the main FAB icon
  const mainButtonStyle = useAnimatedStyle(() => {
    const rotate = withTiming(expanded ? 45 : 0, { duration: 300 }); // Rotate icon by 45 degrees if expanded
  
    return {
      transform: [{ rotate: `${rotate}deg` }],
    };
  });

  // Generate animated styles for each button
  const generateAnimatedStyle = (index) =>
    useAnimatedStyle(() => {
      const translateY = interpolate(animation.value, [0, 1], [0, -70 * (index + 1)]);
      const scale = withSpring(animation.value, { damping: 15, stiffness: 100 });
      const opacity = interpolate(animation.value, [0, 1], [0, 1]);

      return {
        transform: [{ translateY }, { scale }],
        opacity,
      };
    });

  // Prepare animated styles for all buttons
  const buttonStyles = [
    generateAnimatedStyle(0),
    generateAnimatedStyle(1),
    generateAnimatedStyle(2),
    generateAnimatedStyle(3),
  ];

  return (
    <View style={styles.fabContainer}>
      {/* Action Buttons */}
      {expanded && (
        <>
          <Animated.View style={[styles.fabButton, buttonStyles[3]]}>
            <TouchableOpacity onPress={onOpenGeneration} style={styles.fullTouchableButton}>
              <View style={styles.iconLabelContainer}>
                <Ionicons name="rocket" size={28} color={textColor.white} />
                <Text style={styles.label}>Generation</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={[styles.fabButton, buttonStyles[2]]}>
            <TouchableOpacity onPress={onOpenSort} style={styles.fullTouchableButton}>
              <View style={styles.iconLabelContainer}>
                <Ionicons name="funnel" size={28} color={textColor.white} />
                <Text style={styles.label}>Sort</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={[styles.fabButton, buttonStyles[1]]}>
            <TouchableOpacity onPress={onOpenFilter} style={styles.fullTouchableButton}>
              <View style={styles.iconLabelContainer}>
                <Ionicons name="filter" size={28} color={textColor.white} />
                <Text style={styles.label}>Filter</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={[styles.fabButton, buttonStyles[0]]}>
            <TouchableOpacity onPress={onToggleDisplayMode} style={styles.fullTouchableButton}>
              <View style={styles.iconLabelContainer}>
                <Ionicons
                  name={displayMode === 'grid' ? 'grid' : 'list'}
                  size={28}
                  color={textColor.white}
                />
                <Text style={styles.label}>{displayMode === 'grid' ? 'Grid' : 'List'}</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </>
      )}
      {/* Main Floating Action Button */}
      <TouchableOpacity onPress={toggleMenu} style={styles.mainFabButton}>
        <Ionicons name={expanded ? 'close-outline' : 'add-outline'} size={28} color={textColor.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'flex-end',
  },
  mainFabButton: {
    backgroundColor: '#FD7D24',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  fabButton: {
    position: 'absolute',
    backgroundColor: '#FD7D24',
    width: 140,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    flexDirection: 'row',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  fullTouchableButton: {
    width: '100%',
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  iconLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: textColor.white,
    marginLeft: 8,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default FloatingActionButton;

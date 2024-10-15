// pokemon/components/filter/SliderRange.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

const SliderRange = ({ minValue, maxValue, setMinValue, setMaxValue }) => {
  return (
    <View style={styles.sliderContainer}>
      <Text style={styles.sliderLabel}>{minValue}</Text>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={1000}
        step={1}
        minimumTrackTintColor="#FF3B30"
        maximumTrackTintColor="#ccc"
        thumbTintColor="#FF3B30"
        value={minValue}
        onValueChange={(value) => setMinValue(value)}
      />
      <Text style={styles.sliderLabel}>{maxValue}</Text>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={1000}
        step={1}
        minimumTrackTintColor="#FF3B30"
        maximumTrackTintColor="#ccc"
        thumbTintColor="#FF3B30"
        value={maxValue}
        onValueChange={(value) => setMaxValue(value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    marginBottom: 20,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
});

export default SliderRange;

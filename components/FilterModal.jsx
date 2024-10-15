import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Asset } from 'expo-asset';
import { Image } from 'expo-image';
import IconSelector from '@/components/filter/IconSelector';
import SliderComponent from '@/components/filter/SliderRange';
import Button from './Button';
import { typeIcons, heightImages, weightImages } from '@/constants/typeIcons';

// Preload assets
const preloadAssets = () => {
  const allIcons = [
    ...Object.values(typeIcons),
    ...Object.values(heightImages),
    ...Object.values(weightImages)
  ];

  allIcons.forEach((icon) => {
    Asset.fromModule(icon).downloadAsync();
  });
};

const FilterModal = ({ visible, onClose, onApply }) => {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedWeakness, setSelectedWeakness] = useState(null);
  const [selectedHeight, setSelectedHeight] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [minValue, setMinValue] = useState(78);
  const [maxValue, setMaxValue] = useState(687);

  const handleSelect = (category, value) => {
    if (category === 'type') setSelectedType(selectedType === value ? null : value);
    if (category === 'weakness') setSelectedWeakness(selectedWeakness === value ? null : value);
    if (category === 'height') setSelectedHeight(selectedHeight === value ? null : value);
    if (category === 'weight') setSelectedWeight(selectedWeight === value ? null : value);
  };

  // Preload images when the component mounts
  React.useEffect(() => {
    preloadAssets();
  }, []);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <View style={styles.dragIndicator}></View>
              <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title} accessibilityRole="header">Filters</Text>
                <Text style={styles.subtitle}>
                  Use advanced search to explore Pokémon by type, weakness, height, and more!
                </Text>

                <Text style={styles.sectionTitle}>Types</Text>
                <IconSelector 
                  category="type"
                  icons={typeIcons}
                  selectedKey={selectedType}
                  onSelect={handleSelect}
                  ImageComponent={Image} // Use expo-image component
                />

                <Text style={styles.sectionTitle}>Weaknesses</Text>
                <IconSelector 
                  category="weakness"
                  icons={typeIcons}
                  selectedKey={selectedWeakness}
                  onSelect={handleSelect}
                  ImageComponent={Image} // Use expo-image component
                />

                <Text style={styles.sectionTitle}>Heights</Text>
                <IconSelector 
                  category="height"
                  icons={heightImages}
                  selectedKey={selectedHeight}
                  onSelect={handleSelect}
                  ImageComponent={Image} // Use expo-image component
                />

                <Text style={styles.sectionTitle}>Weights</Text>
                <IconSelector 
                  category="weight"
                  icons={weightImages}
                  selectedKey={selectedWeight}
                  onSelect={handleSelect}
                  ImageComponent={Image} // Use expo-image component
                />

                <Text style={styles.sectionTitle}>Number Range</Text>
                <SliderComponent 
                  minValue={minValue} 
                  maxValue={maxValue} 
                  onMinValueChange={setMinValue} 
                  onMaxValueChange={setMaxValue} 
                />
              </ScrollView>

              <View style={styles.buttonContainer}>
                <Button 
                  title="Reset" 
                  type="secondary" 
                  onPress={onClose} 
                  style={styles.button}
                  accessibilityLabel="Reset Filters"
                />
                <Button 
                  title="Apply" 
                  type="primary" 
                  onPress={onApply} 
                  style={styles.button}
                  accessibilityLabel="Apply Filters"
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    maxHeight: '90%',
  },
  scrollContent: {
    padding: 20,
  },
  dragIndicator: {
    width: 50,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default FilterModal;

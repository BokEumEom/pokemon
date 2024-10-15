import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

const IconSelector = ({ category, icons, selectedKey, onSelect }) => {
  return (
    <View style={styles.imageRow}>
      {Object.keys(icons).map((key) => {
        const isSelected = selectedKey === key;
        return (
          <TouchableOpacity
            key={key}
            onPress={() => onSelect(category, key)}
            style={[
              styles.iconWrapper,
              isSelected ? styles.selected : {},
            ]}
          >
            <View style={[
              styles.iconImageWrapper,
              isSelected ? styles.selectedImageWrapper : {},
            ]}>
              <Image 
                source={icons[key]} 
                style={[
                  styles.iconImage,
                  isSelected ? styles.selectedImage : {},
                ]} 
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  imageRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  iconWrapper: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  iconImageWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: 'transparent',
  },
  selectedImageWrapper: {
    backgroundColor: '#8bbe8a',
  },
  iconImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  selectedImage: {
    tintColor: 'white',
  },
});

export default IconSelector;

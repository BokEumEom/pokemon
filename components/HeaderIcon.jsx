// pokemon/components/HeaderIcon.jsx
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import GenerationIcon from '../assets/Icons/generation.svg';
import SortIcon from '../assets/Icons/sort.svg';
import FilterIcon from '../assets/Icons/filter.svg';

const icons = {
  generation: GenerationIcon,
  sort: SortIcon,
  filter: FilterIcon,
};

const HeaderIcon = ({ onPress, iconType }) => {
  const IconComponent = icons[iconType];

  return (
    <TouchableOpacity onPress={onPress} style={styles.iconStyle} accessibilityRole="button">
      <IconComponent style={styles.icon} />
    </TouchableOpacity>
  );
};

export default HeaderIcon;

const styles = StyleSheet.create({
  iconStyle: {
    marginHorizontal: 8,
  },
  icon: {
    width: 25,
    height: 25,
  },
});

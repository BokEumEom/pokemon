// pokemon/components/Button.jsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ title, onPress, type = 'primary' }) => {
  return (
    <TouchableOpacity
      style={[styles.button, type === 'primary' ? styles.primary : styles.secondary]}
      onPress={onPress}
    >
      <Text style={[styles.text, type === 'primary' ? styles.primaryText : styles.secondaryText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10, // Increased radius to match the rounded corners
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    minWidth: 120, // Ensures the button has a minimum width
  },
  primary: {
    backgroundColor: '#EA5D60',
    shadowColor: '#EA5D60',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
  },
  secondary: {
    backgroundColor: '#F2F2F2',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  primaryText: {
    color: 'white',
  },
  secondaryText: {
    color: '#8E8E93',
  },
});

export default Button;

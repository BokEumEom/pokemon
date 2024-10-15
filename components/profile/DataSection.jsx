// components/DataSection.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DataSection = ({ title, children }) => (
  <>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </>
);

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#62B957',
    marginBottom: 15,
  },
});

export default DataSection;

// components/DataRow.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DataRow = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  infoLabel: {
    fontWeight: 'bold',
    color: '#17171B',
  },
  infoValue: {
    color: '#747476',
    textAlign: 'right',
    textTransform: 'capitalize',
  },
});

export default DataRow;

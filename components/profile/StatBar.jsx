// pokemon/components/profile/StatBar.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StatBar = ({ stat }) => {
  const statName = getStatName(stat.stat.name);
  const maxStat = calculateMaxStat(stat.base_stat);
  const minStat = calculateMinStat(stat.base_stat);

  return (
    <View style={styles.statRow}>
      <Text style={styles.statName}>{statName}</Text>
      <Text style={styles.statValue}>{stat.base_stat}</Text>
      <View style={styles.statBarContainer}>
        <View style={[styles.statBar, { width: `${(stat.base_stat / 255) * 100}%` }]} />
      </View>
      <Text style={styles.minMaxStat}>{minStat}</Text>
      <Text style={styles.minMaxStat}>{maxStat}</Text>
    </View>
  );
};

const getStatName = (stat) => {
  switch (stat) {
    case 'hp':
      return 'HP';
    case 'attack':
      return 'Attack';
    case 'defense':
      return 'Defense';
    case 'special-attack':
      return 'Sp. Atk';
    case 'special-defense':
      return 'Sp. Def';
    case 'speed':
      return 'Speed';
    default:
      return '';
  }
};

const calculateMaxStat = (baseStat) => Math.floor((2 * baseStat + 31 + (252 / 4)) * 100 / 100 + 10);
const calculateMinStat = (baseStat) => Math.floor((2 * baseStat + 31 + (0 / 4)) * 100 / 100 + 10);

const styles = StyleSheet.create({
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  statName: {
    flex: 1,
    color: '#333',
  },
  statValue: {
    width: 40,
    textAlign: 'center',
    color: '#333',
  },
  statBarContainer: {
    flex: 3,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  statBar: {
    height: 6,
    backgroundColor: '#48D0B0',
  },
  minMaxStat: {
    width: 40,
    textAlign: 'center',
    color: '#333',
  },
  minMaxLabel: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
});

export default StatBar;

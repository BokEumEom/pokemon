// pokemon/components/profile/StatsTab.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import StatBar from './StatBar';
import { colors } from '@/constants/colors';
import { typeIcons } from '@/constants/typeIcons';
import Animated, { FadeIn, FadeInUp, FadeOut } from 'react-native-reanimated';

const allTypes = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground',
  'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const StatsTab = ({ stats = [], types = [], typeDefenses = [] }) => {
  if (!Array.isArray(stats) || stats.length === 0) {
    return <Text>Data not available</Text>;
  }

  const totalStats = stats.reduce((total, stat) => total + stat.base_stat, 0);
  const pokemonName = types[0]?.type.name ? capitalizeFirstLetter(types[0].type.name) : '';

  const effectivenessMap = Object.fromEntries(
    typeDefenses.map(defense => [defense.type.toLowerCase(), defense.effectiveness])
  );

  return (
    <Animated.ScrollView entering={FadeInUp} style={styles.container}>
      <Animated.View entering={FadeIn.delay(100)} exiting={FadeOut}>
        <Text style={styles.sectionTitle}>Base Stats</Text>
        {stats.map((stat, index) => (
          <StatBar key={index} stat={stat} />
        ))}
      </Animated.View>
      
      <Animated.View entering={FadeIn.delay(200)} exiting={FadeOut}>
        <View style={styles.statHeaderContainer}>
          <Text style={styles.totalStats}>Total {totalStats}</Text>
          <View style={styles.minMaxLabelContainer}>
            <Text style={styles.minMaxLabel}>Min</Text>
            <Text style={styles.minMaxLabel}>Max</Text>
          </View>
        </View>
        <Text style={styles.statNote}>
          The ranges shown on the right are for a level 100 Pokémon. Maximum values are based on a beneficial nature, 252 EVs, 31 IVs; 
          minimum values are based on a hindering nature, 0 EVs, 0 IVs.
        </Text>
      </Animated.View>
      
      <Animated.View entering={FadeIn.delay(300)} exiting={FadeOut}>
        <Text style={styles.sectionTitle}>Type Defenses</Text>
        <Text style={styles.defensesDescription}>
          The effectiveness of each type on {pokemonName}.
        </Text>
        <View style={styles.typeDefenseContainer}>
          {allTypes.map((type) => {
            const effectiveness = effectivenessMap[type] || '1';
            const capitalizedType = capitalizeFirstLetter(type);
            return (
              <View key={type} style={styles.typeDefenseItem}>
                <View style={[styles.typeImageContainer, { backgroundColor: colors[type] }]}>
                  <Image 
                    source={typeIcons[capitalizedType]}
                    style={styles.typeImage} 
                    contentFit="contain"
                    tintColor="white"
                  />
                </View>
                <Text style={styles.effectivenessValue}>
                  {effectiveness !== '1' ? effectiveness : ''}
                </Text>
              </View>
            );
          })}
        </View>
      </Animated.View>
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.grass,
    marginTop: 8,
    marginBottom: 16,
  },
  statHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  totalStats: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#747476',
    marginTop: 10,
    textAlign: 'left',
  },
  minMaxLabelContainer: {
    flexDirection: 'row',
  },
  minMaxLabel: {
    width: 40,
    textAlign: 'center',
    fontSize: 12,
    color: '#747476',
    fontWeight: 'bold',
  },
  statNote: {
    fontSize: 12,
    color: '#747476',
    marginTop: 20,
    marginBottom: 16,
  },
  defensesDescription: {
    fontSize: 18,
    color: '#747476',
    marginTop: 8,
    marginBottom: 20,
  },
  typeDefenseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  typeDefenseItem: {
    alignItems: 'center',
    width: '11.11%',  // 9개씩 표시하기 위해 조정
    marginBottom: 16,
  },
  typeImageContainer: {
    width: 30,
    height: 30,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeImage: {
    width: 20,
    height: 20,
  },
  effectivenessValue: {
    fontSize: 12,
    color: '#747476',
    marginTop: 4,
  },
});

export default StatsTab;

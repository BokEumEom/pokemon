// pokemon/components/profile/PokemonHeader.jsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Tag from '../Tag';
import Tabs from './Tabs';
import { useRouter } from 'expo-router';
import { backgroundColors } from '@/constants/colors';

const { height: windowHeight } = Dimensions.get('window');

const PokemonHeader = ({ pokemon, activeTab, setActiveTab }) => {
  const router = useRouter();
  const { id, name, types, sprites: { other } } = pokemon;
  const mainType = types[0].type.name;
  const backgroundColor = backgroundColors[mainType] || '#48D0B0'; 

  return (
    <View style={[styles.header, { backgroundColor }]}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={28} color="white" />
      </TouchableOpacity>

      <Text style={styles.largeText}>{name.toUpperCase()}</Text>

      <Image source={require('@/assets/images/Dots_card.png')} style={styles.dotsBackground} />

      <View style={styles.pokemonInfoWrapper}>
        <View style={styles.leftSection}>
          <Image source={{ uri: other['official-artwork'].front_default }} style={styles.pokemonImage} />
        </View>

        <View style={styles.rightSection}>
          <Text style={styles.pokemonId}>#{id.toString().padStart(3, '0')}</Text>
          <Text style={styles.pokemonName}>{name}</Text>
          <View style={styles.typesContainer}>
            {types.map(type => (
              <Tag key={type.type.name} type={type.type.name} />
            ))}
          </View>
        </View>
      </View>

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: windowHeight * 0.40, // Adjusted to accommodate the tabs
    padding: 20,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  largeText: {
    position: 'absolute',
    top: 40,
    left: 20,
    fontSize: 120,
    color: 'rgba(255, 255, 255, 0.1)',
    fontWeight: 'bold',
    zIndex: 1,
    textTransform: 'uppercase',
  },
  pokemonInfoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
    flex: 1,
  },
  leftSection: {
    flex: 1,
    alignItems: 'center',
  },
  pokemonImage: {
    width: 150,
    height: 150,
  },
  rightSection: {
    flex: 1.5,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  pokemonId: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  pokemonName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'capitalize',
  },
  typesContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  dotsBackground: {
    position: 'absolute',
    top: 200,
    right: -10,
    width: 100,
    height: 100,
    resizeMode: 'contain',
    zIndex: 2,
  },
});

export default PokemonHeader;

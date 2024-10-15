// pokemon/components/profile/ProfileScreen.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { fetchPokemonDetails, fetchPokemonSpecies, fetchEvolutionChain } from '@/services/api'; // Ensure this import is correct
import { calculateTypeDefenses } from '@/services/stats';
import PokemonHeader from './PokemonHeader';
import AboutTab from './AboutTab';
import StatsTab from './StatsTab';
import EvolutionTab from './EvolutionTab';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const ProfileScreen = () => {
  const { id } = useLocalSearchParams();
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [typeDefenses, setTypeDefenses] = useState([]);
  const [evolutionChain, setEvolutionChain] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('About');

  useEffect(() => {
    const loadPokemonData = async () => {
      try {
        const [pokemonData, speciesData] = await Promise.all([
          fetchPokemonDetails(id),
          fetchPokemonSpecies(id),
        ]);
        setPokemon(pokemonData);
        setSpecies(speciesData);

        const defenses = await calculateTypeDefenses(pokemonData.types);
        setTypeDefenses(defenses);

        const evolutionChainId = extractIdFromUrl(speciesData.evolution_chain.url);
        const evolutionData = await fetchEvolutionChain(evolutionChainId);
        setEvolutionChain(evolutionData.chain);

      } catch (e) {
        setError(e);
        console.error('Error loading Pokemon data:', e);
      }
    };

    loadPokemonData();
  }, [id]);

  const extractIdFromUrl = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 2];
  };

  if (error) {
    return <Text>Error loading data: {error.message}</Text>;
  }

  if (!pokemon || !species) {
    return <Text>Loading...</Text>;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'About':
        return (
          <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.tabContent}>
            <AboutTab pokemon={pokemon} species={species} />
          </Animated.View>
        );
      case 'Stats':
        return (
          <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.tabContent}>
            <StatsTab stats={pokemon.stats} types={pokemon.types} typeDefenses={typeDefenses} />
          </Animated.View>
        );
      case 'Evolution':
        return (
          <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.tabContent}>
            <EvolutionTab species={species} evolutionChain={evolutionChain} />
          </Animated.View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <PokemonHeader pokemon={pokemon} activeTab={activeTab} setActiveTab={setActiveTab} />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {renderTabContent()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: 'white',
    padding: 20,
  },
  tabContent: {
    flex: 1,
    width: '100%',
  },
});

export default ProfileScreen;

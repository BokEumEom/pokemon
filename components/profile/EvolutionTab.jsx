// pokemon/components/profile/EvolutionTab.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { fetchEvolutionChain, fetchPokemonDetails } from '@/services/api';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const EvolutionTab = ({ species }) => {
  const [evolutionChain, setEvolutionChain] = useState(null);

  useEffect(() => {
    const loadEvolutionChain = async () => {
      try {
        const evolutionChainId = extractIdFromUrl(species.evolution_chain.url);
        const chain = await fetchEvolutionChain(evolutionChainId);
        const enhancedChain = await enhanceChainWithDetails(chain.chain);
        setEvolutionChain(enhancedChain);
      } catch (error) {
        console.error('Failed to load evolution chain:', error);
      }
    };
    loadEvolutionChain();
  }, [species]);

  const extractIdFromUrl = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 2];
  };

  const enhanceChainWithDetails = async (chain) => {
    const pokemonId = extractIdFromUrl(chain.species.url);
    const details = await fetchPokemonDetails(pokemonId);
    
    const enhancedChain = {
      ...chain,
      details: {
        id: details.id,
        name: details.name,
        image: details.sprites.other['official-artwork']?.front_default || details.sprites.front_default,
      },
    };

    if (chain.evolves_to.length > 0) {
      enhancedChain.evolves_to = await Promise.all(
        chain.evolves_to.map(evolution => enhanceChainWithDetails(evolution))
      );
    }

    return enhancedChain;
  };

  const renderEvolutionStage = (stage, evolutionDetails = null) => {
    if (!stage || !stage.details) return null;
    const { details } = stage;

    return (
      <Animated.View style={styles.evolutionStage} entering={FadeIn} exiting={FadeOut}>
        <View style={styles.pokemonContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: details.image }}
              style={styles.pokemonImage}
              placeholder="blur" // Displays a blurred version of the image until fully loaded
              transition={500} // Adds a fade transition of 500ms
              contentFit="cover"
            />
          </View>
          <Text style={styles.pokemonNumber}>#{details.id.toString().padStart(3, '0')}</Text>
          <Text style={styles.pokemonName}>{details.name.charAt(0).toUpperCase() + details.name.slice(1)}</Text>
        </View>
        {evolutionDetails && (
          <View style={styles.arrowContainer}>
            <Text style={styles.arrow}>→</Text>
            {evolutionDetails.min_level && (
              <Text style={styles.evolutionLevel}>
                (Level {evolutionDetails.min_level})
              </Text>
            )}
          </View>
        )}
      </Animated.View>
    );
  };

  const renderEvolutionChain = (chain) => {
    if (!chain || !chain.evolves_to[0]) return null;
    const secondStage = chain.evolves_to[0];
    const thirdStage = secondStage.evolves_to[0];

    return (
      <View style={styles.chainContainer}>
        <View style={styles.evolutionRow}>
          {renderEvolutionStage(chain, chain.evolves_to[0].evolution_details[0])}
          {renderEvolutionStage(secondStage)}
        </View>
        {thirdStage && (
          <View style={styles.evolutionRow}>
            {renderEvolutionStage(secondStage, thirdStage.evolution_details[0])}
            {renderEvolutionStage(thirdStage)}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Evolution Chart</Text>
      {evolutionChain ? (
        renderEvolutionChain(evolutionChain)
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#62B957',
    marginBottom: 20,
    textAlign: 'center',
  },
  chainContainer: {
    alignItems: 'center',
  },
  evolutionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  evolutionStage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pokemonContainer: {
    alignItems: 'center',
  },
  imageContainer: {
    backgroundColor: '#F2F2F2',
    borderRadius: 75,
    padding: 10,
    marginBottom: 10,
  },
  pokemonImage: {
    width: 120,
    height: 120,
    borderRadius: 60, // Ensure the image is circular
  },
  pokemonNumber: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  pokemonName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textTransform: 'capitalize',
  },
  arrowContainer: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  arrow: {
    fontSize: 24,
    color: '#62B957',
    marginBottom: 5,
  },
  evolutionLevel: {
    fontSize: 14,
    color: '#666',
  },
});

export default EvolutionTab;

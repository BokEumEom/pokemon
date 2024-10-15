// pokemon/components/profile/AboutTab.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import DataSection from './DataSection';
import DataRow from './DataRow';
import { fetchPokemonLocations, calculateTypeDefenses } from '@/services/api';
import { typeIcons } from '@/constants/typeIcons';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Image } from 'expo-image';

const AboutTab = ({ pokemon, species }) => {
  const [locations, setLocations] = useState([]);
  const [weaknesses, setWeaknesses] = useState([]);

  useEffect(() => {
    // Load weaknesses first to display them as early as possible
    const loadWeaknesses = async () => {
      try {
        const weaknessesData = await calculateTypeDefenses(pokemon.types);
        const filteredWeaknesses = weaknessesData
          .filter(w => parseFloat(w.effectiveness) > 1)
          .map(w => w.type);
        setWeaknesses(filteredWeaknesses);
      } catch (error) {
        console.error('Error fetching weaknesses:', error);
      }
    };

    const loadLocations = async () => {
      try {
        const locationsData = await fetchPokemonLocations(pokemon.id);
        const formattedLocations = locationsData.map(location =>
          location.location_area.name.replace('-', ' ').toUpperCase()
        );
        setLocations(formattedLocations);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    loadWeaknesses();
    loadLocations();
  }, [pokemon.id, pokemon.types]);

  const memoizedData = useMemo(() => {
    const description = species.flavor_text_entries.find(entry => entry.language.name === 'en')?.flavor_text || 'No description available.';
    const genus = species.genera.find(g => g.language.name === 'en')?.genus;
    const height = `${pokemon.height / 10} m (${(pokemon.height / 10 * 3.281).toFixed(2)}′)`;
    const weight = `${pokemon.weight / 10} kg (${(pokemon.weight / 10 * 2.205).toFixed(1)} lbs)`;
    const eggGroups = species.egg_groups.map(group => group.name).join(', ');
    const abilities = pokemon.abilities
      .sort((a, b) => a.slot - b.slot)
      .map((abilityObj, index) => {
        const abilityName = abilityObj.ability.name.replace('-', ' ');
        const isHidden = abilityObj.is_hidden;
        return `${index + 1}. ${abilityName}${isHidden ? ' (hidden ability)' : ''}`;
      })
      .join(', ');
    const femaleRatio = (species.gender_rate / 8) * 100;
    const maleRatio = 100 - femaleRatio;

    return {
      description,
      genus,
      height,
      weight,
      eggGroups,
      abilities,
      femaleRatio,
      maleRatio
    };
  }, [pokemon, species]);

  const renderWeaknesses = () => (
    <View style={styles.weaknessesContainer}>
      {weaknesses.map((weakness, index) => (
        <Animated.View
          key={index}
          style={styles.weaknessItem}
          entering={FadeIn.delay(50 * index)} // Faster staggered delay
        >
          <Image
            source={typeIcons[weakness.charAt(0).toUpperCase() + weakness.slice(1)]}
            style={styles.weaknessIcon}
            contentFit="cover"
            transition={300} // Faster transition for the image loading
            accessibilityLabel={`${weakness} type`}
          />
        </Animated.View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.description}>{memoizedData.description}</Text>

      <DataSection title="Pokédex Data">
        <DataRow label="Species" value={memoizedData.genus} />
        <DataRow label="Height" value={memoizedData.height} />
        <DataRow label="Weight" value={memoizedData.weight} />
        <DataRow label="Abilities" value={memoizedData.abilities} />
        <DataRow label="Weaknesses" value={renderWeaknesses()} />
      </DataSection>

      <DataSection title="Training">
        <DataRow label="EV Yield" value="1 Special Attack" />
        <DataRow label="Catch Rate" value="45 (5.9% with PokéBall, full HP)" />
        <DataRow label="Base Friendship" value="70 (normal)" />
        <DataRow label="Base Exp" value={pokemon.base_experience.toString()} />
        <DataRow label="Growth Rate" value={species.growth_rate.name} />
      </DataSection>

      <DataSection title="Breeding">
        <DataRow label="Gender">
          <Text style={styles.genderValue}>
            <Text style={styles.female}>♀ {memoizedData.femaleRatio.toFixed(1)}%</Text>, <Text style={styles.male}>♂ {memoizedData.maleRatio.toFixed(1)}%</Text>
          </Text>
        </DataRow>
        <DataRow label="Egg Groups" value={memoizedData.eggGroups} />
        <DataRow label="Egg Cycles" value={`${species.hatch_counter} (steps: ${species.hatch_counter * 257})`} />
      </DataSection>

      {locations.length > 0 && (
        <DataSection title="Location">
          {locations.map((location, index) => (
            <Text key={index} style={styles.infoValue}>{location}</Text>
          ))}
        </DataSection>
      )}
    </View>
  );
};

AboutTab.propTypes = {
  pokemon: PropTypes.object.isRequired,
  species: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
  },
  infoValue: {
    color: '#555',
    textTransform: 'capitalize',
  },
  weaknessesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  weaknessItem: {
    marginRight: 8,
    marginBottom: 8,
  },
  weaknessIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  genderValue: {
    flexDirection: 'row',
    textAlign: 'right',
  },
  female: {
    color: '#f67f99',
  },
  male: {
    color: '#6890f0',
  },
});

export default React.memo(AboutTab);

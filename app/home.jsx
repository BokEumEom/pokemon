// pokemon/app/home.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Header from '../components/Header';
import PokemonList from '../components/PokemonList';
import GenerationModal from '../components/GenerationModal';
import FilterModal from '../components/FilterModal';
import SortModal from '../components/SortModal';
import FloatingActionButton from '../components/FloatingActionButton'; // Import FAB component
import { fetchPokemons } from '../services/pokemon';
import { useFontsLoaded } from '../hooks/useFontsLoaded';
import { sortPokemons } from '../utils/sortPokemons';

const Home = () => {
  const fontsLoaded = useFontsLoaded();
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSort, setCurrentSort] = useState('smallest');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedGeneration, setSelectedGeneration] = useState(null);
  const [modalVisibility, setModalVisibility] = useState({
    generation: false,
    filter: false,
    sort: false,
  });
  const [error, setError] = useState(null);
  const [displayMode, setDisplayMode] = useState('list');

  useEffect(() => {
    if (fontsLoaded) {
      loadInitialPokemons();
    }
  }, [fontsLoaded]);

  const loadInitialPokemons = async () => {
    try {
      setLoading(true);
      const initialPokemons = await fetchPokemons(20);
      setPokemons(initialPokemons);
    } catch (e) {
      handleError(e);
    } finally {
      setLoading(false);
    }
  };

  const loadMorePokemons = useCallback(async () => {
    if (loading) return;
    try {
      setLoading(true);
      const newPokemons = await fetchPokemons(20, pokemons.length);
      setPokemons(prevPokemons => [...prevPokemons, ...newPokemons]);
    } catch (e) {
      handleError(e);
    } finally {
      setLoading(false);
    }
  }, [pokemons.length, loading]);

  const handleError = (e) => {
    console.error('Error:', e);
    setError(e);
    Alert.alert('Error', e.message, [{ text: 'OK', onPress: () => setError(null) }]);
  };

  const handleSort = (sortType) => {
    setCurrentSort(sortType);
    setPokemons(prevPokemons => sortPokemons(prevPokemons, sortType));
  };

  const handleFilter = (types) => {
    setSelectedTypes(types);
    // Implement filtering logic based on selectedTypes here
  };

  const handleGenerationSelect = (generation) => {
    setSelectedGeneration(generation);
    // Implement generation filtering logic here
  };

  const toggleDisplayMode = useCallback(() => {
    setDisplayMode(prevMode => prevMode === 'list' ? 'grid' : 'list');
  }, []);

  const toggleModal = (modalType, isVisible) => {
    setModalVisibility(prevState => ({ ...prevState, [modalType]: isVisible }));
  };

  if (!fontsLoaded || loading) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <Text>Error: {error.message}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar style="dark" />
      <Header />
      <View style={styles.container}>
        <PokemonList 
          pokemons={pokemons} 
          loadMorePokemons={loadMorePokemons}
          displayMode={displayMode}
        />
        {/* Floating Action Button */}
        <FloatingActionButton
          onOpenGeneration={() => toggleModal('generation', true)}
          onOpenSort={() => toggleModal('sort', true)}
          onOpenFilter={() => toggleModal('filter', true)}
          onToggleDisplayMode={toggleDisplayMode}
          displayMode={displayMode}
        />
      </View>
      <GenerationModal
        visible={modalVisibility.generation}
        onClose={() => toggleModal('generation', false)}
        onSelect={handleGenerationSelect}
      />
      <FilterModal
        visible={modalVisibility.filter}
        onClose={() => toggleModal('filter', false)}
        onApply={handleFilter}
      />
      <SortModal
        visible={modalVisibility.sort}
        onClose={() => toggleModal('sort', false)}
        onSort={handleSort}
        currentSort={currentSort}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor removed to not match Header color
  },
  container: {
    flex: 1,
    backgroundColor: '#F6F7FB', // Main content background color
  },
});

export default Home;

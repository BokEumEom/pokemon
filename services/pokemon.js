import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const POKEMON_API_URL = 'https://pokeapi.co/api/v2/pokemon';
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const fetchPokemons = async (limit = 20, offset = 0) => {
  try {
    const cacheKey = `pokemonData_${limit}_${offset}`;
    const cachedData = await AsyncStorage.getItem(cacheKey);
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      if (Date.now() - timestamp < CACHE_EXPIRATION) {
        return data;
      }
    }

    const response = await axios.get(`${POKEMON_API_URL}?limit=${limit}&offset=${offset}`);
    const results = response.data.results;
    const pokemonPromises = results.map(pokemon => axios.get(pokemon.url));
    const pokemonResponses = await Promise.all(pokemonPromises);
    const pokemons = pokemonResponses.map(res => {
      const pokemon = res.data;
      return {
        id: pokemon.id,
        name: pokemon.name,
        types: pokemon.types,
        sprites: {
          other: {
            'official-artwork': {
              front_default: pokemon.sprites.other['official-artwork'].front_default
            }
          }
        }
      };
    });

    await AsyncStorage.setItem(cacheKey, JSON.stringify({
      data: pokemons,
      timestamp: Date.now()
    }));

    return pokemons;
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    throw error;
  }
};

export const fetchPokemonDetails = async (id) => {
  try {
    const cacheKey = `pokemonDetails_${id}`;
    const cachedData = await AsyncStorage.getItem(cacheKey);
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      if (Date.now() - timestamp < CACHE_EXPIRATION) {
        return data;
      }
    }

    const response = await axios.get(`${POKEMON_API_URL}/${id}`);
    const pokemonData = response.data;

    await AsyncStorage.setItem(cacheKey, JSON.stringify({
      data: pokemonData,
      timestamp: Date.now()
    }));

    return pokemonData;
  } catch (error) {
    console.error(`Error fetching details for Pokémon ${id}:`, error);
    throw error;
  }
};
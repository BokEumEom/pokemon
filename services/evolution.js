import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://pokeapi.co/api/v2';
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const fetchEvolutionChain = async (id) => {
  try {
    const cacheKey = `evolutionChain_${id}`;
    const cachedData = await AsyncStorage.getItem(cacheKey);
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      if (Date.now() - timestamp < CACHE_EXPIRATION) {
        return data;
      }
    }

    const response = await axios.get(`${BASE_URL}/evolution-chain/${id}/`);
    const evolutionData = response.data;

    await AsyncStorage.setItem(cacheKey, JSON.stringify({
      data: evolutionData,
      timestamp: Date.now()
    }));

    return evolutionData;
  } catch (error) {
    console.error('Error fetching evolution chain:', error);
    throw error;
  }
};
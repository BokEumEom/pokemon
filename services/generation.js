// pokemon/services/generation.js
import axios from 'axios';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchGenerations = async () => {
  try {
    const response = await axios.get(`${POKEAPI_BASE_URL}/generation/`);
    return response.data.results; // This returns an array of generations with their name and URL
  } catch (error) {
    console.error('Error fetching generation data:', error);
    throw error;
  }
};

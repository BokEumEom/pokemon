// pokemon/services/location.js
import axios from 'axios';

const LOCATION_API_URL = 'https://pokeapi.co/api/v2/pokemon';

// Fetch locations where the Pokémon can be found
export const fetchPokemonLocations = async (id) => {
  try {
    const response = await axios.get(`${LOCATION_API_URL}/${id}/encounters`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching locations for Pokémon ${id}:`, error);
    throw error;
  }
};

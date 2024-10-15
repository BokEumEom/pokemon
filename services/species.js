// pokemon/services/species.js
import axios from 'axios';

const SPECIES_API_URL = 'https://pokeapi.co/api/v2/pokemon-species';

export const fetchPokemonSpecies = async (id) => {
  try {
    const response = await axios.get(`${SPECIES_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching species data for Pokémon ${id}:`, error);
    throw error;
  }
};
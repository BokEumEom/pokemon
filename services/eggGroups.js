// pokemon/services/eggGroups.js
import axios from 'axios';

const EGG_GROUP_API_URL = 'https://pokeapi.co/api/v2/egg-group';

export const fetchEggGroups = async (idOrName) => {
  try {
    const response = await axios.get(`${EGG_GROUP_API_URL}/${idOrName}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching egg groups for ${idOrName}:`, error);
    throw error;
  }
};

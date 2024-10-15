import axios from 'axios';

const STATS_API_URL = 'https://pokeapi.co/api/v2/stat';
const TYPE_API_URL = 'https://pokeapi.co/api/v2/type';

export const fetchStats = async (idOrName) => {
  try {
    const response = await axios.get(`${STATS_API_URL}/${idOrName}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching stats for Pokémon ${idOrName}:`, error);
    throw error;
  }
};

export const fetchTypeDetails = async (idOrName) => {
  try {
    const response = await axios.get(`${TYPE_API_URL}/${idOrName}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching type details for ${idOrName}:`, error);
    throw error;
  }
};

export const calculateTypeDefenses = async (types) => {
  const typeEffectiveness = {};
  
  for (const type of types) {
    const typeData = await fetchTypeDetails(type.type.name);
    
    typeData.damage_relations.double_damage_from.forEach(t => {
      typeEffectiveness[t.name] = (typeEffectiveness[t.name] || 1) * 2;
    });
    
    typeData.damage_relations.half_damage_from.forEach(t => {
      typeEffectiveness[t.name] = (typeEffectiveness[t.name] || 1) * 0.5;
    });
    
    typeData.damage_relations.no_damage_from.forEach(t => {
      typeEffectiveness[t.name] = 0;
    });
  }
  
  return Object.entries(typeEffectiveness).map(([type, effectiveness]) => ({
    type,
    effectiveness: effectiveness === 1 ? '1' : effectiveness.toString()
  }));
};
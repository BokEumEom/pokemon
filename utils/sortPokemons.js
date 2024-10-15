// pokemon/utils/sortPokemons.js
export const sortPokemons = (pokemons, sortType) => {
  let sortedList = [...pokemons];
  switch (sortType) {
    case 'smallest':
      return sortedList.sort((a, b) => a.id - b.id);
    case 'highest':
      return sortedList.sort((a, b) => b.id - a.id);
    case 'az':
      return sortedList.sort((a, b) => a.name.localeCompare(b.name));
    case 'za':
      return sortedList.sort((a, b) => b.name.localeCompare(a.name));
    default:
      return sortedList;
  }
};

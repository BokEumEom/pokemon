// pokemon/components/Header.jsx
import React, { memo } from 'react';
import { View, Text, Image, TextInput, StyleSheet } from 'react-native';
import { textColor } from '../constants/colors';
import { height, width } from '../constants/constants';
import PokedexLogo from '@/assets/images/pokedex-logo.png'; // Import the Pokedex logo image
import SearchIcon from '../assets/Icons/search.svg';

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      {/* Centered Pokedex Logo */}
      <Image source={PokedexLogo} style={styles.logo} />

      <View style={styles.headerContent}>
        <Text style={styles.heading}>What Pokémon are you looking for?</Text>
        <View style={styles.searchBarRow}>
          <SearchIcon style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Pokémon, Move, Ability, etc"
            placeholderTextColor="#808080"
            accessibilityLabel="Search for a Pokémon"
            accessibilityRole="search"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: height / 3.5 + 30,
    justifyContent: 'center',
    alignItems: 'center', // Center align the content horizontally
    paddingTop: 20,
    paddingBottom: height * 0.05,
  },
  logo: {
    width: width * 0.4, // Adjust the width of the logo as needed
    height: height * 0.1, // Adjust the height of the logo as needed
    resizeMode: 'contain', // Ensures the image retains its aspect ratio
    position: 'absolute', // Position absolute to center the logo within the header
    top: 20, // Adjust as needed to position the logo correctly
    left: 20,
  },
  headerContent: {
    alignItems: 'center',
    marginTop: height * 0.1, // Adds space for the logo
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'left',
    marginBottom: 20,
  },
  searchBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F7FB',
    borderRadius: 30,
    paddingHorizontal: 15,
    height: 50,
    width: width * 0.9,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 10,
    color: '#808080',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
});

export default memo(Header);

import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import Card from './Card';

const ITEM_HEIGHT = 150; // Adjust this value based on your Card component's height

const PokemonList = ({ pokemons, loadMorePokemons, displayMode }) => {
  const router = useRouter();

  const handlePokemonPress = useCallback((id) => {
    router.push(`/profile/${id}`);
  }, [router]);

  const renderItem = useCallback(({ item, index }) => (
    <Animated.View
      entering={FadeInDown.delay(index * 100).springify()}
      style={[
        { width: displayMode === 'grid' ? '50%' : '100%' }
      ]}
    >
      <Card 
        item={item} 
        onPress={() => handlePokemonPress(item.id)} 
        displayMode={displayMode} 
      />
    </Animated.View>
  ), [handlePokemonPress, displayMode]);

  const getItemLayout = useCallback((_, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  }), []);

  return (
    <Animated.FlatList
      data={pokemons}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContent}
      onEndReached={loadMorePokemons}
      onEndReachedThreshold={0.5}
      getItemLayout={getItemLayout}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={10}
      numColumns={displayMode === 'grid' ? 2 : 1}
      key={displayMode} // This forces the list to re-render when the display mode changes
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
});

export default React.memo(PokemonList);
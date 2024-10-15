import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { backgroundColors } from '../constants/colors';
import commonStyles from '../styles/commonStyles';
import Tag from './Tag';
import Pokeball from '../assets/images/Pokeball.png';
import Pokeball_card from '../assets/images/Pokeball_card.png';
import Dots_card from '../assets/images/Dots_card.png';
import { width } from '../constants/constants';

const Card = ({ item, onPress, displayMode }) => {
  const type = item.types[0].type.name;

  if (displayMode === 'grid') {
    return (
      <TouchableOpacity onPress={onPress} style={[styles.gridCard, { backgroundColor: backgroundColors[type] }]}>
        <View style={styles.gridContent}>
          <View style={styles.gridHeader}>
            <Text style={styles.gridName}>{item.name}</Text>
            <Text style={commonStyles.gridNumber}>#{item.id.toString().padStart(3, '0')}</Text>
          </View>
          <View style={styles.gridTypeContainer}>
            {item.types.map((t, index) => (
              <Tag key={index} type={t.type.name} small />
            ))}
          </View>
          <ImageBackground
            resizeMode="contain"
            source={Pokeball}
            style={styles.gridImageBackground}
            imageStyle={styles.gridBackgroundImage}
          >
            <Image
              style={styles.gridImage}
              source={{ uri: item.sprites.other['official-artwork'].front_default }}
            />
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} style={[styles.listCard, { backgroundColor: backgroundColors[type] }]}>
      <View style={{ padding: 15, paddingRight: 0, width: width / 1.8 }}>
        <View style={{ position: 'absolute', right: 0, top: 5 }}>
          <Image source={Dots_card} style={{ width: 100, height: 40 }} />
        </View>
        <Text style={commonStyles.number}>
          #{item.id.toString().padStart(4, '0')}
        </Text>
        <Text style={commonStyles.title}>
          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        </Text>
        <View style={commonStyles.row}>
          {item.types.map((t, index) => (
            <Tag key={index} type={t.type.name} />
          ))}
        </View>
      </View>
      <ImageBackground
        resizeMode="contain"
        source={Pokeball_card}
        style={styles.imageBackground}
      >
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: item.sprites.other['official-artwork'].front_default }}
          />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listCard: {
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    marginTop: -10,
    marginLeft: -10,
  },
  imageBackground: {
    width: 100,
    height: 100,
    paddingRight: 10,
  },
  image: {
    width: 115,
    height: 115,
  },
  gridCard: {
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  gridContent: {
    padding: 12,
    height: 140,
  },
  gridHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gridName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'capitalize',
  },
  gridNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'rgba(255,255,255,0.9)',
  },
  gridTypeContainer: {
    alignItems: 'flex-start',
    position: 'absolute',
    left: 16,
    bottom: 16,
    zIndex: 1,
  },
  gridImageBackground: {
    position: 'absolute',
    right: -10,
    bottom: -10,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridBackgroundImage: {
    opacity: 0.1,
  },
  gridImage: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
});

export default Card;
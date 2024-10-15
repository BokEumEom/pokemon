// pokemon/components/GenerationModal.jsx
import React, { useState } from 'react';
import { View, Text, Modal, ImageBackground, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import Pokeball from '../assets/images/pokeball.png';
import Dots_card from '../assets/images/Dots_card.png';
import { generationImages } from '../constants/generation';

const GenerationModal = ({ visible, onClose, onSelect }) => {
  const [selectedGeneration, setSelectedGeneration] = useState(null);

  const handleSelect = (generation) => {
    setSelectedGeneration(generation);
    onSelect(generation);
    onClose();
  };

  const GenerationCard = ({ genNumber }) => {
    const isSelected = selectedGeneration === genNumber;
    return (
      <TouchableOpacity
        style={[styles.generationCard, isSelected && styles.selectedCard]}
        onPress={() => handleSelect(genNumber)}
      >
        <View style={{ position: 'absolute', left: 15, top: 10 }}>
          <Image source={Dots_card} style={{ width: 80, height: 35 }} />
        </View>
        <ImageBackground
          resizeMode="contain"
          source={Pokeball}
          style={styles.imageBackground}
          imageStyle={styles.imageBackgroundStyle}
        >
          <View style={styles.generationImageContainer}>
            {generationImages[genNumber].map((image, index) => (
              <Image
                key={`${genNumber}-${index}`} // 고유한 키 할당
                source={image}
                style={styles.generationImage}
                contentFit="contain"
              />
            ))}
          </View>
        </ImageBackground>
        <Text style={styles.generationText}>Generation {genNumber}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.dragIndicator} />
          <Text style={styles.title}>Generations</Text>
          <Text style={styles.subtitle}>
            Use search for generations to explore your Pokémon!
          </Text>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.generationGrid}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((genNumber) => (
                <GenerationCard key={genNumber} genNumber={genNumber} />
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 30,
    maxHeight: '85%',
  },
  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#EA5D60',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  scrollContent: {
    flexGrow: 1,
  },
  generationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  generationCard: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: '#F2F2F2',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  selectedCard: {
    backgroundColor: '#EA5D60',
  },
  generationImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
  },
  generationImage: {
    width: '30%',
    aspectRatio: 1,
  },
  generationText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#747476',
    textAlign: 'center',
  },
  imageBackgroundStyle: {
    opacity: 0.1,
  },
});

export default GenerationModal;

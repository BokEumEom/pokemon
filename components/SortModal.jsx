import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Button from './Button'; // Import the Button component

const SortModal = ({ visible, onClose, onSort, currentSort }) => {
  const [selectedSort, setSelectedSort] = useState(currentSort);

  const handleSort = (sortType) => {
    setSelectedSort(sortType);
    onSort(sortType);
    onClose();  // Close the modal after sorting
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.dragIndicator}></View>

            <Text style={styles.title} accessibilityRole="header">Sort</Text>
            <Text style={styles.subtitle}>
              Sort Pokémon alphabetically or by National Pokédex number!
            </Text>

            <Button 
              title="Smallest number first"
              type={selectedSort === 'smallest' ? 'primary' : 'secondary'}
              onPress={() => handleSort('smallest')}
            />
            <Button 
              title="Highest number first"
              type={selectedSort === 'highest' ? 'primary' : 'secondary'}
              onPress={() => handleSort('highest')}
            />
            <Button 
              title="A-Z"
              type={selectedSort === 'az' ? 'primary' : 'secondary'}
              onPress={() => handleSort('az')}
            />
            <Button 
              title="Z-A"
              type={selectedSort === 'za' ? 'primary' : 'secondary'}
              onPress={() => handleSort('za')}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
    maxHeight: '70%',
  },
  dragIndicator: {
    width: 50,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 20,
  },
});

export default SortModal;

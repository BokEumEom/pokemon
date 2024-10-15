import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo

const Tabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { name: 'About', icon: 'information-circle-outline' },
    { name: 'Stats', icon: 'stats-chart-outline' },
    { name: 'Evolution', icon: 'git-branch-outline' }
  ];

  return (
    <View style={styles.tabsContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          onPress={() => setActiveTab(tab.name)}
          style={styles.tabButton}
          activeOpacity={0.7}
        >
          <View style={[
            styles.tabContent,
            activeTab === tab.name && styles.activeTabContent
          ]}>
            <Ionicons 
              name={tab.icon} 
              size={24} 
              color={activeTab === tab.name ? '#3D3D3D' : 'rgba(255, 255, 255, 0.8)'}
              style={styles.tabIcon}
            />
            <Text style={[
              styles.tabText,
              activeTab === tab.name && styles.activeTabText
            ]}>
              {tab.name}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'transparent',
    zIndex: 10, // Ensure tabs are above other elements
  },
  tabButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  activeTabContent: {
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabIcon: {
    marginRight: 8,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  activeTabText: {
    color: '#3D3D3D',
  },
});

export default React.memo(Tabs);
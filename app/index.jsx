// pokemon/app/index.jsx
import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { useFontsLoaded } from '../hooks/useFontsLoaded'; // Import the custom hook
import { Image } from 'expo-image'; // Use expo-image for optimized loading
import { Asset } from 'expo-asset'; // Preload images with expo-asset

const Index = () => {
  const router = useRouter();
  const fontsLoaded = useFontsLoaded(); // Use the custom hook to check if fonts are loaded
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Preload the welcome image
  useEffect(() => {
    const preloadImage = async () => {
      await Asset.loadAsync(require('@/assets/images/welcome.png'));
      setIsImageLoaded(true);
    };
    preloadImage();
  }, []);

  if (!fontsLoaded || !isImageLoaded) {
    // Show a loading indicator while fonts and image are loading
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {/* Use expo-image with progressive loading */}
      <Image
        style={styles.backgroundImage}
        source={require('@/assets/images/welcome.png')}
        contentFit="cover"
        transition={500} // Smooth transition effect
      />
      <Animated.View entering={FadeInDown.delay(100).springify()}>
        <TouchableOpacity
          onPress={() => router.push('home')}
          style={styles.getStartedButton}
          accessibilityLabel="Get Started Button"
        >
          <Text style={styles.getStartedButtonText}>
            Let's Go
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#000000', // Background color to match the initial loading screen
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000', // Background color to match the initial loading screen
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  getStartedButton: {
    height: hp(7),
    width: wp(70),
    backgroundColor: '#EA5D60',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#e5e7eb',
    alignSelf: 'center',
    marginBottom: hp(10),
  },
  getStartedButtonText: {
    fontSize: hp(3),
    color: '#ffffff',
    fontWeight: 'bold',
    letterSpacing: 2,
    fontFamily: 'SF-Pro-Display-Bold', // Apply custom font
  },
});

export default Index;

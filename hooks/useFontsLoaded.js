// pokemon/hooks/useFontsLoaded.js
import { useState, useEffect } from 'react';
import * as Font from 'expo-font';

export const useFontsLoaded = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          'SF-Pro-Display-Bold': require('../assets/fonts/SF-Pro-Display-Bold.otf'),
          'SF-Pro-Display-Regular': require('../assets/fonts/SF-Pro-Display-Regular.otf'),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts', error);
      }
    };

    loadFonts();
  }, []);

  return fontsLoaded;
};

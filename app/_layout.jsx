import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';

const _layout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
          animationEnabled: true
        }}
      >
        {/* Add your screens here */}
        <Stack.Screen name="index" />
        <Stack.Screen name="home" />
        <Stack.Screen name="profile/[id]" />
      </Stack>
    </GestureHandlerRootView>
  );
};

export default _layout;

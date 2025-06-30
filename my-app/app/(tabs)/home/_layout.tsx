import { Stack } from 'expo-router';
import React from 'react';

export default function HomeStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="search" />
      <Stack.Screen name="inbox" />
      <Stack.Screen name="conversation" />
      <Stack.Screen name="prayers" />
      <Stack.Screen name="prayer-detail" />
    </Stack>
  );
}

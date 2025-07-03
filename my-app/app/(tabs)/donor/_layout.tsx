import { Stack } from 'expo-router';
import React from 'react';

export default function DonorStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="donordarah" />
      <Stack.Screen name="donorasi" />
      <Stack.Screen name="pendaftarandonordarah" />
      <Stack.Screen name="pendaftarandonorasi" />
    </Stack>
  );
}
import { Stack } from 'expo-router';
import React from 'react';

export default function VolunteerStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="detail" />
      <Stack.Screen name="pendaftaran" />
    </Stack>
  );
}

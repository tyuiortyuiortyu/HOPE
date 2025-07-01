import { Stack } from 'expo-router';
import React from 'react';

export default function VolunteerStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="listvolunteer" />
      <Stack.Screen name="detail" />
      <Stack.Screen name="pendaftaran" />
    </Stack>
  );
}

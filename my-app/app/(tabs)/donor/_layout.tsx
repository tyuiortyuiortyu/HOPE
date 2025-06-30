import { Stack } from 'expo-router';
import React from 'react';

export default function DonorStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Halaman utama (index.tsx) tidak akan menampilkan header */}
      <Stack.Screen name="index" />
      
      {/* Halaman tujuan akan memiliki header dengan judul */}
      <Stack.Screen name="donordarah" />
      <Stack.Screen name="donorasi" />
      
      {/* Tambahkan screen pendaftaran di sini */}
      <Stack.Screen name="pendaftarandonordarah" />
      <Stack.Screen name="pendaftarandonorasi" />
    </Stack>
  );
}
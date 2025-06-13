import { Stack } from 'expo-router';
import React from 'react';

export default function DonorStackLayout() {
  return (
    <Stack
      // Atur style header default untuk semua screen di stack ini
      screenOptions={{
        headerStyle: {
          backgroundColor: '#82C7C1', // Warna teal header
        },
        headerTintColor: '#fff', // Warna teks dan panah kembali
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShadowVisible: false, // Menghilangkan bayangan di bawah header
      }}
    >
      {/* Halaman utama (index.tsx) tidak akan menampilkan header */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      
      {/* Halaman tujuan akan memiliki header dengan judul */}
      <Stack.Screen 
        name="donordarah" 
        options={{ 
          title: '', // Judul dikosongkan agar hanya panah kembali yang terlihat
          headerTransparent: true, // Membuat header transparan
        }} 
      />
      <Stack.Screen 
        name="donorasi" 
        options={{ 
          title: '',
          headerTransparent: true, // Membuat header transparan 
        }} 
      />
      {/* Tambahkan screen pendaftaran di sini */}
      <Stack.Screen name="pendaftarandonordarah" options={{ title: 'Pendaftaran Donor Darah' }} />
      <Stack.Screen name="pendaftarandonorasi" options={{ title: 'Pendaftaran Donor ASI' }} />
    </Stack>
  );
}
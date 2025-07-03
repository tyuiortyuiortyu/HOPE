// File: app/activity/pendaftaran.tsx

import { View, Text, Image, ScrollView, TouchableOpacity, StatusBar, StyleSheet, TextInput, Alert, SafeAreaView } from 'react-native';
import React, { useState, useMemo } from 'react';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams, Redirect } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import Checkbox from 'expo-checkbox';
import images from '../../../constants/images'; // Pastikan path ini benar

// ============================================
// KOMPONEN-KOMPONEN KUSTOM (DIADAPTASI)
// ============================================

// Komponen untuk input teks biasa
const FormField = ({ label, placeholder, keyboardType = 'default', value, onChangeText }) => (
  <View style={{ marginBottom: 16 }}>
    <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 8, color: '#374151' }}>
      {label}
    </Text>
    <View style={{ width: '100%' }}> {/* Bungkus dengan View */}
      <TextInput
        style={{
          width: '100%', // ✅ wajib
          backgroundColor: '#F3F4F6',
          borderRadius: 10,
          paddingHorizontal: 16,
          paddingVertical: 12,
          fontSize: 16,
          color: '#1F2937',
          borderWidth: 1,
          borderColor: '#D1D5DB',
        }}
        placeholder={placeholder || `Masukkan ${label}`}
        placeholderTextColor="#9CA3AF"
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  </View>
);

// Komponen untuk pilihan seperti Jenis Kelamin dan Status
const PilihanOpsi = ({ label, options, value, onSelect }) => (
  <View className="mb-4">
    <Text className="text-base font-semibold text-black mb-2">{label}</Text>
    <View className="flex-row space-x-4">
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          onPress={() => onSelect(option)}
          style={{ backgroundColor: value === option ? '#82C7C1' : '#D9D9D9' }}
          className="px-5 py-3 rounded-[15px] me-3 items-center"
        >
          <Text style={{ color: value === option ? '#FFFFFF' : '#000000' }} className="font-semibold">{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

const PendaftaranScreen = () => {
  const router = useRouter();
  const { activityId } = useLocalSearchParams();

  // State terpusat untuk semua data form
  const [formData, setFormData] = useState({
    nama: '',
    jenisKelamin: '',
    nik: '',
    alamat: '',
    domisili: '',
    status: '',
    pendidikan: '',
    nomorTelepon: '',
    fotoKTP: null,
  });
  const [setujuSK, setSetujuSK] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handler generik untuk memperbarui state
  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Fungsi untuk memilih gambar KTP
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    if (!result.canceled) {
      handleInputChange('fotoKTP', result.assets[0].uri);
    }
  };

  // Validasi form menggunakan useMemo
  const isFormValid = useMemo(() => {
    const requiredFields = ['nama', 'jenisKelamin', 'nik', 'alamat', 'domisili', 'status', 'pendidikan', 'nomorTelepon'];
    const allFieldsFilled = requiredFields.every(field => formData[field]?.trim());
    return allFieldsFilled && formData.fotoKTP && setujuSK;
  }, [formData, setujuSK]);
  
  const handleDaftar = () => {
    if (!isFormValid) {
      Alert.alert("Form Tidak Lengkap", "Harap isi semua data, unggah KTP, dan setujui S&K.");
      return;
    }
    // Jika valid, tampilkan layar sukses
    setIsSubmitted(true);
  };

  // Redirect jika tidak ada ID
  if (!activityId) return <Redirect href="/volunteer/listvolunteer" />;

  // Layar Sukses
  if (isSubmitted) {
    return (
      <SafeAreaView style={styles.container}>
        <View className="flex-1 items-center justify-center p-8">
          <Ionicons name="checkmark-circle" size={80} color="#10B981" className="mb-4" />
          <Text className="text-2xl font-bold text-center mb-2">Pendaftaran Berhasil!</Text>
          <Text className="text-base text-gray-600 text-center mb-6">Terima kasih telah mendaftar. Informasi selanjutnya akan kami kirimkan melalui nomor telepon Anda.</Text>
          <TouchableOpacity onPress={() => router.replace('/volunteer/listvolunteer')} className="bg-black py-3 px-8 rounded-full">
            <Text className="text-white font-bold text-base">Kembali ke Daftar Volunteer</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Layar Form
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        
        <View className="relative">
          <Image source={images.volunteer1} className="w-full h-56 rounded-b-[30px]" resizeMode="cover"/>
          <TouchableOpacity className="absolute top-14 left-5 bg-white p-2 rounded-full" style={styles.shadow} onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View className="p-5">
          <View className="mt-2 space-y-2">
            <View className="flex-row items-center"><View className="w-5 h-5 rounded-full border-2 border-gray-400 mr-3" /><Text className="text-base text-gray-700">Sentul, Bogor</Text></View>
            <View className="flex-row items-center"><View className="w-5 h-5 rounded-full border-2 border-gray-400 mr-3" /><Text className="text-base text-gray-700">12 Mei 2025</Text></View>
            <View className="flex-row items-center mt-2"><View className="w-8 h-8 rounded-full bg-gray-300 mr-3" /><Text className="text-base text-gray-700">Diselenggarakan oleh Hope</Text></View>
          </View>

          <View className="border-b border-gray-200 my-5" />

          <View>
            <Text className="text-xl font-bold text-black mb-4">Form Pendaftaran</Text>
            
            <FormField label="Nama" value={formData.nama} onChangeText={(val) => handleInputChange('nama', val)} />
            <PilihanOpsi label="Jenis Kelamin" options={['Laki-laki', 'Perempuan']} value={formData.jenisKelamin} onSelect={(val) => handleInputChange('jenisKelamin', val)} />
            <FormField label="NIK" value={formData.nik} onChangeText={(val) => handleInputChange('nik', val)} keyboardType="numeric" />
            <FormField label="Alamat" value={formData.alamat} onChangeText={(val) => handleInputChange('alamat', val)} />
            <FormField label="Domisili" value={formData.domisili} onChangeText={(val) => handleInputChange('domisili', val)} />
            <PilihanOpsi label="Status" options={['Single', 'Married']} value={formData.status} onSelect={(val) => handleInputChange('status', val)} />
            <FormField label="Pendidikan" value={formData.pendidikan} onChangeText={(val) => handleInputChange('pendidikan', val)} />
            <FormField label="Nomor Telepon" value={formData.nomorTelepon} onChangeText={(val) => handleInputChange('nomorTelepon', val)} keyboardType="phone-pad" />
            
            <View className="mb-6">
              <Text className="text-base font-semibold text-black mb-2">Upload Foto KTP</Text>
              <TouchableOpacity onPress={pickImage} className="bg-gray-100 rounded-2xl h-40 items-center justify-center border-2 border-dashed border-gray-300 overflow-hidden">
                {formData.fotoKTP ? (
                  <Image source={{ uri: formData.fotoKTP }} className="w-full h-full" resizeMode="cover" />
                ) : (
                  <View className="items-center">
                    <Ionicons name="camera-outline" size={40} color="#9CA3AF" />
                    <Text className="text-gray-500 mt-2">Ketuk untuk mengunggah KTP</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center mb-6">
              <Checkbox value={setujuSK} onValueChange={setSetujuSK} color={setujuSK ? 'black' : undefined} style={{width: 24, height: 24, marginRight: 12}}/>
              <Text className="text-base text-gray-700 flex-1">Saya memahami dan menerima Syarat & Ketentuan yang berlaku.</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="px-5 py-3 bg-white border-0 border-gray-200">
        <TouchableOpacity 
          onPress={handleDaftar}
          disabled={!isFormValid}
          style={{ backgroundColor: '#82C7C1', opacity: isFormValid ? 1 : 0.5 }}
          className="bg-[#82C7C1] py-3  rounded-full items-center justify-center "
        >
          <Text className="text-white text-lg font-bold">Daftar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default PendaftaranScreen;
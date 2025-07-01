// app/(tabs)/home/certificates/[id].tsx

import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Image, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

import icons from '../../../../../constants/icons';
import images from '../../../../../constants/images';

// Data yang sama seperti di halaman list. Dalam aplikasi nyata, Anda akan mengambil data ini dari state management (Redux, Zustand) atau melakukan fetch ulang berdasarkan ID.
const certificateData = [
  {
    id: '1',
    title: 'Volunteer Bakti BCA Indonesia 2025',
    date: '17 September 2025',
    image: images.sertifikatBCA,
    description: 'Bakti BCA adalah program Corporate Social Responsibility (CSR) dari BCA yang fokus pada pengembangan masyarakat dan lingkungan. Program ini bertujuan untuk memberikan manfaat bagi masyarakat dan lingkungan, serta mendukung pertumbuhan berkelanjutan Indonesia. Program-program Bakti BCA mencakup pendidikan, lingkungan, kesehatan, dan ekonomi.'
  },
  { id: '2', title: 'Nova Scotia Health Volunteering 2024', date: '6 August 2024', image: images.sertifikatHealth, description: 'Apresiasi diberikan atas kontribusi sukarela yang signifikan dalam mendukung layanan kesehatan di Nova Scotia, membantu pasien dan staf dalam berbagai kapasitas.' },
  { id: '3', title: 'Animal Shelter Donation Appreciation', date: '12 February 2024', image: images.sertifikatAnimal, description: 'Sertifikat ini diberikan sebagai tanda terima kasih atas donasi yang murah hati untuk mendukung kesejahteraan dan perawatan hewan-hewan di penampungan kami.' }
];

const styles = StyleSheet.create({
  headerIcon: { width: 20, height: 20, tintColor: '#4A4A4A' },
  cardImage: {
    width: '100%',
    height: 220, // Lebih tinggi untuk detail
    resizeMode: 'contain', // Contain agar seluruh sertifikat terlihat
    borderRadius: 12,
  },
  downloadIcon: { width: 24, height: 24 },
});

const CertificateDetailScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Mengambil 'id' dari URL
  const certificate = certificateData.find(cert => cert.id === id);

  if (!certificate) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text>Sertifikat tidak ditemukan.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="bg-[#A2D5C6] p-4 h-[60px] flex-row items-center shadow-md">
        <TouchableOpacity onPress={() => router.back()} className="p-1">
          <Image source={icons.back} style={styles.headerIcon} />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-800 ml-4">Detail Sertifikat</Text>
      </View>

      <ScrollView className="mt-5">
        <View className="bg-white rounded-xl shadow-lg mx-4 p-4">
          <Image source={certificate.image} style={styles.cardImage} />
          <View className="flex-row justify-between items-start mt-4">
            <View className="flex-1 mr-4">
              <Text className="text-lg font-bold text-gray-800">{certificate.title}</Text>
              <Text className="text-sm text-gray-500 mt-1">{certificate.date}</Text>
            </View>
            <TouchableOpacity>
              <Image source={icons.download} style={styles.downloadIcon} />
            </TouchableOpacity>
          </View>
          <Text className="text-base text-gray-700 mt-4 leading-6">{certificate.description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CertificateDetailScreen;
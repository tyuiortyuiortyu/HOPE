// app/(tabs)/home/about.tsx

import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView, 
  Image, 
  StyleSheet,
  Linking // Import modul Linking
} from 'react-native';
import { useRouter } from 'expo-router';
import { AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'; // Untuk ikon sosial media

import icons from '../../../../constants/icons';
import images from '../../../../constants/images';

const styles = StyleSheet.create({
  headerIcon: { width: 20, height: 20, tintColor: '#4A4A4A' },
  mainImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 24, // Jarak ke teks di bawahnya
  },
});

const AboutScreen = () => {
  const router = useRouter();

  // Fungsi untuk membuka URL
  const openLink = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-[#A2D5C6] p-4 h-[60px] flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="p-1">
          <Image source={icons.back} style={styles.headerIcon} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View className="p-6 items-center">
          {/* Title */}
          <Text className="text-2xl font-bold text-gray-800 mb-6">
            Tentang HOPE
          </Text>

          {/* Main Image */}
          <Image
            source={images.aboutUs}
            style={styles.mainImage}
            resizeMode="cover"
          />

          {/* Description Text */}
          <Text className="text-base text-gray-700 text-center leading-relaxed mb-10">
            Kami adalah platform yang didedikasikan untuk menjembatani kebaikan. Aplikasi ini hadir untuk membantu organisasi non-profit, komunitas, dan individu yang membutuhkan bantuan sukarelawan agar dapat mengelola serta mengoordinasi kegiatan mereka secara lebih efisien. Tak hanya itu, kami juga ingin membuka lebih banyak pintu kesempatan bagi para relawan yang ingin berkontribusi dalam berbagai aksi sosial dan kemanusiaan.
          </Text>

          {/* Social Media Section */}
          <Text className="text-xl font-bold text-gray-800 mb-4">
            Follow Us
          </Text>
          <View className="flex-row justify-center space-x-8">
            <TouchableOpacity onPress={() => openLink('https://instagram.com')}>
              <AntDesign name="instagram" size={32} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openLink('https://twitter.com')}>
              <AntDesign name="twitter" size={32} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openLink('https://facebook.com')}>
              <FontAwesome name="facebook-square" size={32} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openLink('mailto:info@hope-app.com')}>
              <MaterialCommunityIcons name="email" size={32} color="#333" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutScreen;
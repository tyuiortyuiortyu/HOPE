import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import images from '../../../constants/images';

// Dummy data for donation events
const dummyDonationData = [
  {
    id: 1,
    title: "Bantuan Pendidikan Anak Yatim",
    description: "Bantu anak-anak kurang mampu mendapatkan pendidikan yang layak",
    targetAmount: "1.000.000",
    currentAmount: "540.000",
    progress: 54,
    daysLeft: 15,
    image: images.donate2,
  },
  {
    id: 2,
    title: "Bantuan Korban Bencana Alam",
    description: "Bantuan untuk korban bencana alam",
    targetAmount: "5.000.000",
    currentAmount: "3.200.000",
    progress: 64,
    daysLeft: 8,
    image: images.donate2,
  },
  {
    id: 3,
    title: "Program Makanan Bergizi Lansia",
    description: "Program makanan bergizi untuk lansia",
    targetAmount: "800.000",
    currentAmount: "480.000",
    progress: 60,
    daysLeft: 22,
    image: images.donate2,
  },
  {
    id: 4,
    title: "Renovasi Fasilitas Kesehatan Desa",
    description: "Renovasi fasilitas kesehatan desa",
    targetAmount: "2.500.000",
    currentAmount: "1.000.000",
    progress: 40,
    daysLeft: 30,
    image: images.donate2,
  },
  {
    id: 5,
    title: "Beasiswa Pendidikan Anak Kurang Mampu",
    description: "Beasiswa pendidikan untuk anak yatim",
    targetAmount: "3.000.000",
    currentAmount: "2.400.000",
    progress: 80,
    daysLeft: 5,
    image: images.donate2,
  },
  {
    id: 6,
    title: "Bantuan Pengobatan Gratis",
    description: "Program pengobatan gratis untuk masyarakat",
    targetAmount: "3.000.000",
    currentAmount: "2.400.000",
    progress: 80,
    daysLeft: 5,
    image: images.donate2,
  },
  {
    id: 7,
    title: "Pemberdayaan Ekonomi Ibu Rumah Tangga",
    description: "Program pelatihan usaha untuk ibu rumah tangga",
    targetAmount: "3.000.000",
    currentAmount: "2.400.000",
    progress: 80,
    daysLeft: 5,
    image: images.donate2,
  },
];

// Donation Card Component
const DonationCard = ({ data }: { data: any }) => {
  return (
    <View className="bg-white rounded-xl overflow-hidden shadow-lg mb-4">
      <View className="flex-row h-28">
        {/* Card Image - Left side */}
        <View className="w-24 h-28 overflow-hidden rounded-l-xl">
          <Image 
            source={data.image} 
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
        
        {/* Card Content - Right side */}
        <View className="flex-1 p-4 justify-between">
          <Text className="text-base font-semibold text-gray-800 leading-tight">
            {data.title}
          </Text>
          
          <View className="flex-1 justify-end">
            <Text className="text-xs text-gray-700 font-light mb-1">
              Rp {data.currentAmount} / Rp {data.targetAmount} Terkumpul
            </Text>
            
            {/* Progress Bar and Days Left on same row */}
            <View className="flex-row items-center justify-between">
              <View className="flex-1 mr-3">
                <View className="bg-[#e0e0e0] rounded-full h-3">
                  <View 
                    className="bg-[#82c3be] h-3 rounded-full"
                    style={{ width: `${data.progress}%` }}
                  />
                </View>
              </View>
              
              <Text className="text-xs text-gray-600 font-bold">
                Selesai <Text>{data.daysLeft}</Text> Lagi!
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const DonateScreen = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(dummyDonationData);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredData(dummyDonationData);
    } else {
      const filtered = dummyDonationData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredData(dummyDonationData);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header with Sobat Baik message */}
      <View className="py-6 pb-8" style={{ backgroundColor: '#82BFB7' }}>
        <View className="flex-row items-center justify-between px-6 mb-6">
          <View className="flex-row items-center">
            <View className="w-10 h-10 rounded-full bg-white/20 items-center justify-center mr-3">
              <Image source={images.user} className="w-6 h-6" resizeMode="contain" />
            </View>
            <View>
              <Text className="text-white text-sm">Selamat pagi,</Text>
              <Text className="text-white text-lg font-semibold">Sobat Baik</Text>
            </View>
          </View>
          
          <View className="flex-row items-center space-x-3">
            <TouchableOpacity 
              className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
              onPress={() => router.push('/home/inbox')}
            >
              <Image source={images.message} className="w-5 h-5" resizeMode="contain" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
              onPress={() => router.push('home/profile/profile')}
            >
              <Image source={images.user} className="w-6 h-6" resizeMode="contain" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View className="px-6">
          <View className="flex-row items-center bg-white rounded-xl px-4 py-2">
            <Ionicons name="search" size={20} color="#9CA3AF" />
            <TextInput
              className="ml-3 flex-1 text-gray-700"
              placeholder="Cari campaign donasi..."
              value={searchQuery}
              onChangeText={handleSearch}
              placeholderTextColor="#9CA3AF"
            />
            {searchQuery && (
              <TouchableOpacity onPress={clearSearch}>
                <Ionicons name="close" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      {/* Content */}
      <ScrollView className="flex-1 px-6 py-4">
        {/* Section Title */}
        <View className="mb-4">
          <Text className="text-lg font-semibold text-gray-800">Hasil Pencarian</Text>
          <Text className="text-sm text-gray-600 mt-1">
            {searchQuery ? `"${searchQuery}"` : 'Kata Kunci'}
          </Text>
        </View>

        {/* Donation Cards */}
        <View className="space-y-4 pb-4">
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <DonationCard key={index} data={item} />
            ))
          ) : (
            <View className="items-center py-8">
              <Text className="text-gray-500 text-center">
                Tidak ada hasil yang ditemukan untuk "{searchQuery}"
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DonateScreen;

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const router = useRouter();

  // Keywords data based on the image
  const keywordData = [
    'sedekah subuh',
    'palestina',
    'air',
    'makanan',
    'pendidikan',
    'kesehatan',
    'yatim',
    'masjid',
    'bencana alam',
  ];

  const handleKeywordPress = (keyword) => {
    setSearchText(keyword);
  };

  const handleSearch = () => {
    if (searchText.trim()) {
      // Implement search functionality here
      console.log('Searching for:', searchText);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        {/* Header with Back Button and Search */}
        <View className="px-6 py-4">
          <View className="flex-row items-center mb-6">
            <TouchableOpacity 
              className="mr-4"
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            
            <View 
              className="flex-1 flex-row items-center bg-white rounded-2xl px-4 py-1"
              style={{ 
                shadowColor: '#000', 
                shadowOffset: { width: 0, height: 2 }, 
                shadowOpacity: 0.1, 
                shadowRadius: 4, 
                elevation: 3 
              }}
            >
              <Ionicons name="search" size={20} color="#9CA3AF" />
              <TextInput
                className="flex-1 ml-3 text-base text-gray-900"
                placeholder="Cari campaign, zakat, atau donasi..."
                placeholderTextColor="#9CA3AF"
                value={searchText}
                onChangeText={setSearchText}
                autoFocus
                onSubmitEditing={handleSearch}
                returnKeyType="search"
              />
              {searchText.length > 0 && (
                <TouchableOpacity onPress={() => setSearchText('')}>
                  <Ionicons name="close-circle" size={20} color="#9CA3AF" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Pencarian Pilihan Section */}
          <View className="mb-14">
            <Text className="text-xl font-bold text-gray-800 mb-4">Pencarian Pilihan</Text>
            
            {/* Kata Kunci Section */}
            <View className="mb-6">
              <Text className="text-lg font-semibold text-gray-700 mb-3">Kata Kunci</Text>
              
              <View className="flex-row flex-wrap">
                {keywordData.map((keyword, index) => (
                  <TouchableOpacity
                    key={index}
                    className="rounded px-4 py-2 mr-2 mb-2"
                    style={{ backgroundColor: '#FED8E1' }}
                    onPress={() => handleKeywordPress(keyword)}
                  >
                    <Text className="text-gray-700 text-sm">{keyword}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Search Results Section */}
          {searchText.length > 0 && (
            <View className="mt-12">
              <Text className="text-lg font-semibold text-gray-800 mb-4">
                Hasil pencarian untuk "{searchText}"
              </Text>
              
              {/* Sample search results */}
              <View>
                <View 
                  className="bg-white rounded-lg p-4 mb-4"
                  style={{ 
                    shadowColor: '#000', 
                    shadowOffset: { width: 0, height: 2 }, 
                    shadowOpacity: 0.1, 
                    shadowRadius: 4, 
                    elevation: 3 
                  }}
                >
                  <Text className="font-semibold text-gray-800 mb-2">Program Sedekah Makanan</Text>
                  <Text className="text-gray-600 text-sm mb-2">
                    Membantu menyediakan makanan untuk keluarga yang membutuhkan
                  </Text>
                  <View className="flex-row items-center">
                    <Text style={{ color: '#82BFB7' }} className="text-sm">Terkumpul: Rp 50.000.000</Text>
                  </View>
                </View>

                <View 
                  className="bg-white rounded-lg p-4 mb-4"
                  style={{ 
                    shadowColor: '#000', 
                    shadowOffset: { width: 0, height: 2 }, 
                    shadowOpacity: 0.1, 
                    shadowRadius: 4, 
                    elevation: 3 
                  }}
                >
                  <Text className="font-semibold text-gray-800 mb-2">Bantuan Air Bersih</Text>
                  <Text className="text-gray-600 text-sm mb-2">
                    Menyediakan akses air bersih untuk daerah terpencil
                  </Text>
                  <View className="flex-row items-center">
                    <Text style={{ color: '#82BFB7' }} className="text-sm">Terkumpul: Rp 25.000.000</Text>
                  </View>
                </View>

                <View 
                  className="bg-white rounded-lg p-4"
                  style={{ 
                    shadowColor: '#000', 
                    shadowOffset: { width: 0, height: 2 }, 
                    shadowOpacity: 0.1, 
                    shadowRadius: 4, 
                    elevation: 3 
                  }}
                >
                  <Text className="font-semibold text-gray-800 mb-2">Bantuan Pendidikan Anak Yatim</Text>
                  <Text className="text-gray-600 text-sm mb-2">
                    Memberikan beasiswa pendidikan untuk anak-anak yatim
                  </Text>
                  <View className="flex-row items-center">
                    <Text style={{ color: '#82BFB7' }} className="text-sm">Terkumpul: Rp 75.000.000</Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* Empty State */}
          {searchText.length === 0 && (
            <View className="flex-1 justify-center items-center mt-40">
              <Ionicons name="search" size={60} color="#D1D5DB" />
              <Text className="text-gray-500 text-center mt-4 text-lg">
                Ketik kata kunci untuk mencari
              </Text>
              <Text className="text-gray-400 text-center mt-2">
                atau pilih dari kata kunci yang tersedia di atas
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;

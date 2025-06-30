import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
  Image,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Updated prayer data with better content
const prayersData = [
  {
    id: '1',
    user: {
      name: 'Hamba Allah',
      avatar: null,
      timeAgo: '3 menit lalu',
      location: 'Bantu Anak Yatim Belajar'
    },
    content: 'Ya Allah, mudahkanlah jalan bagi anak-anak yatim untuk mendapatkan pendidikan yang layak. Barakallahu fiikum untuk para donatur.',
    likes: 12,
    isPopular: true,
    category: 'Pendidikan'
  },
  {
    id: '2',
    user: {
      name: 'Orang Baik',
      avatar: null,
      timeAgo: '15 menit lalu',
      location: 'Air Bersih untuk Semua'
    },
    content: 'Semoga Allah memudahkan akses air bersih untuk saudara-saudara kita di daerah terpencil. Aamiin ya rabbal alamiin.',
    likes: 8,
    isPopular: false,
    category: 'Kemanusiaan'
  },
  {
    id: '3',
    user: {
      name: 'Sahabat Baik',
      avatar: null,
      timeAgo: '1 jam lalu',
      location: 'Bantuan Medis Darurat'
    },
    content: 'Ya Rabb, sembuhkanlah saudara-saudara kami yang sedang sakit. Berikan kekuatan untuk keluarga yang berjuang.',
    likes: 25,
    isPopular: true,
    category: 'Kesehatan'
  },
  {
    id: '4',
    user: {
      name: 'Muslimah Taat',
      avatar: null,
      timeAgo: '2 jam lalu',
      location: 'Sedekah Makanan Gratis'
    },
    content: 'Allahumma barik lana fima razaqtana wa qina azab an-nar. Semoga makanan yang dibagikan berkah dan bermanfaat.',
    likes: 18,
    isPopular: true,
    category: 'Makanan'
  },
  {
    id: '5',
    user: {
      name: 'Abdurrahman',
      avatar: null,
      timeAgo: '3 jam lalu',
      location: 'Bangun Masjid Kampung'
    },
    content: 'Ya Allah, mudahkanlah pembangunan rumah ibadah ini. Jadikanlah sebagai ladang pahala bagi para donatur.',
    likes: 32,
    isPopular: true,
    category: 'Ibadah'
  },
  {
    id: '6',
    user: {
      name: 'Ummu Salamah',
      avatar: null,
      timeAgo: '4 jam lalu',
      location: 'Bantuan Korban Banjir'
    },
    content: 'Rabbana atina fi d-dunya hasanatan wa fi l-akhirati hasanatan wa qina azab an-nar. Untuk saudara korban bencana.',
    likes: 27,
    isPopular: false,
    category: 'Bencana'
  }
];

const PrayersScreen = () => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [selectedPrayerId, setSelectedPrayerId] = useState(null);
  const [activeTab, setActiveTab] = useState('Semua');
  const [selectedFilter, setSelectedFilter] = useState('Terbaru');
  const [prayers, setPrayers] = useState(prayersData);
  const router = useRouter();

  const PrayerCard = ({ item }) => (
    <View className="mx-4 mb-4 bg-white rounded-2xl p-4" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}>
      {/* User Header */}
      <View className="flex-row items-start justify-between mb-3">
        <View className="flex-row items-start flex-1">
          <View className="w-10 h-10 rounded-full mr-3 items-center justify-center" style={{ backgroundColor: '#82BFB7' }}>
            <Text className="text-white font-bold text-sm">{item.user.name.charAt(0)}</Text>
          </View>
          
          <View className="flex-1">
            <View className="flex-row items-center">
              <Text className="font-bold text-gray-900 text-sm mr-2">{item.user.name}</Text>
              <Text className="text-xs text-gray-500">· {item.user.timeAgo}</Text>
            </View>
            <TouchableOpacity className="mt-1">
              <Text className="text-xs font-medium" style={{ color: '#82BFB7' }}>{item.user.location}</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <TouchableOpacity 
          className="p-1"
          onPress={() => handleOptionsPress(item.id)}
        >
          <Ionicons name="ellipsis-horizontal" size={16} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
      
      {/* Prayer Content */}
      <TouchableOpacity 
        onPress={() => router.push({
          pathname: 'prayer-detail',
          params: { prayerId: item.id }
        })}
        activeOpacity={0.8}
      >
        <Text className="text-gray-800 text-base leading-6 mb-4">{item.content}</Text>
      </TouchableOpacity>
      
      {/* Category Tag */}
      <View className="mb-3">
        <View className="bg-gray-100 rounded-full px-3 py-1 self-start">
          <Text className="text-xs font-medium text-gray-700">{item.category}</Text>
        </View>
      </View>
      
      {/* Action Bar */}
      <View className="flex-row items-center justify-between pt-3">
        <View className="flex-row items-center">
          <Text className="text-base mr-2">🙏🏻</Text>
          <Text className="text-sm text-gray-600">{item.likes} orang mengaminkan</Text>
        </View>
        
        <TouchableOpacity className="px-4 py-2 rounded-full" style={{ backgroundColor: '#82BFB7' }}>
          <Text className="font-semibold text-sm text-white">🙏🏻 Aamiin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleOptionsPress = (prayerId) => {
    setSelectedPrayerId(prayerId);
    setShowOptionsModal(true);
  };

  const handleFilter = (filter) => {
    setSelectedFilter(filter);
    setShowFilterModal(false);
  };

  const handleDeletePrayer = () => {
    if (selectedPrayerId) {
      const updatedPrayers = prayers.filter(prayer => prayer.id !== selectedPrayerId);
      setPrayers(updatedPrayers);
      setShowOptionsModal(false);
      setSelectedPrayerId(null);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-white">
        <View className="flex-row items-center justify-between px-6 py-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#1F2937" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-900">Doa-doa #OrangBaik</Text>
          <View className="w-6" />
        </View>

        {/* Tabs */}
        <View className="flex-row">
          {['Semua', 'Mengikuti'].map((tab) => (
            <TouchableOpacity
              key={tab}
              className={`flex-1 py-4 ${activeTab === tab ? 'border-b-2' : ''}`}
              style={activeTab === tab ? { borderBottomColor: '#82BFB7' } : {}}
              onPress={() => setActiveTab(tab)}
            >
              <Text className={`text-center font-semibold ${
                activeTab === tab ? '' : 'text-gray-400'
              }`} style={activeTab === tab ? { color: '#82BFB7' } : {}}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Filter */}
        <View className="flex-row items-center justify-end px-6 py-3">
          <TouchableOpacity 
            className="flex-row items-center"
            onPress={() => setShowFilterModal(true)}
          >
            <Ionicons name="funnel-outline" size={16} color="#9CA3AF" />
            <Text className="text-sm text-gray-600 ml-1">Urutan: {selectedFilter}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Prayers List */}
      <FlatList
        data={prayers}
        renderItem={({ item }) => <PrayerCard item={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 16 }}
      />

      {/* Filter Modal */}
      <Modal visible={showFilterModal} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl p-6">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-lg font-bold text-gray-900">Urutan</Text>
              <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                <Ionicons name="close" size={24} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
            
            {['Terbaru', 'Terpopuler'].map((option) => (
              <TouchableOpacity
                key={option}
                className="flex-row items-center justify-between py-4"
                onPress={() => handleFilter(option)}
              >
                <Text className={`text-base ${selectedFilter === option ? 'font-bold' : ''}`} 
                      style={selectedFilter === option ? { color: '#82BFB7' } : { color: '#374151' }}>
                  {option}
                </Text>
                {selectedFilter === option && (
                  <Ionicons name="checkmark" size={20} color="#82BFB7" />
                )}
              </TouchableOpacity>
            ))}
            
            <TouchableOpacity 
              className="w-full rounded-xl py-4 mt-4"
              style={{ backgroundColor: '#82BFB7' }}
              onPress={() => setShowFilterModal(false)}
            >
              <Text className="text-white text-center font-bold">Terapkan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Options Modal */}
      <Modal visible={showOptionsModal} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl p-6">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-lg font-bold text-gray-900">Opsi</Text>
              <TouchableOpacity onPress={() => setShowOptionsModal(false)}>
                <Ionicons name="close" size={24} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              className="flex-row items-center py-4"
              onPress={handleDeletePrayer}
            >
              <Ionicons name="trash-outline" size={20} color="#EF4444" />
              <Text className="text-base text-red-600 ml-3">Hapus</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default PrayersScreen;
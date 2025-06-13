import React, { useRef, useState, useEffect } from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { Link, Stack } from 'expo-router'; // Import Stack
import images from '../../../constants/images';
import icons from '../../../constants/icons';

// Data Dummy (tidak ada perubahan)
const eventsData = [ { id: '1', title: 'Kegiatan Donor Darah Yayasan Buddha Tzu Chi', address: 'Jl. H.O.S Cokroaminoto No. 98, Bogor.', date: 'Selasa, 17 Juni 2025', image: images.donorDarah_1, }, { id: '2', title: 'Kegiatan Donor Darah RTB Gold', address: 'Jl. Pakuan No.03 Taman Budaya, Bogor.', date: 'Sabtu, 20 Juni 2025', image: images.donorDarah_2, }, { id: '3', title: 'Kegiatan Donor Darah Hari Ibu Internasional', address: 'Jl. MH. Thamrin, Citaringgul, Babakan Madang, Bogor', date: 'Sabtu, 20 Juni 2025', image: images.donorDarah_3, }, ];
const preparationData = [ { id: '1', title: 'Perbanyak Konsumsi Makanan dengan Zat Besi', description: 'Makanan yang dapat dikonsumsi adalah daging, telur, dan ikan', image: images.persiapan_daging, }, { id: '2', title: 'Memperbanyak Minum Air', description: 'Hal ini membuat tubuh tetap terhidrasi dan menambah volume darah.', image: images.persiapan_daging, }, { id: '3', title: 'Memperbanyak Makan Buah dan Sayur', description: 'Buah dan sayur mengandung vitamin dan mineral yang penting untuk kesehatan.', image: images.persiapan_daging, }, ];
const benefitsData = [ { id: '1', text: 'Mengurangi penyakit jantung', icon: icons.jantung }, { id: '2', text: 'Membakar kalori dan membantu menurunkan berat badan', icon: icons.jantung }, { id: '3', text: 'Menurunkan resiko kanker', icon: icons.jantung }, { id: '4', text: 'Menurunkan resiko terkena penyakit jantung dan pembuluh darah', icon: icons.jantung }, { id: '5', text: 'Meningkatkan produksi darah', icon: icons.jantung }, ];

const { width } = Dimensions.get('window');

// Komponen Card untuk Kegiatan
const EventCard = ({ item }) => (
  <View className="flex-row bg-white rounded-2xl overflow-hidden mb-4 shadow-md">
    <Image source={item.image} className="w-[120px] h-full" resizeMode="cover" />
    <View className="flex-1 bg-[#FADADD] p-3">
      <Text className="text-base font-bold text-gray-800">{item.title}</Text>
      <Text className="text-xs text-gray-600 mt-1">{item.address}</Text>
      <Text className="text-xs text-gray-800 font-semibold mt-2">{item.date}</Text>
      <Link href={{ pathname: "/donor/pendaftarandonordarah", params: { eventId: item.id, eventTitle: item.title, evenDate: item.date, evenAddress: item.address, evenImage: item.image } }} asChild>
        <TouchableOpacity className="bg-[#82C7C1] py-2 px-4 rounded-full mt-3 self-start">
          <Text className="text-white font-bold text-sm">Daftar</Text>
        </TouchableOpacity>
      </Link>
    </View>
  </View>
);

// Komponen Card untuk Carousel Persiapan
const PreparationCard = ({ item }) => (
  <View style={{ width: width * 0.7 }} className="bg-[#D9EEEB] rounded-2xl p-4 mr-[15px] flex-row items-center">
    <View className="w-16 h-16 rounded-full bg-white justify-center items-center mr-3">
      <Image source={item.image} className="w-12 h-12" resizeMode="contain" />
    </View>
    <View className="flex-1">
      <Text className="text-sm font-bold text-gray-800">{item.title}</Text>
      <Text className="text-xs text-gray-600 mt-1">{item.description}</Text>
    </View>
  </View>
);

// Komponen untuk Item Manfaat
const BenefitItem = ({ item }) => (
  <View className="flex-row items-center py-3 border-b border-gray-100 last:border-b-0">
    <View className="w-10 h-10 rounded-full bg-[#FFF6F6] justify-center items-center mr-4">
      <Image source={item.icon} className="w-6 h-6" resizeMode="contain" />
    </View>
    <Text className="flex-1 text-base text-gray-800">{item.text}</Text>
  </View>
);


// Halaman Utama Donor Darah
const DonorDarahScreen = () => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % preparationData.length;
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({ index: nextIndex, animated: true, });
      }
      setCurrentIndex(nextIndex);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen 
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerShadowVisible: false,
        }} 
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Spacer untuk header transparan */}
        <View className="h-[20px]" /> 
        
        {/* --- Bagian Kegiatan Terdekat --- */}
        <View className="px-5 mb-5">
          <Text className="text-xl font-bold text-gray-800 mb-4">Ikuti Kegiatan Donor Darah Terdekat</Text>
          {eventsData.map(item => <EventCard key={item.id} item={item} />)}
        </View>

        {/* --- Bagian Persiapan Donor Darah --- */}
        <View className="mb-5">
          <Text className="text-xl font-bold text-gray-800 mb-4 px-5">Persiapan Donor Darah</Text>
          <FlatList
            ref={flatListRef}
            data={preparationData}
            renderItem={({ item }) => <PreparationCard item={item} />}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }} // Padding di dalam FlatList
            snapToInterval={width * 0.8 + 15}
            decelerationRate="fast"
            onScrollToIndexFailed={() => {}}
          />
        </View>

        {/* --- Bagian Manfaat Donor Darah --- */}
        <View className="px-5 mb-8">
          <Text className="text-xl font-bold text-gray-800 mb-4">Manfaat Donor Darah</Text>
          <View className="bg-white p-2">
            {benefitsData.map(item => <BenefitItem key={item.id} item={item} />)}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DonorDarahScreen;

// Tidak ada lagi StyleSheet di sini
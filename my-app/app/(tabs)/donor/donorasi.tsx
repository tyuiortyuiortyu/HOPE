import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Link, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import images from '../../../constants/images';
import icons from '../../../constants/icons';

// Data untuk daftar lokasi/rumah sakit
const locationData = [
  {
    id: '1',
    name: 'RS EMC Sentul',
    address: 'Jl. MH. Thamrin Kav. 57, Sentul City, Bogor, Jawa Barat',
    slots: 5,
    image: images.EMC_sentul,
  },
  {
    id: '2',
    name: 'Siloam Hospitals Bogor',
    address: 'Jl. Raya Pajajaran No.27, Babakan, Bogor Tengah, Kota Bogor, Jawa Barat',
    slots: 10,
    image: images.EMC_sentul,
  },
  {
    id: '3',
    name: 'Mayapada Hospital',
    address: 'Jl. Pajajaran Indah V No.97, Baranangsiang, Jawa Barat',
    slots: 8,
    image: images.EMC_sentul,
  },
];

const donorBenefitsData = [
  { id: '1', text: 'Mengurangi risiko kanker payudara dan ovarium', icon: icons.jantung },
  { id: '2', text: 'Membantu pemulihan rahim pasca melahirkan', icon: icons.jantung },
  { id: '3', text: 'Membantu menurunkan berat badan', icon: icons.jantung },
];

const recipientBenefitsData = [
  { id: '1', text: 'Peningkatan sistem kekebalan tubuh bayi', icon: icons.jantung},
  { id: '2', text: 'Perkembangan otak yang lebih baik', icon: icons.jantung },
  { id: '3', text: 'Mengurangi risiko penyakit kronis', icon: icons.jantung },
];


// --- KOMPONEN-KOMPONEN KECIL ---

// Komponen Card untuk setiap lokasi
const LocationCard = ({ item }) => (
  <View className="flex-row bg-white rounded-2xl overflow-hidden mb-4 shadow">
    <Image source={item.image} className="w-1/3 h-full" resizeMode="cover" />
    <View className="flex-1 bg-[#FADADD] p-3 justify-center">
      <Text className="text-base font-bold text-gray-800">{item.name}</Text>
      <Text className="text-xs text-gray-600 mt-1">{item.address}</Text>
      <Text className="text-sm text-gray-800 font-semibold mt-2">
        Dapat menampung {item.slots} slot ASI
      </Text>
      <Link 
        href={{ pathname: "/donor/pendaftarandonorasi", params: { locationId: item.id, locationName: item.name, locationImage: item.image, locationAddress: item.address, locationslots: item.slots } }} 
        asChild
      >
        <TouchableOpacity className="bg-[#82C7C1] py-2 px-5 rounded-full mt-3 self-start">
          <Text className="text-white font-bold text-sm">Daftar</Text>
        </TouchableOpacity>
      </Link>
    </View>
  </View>
);

// Komponen untuk setiap item manfaat
const BenefitItem = ({ item }) => (
  <View className="flex-row items-center py-3 border-b border-gray-100 last:border-b-0">
    <View className="w-12 h-12 rounded-full bg-[#FFF6F6] justify-center items-center mr-4">
      <Image source={item.icon} className="w-7 h-7" resizeMode="contain" />
    </View>
    <Text className="flex-1 text-base text-gray-800 leading-tight">{item.text}</Text>
  </View>
);


// --- HALAMAN UTAMA DONOR ASI ---

const DonorAsiScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#fff]">
      <Stack.Screen 
        options={{
          headerShown: false,
        }} 
      />
      
      {/* Header - Same as donordarah page */}
      <View className="bg-white px-4 py-3">
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: 50,
          paddingBottom: 20,
        }}>
          <TouchableOpacity 
            style={{
              padding: 8,
              marginRight: 12,
            }}
            onPress={() => router.back()}
          >
            <Image 
              source={images.back} 
              style={{
                width: 24,
                height: 24,
                tintColor: '#374151',
              }}
              resizeMode="contain" 
            />
          </TouchableOpacity>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#1F2937',
          }}>Donor ASI</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Content */}
        <View className="bg-white">
          <View className="h-[20px]" />

          {/* Hero Section */}
          <View className="px-5">
            <Text className="text-xl font-bold text-gray-800 mb-2">Satu Tetes untuk Harapan</Text>
            <Image 
                source={images.bayi_prematur}
                className="w-full h-48 rounded-lg"
                resizeMode="cover"
            />
          </View>

          {/* Location List Section */}
          <View className="px-5 mt-6">
            <Text className="text-xl font-bold text-gray-800 mb-4">Temukan Lokasi Donor Asi di Sekitar Anda.</Text>
            {locationData.map(item => (
              <LocationCard key={item.id} item={item} />
            ))}
          </View>

          {/* Benefits Section */}
          <View className="px-5 mt-2 mb-8">
              <View className="bg-white rounded-2xl p-4 shadow-md">
                  {/* Manfaat bagi Pendonor */}
                  <Text className="text-xl font-bold text-gray-800 mb-2">Manfaat Donor Asi</Text>
                  {donorBenefitsData.map(item => (
                      <BenefitItem key={item.id} item={item} />
                  ))}

                  {/* Manfaat bagi Penerima */}
                  <Text className="text-xl font-bold text-gray-800 mt-6 mb-2">Manfaat Donor Asi bagi Penerima Donor</Text>
                  {recipientBenefitsData.map(item => (
                      <BenefitItem key={item.id} item={item} />
                  ))}
              </View>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DonorAsiScreen;
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import images from '../../../constants/images';

const HomeScreen = () => {
  const router = useRouter();
  const [currentSpesialIndex, setCurrentSpesialIndex] = useState(0);

  // Dummy data for Pilihan Jumat Berkah
  const jmatBerkahData = [
    {
      id: '1',
      title: 'Sedekah Makanan & Sembako Gratis untuk Dhuafa',
      organization: 'Salam Setara Amanah Nusantara',
      category: 'RAIH BERKAH LEWAT SEDEKAH',
      description: 'Bagikan Makanan Bergizi dan Sembako Gratis',
      collected: 'Rp166.409.950',
      backgroundColor: '#FFB3BA',
      verified: true,
      progress: 0.75,
    },
    {
      id: '2',
      title: 'Hidupkan Masjid dengan Kebaikanmu',
      organization: 'LAZ Masjid Raya Bintaro Jaya',
      category: 'Hidupkan',
      description: 'Dukung Program Kebaikan Masjid Raya Bintaro Jaya',
      collected: 'Rp52.917.330',
      backgroundColor: '#2D3748',
      verified: true,
      progress: 0.67,
      isDark: true,
    },
    {
      id: '3',
      title: 'Bantu Pendidikan Anak Yatim',
      organization: 'Yayasan Pendidikan Harapan',
      category: 'PENDIDIKAN',
      description: 'Berikan kesempatan belajar untuk anak yatim',
      collected: 'Rp89.234.500',
      backgroundColor: '#A7F3D0',
      verified: true,
      progress: 0.45,
    },
  ];

  // Additional urgent campaign data
  const urgentCampaignData = [
    {
      id: '4',
      title: 'Operasi Jantung untuk Bayi Prema',
      organization: 'RS Anak dan Bunda Harapan Kita',
      category: 'DARURAT MEDIS',
      description: 'Bayi berusia 3 bulan membutuhkan operasi jantung segera',
      collected: 'Rp89.500.000',
      backgroundColor: '#FFCCCB',
      verified: true,
      progress: 0.45,
    },
    {
      id: '5',
      title: 'Rumah Singgah Anak Jalanan',
      organization: 'Yayasan Peduli Anak Bangsa',
      category: 'PERLINDUNGAN ANAK',
      description: 'Berikan tempat tinggal sementara untuk anak jalanan',
      collected: 'Rp125.750.000',
      backgroundColor: '#FFE4B5',
      verified: true,
      progress: 0.83,
    },
    {
      id: '6',
      title: 'Bantuan Alat Cuci Darah',
      organization: 'Komunitas Peduli Ginjal',
      category: 'KESEHATAN',
      description: 'Sumbangkan mesin cuci darah untuk rumah sakit',
      collected: 'Rp67.200.000',
      backgroundColor: '#E6E6FA',
      verified: true,
      progress: 0.28,
    },
  ];

  // Dummy data for Spesial Buat Kamu
  const spesialData = [
    {
      id: '1',
      title: 'Ramaikan Dunia Teman Tuli',
      subtitle: 'Bagikan 1000+ Alat Dengar untuk Mereka',
      buttonText: 'Suara tuk Teman Tuli!',
      backgroundColor: '#E0F2FE',
      textColor: '#1E3A8A',
      buttonColor: '#EC4899',
      extraInfo: 'Target: 1000 alat bantu dengar • 67% tercapai',
      urgency: 'MENDESAK'
    },
    {
      id: '2',
      title: 'Bantu Anak Palestina',
      subtitle: 'Kirimkan bantuan untuk anak-anak di Gaza',
      buttonText: 'Kirim Bantuan Sekarang!',
      backgroundColor: '#FEE2E2',
      textColor: '#7F1D1D',
      buttonColor: '#DC2626',
      extraInfo: '5,000+ anak terbantu • Makanan & Obat-obatan',
      urgency: 'DARURAT'
    },
    {
      id: '3',
      title: 'Air Bersih untuk Semua',
      subtitle: 'Sediakan akses air bersih di daerah terpencil',
      buttonText: 'Berikan Air Bersih!',
      backgroundColor: '#DBEAFE',
      textColor: '#1E40AF',
      buttonColor: '#3B82F6',
      extraInfo: '50 desa terpencil • 15,000 jiwa terbantu',
      urgency: 'PRIORITAS'
    },
    {
      id: '4',
      title: 'Program Makanan Bergizi',
      subtitle: 'Wujudkan generasi sehat bebas stunting',
      buttonText: 'Dukung Nutrisi Anak!',
      backgroundColor: '#D1FAE5',
      textColor: '#065F46',
      buttonColor: '#10B981',
      extraInfo: '1,200 anak balita • Susu & Vitamin harian',
      urgency: 'RUTIN'
    },
    {
      id: '5',
      title: 'Bantuan Korban Bencana',
      subtitle: 'Hulurkan tangan untuk saudara terdampak',
      buttonText: 'Bantu Sekarang!',
      backgroundColor: '#FEF3C7',
      textColor: '#92400E',
      buttonColor: '#F59E0B',
      extraInfo: 'Banjir Jabodetabek • 2,500 keluarga terdampak',
      urgency: 'EMERGENCY'
    },
    {
      id: '6',
      title: 'Pendidikan untuk Semua',
      subtitle: 'Beasiswa untuk anak kurang mampu',
      buttonText: 'Wujudkan Mimpi Mereka!',
      backgroundColor: '#E0E7FF',
      textColor: '#3730A3',
      buttonColor: '#7C3AED',
      extraInfo: '500 siswa berprestasi • SD hingga Universitas',
      urgency: 'BERKELANJUTAN'
    },
    {
      id: '7',
      title: 'Rumah untuk Lansia Terlantar',
      subtitle: 'Berikan tempat tinggal layak untuk kakek nenek',
      buttonText: 'Bangun Rumah Harapan!',
      backgroundColor: '#F3E8FF',
      textColor: '#581C87',
      buttonColor: '#9333EA',
      extraInfo: '25 lansia terlantar • Perawatan medis gratis',
      urgency: 'SOSIAL'
    },
    {
      id: '8',
      title: 'Selamatkan Hutan Indonesia',
      subtitle: 'Cegah kebakaran dan lindungi satwa langka',
      buttonText: 'Selamatkan Bumi!',
      backgroundColor: '#ECFCCB',
      textColor: '#365314',
      buttonColor: '#65A30D',
      extraInfo: '1000 hektar hutan • 50+ spesies dilindungi',
      urgency: 'LINGKUNGAN'
    },
  ];

  // Dummy data for Doa-doa #OrangBaik
  const doaData = [
    {
      id: '1',
      user: 'Orang Baik',
      timeAgo: '5 menit lalu',
      program: 'Darurat Stunting, Bantu Anak-An...',
      content: 'Ya Allah ampuni dosa kami, lancarkan usaha dan selamatkan kami di dunia ini maupun di...',
      likes: 10,
    },
    {
      id: '2',
      user: 'Hamba Allah',
      timeAgo: '8 menit lalu',
      program: 'Sedekah Jariyah',
      content: 'Dilimpahkan berkah dan kesehatan serta bermanfaat untuk keluarga...',
      likes: 3,
    },
    {
      id: '3',
      user: 'Saudara Muslim',
      timeAgo: '12 menit lalu',
      program: 'Bantuan Air Bersih',
      content: 'Semoga Allah membalas kebaikan donatur dengan kebaikan yang berlipat...',
      likes: 7,
    },
    {
      id: '4',
      user: 'Orang Tua',
      timeAgo: '15 menit lalu',
      program: 'Pendidikan Anak Yatim',
      content: 'Ya Rabb berikanlah kemudahan dalam belajar untuk anak-anak yatim...',
      likes: 15,
    },
  ];

  const SpesialCard = ({ item }) => (
    <View 
      className="w-96 mr-4 relative rounded-2xl overflow-hidden"
      style={{ 
        backgroundColor: item.backgroundColor,
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.1, 
        shadowRadius: 4, 
        elevation: 3 
      }}
    >
      <View className="flex-row items-center">
        <View className="flex-1 p-6">
          <View className="flex-row items-center justify-between mb-4">
            <View className="bg-blue-500 rounded-full px-3 py-1">
              <Text className="text-xs font-semibold text-white">GALANG DANA PILIHAN</Text>
            </View>
            <View 
              className="rounded-full px-2 py-1"
              style={{ backgroundColor: item.buttonColor }}
            >
              <Text className="text-xs font-bold text-white">{item.urgency}</Text>
            </View>
          </View>
          
          <Text 
            className="text-2xl font-bold mb-2"
            style={{ color: item.textColor }}
          >
            {item.title}
          </Text>
          <Text 
            className="text-sm mb-3"
            style={{ color: item.textColor }}
          >
            {item.subtitle}
          </Text>
          
          <Text 
            className="text-xs mb-4 opacity-80"
            style={{ color: item.textColor }}
          >
            {item.extraInfo}
          </Text>
          
          <TouchableOpacity 
            className="rounded-full px-6 py-3 self-start"
            style={{ backgroundColor: item.buttonColor }}
          >
            <Text className="text-white font-semibold">{item.buttonText}</Text>
          </TouchableOpacity>
        </View>
        <View className="w-40 h-44">
          <Image 
            source={images.logo} 
            className="w-full h-full" 
            resizeMode="cover"
          />
        </View>
      </View>
    </View>
  );

  const JumatBerkahCard = ({ item }) => (
    <View className="w-80 mr-4">
      <View 
        className="relative rounded-2xl overflow-hidden mb-3 p-4"
        style={{ 
          backgroundColor: item.backgroundColor,
          shadowColor: '#000', 
          shadowOffset: { width: 0, height: 2 }, 
          shadowOpacity: 0.1, 
          shadowRadius: 4, 
          elevation: 3 
        }}
      >
        <Text 
          className={`text-xs font-semibold mb-2 ${item.isDark ? 'text-yellow-400' : 'text-red-600'}`}
        >
          {item.category}
        </Text>
        <Text 
          className={`text-xs mb-3 ${item.isDark ? 'text-white' : 'text-gray-600'}`}
        >
          {item.description}
        </Text>
        <View className="w-12 h-12 bg-gray-300 rounded self-end" />
      </View>
      
      <View 
        className="bg-white rounded-2xl p-3"
        style={{ 
          shadowColor: '#000', 
          shadowOffset: { width: 0, height: 2 }, 
          shadowOpacity: 0.1, 
          shadowRadius: 4, 
          elevation: 3 
        }}
      >
        <View className="flex-row items-center mb-1">
          <Text className="text-sm text-gray-600 flex-1">{item.organization}</Text>
          {item.verified && (
            <Ionicons name="shield-checkmark" size={16} color="#3B82F6" />
          )}
        </View>
        <Text className="text-sm font-bold text-gray-800 mb-2">{item.title}</Text>
        <View className="flex-row items-center mb-2">
          <Text className="text-sm text-gray-600">Terkumpul</Text>
          <Text className="text-sm font-bold text-blue-600 ml-2">{item.collected}</Text>
        </View>
        <View className="w-full h-2 bg-gray-200 rounded-full">
          <View 
            className="h-full bg-blue-500 rounded-full" 
            style={{ width: `${item.progress * 100}%` }}
          />
        </View>
      </View>
    </View>
  );

  const DoaCard = ({ item }) => (
    <View 
      className="w-80 mr-4 bg-white rounded-2xl p-4"
      style={{ 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.1, 
        shadowRadius: 4, 
        elevation: 3 
      }}
    >
      <View className="flex-row items-start justify-between mb-3">
        <View className="flex-row items-start flex-1">
          <View className="w-10 h-10 rounded-full mr-3 items-center justify-center" style={{ backgroundColor: '#82BFB7' }}>
            <Text className="text-white font-bold text-sm">{item.user.charAt(0)}</Text>
          </View>
          
          <View className="flex-1">
            <View className="flex-row items-center">
              <Text className="font-bold text-gray-900 text-sm mr-2">{item.user}</Text>
              <Text className="text-xs text-gray-500">· {item.timeAgo}</Text>
            </View>
            <TouchableOpacity className="mt-1">
              <Text className="text-xs font-medium" style={{ color: '#82BFB7' }}>{item.program}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
      <TouchableOpacity 
        onPress={() => router.push({
          pathname: '/home/prayers',
          params: { prayerId: item.id }
        })}
        activeOpacity={0.8}
      >
        <Text className="text-gray-800 text-sm leading-5 mb-4" numberOfLines={3}>
          {item.content}
        </Text>
      </TouchableOpacity>
      
      <View className="flex-row items-center justify-between pt-3">
        <View className="flex-row items-center">
          <Text className="text-base mr-2">🙏🏻</Text>
          <Text className="text-sm text-gray-600">{item.likes} orang mengaminkan</Text>
        </View>
        
        <TouchableOpacity className="px-4 py-2 rounded-full" style={{ backgroundColor: '#82BFB7' }}>
          <View className="flex-row items-center">
            <Image source={images.pray} className="w-4 h-4 mr-1" resizeMode="contain" />
            <Text className="font-semibold text-sm text-white">Aamiin</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleSpesialScroll = (event) => {
    const slideSize = 384; // 96 * 4 (w-96 = 24rem = 384px)
    const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
    setCurrentSpesialIndex(index);
  };

  // Updated volunteer recommendation data
  const volunteerRecommendationData = [
    {
      id: '1',
      title: 'Mengajar Anak-Anak di Panti Asuhan',
      organization: 'Yayasan Kasih Sayang',
      category: 'PENDIDIKAN',
      description: 'Berbagi ilmu dengan mengajar anak-anak yatim',
      location: 'Jakarta Selatan',
      date: '15 Desember 2024',
      volunteers: '12/20 volunteer',
      backgroundColor: '#E8F5E8',
      verified: true,
      urgent: false,
    },
    {
      id: '2',
      title: 'Bakti Sosial Membersihkan Pantai',
      organization: 'Komunitas Peduli Lingkungan',
      category: 'LINGKUNGAN',
      description: 'Gotong royong membersihkan sampah di pantai',
      location: 'Pantai Ancol',
      date: '20 Desember 2024',
      volunteers: '45/50 volunteer',
      backgroundColor: '#E0F2FE',
      verified: true,
      urgent: true,
    },
    {
      id: '3',
      title: 'Pendampingan Lansia di Panti Jompo',
      organization: 'Relawan Peduli Sesama',
      category: 'KESEHATAN',
      description: 'Menemani dan merawat kakek nenek di panti',
      location: 'Bogor',
      date: '18 Desember 2024',
      volunteers: '8/15 volunteer',
      backgroundColor: '#FFF0F5',
      verified: true,
      urgent: false,
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Standardized Header with Search and Icons */}
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
            <TouchableOpacity 
              className="flex-row items-center bg-white rounded-xl px-4 py-4"
              onPress={() => router.push('/home/search')}
            >
              <Ionicons name="search" size={20} color="#9CA3AF" />
              <Text className="text-gray-500 ml-3 flex-1">Cari campaign, zakat, atau donasi...</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions - Navigation to Main Tabs */}
        <View className="px-6 -mt-6 mb-8">
          <View 
            className="bg-white rounded-2xl p-6"
            style={{ 
              shadowColor: '#000', 
              shadowOffset: { width: 0, height: 2 }, 
              shadowOpacity: 0.1, 
              shadowRadius: 4, 
              elevation: 3 
            }}
          >
            <Text className="text-lg font-bold text-gray-900 mb-4">Aksi Cepat</Text>
            <View className="flex-row justify-between">
              <TouchableOpacity 
                className="items-center flex-1"
                onPress={() => router.push('/(tabs)/volunteer')}
              >
                <View className="w-12 h-12 rounded-full items-center justify-center mb-2" style={{ backgroundColor: "#C6E6E3" }}>
                  <Image source={images.volunteer_nonactive} className="w-6 h-6" resizeMode="contain" />
                </View>
                <Text className="text-xs text-gray-600 text-center font-medium">Volunteer</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className="items-center flex-1"
                onPress={() => router.push('/(tabs)/donate')}
              >
                <View className="w-12 h-12 rounded-full items-center justify-center mb-2" style={{ backgroundColor: "#FED3DD" }}>
                  <Image source={images.donate_nonactive} className="w-6 h-6" resizeMode="contain" />
                </View>
                <Text className="text-xs text-gray-600 text-center font-medium">Donate</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className="items-center flex-1"
                onPress={() => router.push('/(tabs)/donor')}
              >
                <View className="w-12 h-12 rounded-full items-center justify-center mb-2" style={{ backgroundColor: "#C6E6E3" }}>
                  <Image source={images.donor_nonactive} className="w-6 h-6" resizeMode="contain" />
                </View>
                <Text className="text-xs text-gray-600 text-center font-medium">Donor</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className="items-center flex-1"
                onPress={() => router.push('/(tabs)/track')}
              >
                <View className="w-12 h-12 rounded-full items-center justify-center mb-2" style={{ backgroundColor: "#FED3DD" }}>
                  <Image source={images.track_nonactive} className="w-6 h-6" resizeMode="contain" />
                </View>
                <Text className="text-xs text-gray-600 text-center font-medium">Track</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Volunteer Recommendations - Moved here */}
        <View className="mb-8">
          <View className="flex-row items-center justify-between px-6 mb-4">
            <Text className="text-xl font-bold text-gray-900">Rekomendasi Volunteer</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/volunteer')}>
              <Text style={{ color: "#82BFB7" }} className="font-medium">Lihat semua</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={volunteerRecommendationData}
            renderItem={({ item }) => (
              <View 
                className="w-80 mr-4 bg-white rounded-2xl overflow-hidden"
                style={{ 
                  shadowColor: '#000', 
                  shadowOffset: { width: 0, height: 2 }, 
                  shadowOpacity: 0.1, 
                  shadowRadius: 4, 
                  elevation: 3 
                }}
              >
                <View 
                  className="h-32 p-4 justify-end"
                  style={{ backgroundColor: item.backgroundColor }}
                >
                  <View className="bg-white/90 rounded-lg px-3 py-1 self-start">
                    <Text className="text-xs font-semibold text-gray-800">{item.category}</Text>
                  </View>
                  {item.urgent && (
                    <View className="bg-red-500 rounded-lg px-2 py-1 self-end mt-2">
                      <Text className="text-xs font-bold text-white">MENDESAK</Text>
                    </View>
                  )}
                </View>
                <View className="p-4">
                  <View className="flex-row items-center mb-2">
                    <Text className="text-sm text-gray-600 flex-1">{item.organization}</Text>
                    {item.verified && (
                      <Ionicons name="shield-checkmark" size={16} color="#82BFB7" />
                    )}
                  </View>
                  <Text className="text-base font-bold text-gray-900 mb-2" numberOfLines={2}>
                    {item.title}
                  </Text>
                  <Text className="text-sm text-gray-600 mb-3" numberOfLines={2}>
                    {item.description}
                  </Text>
                  <View className="mb-3">
                    <View className="flex-row items-center justify-between mb-1">
                      <View className="flex-row items-center">
                        <Image source={images.location} className="w-3 h-3 mr-1" resizeMode="contain" />
                        <Text className="text-xs text-gray-500">{item.location}</Text>
                      </View>
                      <View className="flex-row items-center">
                        <Image source={images.date} className="w-3 h-3 mr-1" resizeMode="contain" />
                        <Text className="text-xs text-gray-500">{item.date}</Text>
                      </View>
                    </View>
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center">
                        <Image source={images.user} className="w-3 h-3 mr-1" resizeMode="contain" />
                        <Text className="text-sm font-semibold text-gray-700">{item.volunteers}</Text>
                      </View>
                      <View className="w-20 h-2 bg-gray-200 rounded-full">
                        <View 
                          className="h-full rounded-full" 
                          style={{ 
                            width: `${(parseInt(item.volunteers.split('/')[0]) / parseInt(item.volunteers.split('/')[1])) * 100}%`, 
                            backgroundColor: "#82BFB7" 
                          }}
                        />
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity className="rounded-xl py-3" style={{ backgroundColor: "#82BFB7" }}>
                    <Text className="text-white font-semibold text-center">Daftar Volunteer</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24 }}
          />
        </View>

        {/* Campaign Mendesak Lainnya */}
        <View className="mb-8">
          <View className="flex-row items-center justify-between px-6 mb-4">
            <Text className="text-xl font-bold text-gray-900">Program Donasi Berkelanjutan</Text>
            <TouchableOpacity>
              <Text style={{ color: "#82BFB7" }} className="font-medium">Lihat semua</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={urgentCampaignData}
            renderItem={({ item }) => (
              <View 
                className="w-80 mr-4 bg-white rounded-2xl overflow-hidden"
                style={{ 
                  shadowColor: '#000', 
                  shadowOffset: { width: 0, height: 2 }, 
                  shadowOpacity: 0.1, 
                  shadowRadius: 4, 
                  elevation: 3 
                }}
              >
                <View 
                  className="h-32 p-4 justify-end"
                  style={{ backgroundColor: item.backgroundColor }}
                >
                  <View className="bg-white/90 rounded-lg px-3 py-1 self-start">
                    <Text className="text-xs font-semibold text-gray-800">{item.category}</Text>
                  </View>
                </View>
                <View className="p-4">
                  <View className="flex-row items-center mb-2">
                    <Text className="text-sm text-gray-600 flex-1">{item.organization}</Text>
                    {item.verified && (
                      <Ionicons name="shield-checkmark" size={16} color="#82BFB7" />
                    )}
                  </View>
                  <Text className="text-base font-bold text-gray-900 mb-3" numberOfLines={2}>
                    {item.title}
                  </Text>
                  <View className="mb-3">
                    <View className="flex-row items-center justify-between mb-2">
                      <Text className="text-sm text-gray-600">Terkumpul</Text>
                      <Text className="text-sm font-semibold text-gray-900">{item.collected}</Text>
                    </View>
                    <View className="w-full h-2 bg-gray-200 rounded-full">
                      <View 
                        className="h-full rounded-full" 
                        style={{ width: `${item.progress * 100}%`, backgroundColor: "#82BFB7" }}
                      />
                    </View>
                  </View>
                  <TouchableOpacity className="rounded-xl py-3" style={{ backgroundColor: "#82BFB7" }}>
                    <Text className="text-white font-semibold text-center">Donasi Sekarang</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24 }}
          />
        </View>

        {/* Spesial Buat Kamu Section */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-gray-800 mb-4 px-5">Rekomendasi Donor</Text>
          <FlatList
            data={spesialData}
            renderItem={({ item }) => <SpesialCard item={item} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            onScroll={handleSpesialScroll}
            scrollEventThrottle={16}
            snapToInterval={384}
            snapToAlignment="start"
            decelerationRate="fast"
          />
          
          {/* Pagination Indicators outside */}
          <View className="flex-row justify-center mt-4">
            {spesialData.map((_, index) => (
              <View
                key={index}
                className={`h-2 mx-1 rounded-full ${
                  index === currentSpesialIndex 
                    ? 'w-8 bg-gray-800' 
                    : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </View>
        </View>

        {/* Doa-doa #OrangBaik Section */}
        <View className="mb-8">
          <View className="flex-row items-center justify-between px-6 mb-4">
            <Text className="text-xl font-bold text-gray-900">Doa-doa #GiveWithHope</Text>
            <TouchableOpacity onPress={() => router.push('/home/prayers')}>
              <Text style={{ color: "#82BFB7" }} className="font-medium">Lihat semua</Text>
            </TouchableOpacity>
          </View>
          
          <View className="px-6">
            <FlatList
              data={doaData}
              renderItem={({ item }) => <DoaCard item={item} />}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>

        {/* Bottom Padding */}
        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
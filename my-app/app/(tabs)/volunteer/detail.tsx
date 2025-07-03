// File: app/activity/[id].js

import { View, Text, Image, ScrollView, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import React from 'react';
import { useRouter, useLocalSearchParams, Redirect } from 'expo-router';
import images from '../../../constants/images';

// DATA DUMMY LENGKAP - HARUS SAMA DENGAN DI HALAMAN SEBELUMNYA
// Di aplikasi nyata, Anda akan fetch data dari API, jadi tidak perlu duplikasi seperti ini.
const dummyActivities = [
  {
    id: 1,
    title: 'Volunteer Sebersi',
    location: 'Sentul, Bogor',
    date: '12 Mei 2025',
    image: images.volunteer1,
    organizer: 'Volunteer by Hope',
    organizerLogo: images.Logo1, // Fixed logo reference
    description: 'Kegiatan "Sebersi" atau "Seminggu Bersih-Bersih" adalah inisiatif kami untuk membersihkan area publik yang sering terabaikan. Bergabunglah bersama kami untuk membuat lingkungan lebih sehat.',
    benefit: 'Selain mendapatkan pengalaman berharga, Anda akan menerima sertifikat partisipasi, konsumsi selama acara, dan kesempatan untuk memperluas jaringan dengan sesama relawan.',
    terms: [ 'Berusia minimal 17 tahun', 'Sehat jasmani dan rohani', 'Bersedia mengikuti arahan koordinator', 'Membawa botol minum pribadi' ]
  },
  {
    id: 2,
    title: 'Bagi Makanan Gratis',
    location: 'Blok M, Jakarta Selatan',
    date: '10 Jan 2025',
    image: images.volunteer2,
    organizer: 'Berbagi Berkah Community',
    organizerLogo: images.Logo1,
    description: 'Setiap Jumat, kami berkeliling untuk membagikan makanan kepada mereka yang membutuhkan. Kami membutuhkan bantuan Anda untuk proses memasak, pengemasan, dan distribusi.',
    benefit: 'Merasakan langsung kebahagiaan berbagi, makan siang gratis, dan menjadi bagian dari komunitas yang peduli.',
    terms: [ 'Ikhlas dan tulus membantu', 'Menjaga kebersihan selama proses', 'Dapat bekerja dalam tim' ]
  },
  {
    id: 3,
    title: 'Tanam 1000 Pohon',
    location: 'Kawasan Konservasi Mangrove, PIK',
    date: '15 Feb 2025',
    image: images.volunteer3,
    organizer: 'Green Earth Foundation',
    organizerLogo: images.Logo1,
    description: 'Dalam rangka Hari Bumi, kami akan menanam 1000 bibit mangrove untuk membantu mencegah abrasi dan menjaga ekosistem pesisir. Ayo jadi pahlawan lingkungan!',
    benefit: 'Sertifikat pahlawan lingkungan, edukasi tentang ekosistem mangrove, snack dan minuman.',
    terms: [ 'Tidak takut kotor', 'Mengenakan pakaian lapangan yang nyaman', 'Membawa topi atau pelindung kepala' ]
  },
  {
    id: 4,
    title: 'Donasi Panti Asuhan Ceria',
    location: 'Depok, Jawa Barat',
    date: '01 Mar 2025',
    image: images.volunteer2,
    organizer: 'Volunteer by Hope',
    organizerLogo: images.Logo1,
    description: 'Kami mengumpulkan dan menyortir donasi berupa pakaian, buku, dan mainan layak pakai untuk disalurkan ke Panti Asuhan Ceria. Bantuan tenaga Anda sangat berarti.',
    benefit: 'Mendapat teman baru, kepuasan batin, dan melihat senyum anak-anak panti.',
    terms: [ 'Jujur dan teliti', 'Memiliki waktu luang minimal 4 jam' ]
  },
  {
    id: 5,
    title: 'Ajar Anak Jalanan',
    location: 'Stasiun Kota, Jakarta',
    date: '20 Mar 2025',
    image: images.volunteer3,
    organizer: 'Kelas Terbuka Indonesia',
    organizerLogo: images.Logo1,
    description: 'Berikan secercah ilmu bagi adik-adik kita di jalanan. Kami mengadakan kelas terbuka setiap akhir pekan dengan materi dasar membaca, menulis, dan berhitung.',
    benefit: 'Pengalaman mengajar yang tak terlupakan, melatih kesabaran, dan memberikan dampak positif langsung.',
    terms: [ 'Sabar dan suka anak-anak', 'Menguasai materi dasar (calistung)', 'Berkomitmen untuk datang rutin' ]
  },
];

const ActivityDetailScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const handleNavigateToPendaftaran = (activityId) => {
    router.push({
      pathname: '/volunteer/pendaftaran',
      params: { activityId: id },
    });
  };

  const activity = dummyActivities.find(act => act.id.toString() === id);

  if (!activity) {
    return <Redirect href="/volunteer" />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Standardized Header */}
      <View className="bg-white px-4 py-3">
        <View style={styles.headerTop}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Image 
              source={images.back} 
              style={styles.backIcon} 
              resizeMode="contain" 
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Detail Volunteer</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <View className="relative">
          <Image source={activity.image} className="w-full h-64" resizeMode="cover"/>
        </View>

        {/* Content */}
        <View className="px-6 py-6 bg-white">
          {/* Title */}
          <Text className="text-2xl font-bold text-gray-900 mb-4">{activity.title}</Text>
          
          {/* Location & Date */}
          <View className="space-y-3 mb-6">
            <View className="flex-row items-center">
              <View className="w-5 h-5 items-center justify-center mr-3">
                <Image source={images.location} className="w-4 h-4" resizeMode="contain" />
              </View>
              <Text className="text-base text-gray-700">{activity.location}</Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-5 h-5 items-center justify-center mr-3">
                <Image source={images.date} className="w-4 h-4" resizeMode="contain" />
              </View>
              <Text className="text-base text-gray-700">{activity.date}</Text>
            </View>
          </View>

          {/* Organizer */}
          <View className="flex-row items-center py-4 px-4 bg-gray-50 rounded-xl mb-6">
            <Image source={activity.organizerLogo} className="w-12 h-12 rounded-full" resizeMode="contain"/>
            <View className="ml-3">
              <Text className="text-sm text-gray-500">Diselenggarakan oleh</Text>
              <Text className="text-lg font-semibold text-gray-900">{activity.organizer}</Text>
            </View>
          </View>
          
          {/* Description */}
          <View className="mb-6">
            <Text className="text-xl font-bold text-gray-900 mb-3">Deskripsi Kegiatan</Text>
            <Text className="text-base text-gray-600 leading-6">{activity.description}</Text>
          </View>
          
          {/* Benefits */}
          <View className="mb-6">
            <Text className="text-xl font-bold text-gray-900 mb-3">Benefit yang Didapat</Text>
            <View className="bg-green-50 p-4 rounded-xl">
              <Text className="text-base text-gray-700 leading-6">{activity.benefit}</Text>
            </View>
          </View>
          
          {/* Terms */}
          <View className="mb-8">
            <Text className="text-xl font-bold text-gray-900 mb-3">Syarat dan Ketentuan</Text>
            <View className="bg-blue-50 p-4 rounded-xl">
              {activity.terms.map((term, index) => (
                <View key={index} className="flex-row items-start mb-2">
                  <View className="w-2 h-2 rounded-full mt-2 mr-3" style={{ backgroundColor: '#82BFB7' }} />
                  <Text className="text-base text-gray-700 flex-1 leading-6">{term}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Register Button */}
      <View className="px-6 py-4 bg-white border-t border-gray-100">
        <TouchableOpacity 
          className="py-4 rounded-xl items-center justify-center"
          style={{ backgroundColor: '#82BFB7' }}
          onPress={handleNavigateToPendaftaran}
        >
          <Text className="text-white text-lg font-bold">Daftar Volunteer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',

  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#374151',

  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
});

export default ActivityDetailScreen;
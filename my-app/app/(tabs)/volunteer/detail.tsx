// File: app/activity/[id].js

import { View, Text, Image, ScrollView, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams, Redirect } from 'expo-router';
import images from '../../../constants/images'; // Pastikan path ini benar

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
    organizerLogo: images.Logo1,
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
    // ==========================================================
    // PERUBAHAN UTAMA DI SINI
    // ==========================================================
    // Path harus mencakup nama folder induknya: 'volunteer'
    router.push({
      pathname: '/volunteer/pendaftaran', // <-- INI PATH YANG BENAR
      params: { activityId: id },
    });
    console.log("Mengarahkan ke /volunteer/pendaftaran dengan ID:", activityId);
  };

  const activity = dummyActivities.find(act => act.id.toString() === id);

  if (!activity) {
    // Jika tidak ada ID atau data tidak ditemukan, kembali ke halaman utama
    return <Redirect href="/volunteer" />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        
        <View className="relative">
          <Image source={activity.image} className="w-full h-64 rounded" resizeMode="cover"/>
          <TouchableOpacity className="absolute top-14 left-5 p-2 rounded-full"  onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View className="p-5">
          <Text className="text-2xl font-bold text-black">{activity.title}</Text>
          
          <View className="mt-4 space-y-2">
            <View className="flex-row items-center">
              <View className="w-5 h-5 rounded-full border-2 border-gray-400 mr-3" />
              <Text className="text-base text-gray-700">{activity.location}</Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-5 h-5 rounded-full border-2 border-gray-400 mr-3" />
              <Text className="text-base text-gray-700">{activity.date}</Text>
            </View>
          </View>

          <View className="border-b border-gray-200 my-5" />

          <View className="flex-row items-center">
            <Image source={activity.organizerLogo} className="w-10 h-10 rounded-full" resizeMode="contain"/>
            <Text className="text-lg font-semibold text-black ml-3">{activity.organizer}</Text>
          </View>
          
          <View className="border-b border-gray-200 my-5" />
          
          <View className="mb-6">
            <Text className="text-xl font-bold text-black mb-2">Deskripsi</Text>
            <Text className="text-base text-gray-600 leading-relaxed">{activity.description}</Text>
          </View>
          
          <View className="mb-6">
            <Text className="text-xl font-bold text-black mb-2">Benefit</Text>
            <Text className="text-base text-gray-600 leading-relaxed">{activity.benefit}</Text>
          </View>
          
          <View className="mb-8 flex-row">
            <View className="w-1 bg-black mr-3" />
            <View className="flex-1">
              <Text className="text-xl font-bold text-black mb-2">Syarat dan Ketentuan</Text>
              {activity.terms.map((term, index) => (
                <Text key={index} className="text-base text-gray-600 ml-2">• {term}</Text>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="px-5 py-3 bg-white border-t border-gray-200">
        <TouchableOpacity className="bg-black py-4 rounded-full items-center justify-center"
         onPress={handleNavigateToPendaftaran}>
          <Text className="text-white text-lg font-bold">Daftar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF6F6',
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default ActivityDetailScreen;
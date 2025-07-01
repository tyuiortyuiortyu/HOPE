import { View, Text, Image, ScrollView, TouchableOpacity, StatusBar, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import images from '../../../constants/images'; // Pastikan path dan nama gambar sudah benar

// ==========================================================
// LANGKAH 1: BUAT DATA DUMMY DI SINI
// ==========================================================
// DATA DUMMY LENGKAP UNTUK SEMUA KEGIATAN
const dummyActivities = [
  {
    id: 1,
    title: 'Volunteer Sebersi',
    location: 'Sentul, Bogor',
    date: '12 Mei 2025',
    image: images.volunteer1,
    organizer: 'Volunteer by Hope',
    organizerLogo: images.Logo,
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
    organizerLogo: images.Logo,
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
    organizerLogo: images.Logo,
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
    organizerLogo: images.Logo,
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
    organizerLogo: images.Logo,
    description: 'Berikan secercah ilmu bagi adik-adik kita di jalanan. Kami mengadakan kelas terbuka setiap akhir pekan dengan materi dasar membaca, menulis, dan berhitung.',
    benefit: 'Pengalaman mengajar yang tak terlupakan, melatih kesabaran, dan memberikan dampak positif langsung.',
    terms: [ 'Sabar dan suka anak-anak', 'Menguasai materi dasar (calistung)', 'Berkomitmen untuk datang rutin' ]
  },
];


const VolunteerScreen = () => {
  const router = useRouter();

  // ==========================================================
  // LANGKAH 3: BUAT FUNGSI UNTUK NAVIGASI
  // ==========================================================
  const handleNavigateToDetail = (activityId) => {
    // ==========================================================
    // PERUBAHAN UTAMA DI SINI
    // ==========================================================
    // Path harus mencakup nama folder induknya: 'volunteer'
    router.push({
      pathname: '/volunteer/detail', // <-- INI PATH YANG BENAR
      params: { id: activityId },
    });
    console.log("Mengarahkan ke /volunteer/detail dengan ID:", activityId);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="relative pb-20">

          {/* Gambar Header */}
          <Image
            source={images.volunteer1}
            className="w-full h-56 rounded" 
            resizeMode="cover"
          />

          {/* Konten Utama */}
          <View className="px-4">
            <View 
              className="rounded-2xl p-4 w-full"
            //   style={styles.shadow}
            >
              <View className="pt-12">
                <Text className="text-2xl font-bold text-black mb-2">Volunteer Hope</Text>
                <Text className="text-sm text-gray-600 leading-relaxed">
                  Lorem Ipsum adalah contoh teks atau dummy dalam industri percetakan dan penataan huruf atau typesetting. Lorem Ipsum telah menjadi standar contoh teks sejak tahun 1500an, saat seorang tukang cetak yang tidak
                </Text>
              </View>
            </View>

            {/* SEARCH BAR */}
            <View className="mt-6">
              <View 
                className="flex-row items-center bg-white rounded-[15px] border border-gray-200 px-4 py-3" 
                style={styles.shadow}
              >
                <Feather name="search" size={20} color="gray" />
                <TextInput
                  placeholder="Bersama melindungi HAM"
                  className="ml-2 flex-1 text-base"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>

            {/* ========================================================== */}
            {/* LANGKAH 2: RENDER DAFTAR KEGIATAN SECARA DINAMIS */}
            {/* ========================================================== */}
            <View className="mt-6 space-y-4">
              {dummyActivities.map((item) => (
                // 'key' sangat penting untuk performa dan stabilitas
                <View key={item.id} className="bg-[#D9D9D9] rounded-2xl flex-row overflow-hidden mt-5">
                  <Image source={item.image} className="w-32 h-full" resizeMode="cover" />
                  <View className="flex-1 p-4 justify-between">
                    <View>
                      <Text className="text-base font-bold text-black">{item.title}</Text>
                      <Text className="text-sm text-gray-700 mt-1">{item.location}</Text>
                      <Text className="text-sm text-gray-700">{item.date}</Text>
                    </View>
                    <TouchableOpacity 
                      className="bg-black py-2 px-4 mt-2 rounded-full self-start"
                      onPress={() => handleNavigateToDetail(item.id)}>
                    
                      <Text className="text-white text-xs font-semibold">Selengkapnya</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>

          </View>
          
          {/* Logo Mengambang */}
          <View className="absolute top-44 left-6 z-30">
            <View 
              className="w-24 h-24 bg-yellow-100 rounded-full items-center justify-center border-4 border-white"
              style={styles.shadow}
            >
              <Image source={images.Logo1} className="w-20 h-20" resizeMode="contain"/>
            </View>
          </View>

          {/* Tombol Kembali Mengambang */}
          <TouchableOpacity
            className="absolute top-5 left-5 p-2 rounded-full z-40"
            // style={styles.shadow}
            onPress={() => router.back()}
          >
            <Feather name="arrow-left" size={24} color="black" />
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
});

export default VolunteerScreen;
// app/(tabs)/home/profile/profile.tsx

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView, 
  Image, 
  StyleSheet, 
  Modal 
} from 'react-native';
import { useRouter } from 'expo-router';

// Impor aset dari file constants dengan path yang benar
import icons from '../../../../constants/icons';
import images from '../../../../constants/images';

// Data untuk semua item menu
const menuData = [
  { id: '1', icon: icons.akun, text: 'Akun Saya' },
  { id: '2', icon: icons.sertifikat, text: 'Sertifikat Aksi & Donasi' },
  { id: '3', icon: icons.rating, text: 'Rating Aplikasi HOPE' },
  { id: '4', icon: icons.tentang, text: 'Tentang HOPE' },
  { id: '5', icon: icons.keluar, text: 'Keluar' },
];

// Semua style terpusat di sini untuk kontrol yang lebih andal
const styles = StyleSheet.create({
  profileImage: {
    width: 128,
    height: 128,
    borderRadius: 64,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  headerIcon: {
    width: 20,
    height: 20,
    tintColor: '#4A4A4A',
  },
  editIcon: {
    width: 16,
    height: 16,
    marginLeft: 8,
  },
  menuIcon: {
    width: 20,
    height: 20,
    marginRight: 16,
  },
  helpIcon: {
    width: 20,
    height: 20,
  },
});

const ProfileScreen = () => {
  const router = useRouter();
  const [isModalVisible, setModalVisible] = useState(false);


  // Fungsi penanganan klik yang didefinisikan satu kali di luar JSX untuk performa terbaik
  const handlePress = (item) => {
    switch (item.text) {
      case 'Akun Saya':
        router.push('/home/profile/edit');
        break;
      case 'Sertifikat Aksi & Donasi':
        router.push('/home/profile/certificates');
        break;
      case 'Rating Aplikasi HOPE':
        router.push('/home/profile/rating');
        break;
      case 'Tentang HOPE':
        router.push('/home/profile/about');
        break;
      case 'Keluar':
        setModalVisible(true); 
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    setModalVisible(false); // Tutup modal terlebih dahulu
    router.replace('/(auth)/login'); // Lalu navigasi
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
        <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        {/* Background Overlay */}
        <View className="flex-1 justify-center items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          {/* Kotak Modal */}
          <View className="w-11/12 bg-white rounded-2xl overflow-hidden">
            <View className="p-6 items-center">
              <Text className="text-xl font-bold text-gray-800 mb-2">Alert</Text>
              <Text className="text-base text-gray-600 text-center">
                Apakah Anda yakin untuk keluar dari akun Anda?
              </Text>
            </View>
            {/* Tombol Aksi */}
            <View className="flex-row border-t border-gray-200">
              <TouchableOpacity 
                className="flex-1 items-center py-3 bg-[#A2D5C6]"
                onPress={handleLogout}
              >
                <Text className="text-base font-bold text-black">Ya</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className="flex-1 items-center py-3 bg-gray-200"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-base font-bold text-gray-700">Tidak</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>



      {/* Header */}
      <View className="bg-[#A2D5C6] p-4 h-[60px] flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="p-1">
          <Image source={icons.back} style={styles.headerIcon} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* Profile Section */}
        <View className="items-center py-8">
          <Image
            source={images.profilePlaceholder}
            style={styles.profileImage}
          />
          <TouchableOpacity 
            className="flex-row items-center"
            onPress={() => router.push('/home/profile/edit')}
          >
            <Text className="text-2xl font-medium">XXXXX</Text>
            <Image source={icons.pencil} style={styles.editIcon} />
          </TouchableOpacity>
        </View>

        {/* Menu List */}
        <View className="px-6">
          {menuData.map((item) => (
            <TouchableOpacity
              key={item.id}
              className="flex-row items-center bg-[#A2D5C6] p-4 rounded-xl mb-4 shadow-sm"
              onPress={() => handlePress(item)} // Memanggil fungsi handler dengan item yang sesuai
            >
              <Image source={item.icon} style={styles.menuIcon} resizeMode="contain" />
              <Text className="text-base text-gray-800">{item.text}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Help Link */}
        <TouchableOpacity className="flex-row justify-center items-center mt-6 pb-10">
          <Image source={icons.help} style={styles.helpIcon} resizeMode="contain"/>
          <Text className="ml-2 text-sm text-gray-700">Butuh Bantuan?</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
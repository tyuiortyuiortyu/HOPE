// app/(tabs)/home/profile/edit.tsx

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView, 
  Image, 
  StyleSheet,
  TextInput,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

import icons from '../../../../constants/icons';
import images from '../../../../constants/images';

// Helper component untuk membuat setiap field input lebih rapi
const FormField = ({ label, value, onChangeText, ...props }) => {
  return (
    <View className="mb-6">
      <Text className="text-xs font-bold text-gray-600 mb-1">{label}</Text>
      <TextInput
        className="text-lg text-black pb-2 border-b border-gray-300"
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#9CA3AF"
        {...props}
      />
    </View>
  );
};

// Style untuk gambar (lebih andal daripada className)
const styles = StyleSheet.create({
  profileImage: {
    width: 128,
    height: 128,
    borderRadius: 64,
  },
  headerIcon: {
    width: 20,
    height: 20,
    tintColor: '#4A4A4A',
  },
});

const EditProfileScreen = () => {
  const router = useRouter();

  // State untuk menampung data form
  const [name, setName] = useState('Mark Lee');
  const [dob, setDob] = useState('02/08/1999');
  const [email, setEmail] = useState('-');
  const [phone, setPhone] = useState('+82 XXXXXXXXXX');

  const [selectedImage, setSelectedImage] = useState(null);

  const handlePickImage = async () => {
    // Meminta izin untuk mengakses galeri
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Izin Ditolak', 'Maaf, kami memerlukan izin akses galeri untuk mengganti foto profil.');
      return;
    }

    // Membuka galeri untuk memilih gambar
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Hanya gambar, bukan video
      allowsEditing: true, // Memungkinkan pengguna untuk memotong (crop) gambar
      aspect: [1, 1], // Memaksa rasio 1:1 (persegi) untuk foto profil
      quality: 1, // Kualitas tertinggi
    });

    // Jika pengguna tidak membatalkan, simpan URI gambar ke state
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-[#A2D5C6] p-4 h-[60px] flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="p-1">
          <Image source={icons.back} style={styles.headerIcon} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* Profile Picture Section */}
        <View className="items-center py-8">
          <Image
            source={selectedImage ? { uri: selectedImage } : images.profilePlaceholder}
            style={styles.profileImage}
          />
          {/* 5. Panggil fungsi handlePickImage saat tombol ditekan */}
          <TouchableOpacity className="mt-3" onPress={handlePickImage}>
            <Text className="text-base text-gray-800 font-medium">
              Ganti Foto Profile
            </Text>
          </TouchableOpacity>
        </View>

        {/* Form Inputs */}
        <View className="px-6 mt-4">
          <FormField 
            label="Nama"
            value={name}
            onChangeText={setName}
          />
          <FormField 
            label="Tanggal Lahir"
            value={dob}
            onChangeText={setDob}
          />
          <FormField 
            label="Email"
            value={email}
            onChangeText={setEmail}
            editable={false} // Email biasanya tidak bisa diubah
          />
          <FormField 
            label="No. Telp"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>

        {/* Save Button */}
        <View className="px-6 mt-10 mb-10">
            <TouchableOpacity className="bg-[#A2D5C6] py-4 rounded-xl items-center shadow-md"
            onPress={() => router.push('home/profile/profile')}>
                <Text className="text-black font-bold text-base">Simpan Perubahan</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
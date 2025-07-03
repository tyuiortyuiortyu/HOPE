// File: app/activity/pendaftaran.tsx

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  TextInput,
  Alert,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams, Redirect } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import Checkbox from 'expo-checkbox';
import images from '../../../constants/images';

// ============================================
// CUSTOM COMPONENTS
// ============================================

const FormField = ({ label, placeholder, keyboardType = 'default', value, onChangeText }) => (
  <View className="mb-5">
    <Text className="text-base font-semibold text-gray-900 mb-3">{label}</Text>
    <TextInput
      className="bg-white rounded-xl px-4 py-4 text-base border border-gray-200 shadow-sm"
      placeholder={placeholder || `Masukkan ${label}`}
      placeholderTextColor="#9CA3AF"
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
    />
  </View>
);

const PilihanOpsi = ({ label, options, value, onSelect }) => (
  <View className="mb-5">
    <Text className="text-base font-semibold text-gray-900 mb-3">{label}</Text>
    <View className="flex-row space-x-3">
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          onPress={() => onSelect(option)}
          style={{ 
            backgroundColor: value === option ? '#82BFB7' : '#FFFFFF',
            borderColor: value === option ? '#82BFB7' : '#E5E7EB',
            borderWidth: 1
          }}
          className="px-6 py-3 rounded-xl flex-1 items-center shadow-sm"
        >
          <Text
            style={{ color: value === option ? '#FFFFFF' : '#374151' }}
            className="font-semibold text-sm"
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

const ActivityInfoItem = ({ icon, text }) => (
  <View className="flex-row items-center mb-3">
    <View className="w-6 h-6 rounded-full bg-gray-200 mr-3 items-center justify-center">
      {icon}
    </View>
    <Text className="text-sm text-gray-700 flex-1">{text}</Text>
  </View>
);

const PendaftaranScreen = () => {
  const router = useRouter();
  const { activityId } = useLocalSearchParams();

  // Form state
  const [formData, setFormData] = useState({
    nama: '',
    jenisKelamin: '',
    nik: '',
    alamat: '',
    domisili: '',
    status: '',
    pendidikan: '',
    nomorTelepon: '',
    fotoKTP: null,
  });

  const [setujuSK, setSetujuSK] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handlers
  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    
    if (!result.canceled) {
      handleInputChange('fotoKTP', result.assets[0].uri);
    }
  };

  // Form validation
  const isFormValid = useMemo(() => {
    const requiredFields = [
      'nama', 'jenisKelamin', 'nik', 'alamat', 
      'domisili', 'status', 'pendidikan', 'nomorTelepon'
    ];
    const allFieldsFilled = requiredFields.every(field => formData[field]?.trim());
    return allFieldsFilled && formData.fotoKTP && setujuSK;
  }, [formData, setujuSK]);

  const handleDaftar = () => {
    if (!isFormValid) {
      Alert.alert(
        "Form Tidak Lengkap",
        "Harap isi semua data, unggah KTP, dan setujui S&K."
      );
      return;
    }
    setIsSubmitted(true);
  };

  // Redirect if no activity ID
  if (!activityId) {
    return <Redirect href="/volunteer/listvolunteer" />;
  }

  // Success screen
  if (isSubmitted) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        
        {/* Header - Updated to match detail page */}
        <View className="bg-white px-4 py-3">
          <View style={styles.headerTop}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.replace('/volunteer/listvolunteer')}
            >
              <Image 
                source={images.back} 
                style={styles.backIcon} 
                resizeMode="contain" 
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Pendaftaran Berhasil</Text>
          </View>
        </View>

        <View className="flex-1 items-center justify-center p-8">
          <Image source={images.done} className="w-20 h-20 mb-4" resizeMode="contain" />
          <Text className="text-2xl font-bold text-center mb-2">
            Pendaftaran Berhasil!
          </Text>
          <Text className="text-base text-gray-600 text-center mb-6">
            Terima kasih telah mendaftar. Informasi selanjutnya akan kami kirimkan 
            melalui nomor telepon Anda.
          </Text>
          <TouchableOpacity
            onPress={() => router.replace('/volunteer/listvolunteer')}
            style={{ backgroundColor: '#82BFB7' }}
            className="py-3 px-8 rounded-full"
          >
            <Text className="text-white font-bold text-base">
              Kembali ke Daftar Volunteer
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Main form screen
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF6F6" />
      
      {/* Header - Updated to match detail page */}
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
          <Text style={styles.headerTitle}>Pendaftaran Volunteer</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Hero Image */}
        <View className="relative">
          <Image
            source={images.volunteer1}
            className="w-full h-64"
            resizeMode="cover"
          />
          <View className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent h-20" />
        </View>

        {/* Content */}
        <View className="px-5 py-6 bg-white -mt-6 mx-4 rounded-t-3xl shadow-lg">
          {/* Activity Details */}
          <View className="mb-6">
            <Text className="text-xl font-bold text-gray-900 mb-4">
              Kegiatan Volunteer
            </Text>
            <ActivityInfoItem 
              icon={<Image source={images.location} className="w-3 h-3" resizeMode="contain" />}
              text="Sentul, Bogor"
            />
            <ActivityInfoItem 
              icon={<Image source={images.date} className="w-3 h-3" resizeMode="contain" />}
              text="12 Mei 2025"
            />
            <ActivityInfoItem 
              icon={<Image source={images.user} className="w-3 h-3" resizeMode="contain" />}
              text="Diselenggarakan oleh Hope"
            />
          </View>

          <View className="border-b border-gray-100 mb-6" />

          {/* Form */}
          <View>
            <Text className="text-xl font-bold text-gray-900 mb-6">
              Informasi Pribadi
            </Text>
            
            <FormField
              label="Nama Lengkap"
              value={formData.nama}
              onChangeText={(val) => handleInputChange('nama', val)}
            />
            
            <PilihanOpsi
              label="Jenis Kelamin"
              options={['Laki-laki', 'Perempuan']}
              value={formData.jenisKelamin}
              onSelect={(val) => handleInputChange('jenisKelamin', val)}
            />
            
            <FormField
              label="NIK"
              value={formData.nik}
              onChangeText={(val) => handleInputChange('nik', val)}
              keyboardType="numeric"
            />
            
            <FormField
              label="Alamat Lengkap"
              value={formData.alamat}
              onChangeText={(val) => handleInputChange('alamat', val)}
            />
            
            <FormField
              label="Domisili"
              value={formData.domisili}
              onChangeText={(val) => handleInputChange('domisili', val)}
            />
            
            <PilihanOpsi
              label="Status Pernikahan"
              options={['Single', 'Married']}
              value={formData.status}
              onSelect={(val) => handleInputChange('status', val)}
            />
            
            <FormField
              label="Pendidikan Terakhir"
              value={formData.pendidikan}
              onChangeText={(val) => handleInputChange('pendidikan', val)}
            />
            
            <FormField
              label="Nomor Telepon"
              value={formData.nomorTelepon}
              onChangeText={(val) => handleInputChange('nomorTelepon', val)}
              keyboardType="phone-pad"
            />
            
            {/* KTP Upload */}
            <View className="mb-6">
              <Text className="text-base font-semibold text-gray-900 mb-3">
                Upload Foto KTP
              </Text>
              <TouchableOpacity
                onPress={pickImage}
                className="bg-gray-50 rounded-2xl h-48 items-center justify-center border-2 border-dashed border-gray-300 overflow-hidden"
              >
                {formData.fotoKTP ? (
                  <Image
                    source={{ uri: formData.fotoKTP }}
                    className="w-full h-full rounded-2xl"
                    resizeMode="cover"
                  />
                ) : (
                  <View className="items-center">
                    <View className="w-16 h-16 rounded-full bg-gray-200 items-center justify-center mb-3">
                      <Ionicons name="camera-outline" size={24} color="#9CA3AF" />
                    </View>
                    <Text className="text-gray-500 font-medium">Ketuk untuk mengunggah KTP</Text>
                    <Text className="text-gray-400 text-sm mt-1">JPG, PNG maksimal 5MB</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            {/* Terms and Conditions */}
            <View className="flex-row items-start mb-8 p-4 bg-gray-50 rounded-xl">
              <Checkbox
                value={setujuSK}
                onValueChange={setSetujuSK}
                color={setujuSK ? '#82BFB7' : undefined}
                style={{ width: 20, height: 20, marginRight: 12, marginTop: 2 }}
              />
              <Text className="text-sm text-gray-700 flex-1 leading-5">
                Saya memahami dan menerima{' '}
                <Text className="font-semibold text-black">Syarat & Ketentuan</Text>
                {' '}yang berlaku serta bersedia mengikuti seluruh rangkaian kegiatan volunteer.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View className="px-5 py-4 bg-white border-t border-gray-100 shadow-lg">
        <TouchableOpacity
          onPress={handleDaftar}
          disabled={!isFormValid}
          style={{
            backgroundColor: isFormValid ? '#82BFB7' : '#E5E7EB',
            opacity: 1
          }}
          className="py-4 rounded-2xl items-center justify-center shadow-sm"
        >
          <Text 
            style={{ color: isFormValid ? '#FFFFFF' : '#9CA3AF' }}
            className="text-lg font-bold"
          >
            Daftar Sekarang
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
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
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default PendaftaranScreen;
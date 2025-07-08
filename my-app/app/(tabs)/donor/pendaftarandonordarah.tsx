import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, SafeAreaView, Alert, Modal, Pressable, Platform, StyleSheet, StatusBar } from 'react-native';
import Checkbox from 'expo-checkbox';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import images from '../../../constants/images';

const syaratData = [
  "Usia 17-60 tahun (dengan persetujuan orang tua/wali bagi yang berusia di bawah 18 tahun dan di atas 60 tahun dengan kondisi sehat).",
  "Berat badan minimal 45 kg.",
  "Tekanan darah sistolik 100-180 mmHg dan diastolik 60-100 mmHg.",
  "Kadar hemoglobin minimal 12,5 g/dL untuk wanita dan 13,5 g/dL untuk pria.",
  "Tidak sedang hamil, menyusui, atau dalam masa menstruasi.",
  "Jarak donor darah terakhir minimal 3 bulan.",
  "Tidur minimal 4 jam sebelum donor darah.",
  "Makan 3-4 jam sebelum donor darah, hindari makanan berlemak.",
  "Tidak sedang mengonsumsi obat-obatan tertentu (konsultasikan dengan petugas medis).",
  "Dalam kondisi sehat jasmani dan rohani.",
  "Tidak memiliki riwayat penyakit tertentu seperti HIV/AIDS, hepatitis B/C, sifilis, malaria, dan penyakit kronis lainnya.",
  "Membawa kartu identitas diri (KTP/SIM).",
  "Mengisi formulir pendaftaran dan menjalani pemeriksaan kesehatan oleh petugas medis di lokasi.",
];

const formFields = [
  { name: 'namaLengkap', label: 'Nama Lengkap', placeholder: 'Masukkan nama lengkap' },
  { name: 'nomorTelepon', label: 'Nomor Telepon', placeholder: 'Masukkan nomor telepon', keyboardType: 'phone-pad' },
  { name: 'alamatLengkap', label: 'Alamat Lengkap', placeholder: 'Masukkan alamat lengkap' },
  { name: 'golonganDarah', label: 'Golongan Darah', placeholder: 'Contoh: A+' },
  { name: 'beratBadan', label: 'Berat Badan', placeholder: 'Contoh: 65 kg', keyboardType: 'numeric' },
  { name: 'tinggiBadan', label: 'Tinggi Badan', placeholder: 'Contoh: 170 cm', keyboardType: 'numeric' },
  { name: 'riwayatPenyakit', label: 'Riwayat Penyakit', placeholder: 'Jika tidak ada, isi "Tidak Ada"' },
];

const FormField = ({ label, placeholder, keyboardType = 'default', value, onChangeText }) => (
  <View className="mb-5">
    <Text className="text-base font-semibold text-gray-900 mb-3">{label}</Text>
    <TextInput
      className="bg-white rounded-xl px-4 py-4 text-base border border-gray-200 shadow-sm"
      placeholder={placeholder}
      placeholderTextColor="#9CA3AF"
      keyboardType={keyboardType}
      value={value}
      onChangeText={onChangeText}
    />
  </View>
);

const SyaratItem = ({ text }) => (
  <View className="flex-row items-start mb-2">
    <Text className="text-gray-500 mr-2">•</Text>
    <Text className="flex-1 text-sm text-gray-600 leading-5">{text}</Text>
  </View>
);

const PendaftaranDonorDarahScreen = () => {
  const router = useRouter();
  const { eventTitle, eventId, evenDate, evenAddress, evenImage } = useLocalSearchParams();

  const [formData, setFormData] = useState({});
  const [jenisKelamin, setJenisKelamin] = useState('');
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [tanggalLahir, setTanggalLahir] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [ktpImage, setKtpImage] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Izin Diperlukan", "Anda perlu memberikan izin untuk mengakses galeri.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, aspect: [4, 3], quality: 1 });
    if (!result.canceled) setKtpImage(result.assets[0].uri);
  };

  const isFormValid = useMemo(() => {
    const required = formFields.every(field => formData[field.name]?.trim());
    const phoneValid = /^\d+$/.test(formData.nomorTelepon || '');
    return required && phoneValid && jenisKelamin && ktpImage && isChecked;
  }, [formData, jenisKelamin, ktpImage, isChecked]);

  const handleDaftar = () => {
    if (!isFormValid) {
      Alert.alert("Form Tidak Lengkap", "Harap isi semua data dengan benar, termasuk upload KTP dan setujui S&K.");
      return;
    }
    setIsSubmitted(true);
  };

  // Success screen
  if (isSubmitted) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        
        {/* Header */}
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
            <Text style={styles.headerTitle}>Pendaftaran Berhasil</Text>
          </View>
        </View>

        <View className="flex-1 items-center justify-center p-8">
          <Image source={images.done} className="w-20 h-20 mb-4" resizeMode="contain" />
          <Text className="text-2xl font-bold text-center mb-2">Pendaftaran Berhasil!</Text>
          <Text className="text-base text-gray-600 text-center mb-6">
            Terima kasih telah mendaftar untuk kegiatan donor darah.
          </Text>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ backgroundColor: '#82C7C1' }}
            className="py-3 px-8 rounded-full"
          >
            <Text className="text-white font-bold text-base">Kembali</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Main form screen
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF6F6" />
      
      {/* Header */}
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
          <Text style={styles.headerTitle}>Pendaftaran Donor Darah</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Hero Image */}
        <View className="relative">
          <Image
            source={evenImage}
            className="w-full h-64"
            resizeMode="cover"
          />
          <View className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent h-20" />
        </View>

        {/* Content */}
        <View className="px-5 py-6 bg-white -mt-6 mx-4 rounded-t-3xl shadow-lg">
          {/* Event Details */}
          <View className="mb-6">
            <Text className="text-xl font-bold text-gray-900 mb-4">{eventTitle || 'Kegiatan Donor Darah'}</Text>
            <Text className="text-sm text-gray-700 leading-5">
              {eventTitle} mengadakan kegiatan donor darah dan mengajak Anda untuk berpartisipasi dalam kegiatan donor darah yang akan diselenggarakan pada {evenDate} pukul 09.00 - 17.00 di {evenAddress}. Setetes darah Anda sangat berarti untuk menyelamatkan nyawa sesama.
            </Text>
          </View>

          <View className="border-b border-gray-100 mb-6" />

          {/* Syarat & Ketentuan */}
          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-900 mb-4">Syarat & Ketentuan</Text>
            <View className="bg-gray-50 rounded-xl p-4">
              {syaratData.map((syarat, i) => <SyaratItem key={i} text={syarat} />)}
            </View>
          </View>

          {/* Form */}
          <View>
            <Text className="text-xl font-bold text-gray-900 mb-6">Informasi Pribadi</Text>
            
            {formFields.map(field => (
              <FormField
                key={field.name}
                label={field.label}
                placeholder={field.placeholder}
                keyboardType={field.keyboardType}
                value={formData[field.name] || ''}
                onChangeText={text => handleInputChange(field.name, text)}
              />
            ))}

            {/* Jenis Kelamin */}
            <View className="mb-5">
              <Text className="text-base font-semibold text-gray-900 mb-3">Jenis Kelamin</Text>
              <TouchableOpacity
                onPress={() => setShowGenderModal(true)}
                className="bg-white rounded-xl px-4 py-4 border border-gray-200 shadow-sm">
                <Text className="text-base text-gray-900">{jenisKelamin || 'Pilih Jenis Kelamin'}</Text>
              </TouchableOpacity>
              <Modal visible={showGenderModal} transparent animationType="slide">
                <View className="flex-1 justify-center items-center bg-black/50">
                  <View className="bg-white p-6 rounded-xl w-4/5">
                    <Text className="text-lg font-bold mb-4">Pilih Jenis Kelamin</Text>
                    {['Laki-laki', 'Perempuan'].map((option) => (
                      <Pressable key={option} onPress={() => { setJenisKelamin(option); setShowGenderModal(false); }} className="py-3">
                        <Text className="text-base">{option}</Text>
                      </Pressable>
                    ))}
                    <Pressable onPress={() => setShowGenderModal(false)} className="mt-4">
                      <Text className="text-red-500 text-center">Batal</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
            </View>

            {/* Tanggal Lahir */}
            <View className="mb-5">
              <Text className="text-base font-semibold text-gray-900 mb-3">Tanggal Lahir</Text>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                className="bg-white rounded-xl px-4 py-4 border border-gray-200 shadow-sm">
                <Text className="text-base text-gray-900">{tanggalLahir.toLocaleDateString('id-ID')}</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={tanggalLahir}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) setTanggalLahir(selectedDate);
                  }}
                  themeVariant="light"
                />
              )}
            </View>

            {/* KTP Upload */}
            <View className="mb-6">
              <Text className="text-base font-semibold text-gray-900 mb-3">Upload Foto KTP</Text>
              <TouchableOpacity
                onPress={handleImageUpload}
                className="bg-gray-50 rounded-2xl h-48 items-center justify-center border-2 border-dashed border-gray-300 overflow-hidden"
              >
                {ktpImage ? (
                  <Image
                    source={{ uri: ktpImage }}
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
                value={isChecked}
                onValueChange={setIsChecked}
                color={isChecked ? '#82C7C1' : undefined}
                style={{ width: 20, height: 20, marginRight: 12, marginTop: 2 }}
              />
              <Text className="text-sm text-gray-700 flex-1 leading-5">
                Saya telah membaca dan menyetujui{' '}
                <Text className="font-semibold text-black">Syarat & Ketentuan</Text>
                {' '}yang berlaku.
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
            backgroundColor: isFormValid ? '#82C7C1' : '#E5E7EB',
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
});

export default PendaftaranDonorDarahScreen;

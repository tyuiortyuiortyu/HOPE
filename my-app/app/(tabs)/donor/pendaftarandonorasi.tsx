import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, SafeAreaView, Alert, Modal, Pressable, Platform, StyleSheet, StatusBar } from 'react-native';
import Checkbox from 'expo-checkbox';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import images from '../../../constants/images';

const syaratDataAsi = [
  "Ibu menyusui yang sehat secara fisik dan mental.",
  "Bersedia menjalani skrining kesehatan dan wawancara.",
  "Tidak merokok atau mengonsumsi narkoba.",
  "Tidak mengonsumsi alkohol secara berlebihan.",
  "Tidak terinfeksi HIV/AIDS, Hepatitis B/C, Sifilis, HTLV, dan penyakit menular lainnya.",
  "Tidak sedang menjalani pengobatan tertentu (konsultasikan dengan petugas medis).",
  "Produksi ASI berlebih.",
  "Bayi Ibu berusia di bawah 6 bulan (beberapa bank ASI menerima hingga 1 tahun).",
  "Tidak menerima transfusi darah atau transplantasi organ dalam 12 bulan terakhir.",
  "Tidak sedang menjalani pengobatan kemoterapi atau radioterapi.",
  "Tidak memiliki riwayat penyakit autoimun tertentu.",
  "Tidak mengonsumsi obat-obatan tertentu yang dapat memengaruhi kualitas ASI (konsultasikan dengan petugas medis).",
  "Bersedia mengikuti prosedur penyimpanan dan pengiriman ASI yang ditentukan.",
];

const formFieldsAsi = [
  // Data Ibu
  { name: 'namaLengkap', label: 'Nama Lengkap Ibu', placeholder: 'Masukkan nama lengkap Anda', section: 'ibu' },
  { name: 'nomorTelepon', label: 'Nomor Telepon', placeholder: 'Masukkan nomor telepon', keyboardType: 'phone-pad', section: 'ibu' },
  { name: 'alamatLengkap', label: 'Alamat Lengkap', placeholder: 'Masukkan alamat lengkap', section: 'ibu' },
  { name: 'golonganDarah', label: 'Golongan Darah', placeholder: 'Contoh: A+', section: 'ibu' },
  { name: 'tinggiBadan', label: 'Tinggi Badan (cm)', placeholder: 'Contoh: 170', keyboardType: 'numeric', section: 'ibu' },
  { name: 'beratBadan', label: 'Berat Badan (kg)', placeholder: 'Contoh: 65', keyboardType: 'numeric', section: 'ibu' },
  { name: 'riwayatPenyakit', label: 'Riwayat Penyakit Ibu', placeholder: 'Jika tidak ada, isi "Tidak Ada"', section: 'ibu' },
  { name: 'riwayatAlergi', label: 'Riwayat Alergi Ibu', placeholder: 'Jika tidak ada, isi "Tidak Ada"', section: 'ibu' },
  
  // Data Bayi
  { name: 'namaBayi', label: 'Nama Bayi Kandung', placeholder: 'Masukkan nama bayi Anda', section: 'bayi' },
  { name: 'usiaBayi', label: 'Usia Bayi (Bulan)', placeholder: 'Contoh: 3', keyboardType: 'numeric', section: 'bayi' },
  { name: 'beratbadanBayi', label: 'Berat Badan Bayi Saat Ini (kg)', placeholder: 'Contoh: 5', keyboardType: 'numeric', section: 'bayi' },
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

const PilihanGanda = ({ label, value, onSelect, showInputOn, alasan, onAlasanChange, placeholderAlasan }) => (
  <View className="mb-5">
    <Text className="text-base font-semibold text-gray-900 mb-3">{label}</Text>
    <View className="flex-row space-x-3 mb-3">
      <TouchableOpacity
        onPress={() => onSelect('Ya')}
        style={{ 
          backgroundColor: value === 'Ya' ? '#82C7C1' : '#FFFFFF',
          borderColor: value === 'Ya' ? '#82C7C1' : '#E5E7EB',
          borderWidth: 1
        }}
        className="px-6 py-3 rounded-xl flex-1 items-center shadow-sm"
      >
        <Text style={{ color: value === 'Ya' ? '#FFFFFF' : '#374151' }} className="font-semibold text-sm">Ya</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onSelect('Tidak')}
        style={{ 
          backgroundColor: value === 'Tidak' ? '#82C7C1' : '#FFFFFF',
          borderColor: value === 'Tidak' ? '#82C7C1' : '#E5E7EB',
          borderWidth: 1
        }}
        className="px-6 py-3 rounded-xl flex-1 items-center shadow-sm"
      >
        <Text style={{ color: value === 'Tidak' ? '#FFFFFF' : '#374151' }} className="font-semibold text-sm">Tidak</Text>
      </TouchableOpacity>
    </View>
    {value === showInputOn && (
      <TextInput
        placeholder={placeholderAlasan || "Silakan berikan penjelasan"}
        value={alasan}
        onChangeText={onAlasanChange}
        className="bg-white rounded-xl px-4 py-4 text-base border border-gray-200 shadow-sm"
        placeholderTextColor="#9CA3AF"
      />
    )}
  </View>
);

const PilihanOpsi = ({ label, options, value, onSelect }) => (
  <View className="mb-5">
    <Text className="text-base font-semibold text-gray-900 mb-3">{label}</Text>
    <View className="flex-row space-x-3">
      {options.map(option => (
        <TouchableOpacity
          key={option}
          onPress={() => onSelect(option)}
          style={{ 
            backgroundColor: value === option ? '#82C7C1' : '#FFFFFF',
            borderColor: value === option ? '#82C7C1' : '#E5E7EB',
            borderWidth: 1
          }}
          className="px-6 py-3 rounded-xl flex-1 items-center shadow-sm"
        >
          <Text style={{ color: value === option ? '#FFFFFF' : '#374151' }} className="font-semibold text-sm">{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

const PendaftaranDonorAsiScreen = () => {
  const router = useRouter();
  const { locationName, locationImage, locationAddress, locationslots } = useLocalSearchParams();

  const [formData, setFormData] = useState({});
  const [tanggalLahir, setTanggalLahir] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [ktpImage, setKtpImage] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [jenisKelamin, setJenisKelamin] = useState('');
  const [showGenderModal, setShowGenderModal] = useState(false);

  const [sedangHamil, setSedangHamil] = useState(''); // 'Ya' atau 'Tidak'
  const [menyusuiLain, setMenyusuiLain] = useState('');
  const [alasanMenyusuiLain, setAlasanMenyusuiLain] = useState('');
  const [pernahDonor, setPernahDonor] = useState('');
  const [alasanPernahDonor, setAlasanPernahDonor] = useState('');
  const [lahirCukupBulan, setLahirCukupBulan] = useState(''); // Untuk 'Ya'/'Tidak'
  const [metodePersalinan, setMetodePersalinan] = useState(''); // Untuk 'Normal'/'Caesar'
  const [asiEksklusif, setAsiEksklusif] = useState(''); // Untuk 'Ya'/'Tidak'
  const [asupanLain, setAsupanLain] = useState(''); // Untuk input teks jika ASI tidak eksklusif

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
    const requiredFormFields = formFieldsAsi.every(field => formData[field.name]?.trim());
    const phoneValid = /^\d+$/.test(formData.nomorTelepon || '');
    
    const hamilValid = sedangHamil !== '';
    const menyusuiValid = (menyusuiLain === 'Tidak') || (menyusuiLain === 'Ya' && alasanMenyusuiLain.trim() !== '');
    const pernahDonorValid = (pernahDonor === 'Tidak') || (pernahDonor === 'Ya' && alasanPernahDonor.trim() !== '');

    const bayiCukupBulanValid = lahirCukupBulan !== '';
    const metodePersalinanValid = metodePersalinan !== '';
    const asiEksklusifValid = (asiEksklusif === 'Ya') || (asiEksklusif === 'Tidak' && asupanLain.trim() !== '');

    return (
      requiredFormFields &&
      phoneValid &&
      ktpImage &&
      isChecked &&
      jenisKelamin &&
      hamilValid &&
      menyusuiValid &&
      pernahDonorValid &&
      bayiCukupBulanValid && // <-- Tambahkan
      metodePersalinanValid && // <-- Tambahkan
      asiEksklusifValid // <-- Tambahkan
    );
  }, [
    formData, ktpImage, isChecked, jenisKelamin, 
    sedangHamil, menyusuiLain, alasanMenyusuiLain, pernahDonor, alasanPernahDonor,
    lahirCukupBulan, metodePersalinan, asiEksklusif, asupanLain // <-- Tambahkan dependensi
  ]);

  const handleDaftar = () => {
    if (!isFormValid) {
      Alert.alert("Form Tidak Lengkap", "Harap isi semua data dengan benar, termasuk jenis kelamin bayi, upload KTP, dan setujui S&K.");
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
            Terima kasih telah mendaftar. Pihak {locationName || 'rumah sakit'} akan segera menghubungi Anda.
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
          <Text style={styles.headerTitle}>Pendaftaran Donor ASI</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Hero Image */}
        <View className="relative">
          <Image
            source={locationImage}
            className="w-full h-64"
            resizeMode="cover"
          />
          <View className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent h-20" />
        </View>

        {/* Content */}
        <View className="px-5 py-6 bg-white -mt-6 mx-4 rounded-t-3xl shadow-lg">
          {/* Location Details */}
          <View className="mb-6">
            <Text className="text-xl font-bold text-gray-900 mb-2">{locationName}</Text>
            <Text className="text-sm text-gray-600 mb-2">{locationAddress}</Text>
            <Text className="text-sm font-bold text-red-600 mb-4">Dapat menampung {locationslots} slot</Text>
            <Text className="text-sm text-gray-700 leading-5">
              {locationName} mengajak para ibu menyusui untuk berbagi kasih sayang dan memberikan harapan baru bagi bayi-bayi yang membutuhkan melalui program donor ASI.
            </Text>
          </View>

          <View className="border-b border-gray-100 mb-6" />

          {/* Syarat & Ketentuan */}
          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-900 mb-4">Syarat & Ketentuan</Text>
            <View className="bg-gray-50 rounded-xl p-4">
              {syaratDataAsi.map((syarat, i) => <SyaratItem key={i} text={syarat} />)}
            </View>
          </View>

          {/* Form */}
          <View>
            <Text className="text-xl font-bold text-gray-900 mb-6">Form Pendaftaran</Text>
            
            <Text className="text-lg font-semibold text-gray-900 mb-4">A. Data Diri dan Riwayat Kesehatan Ibu</Text>
            
            {formFieldsAsi.filter(f => f.section === 'ibu').map(field => (
              <FormField
                key={field.name}
                label={field.label}
                placeholder={field.placeholder}
                keyboardType={field.keyboardType}
                value={formData[field.name] || ''}
                onChangeText={text => handleInputChange(field.name, text)}
              />
            ))}

            <PilihanGanda
              label="Apakah Anda sedang hamil?"
              value={sedangHamil}
              onSelect={setSedangHamil}
            />

            <PilihanGanda
              label="Apakah Anda sedang menyusui bayi lain selain bayi Anda?"
              value={menyusuiLain}
              onSelect={setMenyusuiLain}
              showInputOn="Ya"
              alasan={alasanMenyusuiLain}
              onAlasanChange={setAlasanMenyusuiLain}
              placeholderAlasan="Jelaskan (misal: bayi kembar, dll)"
            />

            <PilihanGanda
              label="Apakah Anda pernah mendonorkan ASI sebelumnya?"
              value={pernahDonor}
              onSelect={setPernahDonor}
              showInputOn="Ya"
              alasan={alasanPernahDonor}
              onAlasanChange={setAlasanPernahDonor}
              placeholderAlasan="Sebutkan di mana/kapan"
            />

            {/* Tanggal Lahir */}
            <View className="mb-5">
              <Text className="text-base font-semibold text-gray-900 mb-3">Tanggal Lahir Ibu</Text>
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

            <Text className="text-lg font-semibold text-gray-900 mb-4 mt-6">B. Informasi Bayi</Text>
            
            {formFieldsAsi.filter(f => f.section === 'bayi').map(field => (
              <FormField
                key={field.name}
                label={field.label}
                placeholder={field.placeholder}
                keyboardType={field.keyboardType}
                value={formData[field.name] || ''}
                onChangeText={text => handleInputChange(field.name, text)}
              />
            ))}

            <PilihanGanda
              label="Apakah bayi Anda lahir cukup bulan?"
              value={lahirCukupBulan}
              onSelect={setLahirCukupBulan}
            />

            <PilihanOpsi
              label="Metode persalinan:"
              options={['Normal', 'Caesar']}
              value={metodePersalinan}
              onSelect={setMetodePersalinan}
            />

            <PilihanGanda
              label="Apakah bayi Anda mengonsumsi ASI Eksklusif?"
              value={asiEksklusif}
              onSelect={setAsiEksklusif}
              showInputOn="Tidak"
              alasan={asupanLain}
              onAlasanChange={setAsupanLain}
              placeholderAlasan="Jika tidak, sebutkan asupan lain yang diberikan"
            />

            {/* Jenis Kelamin Bayi */}
            <View className="mb-5">
              <Text className="text-base font-semibold text-gray-900 mb-3">Jenis Kelamin Bayi</Text>
              <TouchableOpacity
                onPress={() => setShowGenderModal(true)}
                className="bg-white rounded-xl px-4 py-4 border border-gray-200 shadow-sm">
                <Text className="text-base text-gray-900">{jenisKelamin || 'Pilih Jenis Kelamin'}</Text>
              </TouchableOpacity>
              <Modal visible={showGenderModal} transparent animationType="slide">
                <Pressable onPress={() => setShowGenderModal(false)} className="flex-1 justify-center items-center bg-black/50">
                  <View className="bg-white p-6 rounded-xl w-4/5">
                    <Text className="text-lg font-bold mb-4">Pilih Jenis Kelamin Bayi</Text>
                    {['Laki-laki', 'Perempuan'].map((option) => (
                      <Pressable key={option} onPress={() => { setJenisKelamin(option); setShowGenderModal(false); }} className="py-3">
                        <Text className="text-base">{option}</Text>
                      </Pressable>
                    ))}
                  </View>
                </Pressable>
              </Modal>
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

export default PendaftaranDonorAsiScreen;
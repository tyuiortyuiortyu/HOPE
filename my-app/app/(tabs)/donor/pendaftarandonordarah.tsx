import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, SafeAreaView, Alert, Modal, Pressable, Platform } from 'react-native';
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
  <View style={{ marginBottom: 16 }}>
    <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 8, color: '#374151' }}>{label}</Text>
    <TextInput 
      style={{ backgroundColor: '#F3F4F6', borderRadius: 10, paddingHorizontal: 16, paddingVertical: 12, fontSize: 16, color: '#1F2937', borderWidth: 1, borderColor: '#D1D5DB' }}
      placeholder={placeholder}
      placeholderTextColor="#9CA3AF"
      keyboardType={keyboardType}
      value={value}
      onChangeText={onChangeText}
    />
  </View>
);

const SyaratItem = ({ text }) => (
  <View style={{ flexDirection: 'row', marginBottom: 8 }}>
    <Text style={{ marginRight: 8, color: '#4B5563' }}>•</Text>
    <Text style={{ flex: 1, fontSize: 16, color: '#4B5563', lineHeight: 24 }}>{text}</Text>
  </View>
);

const PendaftaranDonorDarahScreen = () => {
  const router = useRouter();
  const { eventTitle } = useLocalSearchParams();
  const { eventId, evenDate, evenAddress, evenImage } = useLocalSearchParams();

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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Stack.Screen options={{ headerStyle: { backgroundColor: '#D9EEEB' }, headerTitle: '', headerLeft: () => (<TouchableOpacity onPress={() => router.back()}><Ionicons name="arrow-back" size={28} color="black" /></TouchableOpacity>) }} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        {isSubmitted ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 }}>
            <Ionicons name="checkmark-circle" size={80} color="#10B981" style={{ marginBottom: 16 }} />
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#1F2937', textAlign: 'center', marginBottom: 8 }}>Pendaftaran Berhasil</Text>
            <Text style={{ fontSize: 16, color: '#4B5563', textAlign: 'center', marginBottom: 24 }}>Terima kasih telah mendaftar untuk kegiatan donor darah.</Text>
            <TouchableOpacity onPress={() => router.back()} style={{ backgroundColor: '#82C7C1', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 999 }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Kembali</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Image source={evenImage} style={{ width: '100%', height: 220 }} resizeMode="cover" />
            <View style={{ padding: 20 }}>
              <View style={{ marginBottom: 24 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1F2937', marginBottom: 8 }}>{eventTitle || 'Kegiatan Donor Darah'}</Text>
            <Text style={{ fontSize: 16, color: '#4B5563', lineHeight: 24 }}>{eventTitle} mengadakan kegiatan donor darah dan mengajak Anda untuk berpartisipasi dalam kegiatan donor darah yang akan diselenggarakan pada {evenDate} pukul 09.00 - 17.00 di {evenAddress} Setetes darah Anda sangat berarti untuk menyelamatkan nyawa sesama. Mari berbagi kebaikan dan wujudkan kepedulian kita terhadap sesama melalui aksi donor darah ini.</Text>
          </View>

          <View style={{ marginBottom: 24 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1F2937', marginBottom: 12 }}>Syarat & Ketentuan</Text>
            {syaratData.map((syarat, i) => <SyaratItem key={i} text={syarat} />)}
          </View>

          <View style={{ marginBottom: 24 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 }}>Form Pendaftaran</Text>
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
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 8, color: '#374151' }}>Jenis Kelamin</Text>
              <TouchableOpacity
                onPress={() => setShowGenderModal(true)}
                style={{ backgroundColor: '#F3F4F6', borderRadius: 10, padding: 12, borderWidth: 1, borderColor: '#D1D5DB' }}>
                <Text style={{ fontSize: 16, color: '#1F2937' }}>{jenisKelamin || 'Pilih Jenis Kelamin'}</Text>
              </TouchableOpacity>
              <Modal visible={showGenderModal} transparent animationType="slide">
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000080' }}>
                  <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 12, width: '80%' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>Pilih Jenis Kelamin</Text>
                    {['Laki-laki', 'Perempuan'].map((option) => (
                      <Pressable key={option} onPress={() => { setJenisKelamin(option); setShowGenderModal(false); }} style={{ paddingVertical: 10 }}>
                        <Text style={{ fontSize: 16 }}>{option}</Text>
                      </Pressable>
                    ))}
                    <Pressable onPress={() => setShowGenderModal(false)} style={{ marginTop: 16 }}>
                      <Text style={{ color: 'red', textAlign: 'center' }}>Batal</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
            </View>

            {/* Tanggal Lahir */}
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 8, color: '#374151' }}>Tanggal Lahir</Text>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={{ backgroundColor: '#F3F4F6', borderRadius: 10, padding: 12, borderWidth: 1, borderColor: '#D1D5DB' }}>
                <Text style={{ fontSize: 16, color: '#1F2937' }}>{tanggalLahir.toLocaleDateString('id-ID')}</Text>
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

            {/* Upload KTP */}
            <View style={{ marginBottom: 24 }}>
              <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 8, color: '#374151' }}>Upload Foto KTP</Text>
              <TouchableOpacity onPress={handleImageUpload} style={{ backgroundColor: '#F3F4F6', borderRadius: 16, height: 160, justifyContent: 'center', alignItems: 'center', borderStyle: 'dashed', borderColor: '#D1D5DB', borderWidth: 2, overflow: 'hidden' }}>
                {ktpImage ? (
                  <Image source={{ uri: ktpImage }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                ) : (
                  <>
                    <Ionicons name="camera-outline" size={40} color="#9CA3AF" />
                    <Text style={{ color: '#6B7280', marginTop: 8 }}>Ketuk untuk mengunggah</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>

            {/* Checkbox */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
              <Checkbox value={isChecked} onValueChange={setIsChecked} color={isChecked ? '#82C7C1' : undefined} style={{ width: 24, height: 24, marginRight: 12 }} />
              <Text style={{ flex: 1, fontSize: 16, color: '#374151' }}>Saya telah membaca dan menyetujui Syarat & Ketentuan.</Text>
            </View>

            {/* Tombol Daftar */}
            <TouchableOpacity
              onPress={handleDaftar}
              disabled={!isFormValid}
              style={{ backgroundColor: '#82C7C1', paddingVertical: 16, borderRadius: 999, alignItems: 'center', opacity: isFormValid ? 1 : 0.5, marginBottom: 32 }}>
              <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Daftar</Text>
            </TouchableOpacity>
          </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PendaftaranDonorDarahScreen;

import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, SafeAreaView, Alert, Modal, Pressable, Platform } from 'react-native';
import Checkbox from 'expo-checkbox';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

// Diasumsikan path ini benar
// import images from '../../../constants/images'; 

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

// PERBAIKAN 5: Typo 'pplaceholder' diperbaiki menjadi 'placeholder'
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

// ===================================================================
// KOMPONEN BARU: Untuk pertanyaan Ya/Tidak
// ===================================================================
const PilihanGanda = ({ label, value, onSelect, showInputOn, alasan, onAlasanChange, placeholderAlasan }) => (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 10, color: '#374151' }}>{label}</Text>
      <View style={{ flexDirection: 'row', marginBottom: 12 }}>
        <TouchableOpacity
          onPress={() => onSelect('Ya')}
          style={{
            backgroundColor: value === 'Ya' ? '#82C7C1' : '#F3F4F6',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 8,
            marginRight: 10,
            borderWidth: 1,
            borderColor: value === 'Ya' ? '#82C7C1' : '#D1D5DB'
          }}
        >
          <Text style={{ color: value === 'Ya' ? '#fff' : '#374151', fontWeight: 'bold' }}>Ya</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onSelect('Tidak')}
          style={{
            backgroundColor: value === 'Tidak' ? '#82C7C1' : '#F3F4F6',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: value === 'Tidak' ? '#82C7C1' : '#D1D5DB'
          }}
        >
          <Text style={{ color: value === 'Tidak' ? '#fff' : '#374151', fontWeight: 'bold' }}>Tidak</Text>
        </TouchableOpacity>
      </View>
      {value === showInputOn && (
        <TextInput
          placeholder={placeholderAlasan || "Silakan berikan penjelasan"}
          value={alasan}
          onChangeText={onAlasanChange}
          style={{
            backgroundColor: '#F3F4F6',
            borderRadius: 10,
            paddingHorizontal: 16,
            paddingVertical: 12,
            fontSize: 16,
            color: '#1F2937',
            borderWidth: 1,
            borderColor: '#D1D5DB'
          }}
        />
      )}
    </View>
);

const PilihanOpsi = ({ label, options, value, onSelect }) => (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 10, color: '#374151' }}>{label}</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {options.map(option => (
          <TouchableOpacity
            key={option}
            onPress={() => onSelect(option)}
            style={{
              backgroundColor: value === option ? '#82C7C1' : '#F3F4F6',
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 8,
              marginRight: 10,
              marginBottom: 10,
              borderWidth: 1,
              borderColor: value === option ? '#82C7C1' : '#D1D5DB'
            }}
          >
            <Text style={{ color: value === option ? '#fff' : '#374151', fontWeight: 'bold' }}>{option}</Text>
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
  
  // PERBAIKAN 1: Hooks dipindahkan ke dalam komponen
  const [jenisKelamin, setJenisKelamin] = useState('');
  const [showGenderModal, setShowGenderModal] = useState(false);

  // ===================================================================
  // STATE BARU: Untuk pertanyaan Ya/Tidak
  // ===================================================================
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

 // ===================================================================
  // VALIDASI BARU: Memeriksa semua field termasuk pertanyaan baru
  // ===================================================================
   const isFormValid = useMemo(() => {
    const requiredFormFields = formFieldsAsi.every(field => formData[field.name]?.trim());
    const phoneValid = /^\d+$/.test(formData.nomorTelepon || '');
    
    // Validasi pertanyaan Ya/Tidak Ibu
    const hamilValid = sedangHamil !== '';
    const menyusuiValid = (menyusuiLain === 'Tidak') || (menyusuiLain === 'Ya' && alasanMenyusuiLain.trim() !== '');
    const pernahDonorValid = (pernahDonor === 'Tidak') || (pernahDonor === 'Ya' && alasanPernahDonor.trim() !== '');

    // ===================================================================
    // LANGKAH 5: TAMBAHKAN VALIDASI BARU DI SINI
    // ===================================================================
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Stack.Screen options={{ 
          headerStyle: { backgroundColor: '#C6E6E3' }, 
          headerTitle: '', 
          headerLeft: () => (<TouchableOpacity onPress={() => router.back()} style={{marginLeft: 8}}><Ionicons name="arrow-back" size={28} color="black" /></TouchableOpacity>) 
        }} 
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        {isSubmitted ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, marginTop: 60 }}>
            <Ionicons name="checkmark-circle" size={80} color="#10B981" style={{ marginBottom: 16 }} />
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#1F2937', textAlign: 'center', marginBottom: 8 }}>Pendaftaran Berhasil</Text>
            <Text style={{ fontSize: 16, color: '#4B5563', textAlign: 'center', marginBottom: 24 }}>
              Terima kasih telah mendaftar. Pihak {locationName || 'rumah sakit'} akan segera menghubungi Anda.
            </Text>
            <TouchableOpacity onPress={() => router.back()} style={{ backgroundColor: '#82C7C1', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 999 }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Kembali</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
           {/* Tombol kembali ditambahkan di sini */}
            <View className="w-full h-16 bg-[#C6E6E3] px-5 flex-row items-center">
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
            </View>
            {/* PERBAIKAN 6: Menggunakan {uri: ...} untuk source gambar dari URL */}
            <Image source={locationImage} style={{ width: '100%', height: 220 }} resizeMode="cover" />
            <View style={{ padding: 20 }}>
              <View style={{ marginBottom: 24 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1F2937', marginBottom: 8 }}>{locationName}</Text>
                <Text style={{ fontSize: 12, color: '#1F2937', marginBottom: 8 }}>{locationAddress}</Text>
                <Text style={{ fontSize: 14, fontWeight:"bold", color: '#FF0000', marginBottom: 8 }}>Dapat menampung {locationslots} slot</Text>
                <Text style={{ fontSize: 16, color: '#4B5563', lineHeight: 24 }}>{locationName} mengajak para ibu menyusui untuk berbagi kasih sayang dan memberikan harapan baru bagi bayi-bayi yang membutuhkan melalui program donor ASI. Setetes ASI yang Ibu berikan sangat berharga dan dapat menyelamatkan kehidupan bayi yang tidak dapat memperoleh ASI dari ibunya sendiri. Mari wujudkan kepedulian kita dan menjadi pahlawan ASI bagi generasi penerus bangsa.</Text>
              </View>

              <View style={{ marginBottom: 24 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1F2937', marginBottom: 12 }}>Syarat & Ketentuan</Text>
                {syaratDataAsi.map((syarat, i) => <SyaratItem key={i} text={syarat} />)}
              </View>

              {/* PERBAIKAN 2: Semua form sekarang ada di dalam satu View container yang logis */}
              <View>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1F2937', marginBottom: 4 }}>Form Pendaftaran</Text>
                <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#1F2937', marginBottom: 16 }}>Wajib mengisi semua pertanyaan sebelum "Daftar"</Text>
                
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#1F2937', marginBottom: 12, borderTopWidth: 1, borderTopColor: '#E5E7EB', paddingTop: 16 }}>A. Data Diri dan Riwayat Kesehatan Ibu</Text>
                
                {/* PERBAIKAN 4: Menggunakan .map untuk render form secara dinamis */}
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

                {/* PERTANYAAN BARU DITAMBAHKAN DI SINI */}
                {/* =================================================================== */}
                <PilihanGanda
                    label="Apakah Anda sedang hamil?"
                    value={sedangHamil}
                    onSelect={setSedangHamil}
                />
                <PilihanGanda
                    label="Apakah Anda sedang menyusui bayi lain selain bayi Anda? (kalau ya, apakah sering atau hanya sesekali?)"
                    value={menyusuiLain}
                    onSelect={setMenyusuiLain}
                    showInputOn="Ya" // Tampilkan input jika jawaban "Ya"
                    alasan={alasanMenyusuiLain}
                    onAlasanChange={setAlasanMenyusuiLain}
                    placeholderAlasan="Jelaskan (misal: bayi kembar, dll)"
                />
                <PilihanGanda
                    label="Apakah Anda pernah mendonorkan ASI sebelumnya? (Kalau pernah, sebutkan di mana/kapan)"
                    value={pernahDonor}
                    onSelect={setPernahDonor}
                    showInputOn="Ya" // Tampilkan input jika jawaban "Ya"
                    alasan={alasanPernahDonor}
                    onAlasanChange={setAlasanPernahDonor}
                    placeholderAlasan="Sebutkan di mana/kapan"
                />

                {/* Tanggal Lahir Ibu */}
                <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 8, color: '#374151' }}>Tanggal Lahir Ibu</Text>
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

                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#1F2937', marginBottom: 12, borderTopWidth: 1, borderTopColor: '#E5E7EB', paddingTop: 16 }}>B. Informasi Bayi</Text>
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
                    label="Apakah bayi Anda mengonsumsi ASI Eksklusif? (kalau tidak, jelaskan alasannya)"
                    value={asiEksklusif}
                    onSelect={setAsiEksklusif}
                    showInputOn="Tidak" // Tampilkan input jika jawaban "Tidak"
                    alasan={asupanLain}
                    onAlasanChange={setAsupanLain}
                    placeholderAlasan="Jika tidak, sebutkan asupan lain yang diberikan"
/>
                
                <View style={{ marginBottom: 16 }}>
                    <Text style={{ fontSize: 14, fontWeight: '600', marginBottom: 8, color: '#374151' }}>Jenis Kelamin Bayi</Text>
                    <TouchableOpacity
                      onPress={() => setShowGenderModal(true)}
                      style={{ backgroundColor: '#F3F4F6', borderRadius: 10, padding: 12, borderWidth: 1, borderColor: '#D1D5DB' }}>
                      <Text style={{ fontSize: 16, color: '#1F2937' }}>{jenisKelamin || 'Pilih Jenis Kelamin'}</Text>
                    </TouchableOpacity>
                    <Modal visible={showGenderModal} transparent animationType="slide">
                      <Pressable onPress={() => setShowGenderModal(false)} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000080' }}>
                        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 12, width: '80%' }}>
                          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>Pilih Jenis Kelamin Bayi</Text>
                          {['Laki-laki', 'Perempuan'].map((option) => (
                            <Pressable key={option} onPress={() => { setJenisKelamin(option); setShowGenderModal(false); }} style={{ paddingVertical: 12 }}>
                              <Text style={{ fontSize: 16 }}>{option}</Text>
                            </Pressable>
                          ))}
                        </View>
                      </Pressable>
                    </Modal>
                </View>

                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#1F2937', marginBottom: 12, borderTopWidth: 1, borderTopColor: '#E5E7EB', paddingTop: 16 }}>C. Upload KTP</Text>
                <TouchableOpacity onPress={handleImageUpload} style={{ backgroundColor: '#F3F4F6', borderRadius: 16, height: 160, justifyContent: 'center', alignItems: 'center', borderStyle: 'dashed', borderColor: '#D1D5DB', borderWidth: 2, overflow: 'hidden', marginBottom: 24 }}>
                  {ktpImage ? (
                    <Image source={{ uri: ktpImage }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                  ) : (
                    <>
                      <Ionicons name="camera-outline" size={40} color="#9CA3AF" />
                      <Text style={{ color: '#6B7280', marginTop: 8 }}>Ketuk untuk mengunggah KTP</Text>
                    </>
                  )}
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
                  <Checkbox value={isChecked} onValueChange={setIsChecked} color={isChecked ? '#82C7C1' : undefined} style={{ width: 24, height: 24, marginRight: 12 }} />
                  <Text style={{ flex: 1, fontSize: 16, color: '#374151' }}>Saya telah membaca dan menyetujui S&K yang berlaku.</Text>
                </View>

                <TouchableOpacity
                  onPress={handleDaftar}
                  disabled={!isFormValid}
                  style={{ backgroundColor: '#82C7C1', paddingVertical: 16, borderRadius: 999, alignItems: 'center', opacity: isFormValid ? 1 : 0.5, marginBottom: 32 }}>
                  <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Daftar</Text>
                </TouchableOpacity>
              </View> 
              {/* PERBAIKAN 3: Menghapus </View> yang salah dan berlebihan dari sini */}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PendaftaranDonorAsiScreen;
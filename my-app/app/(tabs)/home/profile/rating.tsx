// app/(tabs)/home/rating.tsx

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
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Kita akan menggunakan ini untuk ikon bintang

import icons from '../../../../constants/icons';

const styles = StyleSheet.create({
  headerIcon: { width: 20, height: 20, tintColor: '#4A4A4A' },
  starIcon: {
    marginHorizontal: 8, // Memberi jarak antar bintang
  },
  textInput: {
    height: 120, // Mengatur tinggi area teks
    textAlignVertical: 'top', // Memastikan teks dimulai dari atas pada Android
  }
});

const RatingScreen = () => {
  const router = useRouter();
  const [rating, setRating] = useState(0); // State untuk menyimpan nilai bintang (1-5)
  const [feedback, setFeedback] = useState(''); // State untuk menyimpan kritik & saran

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert("Peringatan", "Mohon berikan rating bintang terlebih dahulu.");
      return;
    }
    // Logika untuk mengirim data ke server
    console.log('Rating:', rating);
    console.log('Feedback:', feedback);

    Alert.alert("Terima Kasih!", "Penilaian Anda telah berhasil dikirim.", [
        { text: "OK", onPress: () => router.back() }
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-[#A2D5C6] p-4 h-[60px] flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="p-1">
          <Image source={icons.back} style={styles.headerIcon} />
        </TouchableOpacity>
      </View>

      <ScrollView className="p-6">
        {/* Rating Section */}
        <View className="mb-10">
          <Text className="text-xl font-bold text-gray-800 text-center mb-2">
            Bagaimana penilaianmu terhadap aplikasi HOPE?
          </Text>

          {/* Star Rating Component */}
          <View className="flex-row justify-center my-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <MaterialCommunityIcons
                  name={star <= rating ? 'star' : 'star-outline'}
                  size={40}
                  color={star <= rating ? '#FFC107' : '#9E9E9E'}
                  style={styles.starIcon}
                />
              </TouchableOpacity>
            ))}
          </View>
          
          <View className="flex-row justify-between px-4">
              <Text className="text-xs text-gray-500">Sangat Tidak Puas</Text>
              <Text className="text-xs text-gray-500">Sangat Puas</Text>
          </View>
        </View>

        {/* Feedback Section */}
        <View className="mb-10">
            <Text className="text-lg font-bold text-gray-800 mb-4">
                Kritik dan Saran terhadap aplikasi HOPE?
            </Text>
            <TextInput
                className="bg-[#D1E8E2] p-4 rounded-xl text-base"
                style={styles.textInput}
                placeholder="Berikan pendapat terbaikmu untuk kemajuan aplikasi ini! ex: saya butuh ...."
                placeholderTextColor="#6B7280"
                value={feedback}
                onChangeText={setFeedback}
                multiline={true}
            />
        </View>

        {/* Submit Button */}
        <TouchableOpacity 
            className="bg-[#A2D5C6] py-4 rounded-xl items-center shadow-md"
            onPress={handleSubmit}
        >
            <Text className="text-black font-bold text-base">Kirim</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RatingScreen;
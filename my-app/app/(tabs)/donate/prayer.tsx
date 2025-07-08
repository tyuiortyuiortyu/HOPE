import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import images from '../../../constants/images';

const PrayerScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [message, setMessage] = useState('');

  // Parse donation data from params
  const donationData = {
    title: params.title as string,
    targetAmount: params.targetAmount as string,
    currentAmount: params.currentAmount as string,
    donationAmount: params.donationAmount as string,
    paymentMethod: params.paymentMethod as string,
  };

  const handleSubmit = () => {
    // Navigate back to detail page with success parameter
    router.push({
      pathname: '/(tabs)/donate/detail',
      params: {
        ...donationData,
        showSuccess: 'true',
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 py-4 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={images.back} className="w-6 h-6" resizeMode="contain" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 justify-between bg-white p-6">
          {/* Top Section */}
          <View>
            {/* Title */}
            <View className="mb-8">
              <Text className="text-3xl font-bold text-gray-800 text-center">
                Sampaikan Doa
              </Text>
              <Text className="text-3xl font-bold text-gray-800 text-center">
                untuk Mereka
              </Text>
            </View>

            {/* Message Input */}
            <View className="mb-8 rounded-lg border-2 border-[#82BFB7] bg-white shadow-lg">
              <TextInput
                className="rounded-lg p-4 h-80 text-gray-800 text-base"
                placeholder="Ketik disini..."
                placeholderTextColor="#9CA3AF"
                value={message}
                onChangeText={setMessage}
                multiline
                textAlignVertical="top"
                maxLength={100}
                style={{ fontSize: 16 }}
              />
              <Text className={`text-right p-4 mt-2 ${message.length === 100 ? 'text-red-500' : 'text-slate-500'}`}>
                {message.length}/100
              </Text>
            </View>
          </View>

          {/* Bottom Section */}
          <View>
            {/* Submit Button */}
            <TouchableOpacity
              className={`py-4 rounded-full ${message.trim().length === 0 ? 'bg-slate-300 shadow-lg' : 'bg-[#82BFB7] shadow-lg'}`}
              onPress={handleSubmit}
              disabled={message.trim().length === 0}
            >
              <Text className="text-white text-center font-bold text-lg">
                Sumbangkan
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PrayerScreen;

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import images from '../../../constants/images';

const DonateScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header with Sobat Baik message */}
      <View className="py-6 pb-8" style={{ backgroundColor: '#82BFB7' }}>
        <View className="flex-row items-center justify-between px-6 mb-6">
          <View className="flex-row items-center">
            <View className="w-10 h-10 rounded-full bg-white/20 items-center justify-center mr-3">
              <Image source={images.user} className="w-6 h-6" resizeMode="contain" />
            </View>
            <View>
              <Text className="text-white text-sm">Selamat pagi,</Text>
              <Text className="text-white text-lg font-semibold">Sobat Baik</Text>
            </View>
          </View>
          
          <View className="flex-row items-center space-x-3">
            <TouchableOpacity 
              className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
              onPress={() => router.push('/home/inbox')}
            >
              <Image source={images.message} className="w-5 h-5" resizeMode="contain" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
              onPress={() => router.push('home/profile/profile')}
            >
              <Image source={images.user} className="w-6 h-6" resizeMode="contain" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View className="px-6">
          <TouchableOpacity 
            className="flex-row items-center bg-white rounded-xl px-4 py-4"
            onPress={() => router.push('/home/search')}
          >
            <Ionicons name="search" size={20} color="#9CA3AF" />
            <Text className="text-gray-500 ml-3 flex-1">Cari campaign donasi...</Text>
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  );
};

export default DonateScreen;

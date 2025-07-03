import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import images from '../../../constants/images';

const PrayerDetailScreen = () => {
  const router = useRouter();
  const { prayerId } = useLocalSearchParams();

  // Updated prayer data to match design
  const prayerData = {
    id: prayerId,
    user: {
      name: 'Aamiin',
      avatar: null,
      timeAgo: '7 menit lalu',
      location: 'Selamatkan Hidupnya Lewat Can...'
    },
    content: 'Semoga lekas sembuh, Amin. Semoga Allah memberikan kesembuhan yang terbaik dan memberikan kekuatan kepada keluarga untuk melalui masa sulit ini.',
    likes: 5,
    comments: 3,
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
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
        <Text style={styles.headerTitle}>Doa-doa #OrangBaik</Text>
        <TouchableOpacity>
          <Ionicons name="options-outline" size={24} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        {/* Prayer Content */}
        <View className="p-5">
          <View className="bg-white rounded-lg p-4 border border-gray-200">
            {/* User Header */}
            <View className="flex-row items-start justify-between mb-3">
              <View className="flex-row items-start flex-1">
                {/* Avatar */}
                <View className="w-12 h-12 rounded-full bg-gray-200 mr-3 overflow-hidden">
                  {prayerData.user.avatar ? (
                    <Image source={prayerData.user.avatar} className="w-full h-full" resizeMode="cover" />
                  ) : (
                    <View className="w-full h-full bg-gray-300 justify-center items-center">
                      <Ionicons name="person" size={24} color="#9CA3AF" />
                    </View>
                  )}
                </View>
                
                {/* User Info */}
                <View className="flex-1">
                  <View className="flex-row items-center">
                    <Text className="font-semibold text-gray-800 mr-2">{prayerData.user.name}</Text>
                    <Text className="text-sm text-gray-500">· {prayerData.user.timeAgo}</Text>
                  </View>
                  <Text className="text-sm text-blue-600 mt-1">{prayerData.user.location}</Text>
                </View>
              </View>
              
              {/* More Options */}
              <TouchableOpacity>
                <Ionicons name="ellipsis-horizontal" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
            
            {/* Prayer Content */}
            <Text className="text-base text-gray-700 leading-6 mb-4">{prayerData.content}</Text>
            
            {/* Action Bar */}
            <View className="flex-row items-center justify-between pt-3 border-t border-gray-100">
              <TouchableOpacity className="flex-row items-center">
                <View className="w-8 h-8 rounded-full bg-pink-100 justify-center items-center mr-3">
                  <Ionicons name="heart" size={16} color="#EC4899" />
                </View>
                <Text className="text-sm text-gray-600">{prayerData.likes} orang mengaminkan doa ini</Text>
              </TouchableOpacity>
              
              <TouchableOpacity>
                <Text className="text-lg font-bold" style={{ color: '#EC4899' }}>Aamiin</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Comments Section */}
        <View className="px-5 pb-5">
          <Text className="text-lg font-semibold text-gray-800 mb-4">Komentar ({prayerData.comments})</Text>
          
          {/* Sample Comments */}
          <View className="space-y-4">
            <View className="flex-row">
              <View className="w-8 h-8 rounded-full bg-gray-300 mr-3" />
              <View className="flex-1">
                <View className="bg-gray-50 rounded-lg p-3">
                  <View className="flex-row items-center mb-1">
                    <Text className="text-sm font-semibold text-gray-800">Sarah</Text>
                    <Text className="text-xs text-gray-500 ml-2">1 jam yang lalu</Text>
                  </View>
                  <Text className="text-sm text-gray-700">Amin, semoga kita semua diberi kekuatan</Text>
                </View>
              </View>
            </View>
            
            <View className="flex-row">
              <View className="w-8 h-8 rounded-full bg-gray-300 mr-3" />
              <View className="flex-1">
                <View className="bg-gray-50 rounded-lg p-3">
                  <View className="flex-row items-center mb-1">
                    <Text className="text-sm font-semibold text-gray-800">Ahmad</Text>
                    <Text className="text-xs text-gray-500 ml-2">30 menit yang lalu</Text>
                  </View>
                  <Text className="text-sm text-gray-700">Terima kasih doanya, sangat menguatkan</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Comment Input */}
      <View className="flex-row items-center px-5 py-4 border-t border-gray-100 bg-white">
        <View className="flex-1 bg-gray-100 rounded-full px-4 py-3 mr-3">
          <Text className="text-gray-500">Tulis komentar...</Text>
        </View>
        <TouchableOpacity className="p-2">
          <Ionicons name="send" size={20} color="#9AC5C1" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#374151',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
});

export default PrayerDetailScreen;

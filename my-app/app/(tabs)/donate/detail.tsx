import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar, 
  StyleSheet
} from 'react-native';
import { useRouter, useLocalSearchParams, Redirect } from 'expo-router';
import images from '../../../constants/images';

const { width } = Dimensions.get('window');

const DonationDetailScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Parse the donation data from params
  const donationData = {
    id: params.id,
    title: params.title as string,
    description: params.description as string,
    targetAmount: params.targetAmount as string,
    currentAmount: params.currentAmount as string,
    progress: parseInt(params.progress as string),
    daysLeft: params.daysLeft as string,
  };


  const progressPercentage = donationData.progress;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        {/* Hero Image with Header Overlay */}
        <View className="relative mb-4">
          <Image 
            source={images.donate2} 
            className="w-full h-80"
            resizeMode="cover"
          />
          
          {/* Header Overlay */}
          <View className="absolute top-0 left-0 right-0 flex-row items-center justify-between px-6 py-4 pt-12">
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Image 
                source={images.back} 
                style={styles.backIconWhite} 
                resizeMode="contain" 
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Title */}
        <View className="px-6 mb-4">
          <View className="flex-row justify-between items-center">
            <View className="w-3/4 h-20 flex-col justify-between items-start">
                <Text className="w-full text-xl font-bold text-gray-800 leading-tight">
                    {donationData.title}
                </Text>
                <Text className="text-sm text-gray-600">
                    Rp{donationData.currentAmount} Terkumpul Dari Rp{donationData.targetAmount}!
                </Text>
            </View>
            <View className='h-20 w-20 flex justify-center items-center'>
                <Text className="text-lg font-bold">
                    {progressPercentage}%
                </Text>
                <Image 
                  source={images.donate_prog}
                  className="absolute w-full h-full"
                />
            </View>
          </View>
        </View>

        {/* Foundation Info */}
        <View className="px-6 mb-6">
          <View className="flex-row items-center px-3 py-2 rounded-xl bg-white border border-neutral-100 shadow-md">
            <View className="w-14 h-14 bg-blue-600 rounded-xl items-center justify-center mr-4">
              <Image 
                  source={images.donate_prof}
                  className="w-full h-full"
                  resizeMode="cover"
                />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-800">Northrop Grumman</Text>
              <Text className="text-sm text-gray-600">Fondasi Terverifikasi</Text>
            </View>
          </View>
        </View>

        {/* Donate Button */}
        <View className="px-6 mb-6">
          <TouchableOpacity 
            className="bg-[#82BFB7] rounded-xl py-4 items-center shadow-lg"
            onPress={() => {
              // Handle donation logic here
              console.log('Donate button pressed');
            }}
          >
            <Text className="text-white text-lg font-semibold">Sumbang!</Text>
          </TouchableOpacity>
          <Text className="font-bold text-sm text-gray-600 mt-2">
            Berakhir dalam {donationData.daysLeft} Hari!
          </Text>
        </View>

        {/* Description Section */}
        <View className="px-6 mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-2">Rencana Donasi</Text>
          <Text className="text-gray-700 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam enim quam, sagittis et dignissim in, blandit eu sem. Cras elementum dignissim mauris eu vehicula. Donec posuere, massa ac consectetur placerat, sapien leo tincidunt magna, non lobortis tellus mauris vitae mauris. In condimentum nunc ligula, et malesuada ligula scelerisque et. Maecenas justo nulla, malesuada eu porta nec, feugiat ac neque. Nunc nec lectus ac enim placerat egestas. Suspendisse in volutpat nisl. Ut fermentum purus et risus luctus lacinia. Praesent id malesuada elit. Mauris lobortis pulvinar urna, euismod consequat mi ullamcorper et.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backButton: {
    padding: 8,
    marginRight: 12,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#374151',
  },
  backIconWhite: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
});

export default DonationDetailScreen;

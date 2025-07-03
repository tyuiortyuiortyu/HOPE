import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ImageBackground,
  StatusBar,
  SafeAreaView,
  Image,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';

import images from '../../../constants/images';

const DonorChoiceScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#82BFB7" />
      
      {/* Standardized Header with Sobat Baik message */}
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

        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.headerTitle}>Pilih Jenis Donor</Text>
          <Text style={styles.headerSubtitle}>Berbagi kebaikan melalui donor darah atau ASI</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        {/* Bagian Kiri: Donor Darah */}
        <Animatable.View animation="fadeInLeft" duration={1000} style={styles.half}>
          <Link href="/donor/donordarah" asChild>
            <TouchableOpacity style={styles.choiceContainer} activeOpacity={0.8}>
              <ImageBackground
                source={images.donorDarah}
                style={styles.imageBackground}
                resizeMode="cover"
              >
                <View style={styles.overlay}>
                  <Text style={styles.title}>DONOR</Text>
                  <Text style={styles.title}>DARAH</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </Link>
        </Animatable.View>

        {/* Bagian Kanan: Donor ASI */}
        <Animatable.View animation="fadeInRight" duration={1000} style={styles.half}>
          <Link href="/donor/donorasi" asChild>
            <TouchableOpacity style={styles.choiceContainer} activeOpacity={0.8}>
              <ImageBackground
                source={images.donorASI}
                style={styles.imageBackground}
                resizeMode="cover"
              >
                <View style={styles.overlay}>
                  <Text style={styles.title}>DONOR</Text>
                  <Text style={styles.title}>ASI</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </Link>
        </Animatable.View>
      </View>
    </SafeAreaView>
  );
};

export default DonorChoiceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFDDE1',
  },
  headerSection: {
    backgroundColor: '#82BFB7',
    paddingBottom: 24,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  userGreeting: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 16,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  userIcon: {
    width: 24,
    height: 24,
  },
  greetingText: {
    color: 'white',
    fontSize: 14,
  },
  userName: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  messageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageIcon: {
    width: 20,
    height: 20,
  },
  titleSection: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  half: {
    flex: 1,
  },
  choiceContainer: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
  },
  title: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
});
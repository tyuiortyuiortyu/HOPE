import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import MyDonation from './(component)/MyDonation'
import MyAction from './(component)/MyAction'
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import images from '../../../constants/images';

const { width } = Dimensions.get('window');
const scale = width / 375; // Base width for scaling

const TrackIndex = () => {
  const [selected, setSelected] = useState<'left' | 'right'>('left');
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Standardized Header with Search and Icons */}
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
            <Text className="text-gray-500 ml-3 flex-1">Lacak donasi dan aktivitas...</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content with negative margin */}
      <View style={{ flex: 1, marginTop: -24, backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingHorizontal: 16, paddingTop: 24 }}>
        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.name}>Gabriel Gavin Geraldo</Text>
          <Text style={styles.joined}>Bergabung sejak Juni 2025</Text>
          <View style={{ height: 10 }} />
          <View style={styles.row}>
            <View style={styles.circle} />
            <Text style={styles.optionText}>XXx Berdonasi</Text>
          </View>
          <View style={{ height: 8 }} />
          <View style={styles.row}>
            <View style={styles.circle} />
            <Text style={styles.optionText}>XXx Menjadi Relawan</Text>
          </View>
        </View>

        {/* Segmented Control */}
        <View style={styles.segmentContainer}>
          <TouchableOpacity
            style={[
              styles.segment,
              selected === 'left' ? styles.segmentActiveLeft : styles.segmentInactive
            ]}
            onPress={() => setSelected('left')}
            activeOpacity={0.8}
          >
            <Text style={[
              styles.segmentText,
              selected === 'left' ? styles.segmentTextActive : styles.segmentTextInactive
            ]}>Donasi Saya</Text>
          </TouchableOpacity>
          <View style={styles.segmentDivider} />
          <TouchableOpacity
            style={[
              styles.segment,
              selected === 'right' ? styles.segmentActiveRight : styles.segmentInactive
            ]}
            onPress={() => setSelected('right')}
            activeOpacity={0.8}
          >
            <Text style={[
              styles.segmentText,
              selected === 'right' ? styles.segmentTextActive : styles.segmentTextInactive
            ]}>Aksi Saya</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 24 }} />
        {selected === 'left' ? <MyDonation /> : <MyAction />}
      </View>
    </View>
  )
}

export default TrackIndex

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#c9e9e7',
    borderRadius: 24,
    padding: 12,
    paddingLeft: 24,
    marginBottom: 32,
    // shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    // shadow for Android
    elevation: 6,
  },
  name: {
    fontSize: 16 * scale,
    fontWeight: '500',
    marginBottom: 8,
  },
  joined: {
    fontSize: 12 * scale,
    fontWeight: '400',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 2 * scale,
    height: 2 * scale,
    borderRadius: 14 * scale,
    borderWidth: 2,
    borderColor: '#222',
    backgroundColor: '#000000',
    marginRight: 12,
  },
  optionText: {
    fontSize: 12 * scale,
    fontWeight: '400',
  },
  segmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 999,
    overflow: 'hidden',
    marginBottom: 2,
    marginTop: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
  },
  segment: {
    flex: 1,
    paddingVertical: 6 * scale,
    alignItems: 'center',
    backgroundColor: '#cbe9e7',
  },
  segmentActiveLeft: {
    backgroundColor: '#82c3be',
    borderTopLeftRadius: 999,
    borderBottomLeftRadius: 999,
  },
  segmentActiveRight: {
    backgroundColor: '#82c3be',
    borderTopRightRadius: 999,
    borderBottomRightRadius: 999,
  },
  segmentInactive: {
    backgroundColor: '#cbe9e7',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  segmentDivider: {
    width: 2,
    backgroundColor: '#222',
    height: '70%',
  },
  segmentText: {
    fontSize: 14 * scale,
    fontWeight: '400',
  },
  segmentTextActive: {
    color: '#fff',
    fontWeight: '500',
  },
  segmentTextInactive: {
    color: '#222',
    fontWeight: '400',
  },
})
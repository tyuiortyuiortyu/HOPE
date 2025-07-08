// app/(tabs)/home/rating.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import images from '../../../../constants/images';

const RatingScreen = () => {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleStarPress = (star: number) => {
    setRating(star);
  };

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert('Error', 'Mohon berikan rating terlebih dahulu');
      return;
    }
    Alert.alert('Terima Kasih!', 'Rating dan ulasan Anda telah dikirim');
    router.back();
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => handleStarPress(index + 1)}
        style={styles.starButton}
      >
        <Ionicons
          name={index < rating ? 'star' : 'star-outline'}
          size={40}
          color={index < rating ? '#FFB800' : '#E5E7EB'}
        />
      </TouchableOpacity>
    ));
  };

  const getRatingText = () => {
    switch (rating) {
      case 1:
        return 'Sangat Buruk';
      case 2:
        return 'Buruk';
      case 3:
        return 'Cukup';
      case 4:
        return 'Baik';
      case 5:
        return 'Sangat Baik';
      default:
        return 'Berikan rating Anda';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
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
        <Text style={styles.headerTitle}>Rating Aplikasi</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content}>
        {/* App Logo Section */}
        <View style={styles.logoSection}>
          <Image source={images.logo} style={styles.appLogo} />
          <Text style={styles.appName}>HOPE</Text>
          <Text style={styles.appDescription}>
            Bantu kami meningkatkan aplikasi dengan memberikan rating dan ulasan
          </Text>
        </View>

        {/* Rating Section */}
        <View style={styles.ratingSection}>
          <Text style={styles.ratingTitle}>Bagaimana pengalaman Anda?</Text>
          
          <View style={styles.starsContainer}>
            {renderStars()}
          </View>
          
          <Text style={styles.ratingText}>{getRatingText()}</Text>
        </View>

        {/* Review Section */}
        <View style={styles.reviewSection}>
          <Text style={styles.reviewTitle}>Tulis Ulasan (Opsional)</Text>
          <TextInput
            style={styles.reviewInput}
            placeholder="Ceritakan pengalaman Anda menggunakan aplikasi HOPE..."
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={4}
            value={review}
            onChangeText={setReview}
            textAlignVertical="top"
          />
        </View>

        Fix the features list in the Features Section
        <View style={styles.featuresSection}>
          <Text style={styles.featuresTitle}>Fitur yang Anda sukai:</Text>
          {[
            'Interface yang mudah digunakan',
            'Beragam program volunteer',
            'Sistem donasi yang transparan',
            'Sertifikat digital',
            'Tracking aktivitas',
          ].map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#82BFB7" />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.submitButton, rating > 0 && styles.submitButtonActive]} 
          onPress={handleSubmit}
          disabled={rating === 0}
        >
          <Text style={[styles.submitButtonText, rating > 0 && styles.submitButtonTextActive]}>
            Kirim Rating
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#82BFB7',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  appLogo: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#82BFB7',
    marginBottom: 10,
  },
  appDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
  },
  ratingSection: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  ratingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 20,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  starButton: {
    marginHorizontal: 5,
  },
  ratingText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  reviewSection: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 15,
  },
  reviewInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#F9FAFB',
    minHeight: 100,
  },
  featuresSection: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 15,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 10,
  },
  footer: {
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  submitButton: {
    backgroundColor: '#E5E7EB',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonActive: {
    backgroundColor: '#82BFB7',
  },
  submitButtonText: {
    color: '#9CA3AF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButtonTextActive: {
    color: 'white',
  },
});

export default RatingScreen;
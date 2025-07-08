// app/(tabs)/home/certificates/[id].tsx

import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Image, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

import icons from '../../../../../constants/icons';
import images from '../../../../../constants/images';

const certificateData = [
  {
    id: '1',
    title: 'Volunteer Bakti BCA Indonesia 2025',
    date: '17 September 2025',
    image: images.sertifikatBCA,
    description: 'Bakti BCA adalah program Corporate Social Responsibility (CSR) dari BCA yang fokus pada pengembangan masyarakat dan lingkungan. Program ini bertujuan untuk memberikan manfaat bagi masyarakat dan lingkungan, serta mendukung pertumbuhan berkelanjutan Indonesia. Program-program Bakti BCA mencakup pendidikan, lingkungan, kesehatan, dan ekonomi.'
  },
  { id: '2', title: 'Nova Scotia Health Volunteering 2024', date: '6 August 2024', image: images.sertifikatHealth, description: 'Apresiasi diberikan atas kontribusi sukarela yang signifikan dalam mendukung layanan kesehatan di Nova Scotia, membantu pasien dan staf dalam berbagai kapasitas.' },
  { id: '3', title: 'Animal Shelter Donation Appreciation', date: '12 February 2024', image: images.sertifikatAnimal, description: 'Sertifikat ini diberikan sebagai tanda terima kasih atas donasi yang murah hati untuk mendukung kesejahteraan dan perawatan hewan-hewan di penampungan kami.' }
];

const CertificateDetailScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const certificate = certificateData.find(cert => cert.id === id);

  if (!certificate) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Sertifikat tidak ditemukan.</Text>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Kembali</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.headerBackButton}
          onPress={() => router.back()}
        >
          <Image 
            source={images.back} 
            style={styles.headerBackIcon} 
            resizeMode="contain" 
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detail Sertifikat</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Image source={icons.download} style={styles.shareIcon} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.certificateCard}>
          <Image source={certificate.image} style={styles.certificateImage} />
          
          <View style={styles.certificateInfo}>
            <Text style={styles.certificateTitle}>{certificate.title}</Text>
            <Text style={styles.certificateDate}>{certificate.date}</Text>
            <Text style={styles.certificateDescription}>{certificate.description}</Text>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.downloadButton}>
              <Image source={icons.download} style={styles.actionIcon} />
              <Text style={styles.actionText}>Download</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.shareButtonSecondary}>
              <Image source={icons.download} style={styles.actionIcon} />
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
  headerBackButton: {
    padding: 8,
  },
  headerBackIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  shareButton: {
    padding: 8,
  },
  shareIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  certificateCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  certificateImage: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    borderRadius: 12,
    marginBottom: 20,
  },
  certificateInfo: {
    marginBottom: 30,
  },
  certificateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
  },
  certificateDate: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 15,
  },
  certificateDescription: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  downloadButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#82BFB7',
    paddingVertical: 12,
    borderRadius: 10,
    marginRight: 10,
  },
  shareButtonSecondary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    borderRadius: 10,
    marginLeft: 10,
  },
  actionIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#6B7280',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#82BFB7',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CertificateDetailScreen;
// app/(tabs)/home/certificates/index.tsx

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
import { useRouter } from 'expo-router';

import images from '../../../../../constants/images';
import icons from '../../../../../constants/icons';

const certificatesData = [
  {
    id: '1',
    title: 'Volunteer Bakti BCA Indonesia 2025',
    date: '17 September 2025',
    category: 'Volunteer',
    image: images.sertifikatBCA,
  },
  {
    id: '2',
    title: 'Nova Scotia Health Volunteering 2024',
    date: '6 August 2024',
    category: 'Health Volunteer',
    image: images.sertifikatHealth,
  },
  {
    id: '3',
    title: 'Animal Shelter Donation Appreciation',
    date: '12 February 2024',
    category: 'Donation',
    image: images.sertifikatAnimal,
  },
];

const CertificatesScreen = () => {
  const router = useRouter();

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
        <Text style={styles.headerTitle}>Sertifikat & Penghargaan</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Stats Section */}
      <View style={styles.statsSection}>
        <View style={styles.statsCard}>
          <Text style={styles.statsNumber}>{certificatesData.length}</Text>
          <Text style={styles.statsLabel}>Total Sertifikat</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {certificatesData.length > 0 ? (
          certificatesData.map((certificate) => (
            <TouchableOpacity
              key={certificate.id}
              style={styles.certificateCard}
              onPress={() => router.push(`/home/profile/certificates/${certificate.id}`)}
            >
              <Image source={certificate.image} style={styles.certificateImage} />
              <View style={styles.certificateInfo}>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{certificate.category}</Text>
                </View>
                <Text style={styles.certificateTitle}>{certificate.title}</Text>
                <Text style={styles.certificateDate}>{certificate.date}</Text>
              </View>
              <TouchableOpacity style={styles.downloadButton}>
                <Image source={icons.download} style={styles.downloadIcon} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Image source={icons.sertifikat} style={styles.emptyIcon} />
            <Text style={styles.emptyTitle}>Belum Ada Sertifikat</Text>
            <Text style={styles.emptyMessage}>
              Ikuti kegiatan volunteer dan donasi untuk mendapatkan sertifikat
            </Text>
          </View>
        )}
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
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  statsSection: {
    padding: 20,
  },
  statsCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statsNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#82BFB7',
  },
  statsLabel: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  certificateCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  certificateImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  certificateInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'space-between',
  },
  categoryBadge: {
    backgroundColor: '#EDF2F7',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  categoryText: {
    fontSize: 12,
    color: '#4A5568',
    fontWeight: '600',
  },
  certificateTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 5,
  },
  certificateDate: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 5,
  },
  downloadButton: {
    padding: 10,
  },
  downloadIcon: {
    width: 24,
    height: 24,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    marginBottom: 20,
    opacity: 0.5,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 10,
  },
  emptyMessage: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default CertificatesScreen;
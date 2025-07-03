import React from 'react'
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import MyActionCard from './MyActionCard'

const { width } = Dimensions.get('window')
const CARD_WIDTH = width - 32

interface ActionParams {
  image: string
  title: string
  committee: string
  datecreated: string
  actiondate: string
  location: string
  activity: string
  status: string
}

const MyActionCardDetail: React.FC = () => {
  const router = useRouter()
  const params = useLocalSearchParams()
  const {
    image,
    title,
    committee,
    datecreated,
    actiondate,
    location,
    activity,
    status,
  } = params as ActionParams

  const statusLabel = (status: string): string => {
    switch (status) {
      case 'selesai':
        return 'Selesai'
      case 'berlangsung':
        return 'Berlangsung'
      case 'menunggu':
        return 'Menunggu'
      case 'dibatalkan':
        return 'Dibatalkan'
      default:
        return status
    }
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Success Message */}
        <View style={styles.successSection}>
          <View style={styles.successIcon}>
            <Image 
              source={require('../../../../assets/images/donate/done.png')} 
              style={styles.successIconImage}
            />
          </View>
          <Text style={styles.successTitle}>Terima Kasih!</Text>
          <Text style={styles.successSubtitle}>Pendaftaran Aksimu telah diterima!</Text>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>Informasi Aksi</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Tanggal Aksi</Text>
            <Text style={styles.infoValue}>{actiondate || '-'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Lokasi Aksi</Text>
            <Text style={styles.infoValue}>{location || '-'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Kegiatan</Text>
            <Text style={styles.infoValue}>{activity || '-'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Status</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>{statusLabel(status)}</Text>
            </View>
          </View>
        </View>

        {/* Action Card Preview */}
        <View style={styles.cardContainer}>
          <Text style={styles.sectionTitle}>Program Aksi yang Diikuti</Text>
            <MyActionCard
              image={image}
              title={title}
              committee={committee}
              datecreated={datecreated}
              actiondate={actiondate}
              location={location}
              activity={activity}
              status={status}
            />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  backBtn: {
    padding: 8,
    width: 40,
    alignItems: 'center',
  },
  backBtnText: {
    fontSize: 24,
    color: '#82c3be',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  scrollContainer: {
    paddingBottom: 32,
  },
  successSection: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  successIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  successIconImage: {
    width: 40,
    height: 40,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    margin: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  infoCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '400',
  },
  infoValue: {
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#dcfce7',
  },
  statusBadgeText: {
    color: '#16a34a',
    fontWeight: '500',
    fontSize: 14,
  },
  cardContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  cardPreview: {
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  actionContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  actionBtn: {
    backgroundColor: '#82c3be',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})

export default MyActionCardDetail
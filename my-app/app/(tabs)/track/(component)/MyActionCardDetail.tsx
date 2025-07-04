import React from 'react'
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import MyActionCard from './MyActionCard'

const { width } = Dimensions.get('window')
const CARD_WIDTH = width - 32

const MyActionCardDetail = () => {
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
  }: any = params

  const statusLabel = (status: string) => {
    if (status === 'selesai') return 'Selesai'
    if (status === 'berlangsung') return 'Berlangsung'
    if (status === 'menunggu') return 'Menunggu'
    if (status === 'dibatalkan') return 'Dibatalkan'
    return status
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={{ padding: 0 }}>
        <View style={{ alignItems: 'center', marginTop: 32, marginBottom: 16 }}>
          <Text style={styles.headerTitle}>Terima Kasih!</Text>
          <Text style={styles.subtitle}>Pendaftaran Aksimu telah diterima!</Text>
        </View>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Tanggal Aksi</Text>
            <Text style={[styles.infoValue, styles.bold]}>{actiondate || '-'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Lokasi Aksi</Text>
            <Text style={[styles.infoValue, styles.bold]}>{location || '-'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Kegiatan</Text>
            <Text style={styles.infoValue}>{activity || '-'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Status</Text>
            <Text style={styles.infoValue}>{statusLabel(status)}</Text>
          </View>
        </View>
        <View style={{ alignItems: 'center', marginTop: 8 }}>
          <View style={styles.cardPreview}>
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
    color: '#222',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#222',
    marginBottom: 24,
    textAlign: 'center',
  },
  infoCard: {
    borderWidth: 2,
    borderColor: '#bdbdbd',
    borderRadius: 24,
    marginHorizontal: 16,
    padding: 24,
    backgroundColor: '#fff',
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  infoLabel: {
    fontSize: 17,
    color: '#222',
    fontWeight: '400',
    flex: 1.2,
  },
  infoValue: {
    fontSize: 17,
    color: '#222',
    fontWeight: '400',
    flex: 1.5,
    textAlign: 'right',
  },
  bold: {
    fontWeight: 'bold',
  },
  cardPreview: {
    width: CARD_WIDTH,
  },
})

export default MyActionCardDetail

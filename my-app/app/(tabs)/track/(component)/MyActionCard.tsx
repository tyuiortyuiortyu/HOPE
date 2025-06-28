import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')
const CARD_WIDTH = width - 32
const IMAGE_WIDTH = 110
const IMAGE_HEIGHT = 110

type Props = {
  image?: string
  title: string
  committee: string
  datecreated: string
  actiondate: string
  location: string
  activity: string
  status: string
}

const statusLabel = (status: string) => {
  if (status === 'selesai') return 'Selesai'
  if (status === 'berlangsung') return 'Berlangsung'
  if (status === 'menunggu') return 'Menunggu'
  if (status === 'dibatalkan') return 'Dibatalkan'
  return status
}

const statusColor = (status: string) => {
  if (status === 'selesai') return '#82c3be'
  if (status === 'berlangsung') return '#f5c542'
  if (status === 'menunggu') return '#bdbdbd'
  if (status === 'dibatalkan') return '#e57373'
  return '#cbe9e7'
}

const MyActionCard = ({
  image,
  title,
  committee,
  datecreated,
  actiondate,
  location,
  activity,
  status,
}: Props) => {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: image }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title} numberOfLines={2}>{title}</Text>
          <View style={[styles.statusPill, { backgroundColor: statusColor(status) }]}>
            <Text style={styles.statusText}>{statusLabel(status)}</Text>
          </View>
        </View>
        <Text style={styles.committeeText}>{committee.toUpperCase()}</Text>
        <Text style={styles.dateText}>X hours ago</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
    marginVertical: 10,
    marginHorizontal: 2,
    width: CARD_WIDTH,
    alignSelf: 'center',
    padding: 0,
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    flex: 1,
    marginRight: 8,
  },
  statusPill: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 999,
    alignSelf: 'flex-start',
    marginLeft: 8,
  },
  statusText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
  },
  committeeText: {
    color: '#bdbdbd',
    fontSize: 15,
    marginTop: 8,
    marginBottom: 8,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  dateText: {
    color: '#bdbdbd',
    fontSize: 14,
  },
})

export default MyActionCard

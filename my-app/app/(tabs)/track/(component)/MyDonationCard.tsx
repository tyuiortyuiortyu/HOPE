import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')
const CARD_WIDTH = width - 32
const IMAGE_WIDTH = 110
const IMAGE_HEIGHT = 110

type Props = {
  image: string
  title: string
  date: string
  status: string
  collected: number
  target: number
}

const statusLabel = (status: string) => {
  if (status === 'selesai') return 'Selesai'
  if (status === 'berlangsung') return 'Berlangsung'
  if (status === 'baru') return 'Baru'
  return status
}

const statusColor = (status: string) => {
  if (status === 'selesai') return '#82c3be'
  if (status === 'berlangsung') return '#f5c542'
  if (status === 'baru') return '#bdbdbd'
  return '#cbe9e7'
}

function formatRupiah(num: number) {
  return 'Rp ' + num.toLocaleString('id-ID')
}

const MyDonationCard = ({
  image,
  title,
  date,
  status,
  collected,
  target,
}: Props) => {
  const percent = Math.min(collected / target, 1)

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
        <Text style={styles.dateText}>X hours ago  ·  {formatRupiah(10000)}</Text>
        <View style={{ height: 12 }} />
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${percent * 100}%` }]} />
        </View>
        <View style={styles.amountRow}>
          <Text style={styles.amountText}>
            {formatRupiah(collected)} / {formatRupiah(target)} <Text style={{ fontWeight: 'bold' }}>Terkumpul</Text>
          </Text>
        </View>
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
  dateText: {
    color: '#888',
    fontSize: 14,
    marginTop: 8,
  },
  progressBarBg: {
    width: '100%',
    height: 16,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginTop: 12,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 16,
    backgroundColor: '#82c3be',
    borderRadius: 8,
  },
  amountRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountText: {
    fontSize: 15,
    color: '#222',
  },
})

export default MyDonationCard

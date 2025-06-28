import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import MyDonation from './(component)/MyDonation'
import MyAction from './(component)/MyAction'

const { width } = Dimensions.get('window');
const scale = width / 375; // Base width for scaling

const TrackIndex = () => {
  const [selected, setSelected] = useState<'left' | 'right'>('left');

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 16 }}>
      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.name}>Gabriel Gavin Geraldo</Text>
        <Text style={styles.joined}>Bergabung sejak Juni 2025</Text>
        <View style={{ height: 10 }} />
        <View style={styles.row}>
          <View style={styles.circle} />
          <Text style={styles.optionText}>XXx Berdonasi</Text>
        </View>
        <View style={{ height: 16 }} />
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
  )
}

export default TrackIndex

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#c9e9e7',
    borderRadius: 24,
    padding: 24,
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
    fontSize: 18 * scale,
    fontWeight: '500',
    marginBottom: 16,
  },
  joined: {
    fontSize: 14 * scale,
    fontWeight: '400',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 28 * scale,
    height: 28 * scale,
    borderRadius: 14 * scale,
    borderWidth: 2,
    borderColor: '#222',
    backgroundColor: '#fff',
    marginRight: 12,
  },
  optionText: {
    fontSize: 16 * scale,
    fontWeight: '400',
  },
  segmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 999,
    overflow: 'hidden',
    marginBottom: 8,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
  },
  segment: {
    flex: 1,
    paddingVertical: 14 * scale,
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
    fontSize: 18 * scale,
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
import React from 'react'
import { View, ScrollView, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import MyDonationCard from './MyDonationCard'

const defaultImage: String = "https://thumbs.dreamstime.com/b/good-morning-cup-coffee-heart-sprinkle-beautiful-good-morning-image-classic-text-cup-352305550.jpg";
const data: any = [
   {
    image: defaultImage,
    title: 'Donasi untuk Anak Yatim',
    date: '2023-10-01',
    status: 'selesai',
    collected: 5000000,
    target: 10000000,

    nominaldonate: 100000,
    anotherdonate: 20000,
    iddonate: '00001',
    statusdonate: 'berhasil',
    tanggaldonate: '2023-10-01 15:30:00'
   },
   {
    image: defaultImage,
    title: 'Bantuan Korban Bencana Alam',
    date: '2023-09-15',
    status: 'berlangsung',
    collected: 2500000,
    target: 5000000,

    nominaldonate: 75000,
    anotherdonate: 15000,
    iddonate: '00002',
    statusdonate: 'berhasil',
    tanggaldonate: '2023-09-15 10:45:00'
   },
   {
    image: defaultImage,
    title: 'Pendidikan untuk Desa Terpencil',
    date: '2023-11-20',
    status: 'baru',
    collected: 800000,
    target: 2000000,

    nominaldonate: 50000,
    anotherdonate: 10000,
    iddonate: '00003',
    statusdonate: 'pending',
    tanggaldonate: '2023-11-20 09:15:00'
   },
   {
    image: defaultImage,
    title: 'Operasi Jantung Anak',
    date: '2023-08-30',
    status: 'selesai',
    collected: 15000000,
    target: 20000000,

    nominaldonate: 200000,
    anotherdonate: 50000,
    iddonate: '00004',
    statusdonate: 'berhasil',
    tanggaldonate: '2023-08-30 14:20:00'
   },
   {
    image: defaultImage,
    title: 'Renovasi Masjid',
    date: '2023-12-05',
    status: 'berlangsung',
    collected: 3200000,
    target: 5000000,
    
    nominaldonate: 125000,
    anotherdonate: 25000,
    iddonate: '00005',
    statusdonate: 'berhasil',
    tanggaldonate: '2023-12-05 16:00:00'
   }
  ]

const MyDonation = () => {
  const router = useRouter()
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ height: 8 }} />
      {data.map((item: any, idx: number) => (
        <TouchableOpacity
          key={item.iddonate || idx}
          activeOpacity={0.85}
          onPress={() => router.push({ pathname: '/(tabs)/track/(component)/MyDonationCardDetail', params: { ...item }})}
        >
          <MyDonationCard
            image={item.image}
            title={item.title}
            date={item.date}
            status={item.status}
            collected={item.collected}
            target={item.target}
          />
        </TouchableOpacity>
      ))}
      <View style={{ height: 16 }} />
    </ScrollView>
  )
}

export default MyDonation


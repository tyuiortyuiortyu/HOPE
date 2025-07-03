import React from 'react'
import { View, ScrollView, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import MyActionCard from './MyActionCard'

const imageDefault: String = "https://thumbs.dreamstime.com/b/good-morning-cup-coffee-heart-sprinkle-beautiful-good-morning-image-classic-text-cup-352305550.jpg";

const data: any = [
  {
    image: imageDefault,
    title: 'Donor Darah Di Rumah Talenta BCA',
    committee: 'Core Team',
    datecreated: '2023-10-01',
    actiondate: '2023-10-15',
    location: 'Rumah Talenta BCA',
    activity: 'Donor Darah',
    status: 'menunggu'
  },
  {
    image: imageDefault,
    title: 'Bersih-bersih Pantai Ancol',
    committee: 'Environment Team',
    datecreated: '2023-09-15',
    actiondate: '2023-10-20',
    location: 'Pantai Ancol',
    activity: 'Pembersihan Lingkungan',
    status: 'selesai'
  },
  {
    image: imageDefault,
    title: 'Bakti Sosial di Panti Asuhan',
    committee: 'Social Team',
    datecreated: '2023-10-05',
    actiondate: '2023-11-01',
    location: 'Panti Asuhan Kasih Ibu',
    activity: 'Bakti Sosial',
    status: 'berlangsung'
  },
  {
    image: imageDefault,
    title: 'Pelatihan Digital Marketing',
    committee: 'Education Team',
    datecreated: '2023-09-28',
    actiondate: '2023-10-25',
    location: 'Gedung Serbaguna',
    activity: 'Pelatihan',
    status: 'menunggu'
  },
  {
    image: imageDefault,
    title: 'Gotong Royong Kampung',
    committee: 'Community Team',
    datecreated: '2023-10-10',
    actiondate: '2023-10-30',
    location: 'RT 05 RW 02',
    activity: 'Gotong Royong',
    status: 'dibatalkan'
  }
]

const MyAction = () => {
  const router = useRouter()
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ height: 8 }} />
      {data.map((item: any, idx: number) => (
        <TouchableOpacity
          key={item.title + idx}
          activeOpacity={0.85}
          onPress={() => router.push({ pathname: '/track/(component)/MyActionCardDetail', params: { ...item } })}
        >
          <MyActionCard
            image={item.image}
            title={item.title}
            committee={item.committee}
            datecreated={item.datecreated}
            actiondate={item.actiondate}
            location={item.location}
            activity={item.activity}
            status={item.status}
          />
        </TouchableOpacity>
      ))}
      <View style={{ height: 16 }} />
    </ScrollView>
  )
}

export default MyAction

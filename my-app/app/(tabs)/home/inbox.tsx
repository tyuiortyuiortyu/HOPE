import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import images from '../../../constants/images';

const InboxScreen = () => {
  const [activeTab, setActiveTab] = useState('Kabar');
  const router = useRouter();

  // Enhanced notification data
  const notificationData = [
    {
      id: '1',
      user: {
        name: 'Kitabisa Update',
        avatar: null,
        timeAgo: '2 jam lalu'
      },
      content: 'Terima kasih telah berdonasi untuk campaign "Bantu Anak Yatim Belajar". Donasi Anda akan segera disalurkan.',
      hasImage: true,
      imageContent: {
        title: 'Donasi Berhasil',
        subtitle: 'Rp 100.000 telah terkonfirmasi',
        buttonText: 'Lihat Detail',
        backgroundColor: '#82BFB7',
      },
      isRead: false,
      type: 'donation'
    },
    {
      id: '2',
      user: {
        name: 'Campaign Update',
        avatar: null,
        timeAgo: '5 jam lalu'
      },
      content: 'Campaign "Air Bersih untuk Semua" yang Anda dukung telah mencapai target 75%. Mari ajak teman untuk berdonasi!',
      hasImage: true,
      imageContent: {
        title: 'Target Hampir Tercapai!',
        subtitle: '75% dari target Rp 50.000.000',
        buttonText: 'Bagikan Campaign',
        backgroundColor: '#F2A2BD',
      },
      isRead: true,
      type: 'campaign'
    },
    {
      id: '3',
      user: {
        name: 'Laporan Donasi',
        avatar: null,
        timeAgo: '1 hari lalu'
      },
      content: 'Laporan penyaluran donasi bulan ini telah tersedia. Lihat bagaimana donasi Anda membantu sesama.',
      hasImage: false,
      isRead: false,
      type: 'report'
    }
  ];

  const messagesData = [
    {
      id: '1',
      user: {
        name: 'Tim Kitabisa',
        avatar: null,
        timeAgo: '30 menit lalu',
        status: 'online'
      },
      lastMessage: 'Halo! Ada yang bisa kami bantu dengan donasi Anda?',
      unreadCount: 1,
    },
    {
      id: '2',
      user: {
        name: 'Yayasan Peduli Anak',
        avatar: null,
        timeAgo: '2 jam lalu',
        status: 'offline'
      },
      lastMessage: 'Terima kasih atas dukungan Anda untuk program beasiswa anak yatim.',
      unreadCount: 0,
    }
  ];

  const NotificationCard = ({ item }) => (
    <TouchableOpacity 
      className={`mx-4 mb-4 rounded-2xl overflow-hidden ${
        item.isRead ? 'bg-white' : 'bg-blue-50'
      }`}
      onPress={() => router.push('conversation')}
      activeOpacity={0.8}
    >
      {/* Header */}
      <View className="p-4 pb-3">
        <View className="flex-row items-start justify-between">
          <View className="flex-row items-start flex-1">
            <View className="w-10 h-10 rounded-full items-center justify-center mr-3" style={{ backgroundColor: '#82BFB7' }}>
              <Ionicons 
                name={item.type === 'donation' ? 'heart' : item.type === 'campaign' ? 'trending-up' : 'document-text'} 
                size={18} 
                color="white" 
              />
            </View>
            
            <View className="flex-1">
              <View className="flex-row items-center justify-between">
                <Text className="font-bold text-gray-900 text-sm">{item.user.name}</Text>
                <View className="flex-row items-center">
                  {!item.isRead && (
                    <View className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: '#82BFB7' }} />
                  )}
                  <Text className="text-xs text-gray-500">{item.user.timeAgo}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        
        <Text className="text-gray-700 text-sm leading-5 mt-3">
          {item.content}
        </Text>
      </View>
      
      {/* Action Card */}
      {item.hasImage && (
        <View className="mx-4 mb-4 rounded-xl overflow-hidden" style={{ backgroundColor: item.imageContent.backgroundColor }}>
          <View className="p-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-white text-base font-bold mb-1">
                  {item.imageContent.title}
                </Text>
                <Text className="text-white/90 text-sm mb-3">
                  {item.imageContent.subtitle}
                </Text>
                <TouchableOpacity className="bg-white/20 rounded-lg px-4 py-2 self-start">
                  <Text className="text-white font-semibold text-sm">
                    {item.imageContent.buttonText}
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="w-16 h-16 ml-3 rounded-xl bg-white/20 items-center justify-center">
                <Ionicons name="gift-outline" size={24} color="white" />
              </View>
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );

  const MessageCard = ({ item }) => (
    <TouchableOpacity 
      className="mx-4 mb-3 p-4 bg-white rounded-2xl"
      onPress={() => router.push('conversation')}
      activeOpacity={0.8}
    >
      <View className="flex-row items-center">
        <View className="relative mr-3">
          <View className="w-12 h-12 rounded-full overflow-hidden" style={{ backgroundColor: '#82BFB7' }}>
            <View className="w-full h-full items-center justify-center">
              <Text className="text-white font-bold text-lg">
                {item.user.name.charAt(0)}
              </Text>
            </View>
          </View>
          {item.user.status === 'online' && (
            <View className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white" />
          )}
        </View>

        <View className="flex-1">
          <View className="flex-row items-center justify-between mb-1">
            <Text className="font-bold text-gray-900 text-base" numberOfLines={1}>
              {item.user.name}
            </Text>
            <Text className="text-xs text-gray-500">{item.user.timeAgo}</Text>
          </View>
          <Text className="text-gray-600 text-sm" numberOfLines={2}>
            {item.lastMessage}
          </Text>
        </View>

        {item.unreadCount > 0 && (
          <View className="w-6 h-6 rounded-full items-center justify-center ml-3" style={{ backgroundColor: '#82BFB7' }}>
            <Text className="text-white text-xs font-bold">
              {item.unreadCount}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const EmptyState = ({ tab }) => (
    <View className="flex-1 justify-center items-center px-8" style={{ marginTop: 120 }}>
      <View className="w-20 h-20 rounded-full items-center justify-center mb-6" style={{ backgroundColor: '#F3F4F6' }}>
        <Ionicons 
          name={tab === 'Kabar' ? 'notifications-outline' : 'chatbubble-outline'} 
          size={32} 
          color="#9CA3AF" 
        />
      </View>
      <Text className="text-gray-900 text-lg font-bold text-center mb-2">
        {tab === 'Kabar' ? 'Belum ada notifikasi' : 'Belum ada pesan'}
      </Text>
      <Text className="text-gray-500 text-center text-base leading-6">
        {tab === 'Kabar' 
          ? 'Notifikasi tentang donasi dan campaign akan muncul di sini' 
          : 'Mulai percakapan dengan organisasi atau volunteer'
        }
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Standardized Header Navigation */}
      <View className="bg-white">
        <View style={styles.headerTop}>
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
          <Text style={styles.headerTitle}>Inbox</Text>
        </View>

        {/* Tabs */}
        <View className="flex-row">
          {['Kabar', 'Pesan'].map((tab) => (
            <TouchableOpacity
              key={tab}
              className={`flex-1 py-4 ${activeTab === tab ? 'border-b-2' : ''}`}
              style={activeTab === tab ? { borderBottomColor: '#82BFB7' } : {}}
              onPress={() => setActiveTab(tab)}
            >
              <Text className={`text-center font-semibold ${
                activeTab === tab ? '' : 'text-gray-400'
              }`} style={activeTab === tab ? { color: '#82BFB7' } : {}}>
                {tab}
                {/* Count badges */}
                {tab === 'Kabar' && notificationData.filter(item => !item.isRead).length > 0 && (
                  <Text className="text-xs"> ({notificationData.filter(item => !item.isRead).length})</Text>
                )}
                {tab === 'Pesan' && messagesData.reduce((acc, item) => acc + item.unreadCount, 0) > 0 && (
                  <Text className="text-xs"> ({messagesData.reduce((acc, item) => acc + item.unreadCount, 0)})</Text>
                )}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Content */}
      <View className="flex-1">
        {activeTab === 'Kabar' ? (
          notificationData.length > 0 ? (
            <FlatList
              data={notificationData}
              renderItem={({ item }) => <NotificationCard item={item} />}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 16 }}
            />
          ) : (
            <EmptyState tab="Kabar" />
          )
        ) : (
          <View className="flex-1">
            {messagesData.length > 0 ? (
              <FlatList
                data={messagesData}
                renderItem={({ item }) => <MessageCard item={item} />}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 16 }}
              />
            ) : (
              <EmptyState tab="Pesan" />
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#374151',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
});

export default InboxScreen;
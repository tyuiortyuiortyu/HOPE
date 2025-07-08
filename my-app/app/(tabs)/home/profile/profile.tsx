// app/(tabs)/home/profile/profile.tsx

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView, 
  Image, 
  StyleSheet, 
  Modal 
} from 'react-native';
import { useRouter } from 'expo-router';

// Impor aset dari file constants dengan path yang benar
import icons from '../../../../constants/icons';
import images from '../../../../constants/images';

// Data untuk semua item menu
const menuData = [
  { id: '1', icon: icons.akun, text: 'Akun Saya', route: '/home/profile/edit' },
  { id: '2', icon: icons.sertifikat, text: 'Sertifikat Aksi & Donasi', route: '/home/profile/certificates' },
  { id: '3', icon: icons.rating, text: 'Rating Aplikasi HOPE', route: '/home/profile/rating' },
  { id: '4', icon: icons.tentang, text: 'Tentang HOPE', route: '/home/profile/about' },
  { id: '5', icon: icons.keluar, text: 'Keluar', route: 'logout' },
];

// Semua style terpusat di sini untuk kontrol yang lebih andal
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerSection: {
    backgroundColor: '#82BFB7',
    paddingBottom: 40,
  },
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: -60,
    marginBottom: 30,
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 4,
    borderColor: '#82BFB7',
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: '#6B7280',
  },
  editIcon: {
    width: 16,
    height: 16,
    marginLeft: 8,
  },
  menuSection: {
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  menuIcon: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  menuText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
    flex: 1,
  },
  chevronIcon: {
    width: 20,
    height: 20,
    tintColor: '#9CA3AF',
  },
  helpSection: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  helpIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  helpText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 0,
    width: '85%',
    overflow: 'hidden',
  },
  modalHeader: {
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  modalMessage: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  modalButtons: {
    flexDirection: 'row',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#82BFB7',
  },
  cancelButton: {
    backgroundColor: '#F3F4F6',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6B7280',
  },
});

const ProfileScreen = () => {
  const router = useRouter();
  const [isModalVisible, setModalVisible] = useState(false);

  // Fungsi penanganan klik yang didefinisikan satu kali di luar JSX untuk performa terbaik
  const handlePress = (item) => {
    if (item.route === 'logout') {
      setModalVisible(true);
    } else {
      router.push(item.route);
    }
  };

  const handleLogout = () => {
    setModalVisible(false);
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Konfirmasi Keluar</Text>
              <Text style={styles.modalMessage}>
                Apakah Anda yakin ingin keluar dari akun Anda?
              </Text>
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleLogout}
              >
                <Text style={styles.confirmButtonText}>Keluar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.headerTop}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Image 
                source={images.back} 
                style={{ width: 24, height: 24, tintColor: 'white' }} 
                resizeMode="contain" 
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Profil</Text>
          </View>
        </View>

        {/* Profile Card */}
        <View style={styles.profileSection}>
          <View style={styles.profileCard}>
            <Image
              source={images.profilePlaceholder}
              style={styles.profileImage}
            />
            <Text style={styles.userName}>Hope</Text>
            <Text style={styles.userEmail}>hope@gmail.com</Text>
            
            <TouchableOpacity 
              style={styles.editProfileButton}
              onPress={() => router.push('/home/profile/edit')}
            >
              <Text style={{ color: '#6B7280', fontSize: 14, fontWeight: '500' }}>
                Edit Profil
              </Text>
              <Image source={icons.pencil} style={styles.editIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Section */}
        <View style={styles.menuSection}>
          {menuData.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => handlePress(item)}
            >
              <Image source={item.icon} style={styles.menuIcon} resizeMode="contain" />
              <Text style={styles.menuText}>{item.text}</Text>
              <Image 
                source={images.back} 
                style={[styles.chevronIcon, { transform: [{ rotate: '180deg' }] }]} 
                resizeMode="contain" 
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Help Section */}
        <View style={styles.helpSection}>
          <TouchableOpacity style={styles.helpButton}>
            <Image source={icons.help} style={styles.helpIcon} resizeMode="contain"/>
            <Text style={styles.helpText}>Butuh Bantuan?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
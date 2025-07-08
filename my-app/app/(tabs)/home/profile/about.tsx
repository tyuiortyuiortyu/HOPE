// app/(tabs)/home/about.tsx

import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView, 
  Image, 
  StyleSheet,
  Linking
} from 'react-native';
import { useRouter } from 'expo-router';
import { AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import images from '../../../../constants/images';

const AboutScreen = () => {
  const router = useRouter();

  const openLink = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  const teamMembers = [
    { name: 'Fransiska Felicia Handoyo', role: '2702363840' },
    { name: 'Iven Marchellia', role: '2702363935' },
    { name: 'Gabriel Gavin Geraldo', role: '2702365303' },
    { name: 'Ni Made Meisya Artharini', role: '2702364004' },
    { name: 'Nicolaus Bintang Nathanael', role: '2702364036' },
    { name: 'Nikita', role: '2702364004' },
  ];

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
        <Text style={styles.headerTitle}>Tentang HOPE</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content}>
        {/* App Info Section */}
        <View style={styles.appInfoSection}>
          <Image source={images.logo} style={styles.appLogo} />
          <Text style={styles.appName}>HOPE</Text>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
          <Text style={styles.appTagline}>"Small Actions Big Impact"</Text>
        </View>

        {/* Main Image */}
        <View style={styles.imageSection}>
          <Image source={images.aboutUs} style={styles.mainImage} />
        </View>

        {/* Mission Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Misi Kami</Text>
          <Text style={styles.sectionText}>
            Kami adalah platform yang didedikasikan untuk menjembatani kebaikan. Aplikasi ini hadir untuk membantu organisasi non-profit, komunitas, dan individu yang membutuhkan bantuan sukarelawan agar dapat mengelola serta mengoordinasi kegiatan mereka secara lebih efisien.
          </Text>
        </View>

        {/* Features Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fitur Utama</Text>
          {[
            { icon: 'heart', text: 'Program Donasi Transparan' },
            { icon: 'people', text: 'Kegiatan Volunteer' },
            { icon: 'water', text: 'Donor Darah & ASI' },
            { icon: 'medal', text: 'Sertifikat Digital' },
            { icon: 'analytics', text: 'Tracking Aktivitas' },
          ].map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <MaterialCommunityIcons name={feature.icon} size={20} color="#82BFB7" />
              </View>
              <Text style={styles.featureText}>{feature.text}</Text>
            </View>
          ))}
        </View>

        {/* Team Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tim Kami</Text>
          {teamMembers.map((member, index) => (
            <View key={index} style={styles.teamMember}>
              <View style={styles.memberAvatar}>
                <Text style={styles.memberInitial}>{member.name.charAt(0)}</Text>
              </View>
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{member.name}</Text>
                <Text style={styles.memberRole}>{member.role}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Contact Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hubungi Kami</Text>
          <TouchableOpacity 
            style={styles.contactItem}
            onPress={() => openLink('mailto:info@hope-app.com')}
          >
            <MaterialCommunityIcons name="email" size={24} color="#82BFB7" />
            <Text style={styles.contactText}>info@hope-app.com</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.contactItem}
            onPress={() => openLink('tel:+6281234567890')}
          >
            <MaterialCommunityIcons name="phone" size={24} color="#82BFB7" />
            <Text style={styles.contactText}>+62 852 4818 1233</Text>
          </TouchableOpacity>
        </View>

        {/* Social Media Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ikuti Kami</Text>
          <View style={styles.socialContainer}>
            <TouchableOpacity 
              style={styles.socialButton}
              onPress={() => openLink('https://instagram.com')}
            >
              <AntDesign name="instagram" size={24} color="#82BFB7" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.socialButton}
              onPress={() => openLink('https://twitter.com')}
            >
              <AntDesign name="twitter" size={24} color="#82BFB7" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.socialButton}
              onPress={() => openLink('https://facebook.com')}
            >
              <FontAwesome name="facebook-square" size={24} color="#82BFB7" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.socialButton}
              onPress={() => openLink('https://linkedin.com')}
            >
              <AntDesign name="linkedin-square" size={24} color="#82BFB7" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Copyright */}
        <View style={styles.copyrightSection}>
          <Text style={styles.copyrightText}>
            © 2025 HOPE. All rights reserved.
          </Text>
        </View>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
  },
  appInfoSection: {
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 30,
    marginBottom: 20,
  },
  appLogo: {
    width: 80,
    height: 80,
    marginBottom: 15,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#82BFB7',
    marginBottom: 5,
  },
  appVersion: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 10,
  },
  appTagline: {
    fontSize: 16,
    color: '#374151',
    fontStyle: 'italic',
  },
  imageSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  mainImage: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    resizeMode: 'cover',
  },
  section: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 15,
  },
  sectionText: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F9FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  featureText: {
    fontSize: 16,
    color: '#374151',
  },
  teamMember: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  memberAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#82BFB7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  memberInitial: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  memberRole: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  contactText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 15,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F9FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyrightSection: {
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 20,
  },
  copyrightText: {
    fontSize: 14,
    color: '#6B7280',
  },
});

export default AboutScreen;
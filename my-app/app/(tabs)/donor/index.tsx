import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ImageBackground,
  StatusBar,
  Image,
} from 'react-native';
import { Link } from 'expo-router';
import * as Animatable from 'react-native-animatable';

// Pastikan path ke assets benar dari lokasi file ini
import images from '../../../constants/images';

const DonorChoiceScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Bagian Kiri: Donor Darah */}
      {/* Link akan mengarahkan ke file donordarah.tsx */}
      <Animatable.View animation="fadeInLeft" duration={1000} style={styles.half}>
        <Link href="/donor/donordarah" asChild>
          <TouchableOpacity style={styles.choiceContainer} activeOpacity={0.8}>
            <ImageBackground
              source={images.donorDarah}
              style={styles.imageBackground}
              resizeMode="cover"
            >
              <View style={styles.overlay}>
                <Text style={styles.title}>DONOR</Text>
                <Text style={styles.title}>DARAH</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </Link>
      </Animatable.View>

      {/* Bagian Kanan: Donor ASI */}
      {/* Link akan mengarahkan ke file donorasi.tsx */}
      <Animatable.View animation="fadeInRight" duration={1000} style={styles.half}>
        <Link href="/donor/donorasi" asChild>
          <TouchableOpacity style={styles.choiceContainer} activeOpacity={0.8}>
            <ImageBackground
              source={images.donorASI}
              style={styles.imageBackground}
              resizeMode="cover"
            >
              <View style={styles.overlay}>
                <Text style={styles.title}>DONOR</Text>
                <Text style={styles.title}>ASI</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </Link>
      </Animatable.View>
    </View>
  );
};

export default DonorChoiceScreen;

const styles = StyleSheet.create({
  half: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFDDE1',
  },
  choiceContainer: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    // backgroundColor: 'rgba(40, 10, 10, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
  },
  title: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
});
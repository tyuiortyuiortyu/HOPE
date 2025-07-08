import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import images from '../../../constants/images';

const PaymentScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [donationAmount, setDonationAmount] = useState('0');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  // Parse donation data from params
  const donationData = {
    title: params.title as string,
    targetAmount: params.targetAmount as string,
    currentAmount: params.currentAmount as string,
  };

  const formatCurrency = (amount: string) => {
    const numericAmount = amount.replace(/[^0-9]/g, '');
    if (!numericAmount) return '0';
    return numericAmount.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleAmountChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    const maxAmount = 999999999; // 100 million

    if (numericValue === '') {
      setDonationAmount('0');
      return;
    }

    const parsedValue = parseInt(numericValue, 10);
    if (!isNaN(parsedValue) && parsedValue <= maxAmount) {
      setDonationAmount(parsedValue.toString());
    } else if (numericValue === '') {
        setDonationAmount('0');
    }
  };

  const paymentMethods = [
    {
      id: 'mastercard',
      name: 'Kartu Debit',
      subtitle: 'Bank - XXXX XXXX XXXX',
      image: images.mastercard,
    },
    {
      id: 'visa',
      name: 'Kartu Debit',
      subtitle: 'Bank - XXXX XXXX XXXX',
      image: images.visa,
    },
    {
      id: 'kredivo',
      name: 'XXXXXX',
      subtitle: '',
      image: images.kredivo,
    },
    {
      id: 'gopay',
      name: 'XXXX Pay',
      subtitle: '',
      image: images.gopay,
    },
    {
      id: 'flazz',
      name: 'X-Money',
      subtitle: '',
      image: images.flazz,
    },
  ];

  const handlePayment = () => {
    if (!donationAmount || donationAmount === '0') {
      Alert.alert('Error', 'Silakan masukkan jumlah donasi');
      return;
    }
    
    if (!selectedPaymentMethod) {
      Alert.alert('Error', 'Silakan pilih metode pembayaran');
      return;
    }

    // Navigate to prayer page with donation data
    const selectedMethod = paymentMethods.find(p => p.id === selectedPaymentMethod);
    router.push({
      pathname: '/(tabs)/donate/prayer',
      params: {
        title: donationData.title,
        targetAmount: donationData.targetAmount,
        currentAmount: donationData.currentAmount,
        donationAmount: donationAmount,
        paymentMethod: selectedMethod?.name || '',
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 py-4 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={images.back} className="w-6 h-6" resizeMode="contain" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 justify-between bg-white p-6">
          {/* Top Section */}
          <View>
            {/* Title */}
            <View className="mb-6">
              <Text className="text-3xl font-bold text-gray-800 text-center">
                Aku Ingin Mendonasi
              </Text>
            </View>

            {/* Amount Input */}
            <View className="mb-8">
              <View className="border-b-2 border-[#82BFB7] py-6">
                <TextInput
                  className="text-4xl font-light text-gray-800 text-center"
                  placeholder="Rp 0"
                  placeholderTextColor="#9CA3AF"
                  value={`Rp ${formatCurrency(donationAmount)}`}
                  onChangeText={(text) => {
                    const cleanText = text.replace(/^Rp\s*/, '');
                    handleAmountChange(cleanText);
                  }}
                  keyboardType="numeric"
                  maxLength={15}
                  onFocus={() => {
                    if (donationAmount === '0') {
                      setDonationAmount('');
                    }
                  }}
                  onBlur={() => {
                    if (donationAmount === '') {
                      setDonationAmount('0');
                    }
                  }}
                />
              </View>
            </View>
          </View>

          {/* Bottom Section */}
          <View>
            {/* Payment Methods */}
            <View className="mb-8">
              {paymentMethods.map((method, index) => (
                <TouchableOpacity
                  key={method.id}
                  className={`bg-white rounded-lg px-4 py-2 mb-3 flex-row items-center ${
                    selectedPaymentMethod === method.id ? 'border-2 border-[#82BFB7] shadow-lg' : 'border border-neutral-100 shadow-lg'
                  }`}
                  onPress={() => setSelectedPaymentMethod(method.id)}
                >
                  <Image source={method.image} className="w-12 h-8 mr-4" resizeMode="contain" />
                  <View className="flex-1">
                    <Text className="font-semibold text-gray-800">{method.name}</Text>
                    {method.subtitle ? <Text className="text-sm text-gray-500">{method.subtitle}</Text> : null}
                  </View>
                  <View 
                    className={`w-6 h-6 rounded-full border-2 ${selectedPaymentMethod === method.id ? 'border-[#82BFB7]' : 'border-neutral-100'} justify-center items-center`}
                  >
                    {selectedPaymentMethod === method.id && (
                      <View className="w-3 h-3 rounded-full bg-[#82BFB7]" />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Continue Button */}
            <TouchableOpacity
              className={`py-4 rounded-full ${!donationAmount || donationAmount === '0' || !selectedPaymentMethod ? 'bg-slate-200 shadow-lg' : 'bg-[#82BFB7] shadow-lg'}`}
              onPress={handlePayment}
              disabled={!donationAmount || donationAmount === '0' || !selectedPaymentMethod}
            >
              <Text className="text-white text-center font-bold text-lg">Lanjut</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PaymentScreen;

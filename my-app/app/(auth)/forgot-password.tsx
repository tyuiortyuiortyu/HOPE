import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSend = () => {
    if (!email) {
      Alert.alert("Error", "Mohon masukkan alamat email");
      return;
    }
    if (!email.includes("@")) {
      Alert.alert("Error", "Mohon masukkan alamat email yang valid");
      return;
    }
    Alert.alert("Berhasil", "Link reset password telah dikirim ke email Anda!");
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-900">Lupa Password</Text>
        <View className="w-6" />
      </View>

      <View className="flex-1 px-6">
        {/* Icon */}
        <View className="items-center mt-8 mb-8">
          <View className="w-20 h-20 rounded-full items-center justify-center mb-6" style={{ backgroundColor: "#C6E6E3" }}>
            <Ionicons name="mail-outline" size={32} color="#82BFB7" />
          </View>
          
          <Text className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Lupa Password?
          </Text>
          <Text className="text-gray-600 text-center text-base leading-6">
            Masukkan email yang terdaftar dan kami akan mengirimkan link untuk reset password Anda
          </Text>
        </View>

        {/* Email Input */}
        <View className="mb-8">
          <Text className="text-sm font-medium text-gray-700 mb-2">
            Email
          </Text>
          <TextInput
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-base focus:border-blue-500"
            placeholder="Masukkan alamat email"
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Send Button */}
        <TouchableOpacity
          className="w-full rounded-xl py-4"
          style={{ backgroundColor: "#82BFB7" }}
          onPress={handleSend}
        >
          <Text className="text-white text-base font-semibold text-center">
            Kirim Link Reset
          </Text>
        </TouchableOpacity>

        {/* Back to Login */}
        <TouchableOpacity 
          className="mt-6"
          onPress={() => router.back()}
        >
          <Text className="text-center text-gray-600">
            Kembali ke halaman masuk
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;

import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image } from "react-native";
import images from "../../constants/images";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Validation", "Please fill in both email and password");
      return;
    }
    Alert.alert("Login Success", "You are logged in!");
    router.push("../(tabs)/home");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#1F2937" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-gray-900">Masuk</Text>
          <View className="w-6" />
        </View>

        <View className="flex-1 px-6">
          {/* Welcome Text */}
          <View className="mb-8 mt-4">
            <Text className="text-2xl font-bold text-gray-900 mb-2">
              Selamat datang kembali
            </Text>
            <Text className="text-gray-600 text-base">
              Masuk ke akun Anda untuk melanjutkan berbagi kebaikan
            </Text>
          </View>

          {/* Form */}
          <View className="space-y-4">
            {/* Email Input */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Email atau Username
              </Text>
              <TextInput
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-base focus:border-blue-500"
                placeholder="Masukkan email atau username"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            {/* Password Input */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Password
              </Text>
              <View className="relative">
                <TextInput
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 pr-12 text-base focus:border-blue-500"
                  placeholder="Masukkan password"
                  placeholderTextColor="#9CA3AF"
                  value={password}
                  secureTextEntry={!showPassword}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  className="absolute right-4 top-4"
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color="#6B7280"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity
              className="self-end"
              onPress={() => router.push("forgot-password")}
            >
              <Text className="text-sm text-blue-600 font-medium">
                Lupa password?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            className="w-full rounded-xl py-4 mt-8"
            style={{ backgroundColor: "#82BFB7" }}
            onPress={handleLogin}
          >
            <Text className="text-white text-base font-semibold text-center">
              Masuk
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center my-8">
            <View className="flex-1 h-px bg-gray-200" />
            <Text className="px-4 text-sm text-gray-500">atau masuk dengan</Text>
            <View className="flex-1 h-px bg-gray-200" />
          </View>

          {/* Social Login */}
          <View className="flex-row justify-center space-x-4 mb-6">
            <TouchableOpacity className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center">
              <Image source={images.google} className="w-6 h-6" />
            </TouchableOpacity>
            <TouchableOpacity className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center">
              <Image source={images.facebook} className="w-6 h-6" />
            </TouchableOpacity>
            <TouchableOpacity className="w-12 h-12 rounded-full bg-gray-100 items-center justify-center">
              <Image source={images.apple} className="w-6 h-6" />
            </TouchableOpacity>
          </View>

          {/* Register Link */}
          <View className="flex-row justify-center items-center">
            <Text className="text-gray-600">Belum punya akun? </Text>
            <TouchableOpacity onPress={() => router.push("register")}>
              <Text style={{ color: "#82BFB7" }} className="font-medium">
                Daftar sekarang
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
import React, { useState, useEffect } from 'react';
import { 
  Text, 
  View, 
  Alert, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import images from '../../constants/images';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const [isMinLengthMet, setIsMinLengthMet] = useState(false);
    const [hasLowercase, setHasLowercase] = useState(false);
    const [hasUppercase, setHasUppercase] = useState(false);
    const [hasNumber, setHasNumber] = useState(false);
    
    const router = useRouter();

    useEffect(() => {
        setIsMinLengthMet(password.length >= 8);
        setHasLowercase(/[a-z]/.test(password));
        setHasUppercase(/[A-Z]/.test(password));
        setHasNumber(/\d/.test(password));
    }, [password]);

    const isPasswordValid = () => {
        return isMinLengthMet && hasLowercase && hasUppercase && hasNumber;
    };

    const handleRegister = () => {
        if (!name || !username || !email || !password || !confirmPassword) {
            Alert.alert('Error', 'Semua field harus diisi');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Password tidak sama');
            return;
        }
        if (!isPasswordValid()) {
            Alert.alert('Error', 'Password tidak memenuhi syarat');
            return;
        }
        Alert.alert('Success', `Selamat datang, ${name}!`);
        router.push("login");
    };

    const renderValidationItem = (condition, text) => (
        <View className="flex-row items-center my-1">
            <Ionicons
                name={condition ? "checkmark-circle" : "ellipse-outline"}
                size={16}
                color={condition ? "#10B981" : "#D1D5DB"}
                style={{ marginRight: 8 }}
            />
            <Text className={`text-xs ${condition ? 'text-green-600' : 'text-gray-400'}`}>
                {text}
            </Text>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView 
                className="flex-1" 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                {/* Header */}
                <View className="flex-row items-center justify-between px-6 py-4">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="#1F2937" />
                    </TouchableOpacity>
                    <Text className="text-lg font-semibold text-gray-900">Daftar</Text>
                    <View className="w-6" />
                </View>

                <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
                    {/* Welcome Text */}
                    <View className="mb-6">
                        <Text className="text-2xl font-bold text-gray-900 mb-2">
                            Bergabunglah dengan kami
                        </Text>
                        <Text className="text-gray-600 text-base">
                            Daftarkan akun untuk mulai berbagi kebaikan
                        </Text>
                    </View>

                    {/* Form */}
                    <View className="space-y-4">
                        {/* Name Input */}
                        <View>
                            <Text className="text-sm font-medium text-gray-700 mb-2">
                                Nama Lengkap
                            </Text>
                            <TextInput 
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-base"
                                placeholder="Masukkan nama lengkap"
                                placeholderTextColor="#9CA3AF"
                                value={name}
                                onChangeText={setName}
                            />
                        </View>

                        {/* Email Input */}
                        <View>
                            <Text className="text-sm font-medium text-gray-700 mb-2">
                                Email
                            </Text>
                            <TextInput 
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-base"
                                placeholder="Masukkan alamat email"
                                placeholderTextColor="#9CA3AF"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>
                        
                        {/* Username Input */}
                        <View>
                            <Text className="text-sm font-medium text-gray-700 mb-2">
                                Username
                            </Text>
                            <TextInput 
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-base"
                                placeholder="Masukkan username"
                                placeholderTextColor="#9CA3AF"
                                autoCapitalize="none"
                                value={username}
                                onChangeText={setUsername}
                            />
                        </View>
                        
                        {/* Password Input */}
                        <View>
                            <Text className="text-sm font-medium text-gray-700 mb-2">
                                Password
                            </Text>
                            <View className="relative">
                                <TextInput 
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 pr-12 text-base"
                                    placeholder="Masukkan password"
                                    placeholderTextColor="#9CA3AF"
                                    secureTextEntry={!showPassword}
                                    value={password}
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
                            
                            {/* Password validation */}
                            <View className="mt-3 bg-gray-50 rounded-lg p-3">
                                <Text className="text-xs font-medium text-gray-700 mb-2">Password harus mengandung:</Text>
                                <View className="flex-row flex-wrap">
                                    <View className="w-1/2">
                                        {renderValidationItem(isMinLengthMet, "Min. 8 karakter")}
                                        {renderValidationItem(hasLowercase, "Huruf kecil")}
                                    </View>
                                    <View className="w-1/2">
                                        {renderValidationItem(hasUppercase, "Huruf kapital")}
                                        {renderValidationItem(hasNumber, "Angka")}
                                    </View>
                                </View>
                            </View>
                        </View>
                        
                        {/* Confirm Password Input */}
                        <View>
                            <Text className="text-sm font-medium text-gray-700 mb-2">
                                Konfirmasi Password
                            </Text>
                            <View className="relative">
                                <TextInput 
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 pr-12 text-base"
                                    placeholder="Konfirmasi password"
                                    placeholderTextColor="#9CA3AF"
                                    secureTextEntry={!showConfirmPassword}
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                />
                                <TouchableOpacity 
                                    className="absolute right-4 top-4"
                                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    <Ionicons
                                        name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                                        size={20}
                                        color="#6B7280"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Register Button */}
                    <TouchableOpacity 
                        className="w-full rounded-xl py-4 mt-8"
                        style={{ backgroundColor: "#82BFB7" }}
                        onPress={handleRegister}
                    >
                        <Text className="text-white text-base font-semibold text-center">Daftar</Text>
                    </TouchableOpacity>

                    {/* Login Link */}
                    <View className="flex-row justify-center items-center mt-6 mb-8">
                        <Text className="text-gray-600">Sudah punya akun? </Text>
                        <TouchableOpacity onPress={() => router.push("login")}>
                            <Text style={{ color: "#82BFB7" }} className="font-medium">Masuk sekarang</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Register;
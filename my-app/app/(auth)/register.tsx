import React, { useState } from 'react';
import { 
  Text, 
  View, 
  Alert, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import images from '../../constants/images';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    const router = useRouter();

    const handleRegister = () => {
        if (!name || !email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        Alert.alert('Success', `Welcome, ${name}!`);
        router.push("verify-code");
    };

    return (
        <View style={styles.container}>
            <View style={styles.topSection}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>Create account</Text>
                
                <View style={styles.subtitleContainer}>
                    <Text style={styles.subtitle}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => router.push("login")}>
                        <Text style={styles.linkText}>sign in</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.form}>
                    {/* Name Input */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            placeholderTextColor="#9CA3AF"
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    {/* Email Input */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email or phone"
                            placeholderTextColor="#9CA3AF"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    
                    {/* Password Input */}
                    <View style={styles.inputContainer}>
                        <View style={styles.passwordWrapper}>
                            <TextInput
                                style={styles.passwordInput}
                                placeholder="Password"
                                placeholderTextColor="#9CA3AF"
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={setPassword}
                            />
                            <TouchableOpacity
                                style={styles.eyeIcon}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Ionicons
                                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                                    size={20}
                                    color="#9CA3AF"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Sign Up Button */}
                    <TouchableOpacity
                        style={styles.signUpButton}
                        onPress={handleRegister}
                    >
                        <Text style={styles.signUpButtonText}>Sign up</Text>
                        <Ionicons name="arrow-forward" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FED3DD',
    },
    topSection: {
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 24,
        paddingTop: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 8,
    },
    subtitleContainer: {
        flexDirection: 'row',
        marginBottom: 40,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
    },
    linkText: {
        fontSize: 14,
        color: '#82BFB7',
        fontWeight: '500',
    },
    form: {
        flex: 1,
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 25,
        paddingHorizontal: 20,
        height: 50,
        fontSize: 16,
        color: '#000',
    },
    passwordWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 25,
        paddingHorizontal: 20,
        height: 50,
    },
    passwordInput: {
        flex: 1,
        fontSize: 16,
        color: '#000',
    },
    eyeIcon: {
        padding: 5,
    },
    signUpButton: {
        backgroundColor: '#82BFB7',
        borderRadius: 25,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    signUpButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        marginRight: 8,
    },
});

export default Register;
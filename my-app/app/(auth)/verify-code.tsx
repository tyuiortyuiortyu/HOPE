import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

const VerifyCode = () => {
  const [code, setCode] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const router = useRouter();
  const { email, type } = useLocalSearchParams();
  
  const inputRefs = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCodeChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (index, key) => {
    if (key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const enteredCode = code.join('');
    if (enteredCode.length !== 4) {
      Alert.alert('Error', 'Please enter the complete verification code');
      return;
    }
    
    Alert.alert('Success', 'Code verified successfully!');
    if (type === 'reset') {
      router.push('reset-password');
    } else {
      router.push('login');
    }
  };

  const handleResendCode = () => {
    setTimer(60);
    setCanResend(false);
    Alert.alert('Success', 'New verification code sent!');
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
        <Text style={styles.title}>Verify Code</Text>
        
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>Please enter the code we sent to{'\n'}</Text>
          <Text style={styles.emailText}>{email || 'your email'}</Text>
        </View>

        <View style={styles.form}>
          {/* Code Input */}
          <View style={styles.codeContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={[
                  styles.codeInput,
                  { borderColor: digit ? '#82BFB7' : '#E5E5E5' }
                ]}
                value={digit}
                onChangeText={(value) => handleCodeChange(index, value)}
                onKeyPress={({ nativeEvent }) => handleKeyPress(index, nativeEvent.key)}
                keyboardType="numeric"
                maxLength={1}
                selectTextOnFocus
              />
            ))}
          </View>

          {/* Resend Code */}
          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Didn't receive OTP?</Text>
            {canResend ? (
              <TouchableOpacity onPress={handleResendCode}>
                <Text style={styles.resendLink}>Resend code</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.timerText}>
                Resend code in {timer}s
              </Text>
            )}
          </View>

          {/* Verify Button */}
          <TouchableOpacity
            style={styles.verifyButton}
            onPress={handleVerify}
          >
            <Text style={styles.verifyButtonText}>Verify</Text>
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
    alignItems: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  emailText: {
    fontSize: 14,
    color: '#82BFB7',
    fontWeight: '500',
  },
  form: {
    flex: 1,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  codeInput: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderRadius: 15,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  resendText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  resendLink: {
    fontSize: 14,
    color: '#82BFB7',
    fontWeight: '500',
  },
  timerText: {
    fontSize: 14,
    color: '#666',
  },
  verifyButton: {
    backgroundColor: '#82BFB7',
    borderRadius: 25,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
});

export default VerifyCode;

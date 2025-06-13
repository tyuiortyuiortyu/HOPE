import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import images from "../../constants/images";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // Simplified login function without backend
  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Validation", "Please fill in both email and password");
      return;
    }

    // Simulate successful login
    Alert.alert("Login Success", "You are logged in!");
    router.push("../(tabs)/home");
  };

  return (
    <View style={{ backgroundColor: "#FFFFFF", flex: 1, justifyContent: "center", alignItems: "center", paddingBottom: 20 }}>
      <View style={{ marginRight: 20, paddingRight: 30, marginBottom: 60 }}>
        <Text style={{ textAlign: "center", fontSize: 30, fontWeight: "bold", color: "#82BFB7" }}>
          Welcome Back
        </Text>
        <Text style={{ textAlign: "center", fontSize: 15, fontWeight: "bold" }}>
          Login to your account
        </Text>
      </View>

      <View style={{ marginBottom: 50 }}>
        <View style={{ backgroundColor: "#ffff", flexDirection: "row", width: "85%", height: 60, borderRadius: 10, elevation: 15, marginBottom: 10, alignItems: "center" }}>
          <TextInput
            style={{ flex: 1, paddingLeft: 10, fontSize: 16, textAlign: "left", textAlignVertical: "center" }}
            placeholder="Enter your email address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={{ backgroundColor: "#ffff", flexDirection: "row", width: "85%", height: 60, borderRadius: 10, elevation: 15, marginBottom: 10, alignItems: "center", paddingRight: 10 }}>
          <TextInput
            style={{ flex: 1, paddingLeft: 10, fontSize: 16, textAlign: "left", textAlignVertical: "center", paddingRight: 30 }}
            placeholder="Enter your password"
            value={password}
            secureTextEntry={!showPassword}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
            <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={24} color="#aaa" />
          </TouchableOpacity>
        </View>

        <Text style={{ left: 220, width: "78%", marginTop: 5 }} onPress={() => router.push("./register.tsx")}>
          Forgot Password
        </Text>
      </View>

      <TouchableOpacity
        style={{ backgroundColor: "#E7E8EE", width: "70%", height: 60, justifyContent: "center", alignItems: "center", marginTop: 20, borderRadius: 10 }}
        onPress={handleLogin}
      >
        <Text style={{ color: "#000000", fontSize: 18, textAlign: "center", fontWeight: "bold" }}>Login</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 20, width: "75%" }}>
        <View style={{ flex: 1, height: 1, backgroundColor: "#EDEEF2" }} />
        <Text style={{ color: "#ADB0BB", fontSize: 14, fontWeight: "bold", textAlign: "center" }}>Or Login with</Text>
        <View style={{ flex: 1, height: 1, backgroundColor: "#EDEEF2" }} />
      </View>

      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: 70 }}>
        <Image source={images.google} style={{ width: 50, height: 50, resizeMode: "contain", marginHorizontal: 10, marginTop: 10 }} />
        <Image source={images.apple} style={{ width: 50, height: 50, resizeMode: "contain", marginHorizontal: 10, marginTop: 10 }} />
        <Image source={images.facebook} style={{ width: 50, height: 50, resizeMode: "contain", marginHorizontal: 10, marginTop: 10 }} />
        <Image source={images.twitter} style={{ width: 50, height: 50, resizeMode: "contain", marginHorizontal: 10, marginTop: 10 }} />
      </View>

      <View style={{ marginTop: 5 }}>
        <Text style={{ fontSize: 18, textAlign: "center" }}>
          Don't have an account?{" "}
          <Text style={{ color: "#2B4763", fontWeight: "bold" }} onPress={() => router.push("./register.tsx")}>
            Register
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Login;
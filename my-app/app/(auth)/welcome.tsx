import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";

import images from "../../constants/images";

const Welcome = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image source={images.logo} style={styles.logo} />
        </View>

        {/* Welcome Text */}
        <View style={styles.textContainer}>
          <Text style={styles.welcomeText1}>Welcome to</Text>
          <Text style={styles.welcomeText2}>HOPE</Text>
          <Text style={styles.title}>
            "Small Actions Big Impact 😉"
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => router.push("login")}
          >
            <Text style={styles.primaryButtonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => router.push("register")}
          >
            <Text style={styles.secondaryButtonText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 60,
  },
  welcomeText1: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    color: "#374151",
    marginBottom: 4,
  },
  welcomeText2: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    color: "#82BFB7",
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    color: "#6B7280",
    fontWeight: "400",
  },
  buttonsContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 25,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  primaryButton: {
    backgroundColor: "#82BFB7",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#82BFB7",
  },
  primaryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButtonText: {
    color: "#82BFB7",
    fontSize: 16,
    fontWeight: "600",
  },
  guestText: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 16,
    color: "#6B7280",
    textDecorationLine: "underline",
  },
});

export default Welcome;
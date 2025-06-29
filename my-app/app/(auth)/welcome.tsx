import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

import images from "../../constants/images";
import icons from "../../constants/icons";

const Welcome = () => {
  const router = useRouter(); // Menggunakan router dari Expo Router

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={images.logo} style={styles.logo} />
      </View>

      <Text style={styles.welcomeText1}>Welcome</Text>
      <Text style={styles.welcomeText2}>HOPE</Text>

      <Text style={styles.title}>
        "Small Actions Big Impact 😉"
      </Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("login")} // Navigasi ke halaman Login
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("register")} // Navigasi ke halaman Register
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => router.push("/(tabs)/home")}>
        <Text style={styles.guestText}>Continue as a guest</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 80,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },

  logoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },

  logo: {
    width: 200,
    height: 183,
    resizeMode: "contain",
    marginTop: 30,
  },

  welcomeText1: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: -20,
    marginTop: -40,
  },

  welcomeText2: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: -30,
  },

  title: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 20,
    paddingHorizontal: 20,
  },

  buttonsContainer: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    width: "85%",
    paddingVertical: 20,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  buttonText: {
    color: "#262626",
    fontSize: 18,
  },

  guestText: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 70,
  },
});

export default Welcome;

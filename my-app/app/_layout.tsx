import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { SplashScreen as ExpoSplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";

import Splash from "./splash";

ExpoSplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    yThin: require("../assets/fonts/Yantramanav-Thin.ttf"),
    yRegular: require("../assets/fonts/Yantramanav-Regular.ttf"),
    yMedium: require("../assets/fonts/Yantramanav-Medium.ttf"),
    yLight: require("../assets/fonts/Yantramanav-Light.ttf"),
    yBold: require("../assets/fonts/Yantramanav-Bold.ttf"),
    yBlack: require("../assets/fonts/Yantramanav-Black.ttf"),
    rMedium: require("../assets/fonts/Raleway-Medium.ttf"),
  });

  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsSplashVisible(false);
      ExpoSplashScreen.hideAsync();
    }, 4000); // Durasi SplashScreen, sesuaikan dengan kebutuhan
  }, []);

  if (isSplashVisible) {
    return <Splash />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});

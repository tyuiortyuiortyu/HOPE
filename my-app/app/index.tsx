import "../global.css";
import { SafeAreaView, View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { Link } from "expo-router";

import Splash from "./splash";

const App = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView className="flex-1">
      {isSplashVisible ? (
        <Splash />
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="text-3xl font-yLight">HOPE</Text>
          <Link href={"(auth)/welcome"} className="text-xs">
            Go to welcome
          </Link>
        </View>
      )}
    </SafeAreaView>
  );
};

export default App;

import React from "react";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade_from_bottom",
      }}
    >
      <Stack.Screen
        name="login"
        options={{ title: "Login", headerShown: true }}
      />
      <Stack.Screen
        name="register"
        options={{ title: "Register", headerShown: true }}
      />
     {/* <Stack>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="forgot-password" options={{ headerShown: false }} />  */}
    </Stack>
  );
};

export default AuthLayout;

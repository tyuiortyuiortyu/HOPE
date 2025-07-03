import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const TrackLayout = () => {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#82BFB7', // Warna teal header
                },
                headerTintColor: '#fff', // Warna teks dan panah kembali
                headerTitleStyle: { 
                    fontWeight: 'bold',
                },
                headerShadowVisible: false, // Menghilangkan bayangan di bawah header
            }}>
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false, // Hide header since index has Sobat Baik header
                }}
            />
            <Stack.Screen
                name="(component)/MyDonationCardDetail"
                options={{
                    title: "Detail Donasi",
                    headerShown: true,
                    headerBackTitle: "Back",
                }}
            />
        </Stack>
    )
}

export default TrackLayout
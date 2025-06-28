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
                headerShadowVisible: true, // Menghilangkan bayangan di bawah header
            }}>
            <Stack.Screen
                name="index"
                options={{
                    title: "Jurnal Harapanku",
                    headerShown: true,
                    headerBackTitle: "Back",
                }}
            />
        </Stack>
    )
}

export default TrackLayout
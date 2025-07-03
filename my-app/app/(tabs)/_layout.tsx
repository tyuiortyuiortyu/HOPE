import { Image,Text, View } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

import images from '../../constants/images'

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2B4763',
        tabBarInactiveTintColor: '#9B9B9B',
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#9B9B9B',
          height: Platform.OS === 'android' ? height * 0.1 : height * 0.08,
          paddingTop: height * 0.015,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen 
        name='home'
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <View className='flex items-center justify-center' >
              <Image
                source={focused ? images.home_active : images.home_nonactive}
                resizeMode="contain"
                className={`w-${width > 400 ? '8' : '7'} h-${width > 400 ? '8' : '7'}`}
              />
              <Text
                className={`${focused ? "font-yRegular" : "font-yLight"}`}
                style={{color: color, fontSize: 8, flexWrap: 'nowrap'}}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen 
        name='volunteer'
        options={{
          title: "Volunteer",
          tabBarIcon: ({ color, focused }) => (
            <View className='flex items-center justify-center' >
              <Image
                source={focused ? images.volunteer_active : images.volunteer_nonactive}
                resizeMode="contain"
                className={`w-${width > 400 ? '7' : '6'} h-${width > 400 ? '7' : '6'}`}
              />
              <Text
                className={`${focused ? "font-yRegular" : "font-yLight"}`}
                style={{color: color, fontSize: 8, flexWrap: 'nowrap'}}
              >
                Volunteer
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen 
        name='donate'
        options={{
          title: "Donate",
          tabBarIcon: ({ color, focused }) => (
            <View className='flex items-center justify-center' >
              <Image
                source={focused ? images.donate_active : images.donate_nonactive}
                resizeMode="contain"
                className={`w-${width > 400 ? '7' : '6'} h-${width > 400 ? '7' : '6'}`}
              />
              <Text
                className={`${focused ? "font-yRegular" : "font-yLight"} text-nowrap`}
                style={{color: color, fontSize: 8, flexWrap: 'nowrap'}}
              >
                Donate
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen 
        name='donor'
        options={{
          title: "Donor",
          tabBarIcon: ({ color, focused }) => (
            <View className='flex items-center justify-center' >
              <Image
                source={focused ? images.donor_active : images.donor_nonactive}
                resizeMode="contain"
                className={`w-${width > 400 ? '7' : '6'} h-${width > 400 ? '7' : '6'}`}
              />
              <Text
                className={`${focused ? "font-yRegular" : "font-yLight"}`}
                style={{color: color, fontSize: 8, flexWrap: 'nowrap'}}
              >
                Donor
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen 
        name='track'
        options={{
          title: "Track",
          tabBarIcon: ({ color, focused }) => (
            <View className='flex items-center justify-center' >
              <Image
                source={focused ? images.track_active : images.track_nonactive}
                resizeMode="contain"
                className={`w-${width > 400 ? '7' : '6'} h-${width > 400 ? '7' : '6'}`}
              />
              <Text
                className={`${focused ? "font-yRegular" : "font-yLight"}`}
                style={{color: color, fontSize: 8, flexWrap: 'nowrap'}}
              >
                Track
              </Text>
            </View>
          ),
        }}
      />
    </Tabs>
  )
}

export default TabsLayout
import { Image,Text, View } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

import icons from '../../constants/icons'

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
        }
      }}
    >
      <Tabs.Screen 
        name='home'
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <View className='flex items-center justify-center' >
              <Image
                source={icons.home}
                resizeMode="contain"
                tintColor={color}
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
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <View className='flex items-center justify-center' >
              <Image
                source={icons.volunteer}
                resizeMode="contain"
                tintColor={color}
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
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <View className='flex items-center justify-center' >
              <Image
                source={icons.donate}
                resizeMode="contain"
                tintColor={color}
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
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <View className='flex items-center justify-center' >
              <Image
                source={icons.donor}
                resizeMode="contain"
                tintColor={color}
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
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <View className='flex items-center justify-center' >
              <Image
                source={icons.track}
                resizeMode="contain"
                tintColor={color}
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
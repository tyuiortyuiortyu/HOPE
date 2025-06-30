import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const ConversationScreen = () => {
  const [message, setMessage] = useState('');
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-5 py-4 border-b border-gray-100">
        <TouchableOpacity 
          className="mr-4"
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-800">Inbox</Text>
      </View>

      {/* Messages */}
      <ScrollView className="flex-1 px-5 py-4">
        {/* Attachment/Image Message */}
        <View className="mb-6">
          <View className="w-full h-32 bg-gray-200 rounded-lg mb-3" />
          <View className="bg-gray-100 rounded-lg p-3">
            <Text className="text-sm text-gray-800 mb-2">Message content here...</Text>
            <Text className="text-sm text-gray-800">Additional message text...</Text>
          </View>
        </View>
      </ScrollView>

      {/* Message Input */}
      <View className="flex-row items-center px-5 py-4 border-t border-gray-100">
        <View className="flex-1 flex-row items-center bg-gray-100 rounded-full px-4 py-3 mr-3">
          <TextInput
            className="flex-1 text-base"
            placeholder="Type a message..."
            placeholderTextColor="#9CA3AF"
            value={message}
            onChangeText={setMessage}
            multiline
          />
        </View>
        
        <TouchableOpacity 
          className="w-12 h-12 rounded-full items-center justify-center"
          style={{ backgroundColor: '#9AC5C1' }}
        >
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ConversationScreen;

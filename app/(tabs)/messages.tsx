import { View, Text, ScrollView, TouchableOpacity, TextInput, RefreshControl } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageCircle, Send, Search, Phone } from 'lucide-react-native';
import { blink } from '@/lib/blink';

interface Conversation {
  id: string;
  job_title: string;
  shipper_name: string;
  last_message: string;
  last_message_time: string;
  unread_count: number;
  job_id: string;
}

interface Message {
  id: string;
  sender_type: 'driver' | 'shipper';
  message: string;
  created_at: string;
}

export default function Messages() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      // Load conversations from database
      // For now, using mock data
      setConversations([
        {
          id: '1',
          job_title: 'Chicago to Detroit Freight',
          shipper_name: 'John Smith',
          last_message: 'Thanks for the update! ETA looks good.',
          last_message_time: '2024-01-22T14:30:00',
          unread_count: 0,
          job_id: 'job_1',
        },
        {
          id: '2',
          job_title: 'Miami to Orlando Express',
          shipper_name: 'Sarah Johnson',
          last_message: 'Please confirm pickup time',
          last_message_time: '2024-01-22T12:15:00',
          unread_count: 2,
          job_id: 'job_2',
        },
        {
          id: '3',
          job_title: 'Houston to Dallas Run',
          shipper_name: 'Mike Wilson',
          last_message: 'Load is ready for pickup',
          last_message_time: '2024-01-22T10:45:00',
          unread_count: 1,
          job_id: 'job_3',
        },
      ]);
    } catch (error) {
      console.error('Error loading conversations:', error);
    }
  };

  const loadMessages = async (conversationId: string) => {
    try {
      // Load messages for specific conversation
      // For now, using mock data
      setMessages([
        {
          id: '1',
          sender_type: 'shipper',
          message: 'Hi! Just wanted to confirm the pickup time for tomorrow.',
          created_at: '2024-01-22T10:00:00',
        },
        {
          id: '2',
          sender_type: 'driver',
          message: 'Hello! Yes, I can be there at 8 AM as scheduled.',
          created_at: '2024-01-22T10:05:00',
        },
        {
          id: '3',
          sender_type: 'shipper',
          message: 'Perfect! The load will be ready. Please call when you arrive.',
          created_at: '2024-01-22T10:10:00',
        },
        {
          id: '4',
          sender_type: 'driver',
          message: 'Will do. See you tomorrow!',
          created_at: '2024-01-22T10:12:00',
        },
      ]);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      const user = await blink.auth.me();
      const messageData = {
        id: `msg_${Date.now()}`,
        job_id: selectedConversation,
        sender_id: user.id,
        sender_type: 'driver',
        message: newMessage.trim(),
        created_at: new Date().toISOString(),
      };

      await blink.db.messages.create(messageData);
      
      // Add to local state
      setMessages(prev => [...prev, {
        id: messageData.id,
        sender_type: 'driver',
        message: messageData.message,
        created_at: messageData.created_at,
      }]);
      
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadConversations();
    setRefreshing(false);
  };

  const ConversationItem = ({ conversation }: { conversation: Conversation }) => (
    <TouchableOpacity 
      onPress={() => {
        setSelectedConversation(conversation.id);
        loadMessages(conversation.id);
      }}
      className={`p-4 border-b border-gray-100 ${selectedConversation === conversation.id ? 'bg-primary/5' : 'bg-white'}`}
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <Text className="font-inter-semibold text-gray-900 mb-1">
            {conversation.shipper_name}
          </Text>
          <Text className="text-sm text-gray-600 mb-1">
            {conversation.job_title}
          </Text>
          <Text className="text-sm text-gray-500" numberOfLines={1}>
            {conversation.last_message}
          </Text>
        </View>
        <View className="items-end">
          <Text className="text-xs text-gray-500 mb-1">
            {new Date(conversation.last_message_time).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </Text>
          {conversation.unread_count > 0 && (
            <View className="bg-accent w-5 h-5 rounded-full items-center justify-center">
              <Text className="text-white text-xs font-inter-semibold">
                {conversation.unread_count}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const MessageBubble = ({ message }: { message: Message }) => (
    <View className={`mb-3 ${message.sender_type === 'driver' ? 'items-end' : 'items-start'}`}>
      <View className={`max-w-[80%] p-3 rounded-2xl ${
        message.sender_type === 'driver' 
          ? 'bg-primary rounded-br-md' 
          : 'bg-gray-100 rounded-bl-md'
      }`}>
        <Text className={`font-inter ${
          message.sender_type === 'driver' ? 'text-white' : 'text-gray-900'
        }`}>
          {message.message}
        </Text>
      </View>
      <Text className="text-xs text-gray-500 mt-1 px-1">
        {new Date(message.created_at).toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        })}
      </Text>
    </View>
  );

  if (selectedConversation) {
    const conversation = conversations.find(c => c.id === selectedConversation);
    
    return (
      <SafeAreaView className="flex-1 bg-white">
        {/* Chat Header */}
        <View className="px-6 py-4 bg-white border-b border-gray-100 flex-row items-center justify-between">
          <View className="flex-1">
            <TouchableOpacity onPress={() => setSelectedConversation(null)}>
              <Text className="text-primary font-inter-semibold">← Back</Text>
            </TouchableOpacity>
            <Text className="text-lg font-inter-semibold text-gray-900 mt-1">
              {conversation?.shipper_name}
            </Text>
            <Text className="text-sm text-gray-600">
              {conversation?.job_title}
            </Text>
          </View>
          <TouchableOpacity className="bg-primary/10 p-2 rounded-lg">
            <Phone color="#1B365D" size={20} />
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <ScrollView className="flex-1 px-4 py-4">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </ScrollView>

        {/* Message Input */}
        <View className="px-4 py-4 bg-white border-t border-gray-100">
          <View className="flex-row items-center space-x-3">
            <TextInput
              className="flex-1 bg-gray-50 rounded-full px-4 py-3 font-inter"
              placeholder="Type a message..."
              value={newMessage}
              onChangeText={setNewMessage}
              multiline
            />
            <TouchableOpacity 
              onPress={sendMessage}
              className="bg-primary p-3 rounded-full"
              disabled={!newMessage.trim()}
            >
              <Send color="#FFFFFF" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-gray-100">
        <Text className="text-2xl font-inter-semibold text-primary mb-4">
          Messages
        </Text>
        
        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-50 rounded-lg px-3 py-2">
          <Search color="#6B7280" size={20} />
          <TextInput
            className="flex-1 ml-2 text-gray-900 font-inter"
            placeholder="Search conversations..."
          />
        </View>
      </View>

      {/* Conversations List */}
      <ScrollView 
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {conversations.map((conversation) => (
          <ConversationItem key={conversation.id} conversation={conversation} />
        ))}

        {conversations.length === 0 && (
          <View className="flex-1 justify-center items-center py-12">
            <MessageCircle color="#6B7280" size={48} />
            <Text className="text-lg font-inter-semibold text-gray-900 mt-4">
              No messages yet
            </Text>
            <Text className="text-gray-600 text-center mt-2">
              Your conversations with shippers will appear here
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
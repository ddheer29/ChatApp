import { Animated, Button, FlatList, Keyboard, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { getMessagesAPI } from '../services/api';
import { createSocket } from '../services/socket';
import SendIcon from '../assets/SendIcon';
import Header from '../components/Header';
import axios from 'axios';
import { Colors } from '../utils/Colors';

// interface Message {
//   id: string;
//   content: string;
//   username: string;
//   created_at: string;
//   room_id: string;
// }

const ChatSpecificScreen = () => {
  const route = useRoute();
  const { roomId, roomName, username } = route.params as { roomId: string; roomName: string; username: string };
  console.log("🚀 ~ ChatSpecificScreen ~ roomName:", roomName)

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const ws = useRef<WebSocket | null>(null);
  const retryAttempts = useRef(0);
  const flatListRef = useRef<FlatList>(null);
  const [keyboardHeight] = useState(new Animated.Value(0));
  const [iskeyboardOpen, setIskeyboardOpen] = useState(false);



  const fetchMessages = async () => {
    try {
      const response = await axios.get(`https://chat-api-k4vi.onrender.com/chat/rooms/${roomId}/messages`);
      const data = response.data;
      const sortedMessages = data.sort((a: Message, b: Message) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
      console.log(JSON.stringify(sortedMessages, null, 2));
      setMessages(sortedMessages);
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const connectWebSocket = () => {
    const wsUrl = `wss://chat-api-k4vi.onrender.com/ws/${roomId}/${username}`;
    console.log('Connecting to WebSocket:', wsUrl);

    ws.current = new WebSocket(wsUrl);

    ws.current.onopen = () => {
      console.log('✅ WebSocket Connected');
      retryAttempts.current = 0;
    };

    ws.current.onmessage = (event) => {
      try {
        const messageData = JSON.parse(event.data);
        if (messageData.event === 'message') {
          setMessages((prevMessages) => [
            ...prevMessages,
            { id: Date.now().toString(), content: messageData.content, username: messageData.sender, created_at: new Date().toISOString() },
          ]);
          setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
        }
      } catch (error) {
        console.error('❌ Error parsing WebSocket message:', error);
      }
    };

    ws.current.onerror = (error) => {
      console.error('❌ WebSocket error:', error);
    };

    ws.current.onclose = () => {
      console.warn('⚠️ WebSocket closed, attempting to reconnect...');
      retryAttempts.current += 1;
      if (retryAttempts.current < 5) {
        setTimeout(connectWebSocket, 3000);
      }
    };
  };

  const sendMessage = () => {
    if (newMessage.trim() === '' || !ws.current || ws.current.readyState !== WebSocket.OPEN) return;

    const messagePayload = {
      event: 'message',
      content: newMessage,
    };

    ws.current.send(JSON.stringify(messagePayload));
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: Date.now().toString(), content: newMessage, username: username, created_at: new Date().toISOString() },
    ]);
    setNewMessage('');
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const renderItem = ({ item }) => (
    <View style={[styles.messageContainer, item.username === username ? styles.myMessage : styles.otherMessage]}>
      <Text style={styles.messageSender}>{item.username === username ? 'You' : item.username}</Text>
      <Text style={styles.messageText}>{item.content}</Text>
      {/* <Text style={styles.messageTimestamp}>{timeAgo(new Date(item.timestamp))}</Text> */}
    </View>
  );

  useEffect(() => {
    fetchMessages();
    connectWebSocket();

    return () => {
      if (ws.current) ws.current.close();
    };
  }, []);

  useEffect(() => {
    const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const keyboardDidShowListener = Keyboard.addListener(
      showEvent,
      (event) => {
        setIskeyboardOpen(true);
        Animated.timing(keyboardHeight, {
          toValue: event.endCoordinates.height,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      hideEvent,
      () => {
        setIskeyboardOpen(false);
        Animated.timing(keyboardHeight, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bgColor }}>
      <View style={styles.container}>

        <Header
          title={roomName}
          displayAddIcon={false}
        />

        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.messagesList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        <Animated.View style={[
          styles.inputContainer,
          { paddingBottom: keyboardHeight, bottom: iskeyboardOpen ? -10 : 0 }
        ]}>
          <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type a message..."
            placeholderTextColor="gray"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={sendMessage}>
            <SendIcon color={Colors.highlight} />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  )
}

export default ChatSpecificScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    marginRight: 10
  },
  roomName: {
    fontSize: 18,
    fontWeight: 'bold',
    // color: 'white',
    flex: 1,
    textAlign: 'center'
  },
  messagesList: {
    padding: 10
  },
  messageContainer: {
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    maxWidth: '80%',
    paddingHorizontal: 18
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.mychatbgColor,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.otherschatbgColor,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  messageSender: {
    fontWeight: 'bold',
    color: 'gray',
    marginBottom: 2,
    fontSize: 12,
  },
  messageText: {
    color: '#121212'
  },
  messageTimestamp: {
    fontSize: 10,
    color: 'white',
    marginTop: 3,
    alignSelf: 'flex-end'
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    paddingVertical: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center'
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15
  },
  button: {
    backgroundColor: "#D8BFD8",
    padding: 10,
    borderRadius: 100,
    marginLeft: 10
  }
});
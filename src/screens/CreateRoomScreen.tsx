import { Button, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { goBack } from '../utils/NavigationUtil';
import { createRoomAPI } from '../services/api';
import Header from '../components/Header';
import { Colors } from '../utils/Colors';

const CreateRoomScreen = () => {
  const [roomName, setRoomName] = useState("");

  const handleCreateRoom = async () => {
    try {
      await createRoomAPI(roomName);
      goBack();
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  return (
    <View style={styles.container}>
      {Platform.OS === 'android' && <View style={{ height: 50 }} />}
      <Header title='Create a New Room' displayAddIcon={true} />
      <View style={styles.container2}>
        <Text
          style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 6, width: '80%' }}
        >
          Enter Room Name:
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Room Name"
          value={roomName}
          placeholderTextColor={'gray'}
          onChangeText={setRoomName}
        />
        <TouchableOpacity
          onPress={handleCreateRoom}
          style={{
            marginVertical: 10,
            padding: 10,
            backgroundColor: Colors.highlight,
            borderRadius: 5,
            width: "80%",
            alignItems: "center",
          }}
        >
          <Text style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: "#fff",
          }}>Create Room</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CreateRoomScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff'
  },
  container2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    width: "80%",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});

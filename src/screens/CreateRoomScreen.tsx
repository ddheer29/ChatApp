import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { goBack } from '../utils/NavigationUtil';
import { createRoomAPI } from '../services/api';
import Header from '../components/Header';

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
      <Header title='Create a New Room' displayAddIcon={true} />
      <View style={styles.container2}>
        <TextInput
          style={styles.input}
          placeholder="Room Name"
          value={roomName}
          onChangeText={setRoomName}
        />
        <Button title="Create Room" onPress={handleCreateRoom} />
      </View>
    </View>
  )
}

export default CreateRoomScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
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
    marginVertical: 10
  },
});

import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setUsernameAPI } from '../services/api';
import { setUsername } from '../redux/userSlice';
import { replace } from '../utils/NavigationUtil';
import { Colors } from '../utils/Colors';

const SetUsernameScreen = () => {
  const [username, setUsernameInput] = useState("");
  const dispatch = useDispatch();

  const handleSetUsername = async () => {
    try {
      await setUsernameAPI(username);
      dispatch(setUsername(username));
      replace("RoomsListScreen");
    } catch (error) {
      console.error("Error setting username:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20, }}
      >
        Enter Username:
      </Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsernameInput}
      />
      <TouchableOpacity
        onPress={handleSetUsername}
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
        }}>Continue</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SetUsernameScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    borderWidth: 1,
    width: "80%",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});

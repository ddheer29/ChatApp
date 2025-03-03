import { ActivityIndicator, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setUsernameAPI } from '../services/api';
import { setUsername } from '../redux/userSlice';
import { replace } from '../utils/NavigationUtil';
import { Colors } from '../utils/Colors';

const SetUsernameScreen = () => {
  const [username, setUsernameInput] = useState("");
  const dispatch = useDispatch();
  const [inputFieldOnFocus, setInputFieldOnFocus] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSetUsername = async () => {
    try {
      setLoading(true);
      await setUsernameAPI(username);
      dispatch(setUsername(username));
      setLoading(false);
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
        style={[styles.input, {
          borderColor: inputFieldOnFocus ? Colors.mychatbgColor : '#ccc',
          borderWidth: inputFieldOnFocus ? 3 : 1
        }]}
        value={username}
        onChangeText={setUsernameInput}
        placeholder='Enter you Username'
        placeholderTextColor={'gray'}
        cursorColor={Colors.mychatbgColor}
        onFocus={() => setInputFieldOnFocus(true)}
        onBlur={() => setInputFieldOnFocus(false)}
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
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.2)',
          display: loading ? 'flex' : 'none',
        }}
      >
        <ActivityIndicator size="large" color={Colors.highlight} />
      </View>
    </View>
  )
}

export default SetUsernameScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.bgColor,
  },
  input: {
    borderWidth: 1,
    width: "80%",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});

import { ActivityIndicator, Button, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { navigate } from '../utils/NavigationUtil'
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { getRoomsAPI } from '../services/api';
import BackArrowSVG from '../assets/BackArrow';
import Header from '../components/Header';

const RoomsListScreen = () => {
  const [rooms, setRooms] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const username = useSelector((state: RootState) => state.user.username);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const data = await getRoomsAPI();
      // console.log("🚀 ~ fetchRooms ~ data:", JSON.stringify(data, null, 2))
      setRooms(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Header title='Available Rooms' displayAddIcon={true} showBackBtn={false} />
      {
        loading ? (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" color="#D8BFD8" />
          </View>
        ) : (
          <FlatList
            data={rooms}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.roomItem}
                onPress={() => navigate("ChatSpecificScreen", { roomId: item.id, username, roomName: item.name })}
              >
                <Text style={styles.roomName}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        )
      }
    </View>
  )
}

export default RoomsListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
  roomItem: {
    padding: 15,
    backgroundColor: "#E6E6FA",
    marginVertical: 5,
    borderRadius: 5
  },
  roomName: {
    fontSize: 16,
    fontWeight: "500"
  },
});
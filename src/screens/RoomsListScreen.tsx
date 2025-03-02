import { ActivityIndicator, Button, FlatList, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { navigate } from '../utils/NavigationUtil'
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { getRoomsAPI } from '../services/api';
import BackArrowSVG from '../assets/BackArrow';
import Header from '../components/Header';
import { Colors } from '../utils/Colors';
import RoomIcon from '../assets/GroupIIcon';

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
      console.log("🚀 ~ fetchRooms ~ data:", JSON.stringify(data, null, 2))
      setRooms(data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching rooms:", error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {Platform.OS === 'android' && <View style={{ height: 50 }} />}
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
                <View
                  style={{
                    width: '50',
                    height: '50',
                    backgroundColor: Colors.otherschatbgColor,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 100,
                  }}
                >
                  <RoomIcon />
                </View>
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
    paddingHorizontal: 20,
    backgroundColor: "#fff"
  },
  roomItem: {
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    marginVertical: 1,
    borderRadius: 5,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    borderBottomWidth: 1,
    borderBottomColor: Colors.otherschatbgColor
  },
  roomName: {
    fontSize: 16,
    fontWeight: "500"
  },
});
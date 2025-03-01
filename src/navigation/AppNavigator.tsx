import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "../screens/SplashScreen";
import SetUsernameScreen from "../screens/SetUsernameScreen";
import RoomsListScreen from "../screens/RoomsListScreen";
import CreateRoomScreen from "../screens/CreateRoomScreen";
import ChatSpecificScreen from "../screens/ChatSpecificScreen";
import { navigationRef } from "../utils/NavigationUtil";


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen
          name="SetUsernameScreen"
          component={SetUsernameScreen}
          options={{
            animation: 'fade'
          }} />
        <Stack.Screen name="RoomsListScreen" component={RoomsListScreen} />
        <Stack.Screen name="CreateRoomScreen" component={CreateRoomScreen} />
        <Stack.Screen name="ChatSpecificScreen" component={ChatSpecificScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

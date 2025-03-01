import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import BackArrowSVG from '../assets/BackArrow'
import { goBack, navigate } from '../utils/NavigationUtil'
import AddIcon from '../assets/AddIcon';

interface HeaderProps {
  title: string;
  displayAddIcon?: boolean;
  showBackBtn?: boolean;
}

const Header: FC<HeaderProps> = ({ title, displayAddIcon = false, showBackBtn = true }) => {
  return (
    <View
      style={{ flexDirection: "row", justifyContent: "center", paddingHorizontal: 16, paddingVertical: 8, alignItems: 'center' }}
    >
      {showBackBtn && (<TouchableOpacity
        style={{ position: "absolute", left: 16, top: 8 }}
        onPress={() => goBack()}
      >
        <BackArrowSVG />
      </TouchableOpacity>)}

      <Text style={styles.header}>{title}</Text>
      {displayAddIcon && (
        <TouchableOpacity
          style={{ position: "absolute", right: 16, top: 8 }}
          onPress={() => navigate("CreateRoomScreen")}
        >
          <AddIcon />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000000",
  },
})
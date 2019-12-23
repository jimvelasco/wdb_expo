import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Colors from "../constants/Colors";

const MButton = props => {
  return (
    // <Button
    //   {...props}
    //   style={styles.button}
    //   color={Platform.OS === "android" ? "white" : Colors.primaryColor}
    // />

    <TouchableOpacity onPress={props.onPress}>
      <View style={{ ...styles.wrapper, ...props.style }}>
        <Text style={styles.button}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    padding: 7,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    margin: 5,
    borderColor: Colors.primary,
    backgroundColor: Colors.button_background_color
  },
  button: {
    color: Colors.button_text_color,
    fontWeight: "bold"
  }
  //justifyContent: "center"
});

export default MButton;

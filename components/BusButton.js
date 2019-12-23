import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Colors from "../constants/Colors";

const BusButton = props => {
  return (
    // <Button
    //   {...props}
    //   style={styles.button}
    //   color={Platform.OS === "android" ? "white" : Colors.primaryColor}
    // />

    <TouchableOpacity onPress={props.onPress}>
      <View style={{ ...styles.wrapper, ...props.style }}>
        <Text style={styles.button}>{props.title}</Text>

        <Text style={styles.button1}>{props.address}</Text>
        <Text style={styles.button1}>{props.route}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    padding: 2,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 130,
    margin: 5,
    borderColor: Colors.primary,
    backgroundColor: Colors.button_background_color
  },

  button: {
    color: Colors.button_text_color,
    fontWeight: "bold",
    fontSize: 13,
    margin: 5
  },
  button1: {
    color: Colors.button_text_color,
    //fontWeight: "bold",
    fontSize: 12
  }
  //justifyContent: "center"
});

export default BusButton;

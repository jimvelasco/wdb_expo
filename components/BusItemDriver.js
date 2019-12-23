import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from "react-native";

import Colors from "../constants/Colors";
import XSButton from "../components/XSButton";
import SButton from "../components/SButton";

const BusItemDriver = props => {
  let TouchableCmp = TouchableOpacity;
  //console.log("props are", props);

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  let status = props.bus.status;
  let userType = props.userType;
  let showdrivertrack = false;

  let statuslabel = "put online";
  if (status === 1) {
    showdrivertrack = true;
    statuslabel = "take offline";
  }

  let hview = { ...styles.product, ...styles.highlight };
  if (showdrivertrack) {
    hview = { ...styles.product, ...styles.normal };
  }

  return (
    <View style={hview}>
      <View style={styles.details}>
        <Text style={styles.title}>{props.bus.name}</Text>
        <Text style={styles.text}>{props.bus.route}</Text>
        <Text style={styles.text}>Status: {props.bus.status}</Text>
        <Text style={styles.text}>{props.bus.driver}</Text>
      </View>
      <View style={styles.details}>
        <SButton title={statuslabel} onPress={props.onStatusChange} />
        {showdrivertrack ? (
          <View>
            <SButton title="track" onPress={props.onSelectBus} />
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    color: "black",
    padding: 3,
    margin: 5,
    marginBottom: 10
  },

  highlight: {
    backgroundColor: "#f0f0f0"
  },
  normal: {
    backgroundColor: "#ffffff"
  },

  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    color: "black"
  },
  title: {
    fontSize: 18
  },
  text: {
    fontSize: 12,
    color: "#888"
  }
});

export default BusItemDriver;

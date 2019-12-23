import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from "react-native";

import Colors from "../constants/Colors";
import XSButton from "../components/XSButton";
import SButton from "../components/SButton";

const BusSwitch = props => {
  return (
    <View style={styles.rowgroup}>
      {/* <Text style={styles.title}>{props.label}</Text> */}
      <Switch
        trackColor={{ true: Colors.primaryColor }}
        thumbColor={Platform.OS === "android" ? Colors.primaryColor : ""}
        value={props.state}
        onValueChange={props.onChange}
      />
    </View>
  );
};

const BusItemRider = props => {
  let TouchableCmp = TouchableOpacity;
  //console.log("props are", props);
  const [isSelected, setIsSelected] = useState(false);

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  let status = props.bus.status;
  let userType = props.userType;

  //console.log("status usertype", status, userType);
  let touchable = false;
  if (status === 1) {
    touchable = true;
  }

  const switchHit = (val, bus) => {
    // console.log("swithhit", val, bus);
    setIsSelected(val);
    props.switchSelected(val, bus);
  };
  let hview = { ...styles.product, ...styles.highlight };
  if (touchable) {
    hview = { ...styles.product, ...styles.normal };
  }
  // if (touchable) {
  // <View style={{ ...styles.product, ...styles.highlight }}></View>
  return (
    <View style={hview}>
      <View style={styles.details}>
        <Text style={styles.title}>{props.bus.name}</Text>
        <Text style={styles.text}>{props.bus.route}</Text>
        {/* <Text style={styles.text}>Status: {props.bus.status}</Text> */}
        <Text style={styles.text}>{props.bus.driver}</Text>
      </View>
      {touchable ? (
        <View style={styles.rowgroup}>
          <BusSwitch
            label="select"
            state={isSelected}
            onChange={val => switchHit(val, props.bus)}
          />
          {/* <SButton title="track" onPress={props.onSelectBus} /> */}
        </View>
      ) : null}
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
  rowgroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20
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

export default BusItemRider;

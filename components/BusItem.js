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

const BusItem = props => {
  let TouchableCmp = TouchableOpacity;
  //console.log("props are", props);

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  let status = props.bus.status;
  let userType = props.userType;
  let showdrivertrack = false;
  let ok = true;
  if (status === 1) {
    ok = false;
  }
  //console.log("status usertype", status, userType);
  let touchable = false;
  let isdriver = false;
  if (userType === "rider" && status === 1) {
    touchable = true;
  }
  if (userType === "driver") {
    touchable = true;
    isdriver = true;
    if (status === 1) {
      showdrivertrack = true;
    }
  }

  // if (userType === "driver") {
  // }

  let statuslabel = "put online";
  if (props.bus.status === 1) {
    statuslabel = "take offline";
  }

  //touchable = false;

  // obj["name"] = el.name;
  //     obj["address"] = el.address;
  //     obj["route"] = el.route;
  //     obj["status"] = el.status;
  //     obj["driver"] = el.driver;
  if (touchable) {
    return (
      <View style={styles.product}>
        <View style={styles.details}>
          <Text style={styles.title}>{props.bus.name}</Text>
          {/* <Text style={styles.text}>{props.bus.address}</Text> */}
          <Text style={styles.text}>{props.bus.route}</Text>
          <Text style={styles.text}>Status: {props.bus.status}</Text>
          {/* <XSButton title="status" onPress={props.onStatusChange} /> */}
          <Text style={styles.text}>{props.bus.driver}</Text>
        </View>
        <View>
          {isdriver ? (
            <View style={styles.details}>
              <SButton title={statuslabel} onPress={props.onStatusChange} />
              {showdrivertrack ? (
                <SButton title="track" onPress={props.onSelectBus} />
              ) : null}
            </View>
          ) : (
            <SButton title="track" onPress={props.onSelectBus} />
          )}
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.product_noop}>
        <View style={styles.touchable}>
          <View style={styles.details}>
            <Text style={styles.title}>{props.bus.name}</Text>
            {/* <Text style={styles.text}>{props.bus.address}</Text> */}
            <Text style={styles.text}>{props.bus.route}</Text>
            <Text style={styles.text}>{props.bus.status}</Text>
            <Text style={styles.text}>{props.bus.driver}</Text>
            {/* {isdriver ? (
                <View>
                  <XSButton title={btitle} onPress={props.onSelectBus} />

                  <XSButton title={btitle} onPress={props.onSelectBus} />
                </View>
              ) : null} */}
          </View>
        </View>
      </View>
    );
  }
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
    //height: 300,
    //width: "50%",
    width: 280,
    margin: 10
  },
  product_noop: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    color: "black",
    //height: 300,
    //width: "50%",
    margin: 10
  },
  touchable: {
    borderRadius: 10,
    width: "100%",
    overflow: "hidden"
  },
  imageContainer: {
    width: "100%",
    height: "70%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden"
  },
  image: {
    width: "100%",
    height: "100%"
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    //alignItems: "center",
    // height: "30%",
    padding: 2,
    paddingHorizontal: 10,
    color: "black"
  },
  title: {
    fontSize: 18
    //marginVertical: 4
    // fontFamily: "open-sans"
  },
  text: {
    fontSize: 12,
    color: "#888"
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "25%",
    paddingHorizontal: 20
  }
});

export default BusItem;

{
  /* <View style={styles.product}>
<View style={styles.touchable}>
  <TouchableCmp onPress={props.onSelectBus} useForeground={false}>
    <View>
      <View style={styles.details}>
        <Text style={styles.title}>{props.bus.name}</Text>
        <Text style={styles.text}>{props.bus.address}</Text>
        <Text style={styles.text}>{props.bus.route}</Text>
        <Text style={styles.text}>{props.bus.status}</Text>
        <Text style={styles.text}>{props.bus.driver}</Text>
        {isdriver ? (
          <XSButton title="start" onPress={props.onSelectBus} />
        ) : null}
      </View>
    </View>
  </TouchableCmp>
</View>
</View> */
}

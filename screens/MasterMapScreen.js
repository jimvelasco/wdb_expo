import React, { useState, useEffect, useRef, useCallback } from "react";
import { View, StyleSheet } from "react-native";
//import { useDispatch } from "react-redux";
//import { Constants, Location, Permissions } from "expo";
// import Constants from "expo-constants";
// import * as Location from "expo-location";
// import * as Permissions from "expo-permissions";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
//import SButton from "../components/SButton";

import RiderMapScreen from "./RiderMapScreen";
import DriverMapScreen from "./DriverMapScreen";

import Colors from "../constants/Colors";
//import { updateBusStatus } from "../store/actions/busActions";

const MasterMapScreen = props => {
  //const [selectedBus, setSelectedBus] = useState(props.bus);
  const { navigation } = props;
  const bus = props.navigation.getParam("bus");
  const buses = props.navigation.getParam("buses");
  const userType = props.navigation.getParam("userType");
  // const driverRef = useRef();
  // const dispatch = useDispatch();
  // console.log(
  //   "in master map screen status of bus and name",
  //   bus.name,
  //   bus.driver,
  //   bus.status
  // );

  //const [isLoading, setIsLoading] = useState(false);
  //const [error, setError] = useState();

  useEffect(() => {
    navigation.setParams({ logout: doLogout });
    navigation.setParams({ usertype: userType.toUpperCase() });
  }, [doLogout]);

  const doLogout = () => {
    props.navigation.navigate("Logon");
  };

  // const stopTracking = () => {
  //   console.log("stop tracking bus");
  //   //driverRef.current.doLoadStartup();
  // };

  //console.log("userType", userType);

  return (
    <View style={{ alignItems: "center" }}>
      <View style={styles.areawrapper}>
        {userType === "rider" ? (
          <RiderMapScreen bus={bus} buses={buses} userType={userType} />
        ) : (
          <DriverMapScreen bus={bus} userType={userType} />
        )}
      </View>
      {/* <SButton title="start tracking" onPress={() => startTracking(bus)} />
      <SButton title="stop tracking" onPress={() => stopTracking(bus)} /> 
      <DriverMapScreen ref={driverRef} bus={bus} userType={userType} />
      */}
    </View>
  );
};

MasterMapScreen.navigationOptions = navData => {
  //const saveFn = navData.navigation.getParam("saveLocation");
  const tit = navData.navigation.getParam("usertype") + " Bus Tracker"; //navData.navigation.getParam("usertype") + " Bus Tracker";
  return {
    // tabBarOnPress({ navData.navigation, defaultHandler }) {
    // console.log("we pressed the tab bar");

    headerTitle: tit,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName="ios-home"
          onPress={navData.navigation.getParam("logout")}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  map: {
    width: "100%",
    height: 400
  },
  headerButton: {
    marginHorizontal: 20
  },
  headerButtonText: {
    fontSize: 16,
    color: "black"
    // color: Platform.OS === "android" ? "white" : Colors.primary
  },
  areawrapper: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    //height: 300,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 10,
    width: 350
  }
});

export default MasterMapScreen;

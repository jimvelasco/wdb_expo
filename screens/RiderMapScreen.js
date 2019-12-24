import React, { Component, useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
//import { Constants, Location, Permissions } from "expo";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import socketIO from "socket.io-client";

import SButton from "../components/SButton";

import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";

class RiderMapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLocation: null,
      mapRegion: null,
      origMapRegion: null,
      //socket: socketIO("http://wheredabus.herokuapp.com"),
      //socket: socketIO("http://10.0.0.2:5000"),
      socket: socketIO("http://wheredabus.herokuapp.com"),
      socketMessage: "socket message",
      busMarkers: [],
      busLocation: null,
      bus: props.bus,
      buses: props.buses,
      userType: props.userType,
      // latitude:       this.state.lastLat,
      // longitude:      this.state.lastLong,
      // ltDelta:        this.state.latitudeDelta * 10,
      // lgDelta:        this.state.longitudeDelta * 10
      latitude: 0,
      longitude: 0,
      lastLat: 0,
      lastLong: 0,
      latitudeDelta: 0,
      longitudeDelta: 0
    };
    // this.getSocket = this.getSocket.bind(this);
    // this.sendSocket = this.sendSocket.bind(this);
    this.resetMap = this.resetMap.bind(this);
    this.onPressZoomIn = this.onPressZoomIn.bind(this);
    this.onPressZoomOut = this.onPressZoomOut.bind(this);
    this.timeout = null;
    this.mapRef = null;
  }

  componentDidMount() {
    //console.log("this.state.bus", this.state.bus);
    // if (this.state.buses.length>0) {
    // console.log("rms cdm this.state.buses", this.state.buses);
    this.getLocationAsync();
    let sock = this.state.socket;
    let bus = this.state.buses[0];
    //console.log("the lone bus 0 is", bus);
    // let room = "yampa";
    let busname = bus.name;
    // console.log("cdm bus name", busname);
    // console.log("busname is", room);
    let buses = this.state.buses;
    buses.forEach(el => {
      let rm = el.name;
      this.state.socket.emit("room", rm);
    });
    // this.state.socket.emit("room", busname);

    sock.on("broadcast_location", data => {
      // console.log(
      //   "we got a BROADCAST_LOCATION RIDER response from socket",
      //   data
      // );
      //let obj = JSON.parse(data);
      this.processSocketData(data);
    });
    sock.on("broadcast", data => {
      console.log("we got a BROADCAST RIDER response from socket", data);

      //this.processSocketData(data);
    });
    // }
  }

  processSocketData(data) {
    // console.log(
    //   "we got a processSocketData BROADCAST RIDER response from socket",
    //   data
    // );

    let obj = JSON.parse(data);
    //console.log("object from psd", obj);

    let room = obj["room"];
    // console.log("room object from psd", room);
    // if (!room) {
    //   console.log("we have a non lat lon message");
    //   return;
    // }

    let blocstr = obj["data"];
    // console.log("we have ablocstr blocstr", blocstr);
    // if (!blocstr) {
    //   console.log("we have a non lat lon message");
    //   return;
    // }

    // if (blockstr["message"]) {
    //   console.log("we have a non lat lon message");
    //   return;
    // }

    // console.log("room", room);
    let busloc = JSON.parse(blocstr);
    //console.log("busloc", busloc);
    // if (!busloc.lat) {
    //   console.log("we have a non lat lon message");
    //   return;
    // }

    //let bus = this.state.buses[0];
    let buses = this.state.buses;
    const bus = buses.find(element => element.name === room);

    let bmarker = null;
    bmarker = (
      <Marker
        key={bus._id}
        coordinate={{ longitude: busloc["lon"], latitude: busloc["lat"] }}
        //coordinate={userloc.coordinate}
        title={bus.name}
        description={bus.address}
      >
        <View>
          <Ionicons name="ios-bus" size={30} />
        </View>
      </Marker>
    );

    // let coord = {
    //   longitude: -106.80153115088976,
    //   latitude: 40.456937958199305
    // };

    // let bmarker2 = (
    //   <Marker
    //     key={1000}
    //     coordinate={coord}
    //     //coordinate={userloc.coordinate}
    //     title={"dummy title"}
    //     description={"dummy desc"}
    //   >
    //     <View>
    //       <Ionicons name="ios-bus" size={30} />
    //     </View>
    //   </Marker>
    // );

    //let bmary = [];
    let bmary = this.state.busMarkers;
    if (bmary.length === 0) {
      bmary.push(bmarker);
    } else {
      // console.log("the markers are", bmary);
      const mindex = bmary.findIndex(element => element.props.title === room);
      if (mindex > -1) {
        // console.log("we found a marker so we are replacing it");
        bmary[mindex] = bmarker;
      } else {
        //console.log("we did not find a marker so we are pushing a new marker");
        bmary.push(bmarker);
      }
    }
    // bmary.push(bmarker);
    // bmary.push(bmarker2);

    //40.456937958199305,\"lon\":-106.80153115088976
    //40.4574379581993,\"lon\":-106.80103115088976

    // console.log("pds pbloc", pbloc);

    this.setState({ busLocation: busloc, busMarkers: bmary });
  }

  componentWillUnmount() {
    this.state.socket.disconnect();
    // this.state.socket.emit("leaveroom", this.state.bus.name);
  }

  getLocationAsync = async () => {
    console.log("getting async locations with accuracy highest best");

    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      //setLocationResult("Permission to access location was denied");
      console.log("we do not have permission");
    } else {
      console.log("we do have permission");
      //setHasLocationPermissions(true);
      //BestForNavigation
      //Highest
    }

    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest
    });

    // let location = await Location.getCurrentPositionAsync(
    //   {}
    //   );
    let userloc = {};
    userloc.id = location.timestamp;
    userloc.title = "User";
    userloc.coordinate = {
      longitude: location.coords.longitude,
      latitude: location.coords.latitude
    };
    userloc.description = "User Description";
    let pmarker = (
      <Marker
        key={userloc.id}
        coordinate={userloc.coordinate}
        title={userloc.title}
        description={userloc.description}
      >
        <View>
          <Ionicons name="ios-person" size={30} color={"blue"} />
        </View>
      </Marker>
    );

    this.setState({
      //busMarker: busmarker,
      userLocation: userloc,
      personMarker: pmarker,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      lastLat: location.coords.latitude,
      lastLong: location.coords.longitude,
      latitudeDelta: 0.02,
      longitudeDelta: 0.01,
      mapRegion: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.01
      },
      origMapRegion: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.01
      }
    });
  };

  resetMap = () => {
    //setMapRegion(origMapRegion);
    let m = this.mapRef;
    m.animateToRegion(this.state.origMapRegion, 500);
  };

  // ZOOMING FUNCTIONS
  onPressZoomIn() {
    // console.log("zoom in");
    // console.log("lastLat", this.state.lastLat);
    // console.log("lastLong", this.state.lastLong);
    // console.log("latitude", this.state.latitude);
    // console.log("longitude", this.state.longitude);
    // console.log("latitudeDelta", this.state.latitudeDelta);
    // console.log("longitudeDelta", this.state.longitudeDelta);

    let m = this.mapRef;
    let region = {
      latitude: this.state.lastLat,
      longitude: this.state.lastLong,
      latitudeDelta: this.state.latitudeDelta * 2,
      longitudeDelta: this.state.longitudeDelta * 2
    };
    // console.log("changed latitudeDelta", region.latitudeDelta);
    // console.log("changed longitudeDelta", region.longitudeDelta);

    this.setState({
      latitudeDelta: region.latitudeDelta,
      longitudeDelta: region.longitudeDelta,
      lastLat: region.latitude,
      lastLong: region.longitude
    });

    // console.log("after mod zoom in");
    // console.log("lastLat", this.state.lastLat);
    // console.log("lastLong", this.state.lastLong);
    // console.log("latitude", this.state.latitude);
    // console.log("longitude", this.state.longitude);
    // console.log("latitudeDelta", this.state.latitudeDelta);
    // console.log("longitudeDelta", this.state.longitudeDelta);
    m.animateToRegion(region, 500);
    // console.log(
    //   "IN lt : " + region.latitudeDelta + " lg : " + region.longitudeDelta
    // );
  }

  onPressZoomOut() {
    let m = this.mapRef;
    let region = {
      latitude: this.state.lastLat,
      longitude: this.state.lastLong,
      latitudeDelta: this.state.latitudeDelta / 2,
      longitudeDelta: this.state.longitudeDelta / 2
    };
    this.setState({
      latitudeDelta: region.latitudeDelta,
      longitudeDelta: region.longitudeDelta,
      lastLat: region.latitude,
      lastLong: region.longitude
    });
    m.animateToRegion(region, 500);
    // console.log(
    //   "OUT lt : " + region.latitudeDelta + " lg : " + region.longitudeDelta
    // );
  }

  // END ZOOMING FUNCTIONS

  render() {
    let userloc = this.state.userLocation;
    let busloc = this.state.busLocation;
    //busloc = JSON.parse(busloc);
    //let bus = this.state.bus;
    let bmarkers = this.state.busMarkers;
    let userType = this.state.userType;
    let buses = this.state.buses;
    //let name = bus.name;
    let showbus = false;
    if (!this.state.mapRegion) {
      return (
        <View>
          <Text>Nothing to display</Text>
        </View>
      );
    }
    if (!this.state.userLocation) {
      return (
        <View>
          <Text>No user location to display</Text>
        </View>
      );
    }
    let busmarker = null;
    let bmarker = null;
    // console.log("busloc", busloc);

    if (bmarkers.length > 0) {
      showbus = true;
    } else {
      showbus = false;
    }

    let pmarker = this.state.personMarker;
    // console.log(pmarker);
    let mv = (
      <MapView
        style={styles.map}
        provider="google"
        initialRegion={this.state.mapRegion}
        zoomTapEnabled={true}
        zoomEnabled={true}
        //onMapReady={onMapReady}
        // onRegionChangeComplete={onRegionChangeComplete}
        ref={ref => {
          this.mapRef = ref;
        }}
      >
        {pmarker}
        {showbus ? bmarkers : null}
        {/* {bmarker} */}
      </MapView>
    );
    //const map1 = array1.map(x => x * 2);
    //console.log("DOING A RIDER RENDER");
    let header = buses.map(b => {
      return (
        <View key={b._id} style={styles.rowgroup}>
          <Text>{b.name}</Text>
          <Text>{b.address}</Text>
          <Text>{b.route}</Text>
        </View>
      );
    });

    return (
      <View style={{ alignItems: "center", width: "90%" }}>
        {header}

        {mv}
        <View style={styles.rowgroup}>
          <Ionicons
            name="ios-locate"
            size={30}
            color={Colors.button_background_color}
            onPress={this.resetMap}
          />
          <Ionicons
            name="ios-add-circle"
            size={30}
            color={Colors.button_background_color}
            onPress={this.onPressZoomOut}
          />
          <Ionicons
            name="ios-remove-circle"
            size={30}
            color={Colors.button_background_color}
            onPress={this.onPressZoomIn}
          />
          {/* <SButton key={100} title="reset" onPress={this.resetMap} />
          <SButton key={200} title="zoom in" onPress={this.onPressZoomIn} />
          <SButton key={300} title="zoom out" onPress={this.onPressZoomOut} /> */}
        </View>
      </View>
      // </View>
    );
  }
}

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
    margin: 10
    //width: 350
  },
  rowgroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20
  }
});

export default RiderMapScreen;

import React, { Component, useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
//import { Constants, Location, Permissions } from "expo";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import socketIO from "socket.io-client";

import SButton from "../components/SButton";

import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import { render } from "react-dom";

//const DriverMapScreen = props => {
class DriverMapScreen extends Component {
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
      busMarker: null,
      busLocation: null,
      bus: props.bus,
      userType: props.userType,
      latitude: 0,
      longitude: 0,
      lastLat: 0,
      lastLong: 0,
      latitudeDelta: 0,
      longitudeDelta: 0
    };
    // this.bus = props.bus;
    // this.userType = props.userType;
    //this.getSocket = this.getSocket.bind(this);
    //this.sendSocket = this.sendSocket.bind(this);
    this.resetMap = this.resetMap.bind(this);
    this.onPressZoomIn = this.onPressZoomIn.bind(this);
    this.onPressZoomOut = this.onPressZoomOut.bind(this);
    this.timeout = null;
    this.watchobj = null;
  }

  // doData(data) {
  //   this.setState({ socketMessage: data });
  // }
  // dotracking() {
  //   console.log("driver map we called this from parent");
  // }

  componentDidMount() {
    //this.getBusLocationAsync();
    if (this.state.bus) {
      this.getBusPositionAsync();
      let sock = this.state.socket;
      let room = this.state.bus.name; //"yampa";
      this.state.socket.emit("room", room);
      // sock.on("broadcast", function(data) {
      //   console.log("we got a BROADCAST DRIVER response from socket", data);
      //   let obj = JSON.parse(data);
      //   let locstr = obj["data"];
      //   let loc = JSON.parse(locstr);
      //   console.log("the obj is", obj);
      //   console.log("the loc is", loc);
      // });
    }
  }

  // doLoadStartup() {
  //   this.getBusPositionAsync();
  //   let sock = this.state.socket;
  //   let room = "yampa";
  //   this.state.socket.emit("room", room);
  //   sock.on("broadcast", function(data) {
  //     console.log("we got a BROADCAST DRIVER response from socket", data);
  //   });
  // }

  componentWillUnmount() {
    // console.log("we are leaving but timeout is", this.timeout);
    // if (this.timeout) {
    //   console.log("we are clearing timeout", this.timeout);
    //   clearTimeout(this.timeout);
    // }
    if (this.watchobj) {
      console.log("removing watch obj");
      this.watchobj.remove();
    }
    this.state.socket.disconnect();
    //this.state.socket.emit("leaveroom", this.state.bus.name);
  }

  getBusLocationAsync = async () => {
    let bus = this.props.bus;
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      // setLocationResult("Permission to access location was denied");
      // console.log("we do not have permission");
    } else {
      // console.log("we do have permission");
      // setHasLocationPermissions(true);
    }

    let location = await Location.getCurrentPositionAsync({});
    // console.log("location async", location);
    const busmarker = {
      id: bus._id,
      _id: bus._id,
      title: bus.name,
      description: "yampa and phoenix shuttle",
      coordinate: {
        longitude: location.coords.longitude,
        latitude: location.coords.latitude
      }
    };

    this.setState({
      busMarker: busmarker,
      busLocation: location,
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
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    let obj = {};
    obj["busid"] = bus._id;
    obj["busname"] = bus.name;
    obj["lat"] = location.coords.latitude;
    obj["lon"] = location.coords.longitude;

    let objstr = JSON.stringify(obj);
    // console.log("about to emit the timeout is", this.timeout);
    let room = "yampa";
    this.state.socket.emit("set_location", room, objstr);
    this.timeout = setTimeout(getBusLocationAsync, 10000);
  };

  getBusPositionAsync = async () => {
    // console.log("getting async locations");
    let bus = this.props.bus;
    // if (this.isnotmounted) return;
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      //setLocationResult("Permission to access location was denied");
      //console.log("we do not have permission");
    } else {
      console.log("we do have permission");
      //setHasLocationPermissions(true);
    }
    //let location = await Location.getCurrentPositionAsync({});
    //this.watchobj
    this.watchobj = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        // timeInterval: 5000,
        // distanceInterval: 0
        distanceInterval: 25
      },
      location => {
        const busmarker = {
          id: bus._id,
          _id: bus._id,
          title: bus.name,
          description: "yampa and phoenix shuttle",
          coordinate: {
            longitude: location.coords.longitude,
            latitude: location.coords.latitude
          }
        };

        this.setState({
          busMarker: busmarker,
          busLocation: location,
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

        let obj = {};
        obj["busid"] = bus._id;
        obj["busname"] = bus.name;
        obj["lat"] = location.coords.latitude;
        obj["lon"] = location.coords.longitude;

        let objstr = JSON.stringify(obj);
        // console.log("about to emit the timeout is", this.timeout);
        let room = this.state.bus.name; //"yampa";
        //this.state.socket.emit("toapi", room, objstr);
        this.state.socket.emit("set_location", room, objstr);
      }
    );
  };

  resetMap = () => {
    // setMapRegion(origMapRegion);
    let m = this.mapRef;
    m.animateToRegion(this.state.origMapRegion, 500);
  };

  // ZOOMING FUNCTIONS
  onPressZoomIn() {
    let m = this.mapRef;
    let region = {
      latitude: this.state.lastLat,
      longitude: this.state.lastLong,
      latitudeDelta: this.state.latitudeDelta * 2,
      longitudeDelta: this.state.longitudeDelta * 2
    };

    this.setState({
      latitudeDelta: region.latitudeDelta,
      longitudeDelta: region.longitudeDelta,
      lastLat: region.latitude,
      lastLong: region.longitude
    });

    m.animateToRegion(region, 500);
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

  clearPolling = () => {
    console.log("stopping interval");
    clearInterval(this.pinterval);
  };

  render() {
    let busmarker = this.state.busMarker;
    if (!busmarker) {
      return (
        <View>
          <Text>Loading</Text>
        </View>
      );
    }
    // console.log("render bmarker is", busmarker);
    let bmarker = (
      <Marker
        key={busmarker._id}
        coordinate={busmarker.coordinate}
        title={busmarker.title}
        description={busmarker.description}
      >
        <View>
          <Ionicons name="ios-bus" size={30} />
        </View>
      </Marker>
    );

    // console.log("render bmarker is", busmarker);
    // console.log("render region", this.state.mapRegion);
    // "latitude": 37.785834,
    //   "longitude": -122.406417,

    if (!this.state.mapRegion) {
      return (
        <View>
          <Text>{this.state.socketMessage}</Text>
          <Button title="socket" onPress={this.getSocket} />
          <Button title="send" onPress={this.sendSocket} />
          <Text>Nothing to display</Text>
        </View>
      );
    }
    let mv = null;
    mv = (
      <MapView
        key={1000}
        style={styles.map}
        initialRegion={this.state.mapRegion}
        zoomTapEnabled={true}
        zoomEnabled={true}
        // onRegionChangeComplete={onRegionChangeComplete}
        ref={ref => {
          this.mapRef = ref;
        }}
      >
        {bmarker}
      </MapView>
    );

    let bus = this.state.bus;
    let userType = this.state.userType;
    let name = bus.name;

    return (
      <View style={{ alignItems: "center", width: "90%" }}>
        <View style={styles.rowgroup}>
          <Text>{userType}</Text>
          <Text>{name}</Text>
          <Text>{bus.address}</Text>
          <Text>{bus.route}</Text>
        </View>

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

        {/* <SButton title="reset" onPress={this.resetMap} /> */}
      </View>
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
    // width: 350
  },
  rowgroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20
  }
});

export default DriverMapScreen;

/*
// this uses watch
  getBusPositionAsync = useCallback(async () => {
    console.log("getting async locations");
    // if (this.isnotmounted) return;
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      setLocationResult("Permission to access location was denied");
      //console.log("we do not have permission");
    } else {
      console.log("we do have permission");
      setHasLocationPermissions(true);
    }
    //let location = await Location.getCurrentPositionAsync({});
    //this.watchobj
    watchobj = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 5000,
        distanceInterval: 0
      },
      location => {
        console.log("the bus location many times why is this");
        const busmarker = {
          _id: bus._id,
          title: bus.name,
          description: "yampa and phoenix shuttle",
          coordinate: {
            longitude: location.coords.longitude,
            latitude: location.coords.latitude
          }
        };
        setBusMarker(busmarker);
        setBusLocation(location);
        setMapRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.01
        });
        setOrigMapRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.01
        });
        let url =
          "http://wheredabus.herokuapp.com/restapi/updatebus/" +
          bus._id +
          "/" +
          location.coords.latitude +
          "/" +
          location.coords.longitude;
        // setTimeout(function() {
        //   console.log("here is the url", url);
        // }, 30000);

        // socket.emit("toapi", url);

        fetch(url)
          .then(response => response.json()) //response.json()
          // .then(responsejson => {
          //   this.timeout = setTimeout(getBusLocation, 5000);
          // })
          .catch(error => {
            console.error(error);
          });
      }
    );
  }, [busLocation]);


  getBusLocationAsync = async () => {
    let bus = this.props.bus;
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      // setLocationResult("Permission to access location was denied");
      // console.log("we do not have permission");
    } else {
      // console.log("we do have permission");
      // setHasLocationPermissions(true);
    }

    let location = await Location.getCurrentPositionAsync({});
    // console.log("location async", location);
    const busmarker = {
      id: bus._id,
      _id: bus._id,
      title: bus.name,
      description: "yampa and phoenix shuttle",
      coordinate: {
        longitude: location.coords.longitude,
        latitude: location.coords.latitude
      }
    };

    this.setState({
      busMarker: busmarker,
      busLocation: location,
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
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    let obj = {};
    obj["busid"] = bus._id;
    obj["busname"] = bus.name;
    obj["lat"] = location.coords.latitude;
    obj["lon"] = location.coords.longitude;

    let objstr = JSON.stringify(obj);
    // console.log("about to emit the timeout is", this.timeout);
    let room = "yampa";
    this.state.socket.emit("toapi", room, objstr);
    // this.timeout = setTimeout(getBusLocationAsync, 10000);
  };
  
*/

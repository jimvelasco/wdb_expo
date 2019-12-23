import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Platform
} from "react-native";
import MapView, { Marker } from "react-native-maps";

import Colors from "../constants/Colors";

const MapScreen = props => {
  // const [selectedBus, setSelectedBus] = useState();
  this.mapRef = null;

  //console.log("mapscreen initial props", props);

  const mapRegion = {
    latitude: 40.454579,
    longitude: -106.798609,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  const selectLocationHandler = event => {
    // setSelectedLocation({
    //   lat: event.nativeEvent.coordinate.latitude,
    //   lng: event.nativeEvent.coordinate.longitude
    // });
  };

  useEffect(() => {
    //console.log("Map Screen  is", this.mapRef);
    fitmarkers();
    // console.log("Map Screen useEffect called is");
    // getMarkers();
  }, [props.markers]);

  // const dopress = () => {
  //   let m = this.mapRef;
  //   //console.log("mapref", m);
  //   let ms = currentMarkers;
  //   let allcoords = ms.map(marker => marker.coordinates);
  //   //console.log("allcoords", allcoords);
  //   m.fitToCoordinates(allcoords, {
  //     edgePadding: { top: 50, right: 10, bottom: 10, left: 10 },
  //     animated: false
  //   });
  // };

  const mapisready = () => {
    console.log("map is ready");
    fitmarkers();
  };

  const onPressMarker = (e, marker) => {
    e.preventDefault();
    // console.log("map is onPressMarker id is", id);
    // let sb = props.markers.filter(el => el.id === id);
    // console.log("map is onPressMarker sb is", sb);
    props.onmarker(marker);
    // setSelectedBus(sb[0]);
    //fitmarkers();
    // fitmarkers();
  };

  const fitmarkers = () => {
    let m = this.mapRef;
    //console.log("mapref", m);
    let ms = props.markers; //currentMarkers;
    let allcoords = ms.map(marker => marker.coordinates);
    //console.log("allcoords", allcoords);
    m.fitToCoordinates(allcoords, {
      edgePadding: { top: 50, right: 10, bottom: 10, left: 10 },
      animated: false
    });
  };

  // const savePickedLocationHandler = useCallback(() => {
  //   if (!selectedLocation) {
  //     return;
  //   }
  //   props.navigation.navigate("NewPlace", { pickedLocation: selectedLocation });
  // }, [selectedLocation]);

  // useEffect(() => {
  //   props.navigation.setParams({ saveLocation: savePickedLocationHandler });
  // }, [savePickedLocationHandler]);

  let markers = props.markers;
  // console.log(
  //   "in mapscreen about to return markers are markers len ",
  //   markers.length
  // );

  // let selbus = selectedBus;
  // let busdata = <Text>No bus selected</Text>;
  // if (selbus) {
  //   console.log("the selected bus is", selbus);
  //   busdata = (
  //     <Text>
  //       {selbus.id},{selbus.name}
  //     </Text>
  //   );
  // }

  return (
    <View style={styles.wrapper}>
      <MapView
        style={styles.map}
        region={mapRegion}
        //onPress={selectLocationHandler}
        ref={ref => {
          this.mapRef = ref;
        }}
        onMapReady={mapisready}
        //onMarkerPress={markerpress}
      >
        {markers.map(marker => (
          <Marker
            key={marker.id}
            key={marker.name}
            coordinate={marker.coordinates}
            title={marker.name}
            description={marker.address}
            onPress={e => onPressMarker(e, marker)}
          />
        ))}
      </MapView>
      {/* <View style={styles.label}>{busdata}</View>
      <Button title="go" onPress={dopress} /> */}
    </View>
  );
};

MapScreen.navigationOptions = navData => {
  const saveFn = navData.navigation.getParam("saveLocation");
  return {
    headerTitle: "Map",
    headerRight: (
      <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
        <Text style={styles.headerButtonText}>Save</Text>
      </TouchableOpacity>
    )
  };
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: "100%",
    height: 300
  },
  map: {
    // flex: 1,
    width: "100%",
    height: 300
  },
  headerButton: {
    marginHorizontal: 20
  },
  label: {
    fontSize: 16
  },
  headerButtonText: {
    fontSize: 16,
    color: "black"
    // color: Platform.OS === "android" ? "white" : Colors.primary
  }
});

export default MapScreen;

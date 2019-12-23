import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Platform,
  Button,
  ActivityIndicator,
  ScrollView
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch } from "react-redux";

import HeaderButton from "../components/HeaderButton";

import MapScreen from "./MapScreen";

import MButton from "../components/MButton";
import Colors from "../constants/Colors";
import {
  searchCategory,
  getTrending,
  searchMimesText,
  getBuses
} from "../store/actions/busActions";

const SearchScreen = props => {
  const { navigation } = props;

  const [isLoading, setIsLoading] = useState(false);
  //const [selectedCategory, setSelectedCategory] = useState("Relationships");
  const [currentMarkers, setCurrentMarkers] = useState([]);
  const [selectedBus, setSelectedBus] = useState();

  const buses = useSelector(state => state.buses.availableBuses);

  const [error, setError] = useState();

  const dispatch = useDispatch();

  const dummy_data = [
    {
      id: 1,
      name: "yampa",
      coordinates: { longitude: -106.798609, latitude: 40.454579 }
    },
    {
      id: 2,
      name: "eagle",
      coordinates: { longitude: -106.8089, latitude: 40.455143 }
    },
    {
      id: 3,
      name: "gondola",
      coordinates: { longitude: -106.805936, latitude: 40.457226 }
    },
    {
      id: 4,
      name: "sunburst",
      coordinates: { longitude: -106.805257, latitude: 40.447014 }
    },
    {
      id: 5,
      name: "walgreens",
      coordinates: { longitude: -106.826904, latitude: 40.46657 }
    },
    {
      id: 6,
      name: "downtown",
      coordinates: { longitude: -106.832911, latitude: 40.4861 }
    }
  ];

  // JJV need dependencies in both callback and useeffect
  // learn why.  potential for endless loops
  // const saveFilters = useCallback(() => {
  //   const appliedFilters = {
  //     relationships: isRelationships,
  //     reactions: isReactions,
  //     emotions: isEmotions,
  //     occasions: isOccasions
  //   };

  // dispatch(setFilters(appliedFilters));
  // console.log(appliedFilters);
  //   console.log(props);
  // }, [isRelationships, isReactions, isEmotions, isOccasions, dispatch]);
  // performCategory = () => {
  //   console.log()
  //   props.navigation.navigate("Mimes");
  // };
  // JJV runs when state changes and component re renders
  useEffect(() => {
    navigation.setParams({ logout: doLogout });
  }, [doLogout]);

  // useEffect(() => {
  //   //setCurrentMarkers(dummy_data);
  //   console.log("use effect getting buses");
  //   doGetBuses();
  // }, [doGetBuses]);
  useEffect(() => {
    //setCurrentMarkers(dummy_data);
    console.log("use effect getting buses");
    doGetBuses();
  }, []);
  const doLogout = () => {
    props.navigation.navigate("Logon");
  };

  const performTrackBus = () => {
    console.log("do cat search", selectedBus);

    props.navigation.navigate("BusTrack", { bus: selectedBus });

    // props.navigation.navigate("MimeDetail", {
    //   mimeId: itemData.item._id,
    //   mimeTitle: itemData.item.cat0,
    //   mimeSong: itemData.item.song,
    //   mimeLyrics: itemData.item.lyrics,
    //   params: {
    //     mimeTitle: itemData.item.cat0
    //   }
    // });
  };

  const doGetBuses = useCallback(async () => {
    //console.log("getting buses");
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(getBuses());
      // setTimeout(doGetBuses, 5000);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  let markers = currentMarkers;

  //console.log("buses are", buses);
  let busdata = [];
  if (buses.length > 0) {
    // busdata = buses.map(el => {
    //   let obj = {};
    //   let latlng = { latitude: el.lat, longitude: el.lon };
    //   obj["id"] = el._id;
    //   obj["name"] = el.name;
    //   obj["address"] = el.address;
    //   obj.coordinates = latlng;
    //   return obj;
    // });
    buses.forEach(el => {
      let obj = {};
      let latlng = { latitude: el.lat, longitude: el.lon };
      obj["id"] = el._id;
      obj["name"] = el.name;
      obj["address"] = el.address;
      obj.coordinates = latlng;
      busdata.push(obj);
    });
  }
  // console.log(
  //   "search screen about to return data busdata are lenght of busdata",
  //   busdata.length
  // );
  const mapBusSelected = sb => {
    // console.log("here is the bus", sb);
    setSelectedBus(sb);
  };

  let selbus = selectedBus;
  let selbusdata = <Text>No bus selected</Text>;
  let redraw = true;
  if (selbus) {
    // console.log("the selected bus is", selbus);
    redraw = false;
    selbusdata = (
      <View style={{ alignItems: "center" }}>
        <Text style={styles.data}>{selbus.id}</Text>
        <Text style={styles.data}>{selbus.name}</Text>
        <Text style={styles.data}>{selbus.address}</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.screen}>
        <View style={styles.areawrapper}>
          <MapScreen
            markers={busdata}
            redraw={redraw}
            onmarker={mapBusSelected}
          />
        </View>
        <View style={styles.areawrapper}>
          <Text style={styles.label}>Selected Bus</Text>
          {selbusdata}
          <MButton
            title="Submit"
            color={Colors.primary}
            onPress={performTrackBus}
          />
        </View>
      </View>
    </ScrollView>
  );
};

SearchScreen.navigationOptions = navData => {
  return {
    headerTitle: "Select a Bus",

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
  screen: {
    flex: 1,
    alignItems: "center"
    //backgroundColor: "black"
    //justifyContent: "center"
  },
  // title: {
  //   fontFamily: "open-sans-bold",
  //   fontSize: 22,
  //   margin: 20,
  //   textAlign: "center"
  // },

  //  item : {
  //     color: "blue"
  //   },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5
  },
  data: {
    fontSize: 16,
    //fontWeight: "bold",

    marginTop: 5
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
    width: 300
  }
});

export default SearchScreen;

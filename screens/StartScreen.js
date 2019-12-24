import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  ScrollView,
  FlatList,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch } from "react-redux";

import HeaderButton from "../components/HeaderButton";

import BusItem from "../components/BusItem";
import BusItemRider from "../components/BusItemRider";
import BusItemDriver from "../components/BusItemDriver";
import SButton from "../components/SButton";
import Colors from "../constants/Colors";

import {
  searchCategory,
  getTrending,
  updateBusStatus,
  getBuses
} from "../store/actions/busActions";

const StartScreen = props => {
  const { navigation } = props;
  //console.log("we are at start screen props", props);

  const userType = navigation.getParam("userType");
  //console.log("we are at start screen usertype", userType);

  const [isLoading, setIsLoading] = useState(false);
  const [selectedBusesArray, setSelectedBusesArray] = useState([]);
  const [error, setError] = useState();
  //const [userType, setUserType] = useState("rider");
  //const [selectedCategory, setSelectedCategory] = useState("Relationships");
  const [currentMarkers, setCurrentMarkers] = useState([]);
  const [selectedBus, setSelectedBus] = useState();
  const [dataValue, setDataValue] = useState("");

  const buses = useSelector(state => state.buses.availableBuses);

  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setParams({ logout: doLogout });
  }, [doLogout]);

  useEffect(() => {
    //setCurrentMarkers(dummy_data);
    // console.log("use effect getting buses");
    doGetBuses();
  }, [dispatch, setIsLoading, setError]);

  const doLogout = () => {
    props.navigation.navigate("Logon");
  };

  const performTrackBus = () => {
    // console.log("do track bus ", selectedBus);
    if (!selectedBus) {
      Alert.alert("Missing Information", "Please search for and select a bus");
      return;
    }
    // console.log("userType is", userType);
    props.navigation.navigate("BusTrack", {
      bus: selectedBus,
      userType: userType
    });
  };

  const doGetBuses = useCallback(async () => {
    //console.log("we are getting buses doGetBuses getting buses");
    setError(null);
    setIsLoading(true);
    try {
      // console.log("we are getting buses");
      await dispatch(getBuses());
      // console.log("we got buses");
      // setTimeout(doGetBuses, 5000);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  // if (isLoading) {
  //   return (
  //     <View style={styles.centered}>
  //       <ActivityIndicator size="large" color={Colors.primary} />
  //     </View>
  //   );
  // }

  let markers = currentMarkers;

  //console.log("buses are", buses);
  let busdata = [];
  if (buses.length > 0) {
    buses.forEach(el => {
      let obj = {};
      let latlng = { latitude: el.lat, longitude: el.lon };
      obj["_id"] = el._id;
      obj["name"] = el.name;
      obj["company"] = el.company;
      obj["address"] = el.address;
      obj["route"] = el.route;
      obj["status"] = el.status;
      obj["driver"] = el.driver;
      obj.coordinates = latlng;
      busdata.push(obj);
    });
  }

  const one_performSelectBus = sb => {
    // console.log("here is the bus", sb);
    setSelectedBus(sb);
  };
  const performSelectBus = (e, sb) => {
    console.log("performSelectBus", sb.name);
    e.preventDefault();
    props.navigation.navigate("BusTrack", {
      bus: sb,
      buses: [],
      userType: userType
    });
    //  }
  };

  const trackSelectedBuses = e => {
    let buses = selectedBusesArray;
    e.preventDefault();
    if (selectedBusesArray.length === 0) {
      Alert.alert(
        "Missing Information",
        "Please select at least one bus to track"
      );
    } else if (selectedBusesArray.length > 2) {
      Alert.alert(
        "Missing Information",
        "No more that two(2) buses may be tracked"
      );
    } else {
      props.navigation.navigate("BusTrack", {
        bus: buses[0],
        buses: buses,
        userType: userType
      });
    }
  };

  const performBusStatusChange = (e, sb) => {
    e.preventDefault();
    // if (userType === "driver") {
    changeBusStatus(sb);
    // } else {
    //   props.navigation.navigate("BusTrack", {
    //     bus: sb,
    //     userType: userType
    //   });
    // }
  };

  const changeBusStatus = useCallback(
    async bus => {
      // console.log("we are doing a status change");

      let id = bus._id;
      let driver = bus.driver;
      let status = bus.status;

      setError(null);
      setIsLoading(true);
      try {
        //console.log("we are getting buses");
        //console.log("start tracking", id, status, driver);
        await dispatch(updateBusStatus(id, status, driver));
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    },
    [dispatch, setIsLoading, setError]
  );
  const loadBuses = () => {
    //console.log("load buses");
    doGetBuses();
    // setSelectedBus(sb);
  };

  const changeHandler = text => {
    // you could add validation
    setDataValue(text);
  };

  const switchSelected = (val, bus) => {
    let ary = selectedBusesArray;
    if (val) {
      ary.push(bus);
      setSelectedBusesArray(ary);
    } else {
      const result = ary.filter(b => b.name !== bus.name);
      setSelectedBusesArray(result);
    }
    //  console.log("start screen swith selected", val, bus.name);
  };

  let isrider = false;
  if (userType === "rider") {
    isrider = true;
  }

  //const renderTheItem
  const renderTheItem = itemData => {
    //console.log("we are rendering the item and the utype is", userType);
    if (userType === "rider") {
      return (
        <BusItemRider
          userType={userType}
          bus={itemData.item}
          onSelectBus={e => performSelectBus(e, itemData.item)}
          switchSelected={switchSelected}
        />
      );
    } else {
      return (
        <BusItemDriver
          userType={userType}
          bus={itemData.item}
          onSelectBus={e => performSelectBus(e, itemData.item)}
          onStatusChange={e => performBusStatusChange(e, itemData.item)}
        />
      );
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.areawrapper}>
        <View style={styles.rowgroup}>
          <Text style={styles.label2}>Search</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={changeHandler}
            value={dataValue}
          />
          <Ionicons name="ios-search" size={35} onPress={loadBuses} />
        </View>
      </View>

      {isLoading ? (
        <ActivityIndicator
          style={{ position: "absolute" }}
          size="large"
          color={Colors.primary}
        />
      ) : null}
      <View style={styles.areawrapper}>
        <ScrollView style={{ width: "100%", marginBottom: 60 }}>
          {/* <View style={{ ...styles.areawrapper, ...styles.wide }}> */}

          {busdata.length === 0 ? (
            <Text>No buses to display</Text>
          ) : (
            <FlatList
              data={busdata}
              keyExtractor={item => item._id}
              windowSize={20}
              numColumns={1}
              renderItem={renderTheItem}
              // renderItem={(itemData, index) => (
              //   <BusItem
              //     userType={userType}
              //     bus={itemData.item}
              //     onSelectBus={e => performSelectBus(e, itemData.item)}
              //     onStatusChange={e => performBusStatusChange(e, itemData.item)}
              //   />
              // )}
            />
          )}
          {isrider ? (
            <View style={{ alignItems: "center" }}>
              <SButton
                style={styles.wide}
                title="track selected buses"
                onPress={trackSelectedBuses}
              />
            </View>
          ) : null}
        </ScrollView>
      </View>
    </View>
  );
};

StartScreen.navigationOptions = navData => {
  return {
    headerTitle: "Start Tracking",

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
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
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
  label2: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 5
  },
  data: {
    fontSize: 16,
    //fontWeight: "bold",

    marginTop: 5
  },
  wide: {
    width: "90%"
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
    width: 100
  },
  areawrapper: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 10,
    width: "90%"
    //marginTop: 10,
    //width: "100%"
    //width: 300
  },
  radiowrapper: {
    //borderColor: "black",
    //borderWidth: 1,
    //borderRadius: 10,
    backgroundColor: "white",
    //height: 300,
    justifyContent: "center",
    alignItems: "center"
    //paddingTop: 10
    //width: "100%"
    // margin: 10,
    // width: 300
  },
  radiogroup: {
    flexDirection: "row",
    //borderColor: "black",
    //borderWidth: 1
    //cheight: 50,
    //padding: 15,
    //justifyContent: "space-around",
    justifyContent: "space-between"
    //justifyContent: "center"
    //paddingHorizontal: 30,
    //width: 300
    // borderBottomColor: "black",
    // borderBottomWidth: 1
  },
  rowgroup: {
    flexDirection: "row",
    //borderColor: "black",
    //borderWidth: 1
    //cheight: 50,
    //padding: 15,
    //justifyContent: "space-around",
    justifyContent: "space-between",

    // width: "100%",
    //justifyContent: "center"
    paddingHorizontal: 20
    //width: 300
    // borderBottomColor: "black",
    // borderBottomWidth: 1
  }
});

export default StartScreen;

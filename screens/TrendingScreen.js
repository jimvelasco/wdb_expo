import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Platform,
  TextInput,
  Button,
  Picker
} from "react-native";
import socketIO from "socket.io-client";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch } from "react-redux";

import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";
import TButton from "../components/TButton";

import TestScreen from "./TestScreen";

//import { setFilters } from "../store/actions/meals";

const FilterSwitch = props => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.label}</Text>
      <Switch
        trackColor={{ true: Colors.primaryColor }}
        thumbColor={Platform.OS === "android" ? Colors.primaryColor : ""}
        value={props.state}
        onValueChange={props.onChange}
      />
    </View>
  );
};

let cnt = 0;

const TrendingScreen = props => {
  const { navigation } = props;

  const [isRelationships, setIsRelationships] = useState(false);
  const [isReactions, setIsReactions] = useState(false);
  const [isEmotions, setIsEmotions] = useState(false);
  const [isOccasions, setIsOccasions] = useState(false);
  const [socket, setSocket] = useState(null);
  const [socketMessage, setSocketMessage] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("Emotions");
  const [buttonOneData, setButtonOneData] = useState("ONE");
  const [dataValue, setDataValue] = useState("");

  const [timerid, setTimerid] = useState(null);

  const dispatch = useDispatch();

  // JJV need dependencies in both callback and useeffect
  // learn why.  potential for endless loops
  const saveFilters = useCallback(() => {
    const appliedFilters = {
      relationships: isRelationships,
      reactions: isReactions,
      emotions: isEmotions,
      occasions: isOccasions
    };

    this._interval = null;

    // dispatch(setFilters(appliedFilters));
  }, [isRelationships, isReactions, isEmotions, isOccasions, dispatch]);

  // JJV runs when state changes and component re renders

  useEffect(() => {
    navigation.setParams({ logout: doLogout });
  }, [doLogout]);

  const doLogout = () => {
    props.navigation.navigate("Logon");
  };

  const goStart = () => {
    // props.navigation.navigate("Logon");
    props.navigation.navigate("Start");
  };

  const getSocket = () => {
    console.log("getSocket");
    //10.0.0.2:19001
    //var net = require("net");
    // var client = new net.Socket();
    // var client = socketIO("http://10.0.0.2:19001");
    // var client = socketIO("http://127.0.0.1:5000");
    var client = socketIO("http://wheredabus.herokuapp.com");

    //client.connect();
    console.log("we should have connected the server");
    // client.connect(19001, "10.0.0.2", function() {
    //   console.log("Connected");
    //   client.write(arg);
    // });
    console.log("now we are listening for updates");
    client.on("fromapi", function(data) {
      setSocketMessage(data);
      //rdata = 'Received: ' + data;
      //console.log('Received: ' + data);
      // return res.json(data);
      //console.log('Received: ' + data);
      //client.destroy(); // kill client after server's response
      console.log("we got a repsonse from socket", data);
      // return res.json(data);
    });
    setSocket(client);
  };

  const sendSocket = () => {
    socket.emit("toapi", { msg: "well here you go" });
  };

  const pressone = () => {
    // console.log("external button pressed", cnt);
    cnt = cnt + 1;
    // setButtonOneData(dataValue);
    console.log("pressone clearing timer id", this._interval);
    clearInterval(this._interval);
  };

  const changeHandler = text => {
    // you could add validation
    setDataValue(text);
  };

  // useEffect(() => {
  //   console.log("in trending screen use effect ");
  //   this._interval = setInterval(() => {}, 5000);
  //   console.log("setting timer id", this._interval);
  //   return () => {
  //     console.log(
  //       "we are leaving trending screen and clearing timer id",
  //       this._interval
  //     );
  //     // clearInterval(this._interval);
  //     clearInterval(this._interval);
  //   };
  // }, []);

  //let oned = buttonOneData;
  console.log("we are doing a parent screen render");

  return (
    <View style={styles.screen}>
      <Text>{socketMessage}</Text>
      {/* <Text style={styles.label}>Data</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={changeHandler}
        value={dataValue}
      />
      <TButton title="one" onPress={pressone} />

      <TestScreen data={buttonOneData} />
      <Text style={styles.title}>Other</Text> */}
      <FilterSwitch
        label="Restaurants"
        state={isRelationships}
        onChange={newValue => setIsRelationships(newValue)}
      />
      <FilterSwitch
        label="Sports"
        state={isReactions}
        onChange={newValue => setIsReactions(newValue)}
      />
      <FilterSwitch
        label="Shopping"
        state={isEmotions}
        onChange={newValue => setIsEmotions(newValue)}
      />
      <FilterSwitch
        label="Recreation"
        state={isOccasions}
        onChange={newValue => setIsOccasions(newValue)}
      />
      <Button title="socket" onPress={getSocket} />
      <Button title="send" onPress={sendSocket} />
      <Button title="start" onPress={goStart} />
    </View>
  );
};

TrendingScreen.navigationOptions = navData => {
  return {
    headerTitle: "Trending",
    // headerLeft: (
    //   <HeaderButtons HeaderButtonComponent={HeaderButton}>
    //     <Item
    //       title="Menu"
    //       iconName="ios-menu"
    //       onPress={() => {
    //         //  navData.navigation.toggleDrawer();
    //       }}
    //     />
    //   </HeaderButtons>
    // ),
    // JJV this is not obvious.  We have to communicate to the function above
    // so we use getParam.  the param is set when the when the screen state changes and
    // and a render happens in the useEffect function
    // The above uses arrow function.  Here we cannot because the arrow function returns pointer and does not execute
    // this would work thought adding parens
    //onPress={() => navData.navigation.getParam("save")()}
    // or onPress={navData.navigation.getParam("save")}
    // this wont work
    ////onPress={() => navData.navigation.getParam("save")}

    // headerLeft: (
    //   <HeaderButtons HeaderButtonComponent={HeaderButton}>
    //     <Item
    //       title="Menu"
    //       iconName="ios-menu"
    //       onPress={() => {
    //         navData.navigation.toggleDrawer();
    //       }}
    //     />
    //   </HeaderButtons>
    // ),

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
    padding: 5,
    alignItems: "center"
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    margin: 20,
    textAlign: "center"
  },
  picker: {
    width: 200,
    height: 200
  },
  item: {
    color: "blue"
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
    width: 150
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginVertical: 15
  }
});

export default TrendingScreen;

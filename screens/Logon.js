import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput,
  Image
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";

import Colors from "../constants/Colors";
import MButton from "../components/MButton";
import SButton from "../components/SButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

const Logon = props => {
  const [idValue, setIdValue] = useState("");
  const [pwValue, setPwValue] = useState("");
  const [userType, setUserType] = useState("rider");
  performLogon = () => {
    //props.navigation.navigate("Filters");
    // props.navigation.navigate("App");
    //props.dologon();
    props.navigation.navigate("Start", { userType: userType });
  };

  performSignup = () => {
    //props.navigation.navigate("Filters");
    // props.navigation.navigate("App");
    //props.dologon();
    props.navigation.navigate("SignUp");
  };
  // in mimenavigator i had to add  initialRouteName: "Mimes" to make sure login did not appear from the
  // drawer when they hit mimes.
  const idChangeHandler = text => {
    // you could add validation
    setIdValue(text);
  };
  const pwChangeHandler = text => {
    // you could add validation
    setPwValue(text);
  };

  // style={styles.imageContainer}

  return (
    <View style={{ justifyContent: "center" }}>
      <View style={styles.imageContainer}>
        <Ionicons name="ios-bus" size={150} />
        {/* <Image
          style={{ width: 320, height: 240 }}
          source={require("../assets/shuttle-bus.jpg")}
          resizeMode="cover"
        /> */}
        {/* <Text style={styles.label}>Where Da Bus</Text> */}
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>User Id</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={idChangeHandler}
          value={idValue}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={pwChangeHandler}
          value={pwValue}
        />
        <MButton title="Logon" color={Colors.primary} onPress={performLogon} />
        <SButton
          title="Sign Up"
          color={Colors.primary}
          onPress={performSignup}
        />
      </View>

      <View style={styles.radiowrapper}>
        <View style={styles.radiogroup}>
          <Text style={styles.label}>Rider</Text>
          <RadioButton
            value="rider"
            status={userType === "rider" ? "checked" : "unchecked"}
            //onValueChange={value => setUserType({ value })}
            onPress={() => setUserType("rider")}
          />
          <Text style={styles.label}>Driver</Text>
          <RadioButton
            value="driver"
            status={userType === "driver" ? "checked" : "unchecked"}
            onPress={() => setUserType("driver")}
          />
        </View>
      </View>
    </View>
  );
};

Logon.navigationOptions = navData => {
  return {
    headerTitle: "Where Da Bus",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
            //navData.navigation.navigate("Filters");
          }}
        />
      </HeaderButtons>
    )
    // headerRight: (
    //   <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
    //     <Text style={styles.headerButtonText}>Save</Text>
    //   </TouchableOpacity>
    // )
  };
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // width: "80%",
    margin: 25,
    backgroundColor: "#fff",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    // height: 300,
    // margin: 20
    justifyContent: "center",
    paddingBottom: 15
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
    width: 150
  },
  imageContainer: {
    //width: "100%",
    //height: "70%",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    borderRadius: 10,
    overflow: "hidden",
    margin: 10,
    justifyContent: "center",
    alignItems: "center"
    // borderWidth: 3,
    // borderColor: "blue"
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === "android" ? "white" : Colors.primary
  },
  radiowrapper: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  radiogroup: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

export default Logon;

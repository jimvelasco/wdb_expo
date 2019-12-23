import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Button,
  TextInput,
  Image
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import MButton from "../components/MButton";

const SignUp = props => {
  const [idValue, setIdValue] = useState("");
  const [pwValue, setPwValue] = useState("");
  const [pwValue2, setPwValue2] = useState("");
  performSignup = () => {
    //props.navigation.navigate("Filters");
    // props.navigation.navigate("App");
    //props.dologon();
    props.navigation.navigate("FiltersTabs");
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
  const pwChangeHandler2 = text => {
    // you could add validation
    setPwValue2(text);
  };

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Ionicons name="ios-bus" size={150} />
      {/* <Image
        // style={{width: 50, height: 50}}
        source={require("../assets/MimeLogo.jpeg")}
        resizeMode="contain"
      /> */}
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
        <Text style={styles.label}>Password 2</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={pwChangeHandler2}
          value={pwValue2}
        />
        <MButton
          title="Submit"
          color={Colors.primary}
          onPress={performSignup}
        />
      </View>
    </View>
  );
};

SignUp.navigationOptions = navData => {
  return {
    headerTitle: "Sign Up"
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
    width: 300,
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
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === "android" ? "white" : Colors.primary
  }
});

export default SignUp;

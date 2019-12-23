import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Platform,
  Picker,
  TextInput
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch } from "react-redux";

import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";
import TButton from "../components/TButton";

//import { setFilters } from "../store/actions/meals";

let cnt = 0;

const TestScreen = props => {
  const [dataValue, setDataValue] = useState("");
  const [isRender, setIsRender] = useState(true);
  const [displayValue, setDisplayValue] = useState("");
  //console.log("data from outside ", props.data);
  // const pressone = () => {
  //   console.log("one pressed");
  // };

  // const presstwo = () => {
  //   console.log("two pressed", cnt);
  //   setButtonTwoData(cnt);
  //   cnt = cnt + 1;
  // };

  // let oned = buttonOneData;
  // let twod = buttonTwoData;
  const changeHandler = text => {
    // you could add validation
    setDataValue(text);
  };
  const internalpressed = () => {
    console.log("internal has been pressed");
    setDisplayValue(dataValue);
  };

  // useEffect(() => {
  //   console.log("internal test screen use effect called ", displayValue);
  //   cnt = cnt + 1;
  // }, [displayValue]);

  // useEffect(() => {
  //   console.log("props data use effect called ", props.data);
  //   cnt = cnt + 1;
  // }, [props.data]);

  useEffect(() => {
    console.log("test screen use effect props data  ", props.data);
    setDisplayValue("this is it");
    cnt = cnt + 1;
    return () => {
      console.log("we are leaving the test screen");
    };
  }, []);

  console.log("we are doing a test screen render");

  if (!isRender) {
    return (
      <View style={styles.screen}>
        <Text style={styles.title}>nothing to render</Text>
      </View>
    );
  }
  return (
    <View style={styles.screen}>
      {/* <TButton title="one" data={oned} onPress={pressone} />
      <TButton title="two" data={twod} onPress={presstwo} /> */}
      <Text style={styles.title}>here is the test screen data</Text>
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={changeHandler}
        value={dataValue}
      />
      <TButton title="Internal" onPress={internalpressed} />
      <Text style={styles.label}>{displayValue}</Text>
      <Text style={styles.label}>{cnt}</Text>
      <View style={styles.out}>
        <Text>this is from outside {props.data}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 5,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black"
  },
  out: {
    padding: 5,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black"
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
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginVertical: 15
  }
});

export default TestScreen;

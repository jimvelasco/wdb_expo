import React, { useState, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

const About = props => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={styles.label}>About content goes here</Text>
    </View>
  );
};

About.navigationOptions = navData => {
  //console.log("na", navData);
  return {
    headerTitle: "About",
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
  };
};

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10
  }
});

export default About;

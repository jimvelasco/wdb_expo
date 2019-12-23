import React, { useState, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";

const Contact = props => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={styles.label}>Contact information goes here</Text>
    </View>
  );
};

Contact.navigationOptions = navData => {
  //console.log("na", navData);
  return {
    headerTitle: "Contact",
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

export default Contact;

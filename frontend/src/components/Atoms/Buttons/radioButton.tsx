import { StyleSheet, View, Dimensions } from "react-native";
import React from "react";

const { height: ScreenHeight } = Dimensions.get("window");

const radioButton = () => {
  return <View style={styles.radioContainer}></View>;
};

export default radioButton;

const styles = StyleSheet.create({
  radioContainer: {
    height: ScreenHeight / 60,
    width: ScreenHeight / 60,
    borderRadius: ScreenHeight / 60,
    backgroundColor: "#F8A33E",
  },
});

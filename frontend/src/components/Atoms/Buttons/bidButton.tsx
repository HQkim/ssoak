import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";

const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get("window");

const BidButton = ({ button }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer}>
      <Text style={styles.textStyle}>{button}</Text>
    </TouchableOpacity>
  );
};

export default BidButton;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#0176B7",
    width: ScreenWidth / 5,
    height: ScreenWidth / 13,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    color: "#ffffff",
    fontSize: ScreenWidth / 28,
  },
});
